import { posts } from '../data/posts';

export const getPostBySlug = (slug: string) => {
  return posts.find((p) => p.slug === slug);
};

export const fetchMarkdownContent = async (fileName: string): Promise<string> => {
  try {
    // In a real deployed environment (like GH Pages), files in 'public' are served at root.
    // e.g. domain.com/posts/hello.md
    const response = await fetch(`./posts/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(error);
    return "# Error loading post\n\nCould not fetch content.";
  }
};
