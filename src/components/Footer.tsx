import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 mt-12 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 text-center text-secondary text-sm">
        <p>© {new Date().getFullYear()} ccq1 Dev. Built with React & Tailwind.</p>
        <p className="mt-2 text-xs text-zinc-600 font-mono">
          Deployed on GitHub Pages
        </p>
      </div>
    </footer>
  );
};

export default Footer;
