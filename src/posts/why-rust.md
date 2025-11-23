---
slug: 'why-rust'
title: 'Why I am Learning Rust in 2025'
summary: 'Systems programming is no longer just for OS developers. Here is why I jumped in.'
date: 'Oct 30, 2025'
author: 'Alex Dev'
authorAvatar: 'https://avatars.githubusercontent.com/u/9919?v=4'
readTime: '8 min'
category: 'Thoughts'
tags: ['Rust', 'Learning']
featured: true
coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
---

Rust has been gaining massive popularity in the last few years. As a frontend developer, venturing into systems programming can be daunting, but Rust makes it approachable.

### The Borrow Checker

The most infamous part of Rust is also its greatest strength.

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 is moved here
    
    // println!("{}, world!", s1); // This would throw an error!
    println!("{}, world!", s2);
}
```

It forces you to think about memory ownership at compile time, eliminating a whole class of bugs found in C++.

### Performance

It is blazingly fast.

![Rust Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png)

Check out the official site [here](https://www.rust-lang.org).
