---
draft: false
title: 'Customizing Your Blog'
pubDate: '2025-01-03'
description: 'Learn how to personalize this template — update your site info, colors, pages, and more.'
tags: ['Customization', 'Configuration']
image:
  src: '../images/customizing-your-blog/banner.svg'
  alt: 'Customizing your Astro blog template.'
---

This template is designed to be easily customized. Here's how to make it your own.

## Site Configuration

Edit `src/config/site.ts` to update your personal information:

- **name** — Your name or site title.
- **url** — Your production domain.
- **email** — Your contact email.
- **description** — A short bio or site description.
- **socials** — Links to your GitHub, LinkedIn, or other profiles.

## Styling

This template uses simple global CSS for styling. Global styles live in `src/styles/global.css`.

Key CSS custom properties you can adjust:

- `--color-primary` — Main text/accent color.
- `--color-background` — Page background color.
- `--color-accent` — Main accent color for buttons and links.
- `--color-border` — Default border color.

## Pages

The template includes these pages:

- **Home** (`/`) — Introductory landing page.
- **Blog** (`/blog`) — Blog post listing.
- **About** (`/about`) — About page.
- **Contact** (`/contact`) — Contact information.

Edit or remove pages in `src/pages/` to fit your needs.

## Layouts

Three layouts are available:

- **BaseLayout** — Minimal HTML shell with meta tags.
- **PageLayout** — Shared page wrapper with header, nav, and footer.
- **PostLayout** — Blog post layout with featured image, tags, and navigation.

## Adding Features

The template is built with Astro, so you can add any [Astro integration](https://astro.build/integrations/) to extend functionality.
