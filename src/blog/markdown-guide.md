---
draft: false
title: 'Markdown Guide'
pubDate: '2025-01-02'
description: 'A reference for all the Markdown features supported in this blog template.'
tags: ['Markdown', 'Reference']
image:
  src: '../images/markdown-guide/banner.svg'
  alt: 'A guide to writing Markdown content.'
---

This post demonstrates the Markdown features you can use in your blog posts.

## Headings

Use `#` for headings. This template styles `h1` through `h6`.

## Text Formatting

You can write **bold**, _italic_, and ~~strikethrough~~ text.

## Links

[Visit the Astro docs](https://docs.astro.build) for more information.

## Lists

Unordered list:

- First item
- Second item
- Third item

Ordered list:

1. Step one
2. Step two
3. Step three

## Code

Inline code: `const greeting = 'Hello, world!';`

Code block:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Blockquotes

> This is a blockquote. Use it to highlight important information.

## Tables

| Feature     | Supported |
| ----------- | --------- |
| Markdown    | Yes       |
| MDX         | Yes       |
| Images      | Yes       |
| Code blocks | Yes       |

## Images

Place images in `src/images/` and reference them with relative paths:

```markdown
![Alt text](../images/my-post/screenshot.png)
```

## Horizontal Rules

---

That covers the basics. Combine these elements to create rich blog content!
