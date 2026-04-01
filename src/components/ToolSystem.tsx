'use client';

import { useState } from 'react';
import { tools } from '@/data/pi-data';

const CATEGORIES = ['All', 'File System', 'Execution', 'Search'] as const;

const CATEGORY_TAG: Record<string, string> = {
  'File System': 'tag-green',
  Execution: 'tag-orange',
  Search: 'tag-blue',
};

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card card-interactive p-5" onClick={() => setExpanded(!expanded)}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)' }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--accent)' }}>
              <path
                d="M14.5 2.5L6.5 10.5l-3-3M1.5 8.5v5h13v-5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <code className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            {tool.name}
          </code>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`tag ${CATEGORY_TAG[tool.category] ?? 'tag-accent'}`}>{tool.category}</span>
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
      <p className="text-sm leading-relaxed mb-1" style={{ color: 'var(--text-secondary)' }}>
        {tool.description}
      </p>

      {/* Prompt snippet */}
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Prompt: <span className="code-inline">{tool.promptSnippet}</span>
      </p>

      {/* Expanded: parameters + source */}
      <div className={`expandable ${expanded ? 'open' : ''}`}>
        <div className="mt-4 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="px-4 py-2" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Parameters
            </span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--bg-primary)' }}>
                <th className="text-left px-4 py-2 font-medium" style={{ color: 'var(--text-muted)' }}>Name</th>
                <th className="text-left px-4 py-2 font-medium" style={{ color: 'var(--text-muted)' }}>Type</th>
                <th className="text-left px-4 py-2 font-medium" style={{ color: 'var(--text-muted)' }}>Required</th>
                <th className="text-left px-4 py-2 font-medium" style={{ color: 'var(--text-muted)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {tool.parameters.map((param) => (
                <tr
                  key={param.name}
                  className="border-t"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="px-4 py-2">
                    <code style={{ color: 'var(--accent)' }}>{param.name}</code>
                  </td>
                  <td className="px-4 py-2">
                    <code style={{ color: 'var(--yellow)' }}>{param.type}</code>
                  </td>
                  <td className="px-4 py-2">
                    {param.required ? (
                      <span className="tag tag-green" style={{ fontSize: '0.65rem' }}>required</span>
                    ) : (
                      <span className="tag" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', borderColor: 'var(--border)', background: 'transparent' }}>optional</span>
                    )}
                  </td>
                  <td className="px-4 py-2" style={{ color: 'var(--text-secondary)' }}>
                    {param.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Source link */}
        <div className="mt-3 flex items-center justify-between">
          <a
            href={tool.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link inline-flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {tool.sourceFile}
          </a>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {tool.parameters.length} param{tool.parameters.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ToolSystem() {
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? tools : tools.filter((t) => t.category === filter);
  const countByCategory = tools.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Section header */}
      <div className="mb-8">
        <p className="section-header mb-3">Built-in Tools</p>
        <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Tool System
        </h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Every built-in tool pi can call, sorted by what it does.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
            <span className="ml-1.5 opacity-60">
              {cat === 'All' ? tools.length : countByCategory[cat] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Subtitle */}
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
        Click a tool to see parameters and source code
      </p>

      {/* Tool cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 card px-5 py-4 flex items-start gap-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: 'var(--cyan)' }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 4.5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Extensions can register unlimited additional tools via{' '}
          <code className="code-inline">registerTool()</code>. See the{' '}
          <a
            href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/tools.ts"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            style={{ color: 'var(--accent)', fontSize: 'inherit' }}
          >
            tools example
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/examples/extensions/dynamic-tools.ts"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            style={{ color: 'var(--accent)', fontSize: 'inherit' }}
          >
            dynamic-tools example
          </a>.
        </p>
      </div>
    </div>
  );
}
