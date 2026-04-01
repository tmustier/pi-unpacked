'use client';

import { PI_VERSION, PI_REPO, PI_SITE } from '@/data/pi-data';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Grid background */}
      <div className="grid-bg absolute inset-0" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,var(--accent-dim)_0%,transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Version badge */}
        <div className="tag tag-accent mb-8 text-xs tracking-wider font-mono">
          v{PI_VERSION}
        </div>

        {/* Logo */}
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter mb-6"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-primary)' }}
        >
          pi
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium mb-2 tracking-wide uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}>
          unpacked
        </p>

        {/* Tagline */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mt-6 mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          What actually happens when you type a message into pi?
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          The agent loop, 7 built-in tools, 56+ extensions, and the full extensibility surface, mapped straight from the source.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 mb-16">
          <a
            href={PI_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: 'var(--accent)',
              color: 'white',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            pi.dev
          </a>
          <a
            href={PI_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Start exploring arrow */}
        <a
          href="#agent-loop"
          className="flex flex-col items-center gap-2 group transition-all"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
        >
          <span className="text-sm font-medium tracking-wide">Start exploring</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
