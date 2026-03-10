import { z } from 'astro/zod';

const socialLinksSchema = z
  .object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  })
  .catchall(z.string().url());

/**
 * Removes trailing slashes from the site URL.
 *
 * @param url Site URL from config.
 * @returns The same URL without trailing slashes.
 */
const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, '');

export const siteSchema = z.object({
  name: z.string().trim().min(1, 'Site name is required.'),
  url: z
    .string()
    .url('Site URL must be a valid absolute URL.')
    .transform(normalizeSiteUrl),
  email: z.string().email('Site email must be a valid email address.'),
  telephone: z.string().trim().min(1, 'Site telephone is required.'),
  jobTitle: z.string().trim().min(1, 'Site job title is required.'),
  description: z.string().trim().min(1, 'Site description is required.'),
  socials: socialLinksSchema,
});

/**
 * The validated site settings used throughout the app.
 */
export type SiteConfig = z.output<typeof siteSchema>;

/**
 * Raw site settings.
 *
 * Update these values to match your brand and contact details.
 */
const siteConfigInput: z.input<typeof siteSchema> = {
  name: 'My Blog',
  url: process.env.PUBLIC_SITE_URL ?? 'https://example.com',
  email: 'hello@example.com',
  telephone: '+1234567890',
  jobTitle: 'Developer',
  description:
    'Welcome to my blog. I write about web development, design, and technology. Built with Astro and TypeScript.',
  socials: {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
  },
};

/**
 * Validated site settings shared across pages, layouts, and SEO helpers.
 *
 * @returns The parsed site configuration.
 * @throws {ZodError} Thrown when a configured value does not match the schema.
 *
 * Side effects/runtime constraints: Reads `PUBLIC_SITE_URL` at module load time and
 * normalizes it before exporting the final config.
 */
export const site: SiteConfig = siteSchema.parse(siteConfigInput);
