import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, fetchMarkdownContent } from '../services/markdownService';
import { ArrowLeft, BookOpenText, Milestone, Hash } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_TITLE } from '../constants';
import Divider from '../components/Divider';

interface TocItem {
  id: string;
  label: string;
  level: number;
}

// 辅助函数：从文本生成锚点 ID
const generateId = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
};

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const foundPost = getPostBySlug(slug);
        setPost(foundPost);
        if (foundPost) {
          const text = await fetchMarkdownContent(foundPost.fileName);
          setContent(text);
          
          // 解析目录
          const headings = text.match(/^#{1,3}\s+(.+)$/gm) || [];
          const tocItems = headings.map((heading) => {
            const level = heading.match(/^#+/)?.[0].length || 1;
            const label = heading.replace(/^#+\s+/, '');
            const id = generateId(label);
            return { id, label, level };
          });
          setToc(tocItems);
        }
      }
      setLoading(false);
    };
    loadPost();
  }, [slug]);

  if (loading) return null;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Section 1: Left side - 2.5% */}
      <section className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-r border-[#dbe8f9] dark:border-[#1d222b] transition-colors"></section>

      {/* Section 2: Main content - 95% */}
      <section className="w-[95%] bg-[#fafaf7] dark:bg-[#131418] transition-colors">
        
        {/* Author Info Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-300 underline decoration-blue-600/20 hover:decoration-blue-600/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80 mb-12 transition-colors group"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-blue-600 dark:text-blue-300 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-3">
              <img 
                src="https://avatars.githubusercontent.com/u/78813459?v=4"
                alt={post.author}
                className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700"
              />
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{post.author}</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-500">{post.date}</div>
              </div>
            </div>
          </header>
        </section>

        {/* Divider */}
        <div className="w-full">
          <Divider patternId="post-divider" />
        </div>

        {/* Article Content Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-20 relative z-10">
          <div className="mx-auto w-full max-w-[640px] md:max-w-[1100px] relative justify-between gap-16 2xl:flex 2xl:flex-row-reverse 2xl:items-start">
            
            {/* Right Sidebar - TOC (显示在右侧，代码中靠前) */}
            <nav className="sticky top-24 hidden grow flex-col gap-1 2xl:flex">
              <h2 className="mb-2 flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-100">
                <BookOpenText size={14} />
                On This Page
              </h2>
              <ul className="border-zinc-300 dark:border-zinc-600/20 ml-[7px] space-y-1 border-l pl-4">
                {toc.map((item, idx) => (
                  <li key={idx} style={{ marginLeft: `${(item.level - 1) * 16}px` }}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="inline text-blue-600 dark:text-blue-300 underline decoration-blue-600/20 hover:decoration-blue-600/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* What's next box */}
              <div className="border-zinc-300 dark:border-zinc-600/20 rounded-sm border p-2.5 dark:bg-zinc-800/8 bg-white/60 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)] mt-6 !shadow-none">
                <h2 className="mb-1 flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-100">
                  <Milestone size={14} className="shrink-0" />
                  What's next for {BLOG_TITLE}?
                </h2>
                <Link 
                  to="/" 
                  className="inline text-blue-600 dark:text-blue-300 underline decoration-blue-600/20 hover:decoration-blue-600/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80 pl-5.5 text-sm"
                >
                  See our roadmap →
                </Link>
              </div>
            </nav>

            {/* Main Article Content */}
            <article className="mx-auto max-w-[700px] 2xl:w-full 2xl:mx-0">

            <ReactMarkdown
              components={{
                h1: ({node, children, ...props}) => {
                  const id = generateId(String(children));
                  return (
                    <h2 
                      className="font-serif text-balance scroll-mt-24 text-2xl text-blue-600 dark:text-blue-300 font-medium mt-8 mb-4 group flex whitespace-pre-wrap border-zinc-300/40 dark:border-zinc-600/10 border-b pb-2.5" 
                      id={id}
                      {...props}
                    >
                      <a href={`#${id}`} aria-label="Copy heading link" className="relative flex items-center border-none lg:-ml-2 lg:pl-2">
                        <span className="absolute opacity-0 group-hover:opacity-100 hidden size-5 items-center justify-center rounded-sm lg:flex text-blue-600 dark:text-blue-300 shadow-xs border-zinc-300/60 dark:border-zinc-600/20 border dark:bg-zinc-900/30 -ml-7">
                          <Hash size={10} />
                        </span>
                        <span>{children}</span>
                      </a>
                    </h2>
                  );
                },
                h2: ({node, children, ...props}) => {
                  const id = generateId(String(children));
                  return (
                    <h2 
                      className="font-serif text-balance scroll-mt-24 text-2xl text-blue-600 dark:text-blue-300 font-medium mt-8 mb-4 group flex whitespace-pre-wrap border-zinc-300/40 dark:border-zinc-600/10 border-b pb-2.5" 
                      id={id}
                      {...props}
                    >
                      <a href={`#${id}`} aria-label="Copy heading link" className="relative flex items-center border-none lg:-ml-2 lg:pl-2">
                        <span className="absolute opacity-0 group-hover:opacity-100 hidden size-5 items-center justify-center rounded-sm lg:flex text-blue-600 dark:text-blue-300 shadow-xs border-zinc-300/60 dark:border-zinc-600/20 border dark:bg-zinc-900/30 -ml-7">
                          <Hash size={10} />
                        </span>
                        <span>{children}</span>
                      </a>
                    </h2>
                  );
                },
                h3: ({node, children, ...props}) => {
                  const id = generateId(String(children));
                  return (
                    <h3 
                      className="font-serif text-balance scroll-mt-24 text-xl text-blue-600 dark:text-blue-300 font-medium mt-8 mb-3 group flex whitespace-pre-wrap" 
                      id={id}
                      {...props}
                    >
                      <a href={`#${id}`} aria-label="Copy heading link" className="relative flex items-center border-none lg:-ml-2 lg:pl-2">
                        <span className="absolute opacity-0 group-hover:opacity-100 hidden size-5 items-center justify-center rounded-sm lg:flex text-blue-600 dark:text-blue-300 shadow-xs border-zinc-300/60 dark:border-zinc-600/20 border dark:bg-zinc-900/30 -ml-7">
                          <Hash size={10} />
                        </span>
                        <span>{children}</span>
                      </a>
                    </h3>
                  );
                },
                p: ({node, ...props}) => <p className="leading-relaxed mb-4 text-zinc-900 dark:text-zinc-300" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside ml-1.5 pl-4 *:pl-1.5 pb-2 marker:text-sm text-zinc-900 dark:text-zinc-300" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-1.5 pl-5 *:pl-0 pb-2 marker:text-sm text-zinc-900 dark:text-zinc-300" {...props} />,
                li: ({node, ...props}) => <li className="mb-2 break-words" {...props} />,
                a: ({node, ...props}) => (
                  <a 
                    className="inline text-blue-600 dark:text-blue-300 underline decoration-blue-600/20 hover:decoration-blue-600/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80" 
                    {...props} 
                  />
                ),
                strong: ({node, ...props}) => <strong className="dark:text-zinc-100 text-zinc-900 font-semibold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="pl-4 dark:text-zinc-400 text-zinc-600 italic border-l-2 border-zinc-300 dark:border-zinc-600 my-4" {...props} />
                ),
                code: ({node, inline, className, children, ...props}: any) => {
                  if (inline) {
                    return (
                      <code className="-mx-0.5 py-0.5 px-1 font-mono text-sm bg-blue-600/10 dark:bg-blue-400/10 text-zinc-900 dark:text-zinc-100 rounded" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="relative my-2 p-2 font-mono text-sm rounded-sm dark:bg-zinc-900 bg-white border-blue-600/30 border dark:border-blue-400/20 mb-4">
                      <pre className="flex w-full items-center overflow-x-auto pr-12">
                        <code className="text-zinc-900 dark:text-zinc-300" {...props}>{children}</code>
                      </pre>
                    </div>
                  );
                },
                img: ({node, ...props}) => (
                  <div className="border-zinc-300 dark:border-zinc-600/20 rounded-sm border p-2.5 dark:bg-zinc-800/8 bg-white/60 shadow-[6px_6px_0_hsla(219,_93%,_42%,_0.06)] dark:shadow-[5px_5px_0_hsla(219,_90%,_60%,_0.08)] relative mb-4 overflow-clip p-0">
                    <figure>
                      <img {...props} alt={props.alt} className="w-full" />
                      {props.alt && (
                        <figcaption className="px-3 py-2.5 text-xs italic text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-600/20 border-t dark:bg-zinc-800/10">
                          {props.alt}
                        </figcaption>
                      )}
                    </figure>
                  </div>
                ),
                hr: ({node, ...props}) => (
                  <hr className="border-zinc-300 dark:border-zinc-600/20 w-full border-t my-8 h-px" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>

              {/* Bottom Section */}
              <hr className="border-zinc-300 dark:border-zinc-600/20 w-full border-t my-8 h-px" />
              
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-balance scroll-mt-24 text-lg text-blue-600 dark:text-blue-300 font-medium mt-2.5 mb-1.5">
                  Looking for a better editor?
                </h3>
                <p className="leading-relaxed mb-4 text-zinc-900 dark:text-zinc-300">
                  You can try {BLOG_TITLE} today. <Link to="/" className="inline text-blue-600 dark:text-blue-300 underline decoration-blue-600/20 hover:decoration-blue-600/80 dark:decoration-blue-300/20 dark:hover:decoration-blue-400/80">Read more posts</Link>!
                </p>
              </div>
            </article>
          </div>
        </section>
      </section>

      {/* Section 3: Right side - 2.5% */}
      <section className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-l border-[#dbe8f9] dark:border-[#1d222b] transition-colors"></section>
    </div>
  );
};

export default PostView;