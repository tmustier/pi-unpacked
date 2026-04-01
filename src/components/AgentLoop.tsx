'use client';

import { useState } from 'react';
import { agentLoopSteps } from '@/data/pi-data';

export default function AgentLoop() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <div className="py-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <p className="section-header mb-3">Architecture</p>
        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          The Agent Loop
        </h2>
        <p
          className="text-base sm:text-lg mb-14"
          style={{ color: 'var(--text-secondary)' }}
        >
          From keypress to rendered response, step by step through the source.
        </p>

        {/* Steps */}
        <div className="flex flex-col">
          {agentLoopSteps.map((step, index) => {
            const isExpanded = expandedStep === step.id;
            const isLast = index === agentLoopSteps.length - 1;

            return (
              <div key={step.id} className={`relative ${!isLast ? 'flow-connector' : ''}`}>
                {/* Step card */}
                <div
                  className={`card card-interactive p-5 ${isExpanded ? '' : ''}`}
                  style={isExpanded ? { borderColor: 'var(--accent)', boxShadow: '0 0 0 1px var(--accent-dim), 0 4px 20px rgba(0,0,0,0.3)' } : {}}
                  onClick={() => toggle(step.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(step.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Step number */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                      style={{
                        background: 'var(--accent-dim)',
                        color: 'var(--accent)',
                        border: '1px solid var(--accent-dim)',
                      }}
                    >
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h3
                          className="text-base font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {step.title}
                        </h3>

                        {/* Expand indicator */}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 transition-transform duration-200"
                          style={{
                            color: 'var(--text-muted)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {step.description}
                      </p>

                      {/* Source link */}
                      <a
                        href={step.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-link inline-block mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {step.sourceFile}
                      </a>

                      {/* Expandable details */}
                      <div className={`expandable ${isExpanded ? 'open' : ''}`}>
                        <ul className="mt-4 space-y-2">
                          {step.details.map((detail, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm leading-relaxed"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              <span
                                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                                style={{ background: 'var(--accent)' }}
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector line between steps */}
                {!isLast && (
                  <div className="flex justify-start ml-[19px]">
                    <div
                      className="w-0.5 h-6"
                      style={{
                        background: 'linear-gradient(to bottom, var(--accent), transparent)',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
