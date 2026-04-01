'use client';

import { useState } from 'react';
import { extensions, type ExtensionInfo } from '@/data/pi-data';

const CATEGORIES = [
  'All',
  'UI & Appearance',
  'Tools & Capabilities',
  'Commands & Input',
  'Session & Workflow',
  'Safety & Guards',
  'Context & Providers',
  'Multi-Agent & Advanced',
  'Fun & Demo',
  'Events & Lifecycle',
] as const;

type Category = (typeof CATEGORIES)[number];

const NOTABLE = new Set([
  'doom-overlay',
  'plan-mode',
  'subagent',
  'sandbox',
  'permission-gate',
  'ssh',
  'custom-compaction',
  'modal-editor',
]);

function countByCategory(cat: Category): number {
  if (cat === 'All') return extensions.length;
  return extensions.filter((e) => e.category === cat).length;
}

function categoryColor(cat: string): string {
  switch (cat) {
    case 'UI & Appearance':
      return 'tag-accent';
    case 'Tools & Capabilities':
      return 'tag-green';
    case 'Commands & Input':
      return 'tag-blue';
    case 'Session & Workflow':
      return 'tag-yellow';
    case 'Safety & Guards':
      return 'tag-red';
    case 'Context & Providers':
      return 'tag-orange';
    case 'Multi-Agent & Advanced':
      return 'tag-cyan';
    case 'Fun & Demo':
      return 'tag-accent';
    case 'Events & Lifecycle':
      return 'tag-blue';
    default:
      return 'tag-accent';
  }
}

function ExtensionCard({ ext }: { ext: ExtensionInfo }) {
  const isNotable = NOTABLE.has(ext.name);

  return (
    <a
      href={ext.sourceLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`card card-interactive flex flex-col p-4 ${
        isNotable ? 'border-[var(--accent)]' : ''
      }`}
      style={
        isNotable
          ? { boxShadow: '0 0 0 1px var(--accent-dim), 0 2px 12px rgba(124, 107, 245, 0.08)' }
          : undefined
      }
    >
      <div className="flex items-center gap-2 mb-2">
        {ext.isDirectory && (
          <span
            className="text-[var(--text-muted)] text-xs"
            title="Multi-file extension (directory)"
          >
            📁
          </span>
        )}
        <code
          className="text-[var(--text-primary)] font-semibold text-sm"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
          {ext.name}
        </code>
        {isNotable && (
          <span className="tag tag-accent text-[0.65rem] py-0 px-1.5 leading-4">
            notable
          </span>
        )}
      </div>

      <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-3">
        {ext.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`tag ${categoryColor(ext.category)}`}>
          {ext.category}
        </span>
        <span className="source-link">↗ source</span>
      </div>
    </a>
  );
}

export default function ExtensionGallery() {
  const [active, setActive] = useState<Category>('All');

  const filtered =
    active === 'All'
      ? extensions
      : extensions.filter((e) => e.category === active);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="section-header mb-3">Extensions</p>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
          Extension Gallery
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
          {extensions.length}+ example extensions. Features other agents bake
          in, you can build yourself.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`filter-pill ${active === cat ? 'active' : ''}`}
          >
            {cat}
            <span className="ml-1.5 opacity-60">{countByCategory(cat)}</span>
          </button>
        ))}
      </div>

      {/* Extension grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((ext) => (
          <ExtensionCard key={ext.name} ext={ext} />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 card p-5">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          <strong className="text-[var(--text-primary)]">Build your own.</strong>{' '}
          Extensions are TypeScript modules with access to tools, commands,
          keyboard shortcuts, events, and the full TUI. Start from{' '}
          <a
            href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/hello.ts"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            style={{ fontSize: 'inherit' }}
          >
            hello.ts
          </a>{' '}
          or read the{' '}
          <a
            href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            style={{ fontSize: 'inherit' }}
          >
            extension docs
          </a>
          . Bundle as a{' '}
          <a
            href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            style={{ fontSize: 'inherit' }}
          >
            pi package
          </a>{' '}
          and share via npm or git.
        </p>
      </div>
    </div>
  );
}
