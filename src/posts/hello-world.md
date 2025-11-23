---
slug: 'hello-world'
title: 'Introducing Agent Extensions'
summary: 'Zed launches Agent Server Extensions, enabling one-click installation of ACP-compatible agents.'
date: 'Nov 06, 2025'
author: 'Richard Feldman'
authorAvatar: 'https://avatars.githubusercontent.com/u/1094080?v=4'
readTime: '5 min'
category: 'Tutorials'
tags: ['AI', 'React']
featured: true
coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
---

This is a sample post to demonstrate how the **Markdown** rendering works. 

### Why Markdown?

Markdown is lightweight, portable, and readable. It allows developers to write content without worrying about complex CMS structures.

Here is an example of a code block, which is essential for a developer blog:

```typescript
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

function getUser(id: number): User {
  return {
    id,
    name: "Alex",
    role: "admin"
  };
}
```

### Typography

We are using a custom renderer to ensure:
1. Lists look good
2. Code blocks look like an editor
3. Links are accessible

*   Item One
*   Item Two
*   Item Three

> This is a blockquote. It's great for emphasizing key points or quoting other sources.
