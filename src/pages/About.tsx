import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white">About Me</h1>
      <div className="prose prose-invert text-zinc-300 leading-relaxed space-y-6">
        <p>
          Hi, I&apos;m <strong>sByteman (ccq1)</strong> — a developer who enjoys building automation-first
          systems, local AI tooling, and opinionated development environments. This blog is my digital
          garden for experiments, notes, and long-running technical threads.
        </p>

        <p>
          My work sits at the intersection of infrastructure, networking, AI/LLM tooling, and modern
          frontend development. I care a lot about reproducible environments, clean abstractions,
          and tools that not only work, but feel good to use. You&apos;ll see posts here about Linux /
          WSL2 setups, Dockerized workflows, proxy / routing tricks, local LLM stacks, and the React +
          TypeScript frontends that tie everything together.
        </p>

        <p>
          I treat developer experience as a product: configuration, scripts, UI, and documentation
          are all part of the same system. This space is where I document what I&apos;m learning, break
          things on purpose, and occasionally turn prototypes into reusable tooling.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Tech Stack & Focus</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>React &amp; TypeScript</li>
          <li>Tailwind CSS &amp; modern frontend tooling (Vite)</li>
          <li>Linux / WSL2 &amp; development environment engineering</li>
          <li>Docker &amp; containerized workflows</li>
          <li>Networking &amp; proxy tooling (iptables, FRP, MITMProxy, Clash)</li>
          <li>Local LLM / AI tooling (vLLM, CLI agents, automation)</li>
          <li>GitHub Pages &amp; GitHub Actions for deployment</li>
        </ul>

        <div className="mt-12 p-6 bg-surface border border-border rounded-xl">
          <h3 className="text-lg font-medium text-white mb-2">Connect</h3>
          <p className="text-zinc-400 text-sm">
            If you&apos;re interested in local LLM tooling, infra, networking tricks, or dev-env
            engineering, feel free to drop by my GitHub and explore what I&apos;m building:
            <br />
            <a
              href="https://github.com/ccq1"
              className="text-sky-400 hover:text-sky-300 underline"
              target="_blank"
              rel="noreferrer"
            >
              github.com/ccq1
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
