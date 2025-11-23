import { BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    id: '3',
    slug: 'zed-editor-experience',
    title: 'Zed Is Our Office',
    summary: 'A look at how we use Zed\'s native collaboration features to run our entire company.',
    date: 'Nov 13, 2025',
    author: 'Joseph Lyons',
    readTime: '4 min',
    fileName: 'zed.md',
    tags: ['Tools', 'Productivity'],
    category: 'Thoughts',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '1',
    slug: 'hello-world',
    title: 'Introducing Agent Extensions',
    summary: 'Zed launches Agent Server Extensions, enabling one-click installation of ACP-compatible agents.',
    date: 'Nov 06, 2025',
    author: 'Richard Feldman',
    readTime: '5 min',
    fileName: 'hello-world.md',
    tags: ['AI', 'React'],
    category: 'Tutorials',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    slug: 'windows-now',
    title: 'Windows When? Windows Now',
    summary: 'Zed for Windows is finally here. Download it today.',
    date: 'Oct 15, 2025',
    author: 'Max Brunsfeld',
    readTime: '2 min',
    fileName: 'why-rust.md', 
    tags: ['Open Source', 'Launch'],
    category: 'Projects',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1607799275518-d58665d099db?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    slug: 'why-rust',
    title: 'Why I am Learning Rust in 2025',
    summary: 'Systems programming is no longer just for OS developers. Here is why I jumped in.',
    date: 'Oct 30, 2025',
    author: 'Alex Dev',
    readTime: '8 min',
    fileName: 'why-rust.md',
    tags: ['Rust', 'Learning'],
    category: 'Thoughts',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '4',
    slug: 'codex-live',
    title: 'Codex is Live in Zed',
    summary: 'OpenAI\'s Codex AI agent is now available in Zed via the Agent Client Protocol (ACP).',
    date: 'Oct 16, 2025',
    author: 'Alex Dev',
    readTime: '3 min',
    fileName: 'hello-world.md', 
    tags: ['CSS', 'Frontend'],
    category: 'Tutorials',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop'
  },
  {
    id: '6',
    slug: 'productive-conversations-ai',
    title: 'React Hook: useDebounce',
    summary: 'A copy-paste ready hook for handling search inputs efficiently.',
    date: 'Oct 14, 2025',
    author: 'Alex Dev',
    readTime: '1 min',
    fileName: 'zed.md',
    tags: ['React', 'Snippets'],
    category: 'Snippets'
  }
];