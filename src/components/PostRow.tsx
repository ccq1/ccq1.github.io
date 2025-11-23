import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface PostRowProps {
  post: BlogPost;
}

const PostRow: React.FC<PostRowProps> = ({ post }) => {
  // 为每个文章生成唯一的 pattern ID
  const patternId = `pattern-${post.id}`;
  
  // 根据类别返回不同的颜色样式
  const getCategoryStyle = (category: string) => {
    const styles = {
      'Tutorials': 'border-blue-200/50 bg-blue-50/60 text-blue-950 dark:border-blue-300/12 dark:bg-blue-800/5 dark:text-blue-200',
      'Projects': 'border-green-200/50 bg-green-50/60 text-green-950 dark:border-green-300/12 dark:bg-green-800/5 dark:text-green-200',
      'Thoughts': 'border-purple-200/50 bg-purple-50/60 text-purple-950 dark:border-purple-300/12 dark:bg-purple-800/5 dark:text-purple-200',
      'Snippets': 'border-orange-200/50 bg-orange-50/60 text-orange-950 dark:border-orange-300/12 dark:bg-orange-800/5 dark:text-orange-200',
    };
    return styles[category as keyof typeof styles] || styles['Tutorials'];
  };
  
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="group relative isolate rounded py-2 lg:px-2 lg:min-h-[42px] flex flex-col items-start justify-between gap-2 lg:flex-row lg:items-center border border-transparent hover:border-blue-300 dark:hover:border-blue-300/20 hover:bg-blue-50/50 dark:hover:bg-blue-700/5 transition-all duration-200"
      style={{
        // fv-style 的 box-shadow 效果
        ['--sh-alt' as any]: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* SVG 斜线图案背景 */}
      <svg 
        className="pointer-events-none absolute inset-0 [z-index:-1] size-full select-none text-blue-300 dark:text-blue-400/10 invisible [mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] opacity-50 group-hover:visible dark:opacity-80"
      >
        <defs>
          <pattern 
            id={patternId} 
            width="4" 
            height="4" 
            patternUnits="userSpaceOnUse" 
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5"></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
      </svg>

      {/* 主要内容区域 */}
      <div className="flex shrink-0 flex-col items-start gap-2 lg:flex-row lg:items-center">
        {/* 标题 */}
        <h2 className="underline decoration-blue-500/20 hover:decoration-blue-500/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80 group-hover:decoration-blue-500/80 dark:group-hover:decoration-blue-400/80 text-zinc-900 dark:text-zinc-100 text-[0.9375rem] transition-all">
          {post.title}
        </h2>

        {/* 作者头像 - 大屏幕显示 */}
        <div className="hidden -space-x-1.5 hover:space-x-2 lg:flex">
          <div className="relative isolate shrink-0 transition-[margin] duration-150">
            <img 
              alt={post.author || "Author"} 
              loading="lazy" 
              width="20" 
              height="20" 
              decoding="async" 
              className="size-5 shrink-0 cursor-help overflow-hidden rounded-full border border-zinc-300 dark:border-zinc-700" 
              src="https://avatars.githubusercontent.com/u/78813459?v=4"
            />
          </div>
        </div>
      </div>

      {/* 分隔线 - 大屏幕显示 */}
      <hr className="border-zinc-300 dark:border-zinc-700 hidden w-full opacity-70 group-hover:invisible lg:flex" />

      {/* 右侧信息区域 */}
      <div className="flex w-full shrink-0 items-center gap-1 lg:w-fit">
        {/* 类别标签 */}
        <div className="flex flex-wrap gap-2">
          <div className={`rounded-xs h-[18px] px-1 pt-px w-fit flex items-center gap-1.5 shrink-0 border font-mono text-[0.625rem] leading-6 ${getCategoryStyle(post.category)}`}>
            {post.category}
          </div>
        </div>

        {/* 竖线分隔符 - 大屏幕显示 */}
        <span className="hidden opacity-15 lg:flex dark:opacity-8">|</span>

        {/* 日期 */}
        <p className="text-zinc-600 dark:text-zinc-500 ml-auto font-mono text-[0.625rem]">
          {post.date}
        </p>
      </div>

      {/* 分隔线 - 小屏幕显示 */}
      <hr className="border-zinc-300 dark:border-zinc-700 flex w-full opacity-70 group-hover:invisible lg:hidden" />
    </Link>
  );
};

export default PostRow;