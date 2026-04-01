'use client';

import { useState } from 'react';
import { commands, type CommandInfo } from '@/data/pi-data';

const CATEGORIES = [
  'All',
  'Session',
  'Model & Provider',
  'Sharing',
  'Context',
  'Configuration',
  'Auth',
  'Info',
] as const;

type Category = (typeof CATEGORIES)[number];

function countByCategory(cat: Category): number {
  if (cat === 'All') return commands.length;
  return commands.filter((c) => c.category === cat).length;
}

function categoryColor(cat: string): string {
  switch (cat) {
    case 'Session':
      return 'tag-accent';
    case 'Model & Provider':
      return 'tag-blue';
    case 'Sharing':
      return 'tag-green';
    case 'Context':
      return 'tag-yellow';
    case 'Configuration':
      return 'tag-orange';
    case 'Auth':
      return 'tag-red';
    case 'Info':
      return 'tag-cyan';
    default:
      return 'tag-accent';
  }
}

function CommandCard({ cmd }: { cmd: CommandInfo }) {
  return (
    <a
      href={cmd.sourceLink}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-interactive flex items-start gap-4 p-4"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <code
            className="text-[var(--text-primary)] font-semibold text-sm"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            {cmd.name}
          </code>
          <span className={`tag ${categoryColor(cmd.category)}`}>
            {cmd.category}
          </span>
        </div>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          {cmd.description}
        </p>
      </div>
      <span className="source-link shrink-0 mt-0.5">↗ source</span>
    </a>
  );
}

export default function CommandCatalog() {
  const [active, setActive] = useState<Category>('All');

  const filtered =
    active === 'All'
      ? commands
      : commands.filter((c) => c.category === active);

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="section-header mb-3">Commands</p>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
          Command Catalog
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
          Every slash command available in pi, sorted by what it does.
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

      {/* Command grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((cmd) => (
          <CommandCard key={cmd.name} cmd={cmd} />
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-[var(--text-muted)] text-sm">
        Extensions can register additional commands via{' '}
        <code className="code-inline">registerCommand()</code>. See the{' '}
        <a
          href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/commands.ts"
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
          style={{ fontSize: 'inherit' }}
        >
          commands example
        </a>
        .
      </p>
    </div>
  );
}
