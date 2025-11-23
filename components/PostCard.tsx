import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="group block p-6 -mx-6 rounded-2xl hover:bg-surface transition-all duration-300 border border-transparent hover:border-border"
    >
      <div className="flex items-center gap-3 text-xs font-mono text-secondary mb-3">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>
      
      <h2 className="text-xl font-semibold mb-2 text-primary group-hover:text-blue-400 transition-colors">
        {post.title}
      </h2>
      
      <p className="text-secondary leading-relaxed mb-4 line-clamp-2">
        {post.summary}
      </p>

      <div className="flex items-center text-sm font-medium text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Read more <ArrowRight size={16} className="ml-1" />
      </div>
    </Link>
  );
};

export default PostCard;
