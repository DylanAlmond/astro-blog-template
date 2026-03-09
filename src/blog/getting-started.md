---
draft: false
pinned: true
title: 'Getting Started'
pubDate: '2025-01-01'
description: 'Welcome to your new Astro blog! This post walks you through how the template works and how to start creating content.'
tags: ['Getting Started', 'Astro']
image:
  src: '../images/getting-started/banner.svg'
  alt: 'Getting started with your Astro blog.'
---

Welcome to your new blog! This template gives you everything you need to start publishing content right away.

## Creating Posts

Add new Markdown or MDX files to the `src/blog/` directory. Each post needs frontmatter at the top of the file:

```yaml
---
draft: false
title: 'My Post Title'
pubDate: '2025-01-01'
description: 'A short description of the post.'
tags: ['Tag One', 'Tag Two']
image:
  src: '../images/my-post/banner.svg'
  alt: 'Description of the image.'
---
```

## Frontmatter Fields

- **draft** — Set to `true` to hide the post in production builds.
- **pinned** — Set to `true` to pin the post to the top of the blog listing.
- **title** — The display title of the post.
- **pubDate** — The original publication date.
- **description** — A short summary shown in listings and meta tags.
- **tags** — An array of topic tags.
- **image** — A featured image with `src` path and `alt` text.

## What's Included

- **MDX Support** — Use components inside your Markdown.
- **RSS Feed** — Automatically generated at `/rss.xml`.
- **Sitemap** — Generated on build with last-modified dates from Git.
- **Updated dates** — Derived automatically from the file's Git history or filesystem metadata.
- **SEO** — Open Graph meta tags in every layout.
- **PWA** — Offline-ready with service worker support.

Start writing and make it your own!
