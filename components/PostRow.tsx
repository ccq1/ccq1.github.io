import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { UserCircle } from 'lucide-react';

interface PostRowProps {
  post: BlogPost;
}

const PostRow: React.FC<PostRowProps> = ({ post }) => {
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="group flex items-center justify-between py-4 px-2 -mx-2 rounded hover:bg-surfaceHover transition-colors border-b border-zinc-900/50 hover:border-transparent"
    >
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="flex-shrink-0">
             {/* Mock Avatar */}
            <UserCircle className="w-5 h-5 text-zinc-600" />
        </div>
        <h2 className="text-[15px] font-medium text-zinc-300 group-hover:text-white transition-colors truncate pr-4">
          {post.title}
        </h2>
      </div>
      
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
            {post.featured && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[4px] bg-zinc-800 border border-zinc-700 text-[10px] font-medium text-green-400 uppercase tracking-wider">
                    Featured
                </span>
            )}
            {post.category && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[4px] bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                    {post.category}
                </span>
            )}
        </div>
        <span className="text-xs font-mono text-zinc-500 w-24 text-right">{post.date}</span>
      </div>
    </Link>
  );
};

export default PostRow;