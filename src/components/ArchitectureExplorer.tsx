'use client';

import { useState } from 'react';
import { packages, PI_REPO } from '@/data/pi-data';

function FileCountBar({ count, max }: { count: number; max: number }) {
  const pct = Math.max(4, (count / max) * 100);
  return (
    <div className="h-1.5 w-full rounded-full" style={{ background: 'var(--bg-primary)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, var(--accent), var(--accent-hover))`,
        }}
      />
    </div>
  );
}

function DirectoryRow({ name, description, fileCount }: { name: string; description: string; fileCount: number }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: 'var(--yellow)' }}>
        <path d="M1.5 2.5h4.25l1.5 1.5h7.25v9.5h-13z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
      <code className="text-xs shrink-0" style={{ color: 'var(--text-primary)' }}>{name}</code>
      <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{description}</span>
      <span className="ml-auto text-xs font-mono shrink-0 tag tag-accent">{fileCount}</span>
    </div>
  );
}

function PackageCard({ pkg, maxFiles }: { pkg: typeof packages[0]; maxFiles: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`card card-interactive p-5 flex flex-col gap-3 ${expanded ? 'col-span-1 md:col-span-2' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: 'var(--accent)' }}>
            <rect x="1" y="3" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M4.5 3V1.5h7V3" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          <code className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{pkg.name}</code>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="tag tag-accent text-xs font-mono">{pkg.fileCount} files</span>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="transition-transform duration-200"
            style={{ color: 'var(--text-muted)', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pkg.description}</p>

      {/* File count bar */}
      <FileCountBar count={pkg.fileCount} max={maxFiles} />

      {/* Expanded: directories */}
      <div className={`expandable ${expanded ? 'open' : ''}`}>
        <div className="flex flex-col gap-1.5 mt-2">
          {pkg.directories.map((dir) => (
            <DirectoryRow key={dir.name} name={dir.name} description={dir.description} fileCount={dir.fileCount} />
          ))}
        </div>
        <a
          href={pkg.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link mt-3 inline-flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          {pkg.path}/src
        </a>
      </div>
    </div>
  );
}

export default function ArchitectureExplorer() {
  const maxFiles = Math.max(...packages.map((p) => p.fileCount));
  const totalFiles = packages.reduce((sum, p) => sum + p.fileCount, 0);

  return (
    <div>
      {/* Section header */}
      <div className="mb-10">
        <p className="section-header mb-3">Source Map</p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Architecture Explorer
        </h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Click around the source tree to explore what&apos;s inside.
        </p>
      </div>

      {/* Root node */}
      <div className="mb-6">
        <div className="card inline-flex items-center gap-3 px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--yellow)' }}>
            <path d="M1.5 2.5h4.25l1.5 1.5h7.25v9.5h-13z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
          <code className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>packages/</code>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {packages.length} packages &middot; {totalFiles} source files
          </span>
          <a
            href={`${PI_REPO}/tree/main/packages`}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link ml-2 inline-flex items-center gap-1"
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M3.5 1.5h7v7M10.5 1.5l-9 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Connector line */}
        <div className="ml-5 w-0.5 h-4" style={{ background: 'var(--border)' }} />
      </div>

      {/* Package grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} maxFiles={maxFiles} />
        ))}
      </div>
    </div>
  );
}
