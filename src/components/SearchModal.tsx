import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { posts } from '../services/postsLoader';
import { Search, ArrowRight, X } from 'lucide-react';
import { BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // 配置 Fuse.js
  const fuse = new Fuse(posts, {
    keys: ['title', 'summary', 'author', 'category', 'tags'],
    threshold: 0.3,
    includeScore: true,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = fuse.search(query);
    setResults(searchResults.map(result => result.item));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigate(`/blog/${results[selectedIndex].slug}`);
      onClose();
      setQuery('');
    }
  };

  const handleResultClick = (slug: string) => {
    navigate(`/blog/${slug}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <Search size={20} className="text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="搜索文章..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
              没有找到相关文章
            </div>
          )}
          
          {results.map((post, index) => (
            <div
              key={post.id}
              onClick={() => handleResultClick(post.slug)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-50 dark:bg-blue-900/10'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {post.date}
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-zinc-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {query && results.length > 0 && (
          <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">↓</kbd>
                导航
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Enter</kbd>
                选择
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Esc</kbd>
              关闭
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;

