import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BLOG_TITLE, NAV_LINKS, GITHUB_URL } from '../constants';
import { Github, Search, Command } from 'lucide-react';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 监听 Cmd+K / Ctrl+K 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="flex w-full">
      {/* Left section - 2.5% */}
      <div className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-r border-[#dbe8f9] dark:border-[#1d222b] transition-colors"></div>
      
      {/* Middle section - 95% with header content */}
      <div className="w-[95%] bg-[#f7f7f3] dark:bg-[#121418] backdrop-blur-sm transition-colors relative">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-bold text-xl tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white font-mono">
              Z
            </div>
            {BLOG_TITLE}
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${
                  location.pathname === link.path ? 'text-zinc-900 dark:text-white font-medium' : 'text-zinc-500 dark:text-secondary hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-surface border border-zinc-300 dark:border-border rounded text-xs text-zinc-500 dark:text-secondary hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group"
          >
            <Search size={14} />
            <span>Search...</span>
            <div className="flex items-center gap-0.5 ml-2 text-[10px] text-zinc-500 group-hover:text-zinc-400">
                <Command size={10} />
                <span>K</span>
            </div>
          </button>
          
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 dark:text-secondary hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
        </div>
      </div>
      
      {/* Right section - 2.5% */}
      <div className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-l border-[#dbe8f9] dark:border-[#1d222b] transition-colors"></div>
      </div>
      
      {/* Bottom Divider - Full width */}
      <div className="w-full relative h-0">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#dbe8f9] dark:bg-[#1d222b] z-10"></div>
        {/* Left diamond - positioned at 2.5% */}
        <div 
          style={{ bottom: '-4px', left: 'calc(2.5% - 5px)' }} 
          className="absolute z-20 size-2.5 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
        ></div>
        {/* Right diamond - positioned at 97.5% */}
        <div 
          style={{ bottom: '-4px', right: 'calc(2.5% - 5px)' }} 
          className="absolute z-20 size-2.5 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
        ></div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;