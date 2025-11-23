import { Buffer } from 'buffer';
// 确保 Buffer 在全局可用
if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

// @ts-ignore
import matter from 'gray-matter';
import { BlogPost } from '../types';

// 动态导入所有 markdown 文件（从 src/posts 目录）
const markdownFiles = (import.meta as any).glob('../posts/*.md', { 
  query: '?raw', 
  import: 'default',
  eager: true 
}) as Record<string, string>;

console.log('📚 加载的文章文件:', Object.keys(markdownFiles));
console.log('📝 文章数量:', Object.keys(markdownFiles).length);

// 解析并加载所有文章
export function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  
  console.log('🔍 开始解析文章...');
  console.log('📂 找到的文件:', Object.keys(markdownFiles));

  for (const [path, content] of Object.entries(markdownFiles)) {
    console.log('📄 正在处理:', path);
    try {
      // 提取文件名
      const fileName = path.split('/').pop() || '';
      
      // 忽略以 _ 或 . 开头的文件（如 _template.md, README.md）
      if (fileName.startsWith('_') || fileName.startsWith('.') || fileName.toUpperCase() === 'README.MD') {
        continue;
      }
      
      // 解析 frontmatter
      const { data } = matter(content);
      
      // 验证必需字段（id 不再需要，系统自动生成）
      if (!data.slug || !data.title || !data.date) {
        console.warn(`跳过文件 ${fileName}: 缺少必需字段 (slug, title, date)`);
        continue;
      }

      // 构建文章对象
      const post: BlogPost = {
        id: data.slug, // 使用 slug 作为 id（唯一标识）
        slug: data.slug,
        title: data.title,
        summary: data.summary || '',
        date: data.date,
        author: data.author || 'Anonymous',
        authorAvatar: data.authorAvatar,
        readTime: data.readTime || '5 min',
        fileName: fileName,
        tags: data.tags || [],
        category: data.category || 'Thoughts',
        featured: data.featured || false,
        coverImage: data.coverImage,
      };

      posts.push(post);
      console.log('✅ 成功加载文章:', post.title);
    } catch (error) {
      console.error(`❌ 解析文件 ${path} 时出错:`, error);
    }
  }

  console.log('📊 总共加载了', posts.length, '篇文章');
  
  // 按日期排序（最新的在前）
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  console.log('🎉 文章加载完成!');
  return sortedPosts;
}

// 导出加载的文章
export const posts = loadPosts();

// 根据 slug 获取文章
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(post => post.category === category);
}

// 获取最新的 N 篇文章
export function getLatestPosts(count: number): BlogPost[] {
  return posts.slice(0, count);
}

