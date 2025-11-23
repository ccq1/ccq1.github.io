import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { UserCircle } from 'lucide-react';

interface FeaturedCardProps {
  post: BlogPost;
  size?: 'large' | 'small';
  showNewestBadge?: boolean;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ post, size = 'large', showNewestBadge = false }) => {
  const isSmall = size === 'small';
  
  return (
    <Link 
      to={`/blog/${post.slug}`} 
      className="group w-full cursor-pointer flex flex-col rounded-sm border border-[#dbe8f9] dark:border-[#1d222b] hover:border-blue-300/50 dark:hover:border-blue-300/30 [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_70%,_0.05)_0_-2px_0_0_inset] hover:[box-shadow:8px_8px_0px_0px_rgba(59,130,246,0.1),_hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:hover:[box-shadow:8px_8px_0px_0px_rgba(59,130,246,0.05),_hsl(218,_13%,_70%,_0.05)_0_-2px_0_0_inset] lg:active:translate-y-px lg:active:scale-[.99] transition-all"
    >
      {/* Image Section with diagonal stripe pattern background */}
      <div className={`relative w-full dark:bg-zinc-800/5 bg-white/60 flex items-center justify-center ${isSmall ? 'p-5' : 'p-8'}`}>
        {/* SVG Diagonal Stripe Pattern Background */}
        <svg className="pointer-events-none absolute inset-0 size-full select-none text-blue-300 dark:text-blue-400/10">
          <defs>
            <pattern id={`diagonal-stripes-${post.id}`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5"></line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#diagonal-stripes-${post.id})`}></rect>
        </svg>
        
        {/* Image Container with fixed aspect ratio */}
        <div className="relative w-full aspect-video flex items-center justify-center">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title}
              loading="lazy"
              width="3840"
              height="2160"
              decoding="async"
              className="w-[90%] h-[90%] rounded-xs object-cover shadow-lg border border-transparent dark:border-transparent"
              style={{ color: 'transparent' }}
            />
          ) : (
            <div className="w-[90%] h-[90%] rounded-xs bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shadow-lg border border-transparent dark:border-transparent">
              <span className={`text-zinc-700 font-mono ${isSmall ? 'text-2xl' : 'text-4xl'}`}>./src</span>
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-transparent dark:bg-transparent"></div>

      {/* Content Section */}
      <div className={`shrink-0 ${isSmall ? 'p-2.5 h-[130px]' : 'p-3.5 h-[145px]'} flex flex-col gap-1 bg-amber-50/20 dark:bg-zinc-950/40 backdrop-blur-sm`}>
        <h2 className={`truncate ${isSmall ? 'text-[0.8125rem]' : 'text-[0.9375rem]'} text-zinc-900 dark:text-zinc-100`}>
          {post.title}
        </h2>
        
        <p className={`${isSmall ? 'text-xs h-[2.4rem]' : 'text-sm h-[2.8rem]'} leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2 overflow-hidden`}>
          {post.summary}
        </p>

        <div className={`mt-auto flex items-center gap-2 ${isSmall ? 'pt-1.5' : 'pt-2'} justify-between`}>
          <div className="flex items-center gap-2.5">
            <UserCircle className={`${isSmall ? 'size-4' : 'size-5'} shrink-0 text-zinc-500`} />
            <p className={`text-sm text-nowrap truncate font-mono text-[0.625rem] leading-5 ${isSmall ? 'hidden sm:block' : ''}`}>{post.author}</p>
          </div>
          <div className="flex h-5 items-baseline gap-2">
            <p className="text-sm text-zinc-600 dark:text-zinc-500 font-mono text-[0.625rem] leading-5">{post.date}</p>
            {showNewestBadge && !isSmall && (
              <div className="rounded-xs h-[18px] px-1 pt-px w-fit flex items-center gap-1.5 shrink-0 border font-mono text-[0.625rem] leading-6 border-blue-300 bg-blue-200/10 text-blue-800 dark:border-blue-400/15 dark:bg-blue-800/5 dark:text-blue-200">
                Newest
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;