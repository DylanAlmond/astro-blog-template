import rss, { type RSSOptions } from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';

export async function GET(context: RSSOptions) {
  const blog = await getCollection('blog');

  return rss({
    title: 'Blog',
    description: 'Latest blog posts and updates.',
    site: context.site,
    items: blog.map((post: CollectionEntry<'blog'>) => {
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
