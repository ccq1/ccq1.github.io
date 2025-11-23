import React from 'react';

interface DividerProps {
  patternId?: string;
}

const Divider: React.FC<DividerProps> = ({ patternId = 'divider-pattern' }) => {
  return (
    <section 
      className="relative h-4 w-full bg-white/60 dark:bg-zinc-800/5 before:absolute before:top-0 before:-left-[100vw] before:w-[200vw] before:h-px before:bg-[#dbe8f9] dark:before:bg-[#1d222b] after:absolute after:bottom-0 after:-left-[100vw] after:w-[200vw] after:h-px after:bg-[#dbe8f9] dark:after:bg-[#1d222b] transition-colors overflow-visible"
    >
      {/* Top-left corner diamond */}
      <div 
        style={{ top: '-3.5px', left: '-4.5px' }} 
        className="absolute z-10 size-2 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
      ></div>
      
      {/* Top-right corner diamond */}
      <div 
        style={{ top: '-3.5px', right: '-4.5px' }} 
        className="absolute z-10 size-2 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
      ></div>
      
      {/* Bottom-left corner diamond */}
      <div 
        style={{ bottom: '-3.5px', left: '-4.5px' }} 
        className="absolute z-10 size-2 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
      ></div>
      
      {/* Bottom-right corner diamond */}
      <div 
        style={{ bottom: '-3.5px', right: '-4.5px' }} 
        className="absolute z-10 size-2 rotate-45 rounded-[1px] border border-[#dbe8f9] dark:border-[#1d222b] bg-white dark:bg-black"
      ></div>
      
      {/* Diagonal stripe pattern background */}
      <svg 
        className="pointer-events-none absolute inset-0 z-0 size-full select-none text-blue-300 dark:text-blue-400/10 py-[1px] !opacity-30 dark:!opacity-60"
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
    </section>
  );
};

export default Divider;

