import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BLOG_TITLE, NAV_LINKS, GITHUB_URL } from '../constants';
import { Github, Search, Command, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // 从 localStorage 读取初始状态
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    // 如果没有保存的状态，检查系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 初始化深色模式
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 切换深色模式
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('darkMode', String(newIsDark));
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
          {/* 搜索按钮 - 桌面端显示 */}
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
          
          {/* GitHub 链接 - 桌面端显示 */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-zinc-500 dark:text-secondary hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>

          {/* 汉堡菜单按钮 - 移动端显示 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex md:hidden size-[32px] rounded-sm items-center justify-center border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
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

      {/* 移动端菜单背景遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 移动端菜单 - 从底部弹出 */}
      {isMobileMenuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slideUp">
          <div className="bg-[#f7f7f3] dark:bg-[#121418] border-t border-[#dbe8f9] dark:border-[#1d222b] rounded-t-lg shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="px-6 py-4">
              {/* 导航链接 */}
              <nav className="flex flex-col gap-1 mb-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                      location.pathname === link.path 
                        ? 'text-zinc-900 dark:text-white font-medium bg-zinc-100 dark:bg-zinc-800' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <hr className="my-3 border-[#dbe8f9] dark:border-[#1d222b]" />

              {/* 搜索和 GitHub */}
              <div className="flex flex-col gap-2 mb-4">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-sm text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Search size={16} />
                  <span>Search...</span>
                </button>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-sm transition-colors"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </div>

              {/* 深色模式切换按钮 */}
              <button
                onClick={toggleDarkMode}
                className="w-full px-3 h-9 mb-3 text-sm text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-400/20 bg-zinc-50/60 dark:bg-zinc-300/5 hover:bg-zinc-100/50 dark:hover:bg-zinc-200/10 rounded-sm transition-colors [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_70%,_0.08)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none]"
              >
                {isDark ? 'Turn Light Mode On' : 'Turn Dark Mode On'}
              </button>

              {/* 关闭按钮 */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-3 py-2.5 mb-4 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-sm transition-colors"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;