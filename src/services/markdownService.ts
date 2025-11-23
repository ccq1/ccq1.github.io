import { Buffer } from 'buffer';
// 确保 Buffer 在全局可用
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

// @ts-ignore
import matter from 'gray-matter';
import { getPostBySlug as getPostBySlugFromLoader } from './postsLoader';

export const getPostBySlug = getPostBySlugFromLoader;

// 导入所有 markdown 文件的原始内容（从 src/posts 目录）
const markdownContents = (import.meta as any).glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const fetchMarkdownContent = async (fileName: string): Promise<string> => {
  try {
    // 从导入的文件中查找
    const filePath = Object.keys(markdownContents).find(path => path.endsWith(fileName));
    
    if (!filePath) {
      throw new Error(`File not found: ${fileName}`);
    }
    
    const rawContent = markdownContents[filePath];
    
    // 解析并移除 frontmatter，只返回正文内容
    const { content } = matter(rawContent);
    return content;
  } catch (error) {
    console.error('Error loading markdown:', error);
    return "# Error loading post\n\nCould not fetch content.";
  }
};
