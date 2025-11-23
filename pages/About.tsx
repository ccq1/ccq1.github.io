import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">About Me</h1>
      <div className="prose prose-invert text-zinc-300 leading-relaxed space-y-6">
        <p>
          Hello! I'm a software engineer passionate about building high-performance web applications.
          This blog acts as a digital garden for my thoughts, tutorials, and experiments.
        </p>
        <p>
          I specialize in React, TypeScript, and modern frontend tooling. I believe in minimalism, 
          type safety, and user-centric design.
        </p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Tech Stack</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>React 18</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Vite</li>
          <li>GitHub Pages</li>
        </ul>
        
        <div className="mt-12 p-6 bg-surface border border-border rounded-xl">
          <h3 className="text-lg font-medium text-white mb-2">Connect</h3>
          <p className="text-zinc-400 text-sm">
            Feel free to reach out on Twitter or check my code on GitHub.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
