import type { CollectionEntry } from 'astro:content';
import { site } from '../config/site';
import type {
  AboutPage,
  Blog,
  BlogPosting,
  ContactPage,
  ImageObject,
  WebSite,
} from 'schema-dts';
import getModifiedTime from '../util/getModifiedTime';
import { getImage } from 'astro:assets';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { visit } from 'unist-util-visit';
import { decode } from 'html-entities';

const imageFiles: Record<string, { default: ImageMetadata }> = import.meta.glob(
  '../images/**/*',
  {
    eager: true,
  },
);

async function decodeAstroImages(htmlString: string): Promise<ImageObject[]> {
  const images: ImageObject[] = [];

  const tree = unified().use(rehypeParse, { fragment: true }).parse(htmlString);
  const promises: Promise<void>[] = [];

  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'img' && node.properties?.__astro_image_) {
      const decoded = decode(node.properties.__astro_image_);
      const { src, alt }: { src: string; alt: string } = JSON.parse(decoded);

      const fileModule = imageFiles[src];
      if (!fileModule) {
        console.warn(`Image not found in glob: ${src}`);
        return;
      }

      promises.push(
        getImage({
          src: fileModule.default,
          format: 'webp',
        }).then((res) => {
          images.push({
            '@type': 'ImageObject',
            author: { '@id': personSchema['@id'] },
            url: new URL(res.src, site.url).toString(),
            description: alt,
          });
        }),
      );
    }
  });

  await Promise.all(promises);
  return images;
}

export const personSchema = {
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.telephone,
  jobTitle: site.jobTitle,
  sameAs: Object.values(site.socials),
};

export const BlogPostSchema = async (
  url: string,
  post: CollectionEntry<'blog'>,
  lastModifiedISO: string,
): Promise<BlogPosting> => {
  const markdownImages: ImageObject[] = await decodeAstroImages(
    post.rendered?.html || '',
  );

  const datePublishedISO = post.data.pubDate.toISOString();
  const dateModifiedISO = new Date(lastModifiedISO).toISOString();

  // Featured Image
  if (post.data.image) {
    const processedImage = await getImage({
      src: post.data.image.src,
      format: 'webp',
    });

    markdownImages.push({
      '@type': 'ImageObject',
      author: { '@id': personSchema['@id'] },
      url: new URL(processedImage.src, site.url).toString(),
      description: post.data.image.alt,
    });
  }

  return {
    '@type': 'BlogPosting',
    '@id': `${url}/#BlogPosting`,
    mainEntityOfPage: url,
    headline: post.data.title,
    name: post.data.title,
    description: post.data.description,
    datePublished: datePublishedISO,
    dateCreated: datePublishedISO,
    dateModified: dateModifiedISO,
    author: { '@id': personSchema['@id'] },
    publisher: { '@id': personSchema['@id'] },
    image: markdownImages,
    keywords: post.data.tags,
    articleSection: post.data.tags[0],
  };
};

export const BlogSchema = async (
  url: string,
  posts: CollectionEntry<'blog'>[],
  title: string,
  description: string,
): Promise<Blog> => {
  const blogPost = await Promise.all(
    posts.map(async (post) => {
      const { lastModified } = getModifiedTime(post.filePath!);

      return BlogPostSchema(
        new URL(`/blog/${post.id}/`, site.url).toString(),
        post,
        lastModified,
      );
    }),
  );

  return {
    '@type': 'Blog',
    '@id': url,
    mainEntityOfPage: url,
    name: title,
    description: description,
    publisher: { '@id': personSchema['@id'] },
    blogPost: blogPost,
  };
};

export const ContactSchema = (
  url: string,
  title: string,
  description: string,
): ContactPage => {
  return {
    '@type': 'ContactPage',
    '@id': url,
    name: title,
    description: description,
    mainEntity: { '@id': personSchema['@id'] },
  };
};

export const AboutSchema = (
  url: string,
  title: string,
  description: string,
): AboutPage => {
  return {
    '@type': 'AboutPage',
    name: title,
    description: description,
    url: url,
    mainEntity: { '@id': personSchema['@id'] },
  };
};

export const WebSiteSchema = (
  url: string,
  title: string,
  description: string,
): WebSite => {
  return {
    '@type': 'WebSite',
    name: title,
    description: description,
    url: url,
  };
};
