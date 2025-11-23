import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { posts } from '../services/postsLoader';
import PostRow from '../components/PostRow';
import FeaturedCard from '../components/FeaturedCard';
import Divider from '../components/Divider';
import { ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'featured', label: 'Latest' },
  { id: 'Tutorials', label: 'Tutorials' },
  { id: 'Projects', label: 'Projects' },
  { id: 'Thoughts', label: 'Thoughts' },
  { id: 'Snippets', label: 'Snippets' },
];

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // 调试信息
  console.log('🏠 Home 组件加载');
  console.log('📦 导入的 posts 数量:', posts.length);
  console.log('📋 posts 内容:', posts);

  // 按日期排序文章（最新的在前）
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Logic for featured section - 显示最新的5篇文章
  const featuredPosts = sortedPosts.slice(0, 2); // 最新的2篇 - 大卡片
  const remainingFeatured = sortedPosts.slice(2, 5); // 第3-5篇 - 小卡片

  // Logic for bottom list
  const filteredPosts = sortedPosts.filter(post => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'featured') return sortedPosts.slice(0, 5).includes(post);
    return post.category === activeCategory;
  });

  return (
    <div className="flex w-full min-h-screen">
      {/* Section 1: Left side - 2.5% */}
      <section className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-r border-[#dbe8f9] dark:border-[#1d222b] transition-colors">
      </section>

      {/* Section 2: Main content - 95% */}
      <section className="w-[95%] bg-[#fafaf7] dark:bg-[#131418] transition-colors pb-20">
      
      {/* Page Header with Specific SVG Background */}
      <div className="relative w-full pt-20 pb-16 overflow-hidden bg-[#f7f7f3] dark:bg-[#121418] z-10">
         {/* The specific SVG Background requested */}
         <svg 
            aria-hidden="true" 
            className="pointer-events-none absolute inset-0 z-0 size-full fill-blue-500/50 stroke-blue-500/50 opacity-30"
            style={{ maskImage: 'linear-gradient(to top, #ffffffad, transparent)' }}
        >
            <defs>
                <pattern id=":S1:" width="12" height="12" patternUnits="userSpaceOnUse" x="-1" y="-1">
                    <path d="M.5 12V.5H12" fill="none" strokeDasharray="0"></path>
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#:S1:)"></rect>
        </svg>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-blue-100 mb-4 tracking-tight">From The Blog</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light">Keep up with news about development.</p>
        </div>
      </div>

      {/* Divider - Full width */}
      <div className="w-full">
        <Divider patternId="divider-1" />
      </div>

      {/* Top Featured Section */}
      <AnimatePresence>
        {activeCategory === 'all' && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10"
          >
            {/* Top 2 large cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FeaturedCard post={post} size="large" showNewestBadge={index === 0} />
                    </motion.div>
                ))}
            </div>
            {/* Bottom 3 smaller cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {remainingFeatured.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      <FeaturedCard post={post} size="small" />
                    </motion.div>
                ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Divider - Full width */}
      <AnimatePresence>
        {activeCategory === 'all' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Divider patternId="divider-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content: Sidebar + List */}
      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Sidebar - Navigation */}
            <aside className="md:col-span-3 lg:col-span-2">
            <div className="sticky top-24">
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4 px-2">
                Categories
                </h3>
                <nav className="space-y-0.5">
                {CATEGORIES.map(cat => (
                    <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors flex items-center justify-between group ${
                        activeCategory === cat.id 
                        ? 'bg-blue-500/10 text-blue-400 font-medium' 
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                    >
                    {cat.label}
                    {activeCategory === cat.id && <ChevronRight size={14} />}
                    </button>
                ))}
                </nav>
            </div>
            </aside>

            {/* Right Column - Post List */}
            <div className="md:col-span-9 lg:col-span-10">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.01, ease: "easeInOut" }}
                    className="flex flex-col space-y-2"
                  >
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.05,
                            ease: "easeOut" 
                          }}
                        >
                          <PostRow post={post} />
                        </motion.div>
                        ))
                    ) : (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-12 text-center text-zinc-500 font-mono text-sm"
                        >
                            ./no_posts_found
                        </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
            </div>
        </div>
      </div>
      </section>

      {/* Section 3: Right side - 2.5% */}
      <section className="w-[2.5%] bg-[#f3f3ed] dark:bg-[#111216] border-l border-[#dbe8f9] dark:border-[#1d222b] transition-colors">
      </section>
    </div>
  );
};

export default Home;