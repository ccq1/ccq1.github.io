import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, fetchMarkdownContent } from '../services/markdownService';
import { ArrowLeft, User, Link as LinkIcon, MapPin } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_TITLE } from '../constants';

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const foundPost = getPostBySlug(slug);
        setPost(foundPost);
        if (foundPost) {
          const text = await fetchMarkdownContent(foundPost.fileName);
          setContent(text);
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

  // Simplified Mock Table of Contents
  // In a real app, this would be parsed from the Markdown AST
  const mockTOC = [
    { id: '#intro', label: 'Introduction' },
    { id: '#features', label: 'Key Features' },
    { id: '#conclusion', label: 'Conclusion' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content Area */}
        <main className="lg:col-span-8 lg:col-start-2">
            <Link 
                to="/" 
                className="inline-flex items-center text-xs font-mono text-zinc-500 hover:text-white mb-8 transition-colors group"
            >
                <ArrowLeft size={12} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
            </Link>

            <header className="mb-12 border-b border-border pb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <User size={20} className="text-zinc-400" />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-white">{post.author}</div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">{post.date}</div>
                    </div>
                </div>
            </header>

            <article className="prose prose-invert max-w-none text-zinc-300">
                <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h2 className="text-3xl font-serif text-white mt-16 mb-6" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-serif text-white mt-12 mb-4 border-b border-zinc-800 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-medium text-white mt-8 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="leading-7 mb-6 text-[17px] text-zinc-300 font-sans" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-zinc-300" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 hover:underline underline-offset-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                    blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-2 border-blue-500 pl-6 py-2 italic text-zinc-400 text-lg my-8" {...props} />
                    ),
                    code: ({node, inline, className, children, ...props}: any) => {
                    if (inline) {
                        return (
                        <code className="bg-zinc-800/50 border border-zinc-800 px-1.5 py-0.5 rounded text-[0.9em] font-mono text-zinc-200" {...props}>
                            {children}
                        </code>
                        );
                    }
                    return (
                        <div className="my-8 rounded-lg overflow-hidden border border-border bg-[#0e0e10] shadow-sm">
                            <div className="flex items-center px-4 py-2 border-b border-border bg-[#18181b]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                                </div>
                            </div>
                            <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
                                <code {...props}>{children}</code>
                            </pre>
                        </div>
                    );
                    },
                    img: ({node, ...props}) => (
                        <div className="my-10">
                            <img className="rounded bg-zinc-900 border border-zinc-800 w-full" {...props} alt={props.alt} />
                            {props.alt && <span className="block text-center text-xs text-zinc-500 mt-3 font-mono">{props.alt}</span>}
                        </div>
                    ),
                }}
                >
                {content}
                </ReactMarkdown>
            </article>

            {/* Bottom Navigation / Next Steps */}
            <div className="mt-20 pt-10 border-t border-border">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-white font-serif text-lg mb-1">What's next for {BLOG_TITLE}?</h3>
                        <p className="text-sm text-zinc-500">See what we are building on our roadmap.</p>
                    </div>
                    <Link to="/" className="text-sm font-medium text-white hover:text-blue-400 flex items-center gap-2 transition-colors">
                        See our roadmap <ArrowLeft className="rotate-180" size={16} />
                    </Link>
                </div>
            </div>
        </main>

        {/* Right Sidebar - TOC */}
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 pl-6 border-l border-zinc-900">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <LinkIcon size={12} />
                    On This Page
                </h4>
                <ul className="space-y-3">
                    {mockTOC.map((item, idx) => (
                        <li key={idx}>
                            <a href={item.id} className="text-sm text-zinc-400 hover:text-white transition-colors block leading-snug">
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors block leading-snug">
                            Related Posts
                        </a>
                    </li>
                    <li className="pt-4 mt-4 border-t border-zinc-900">
                        <a href="#" className="text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors">
                            top of page
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

      </div>
    </div>
  );
};

export default PostView;