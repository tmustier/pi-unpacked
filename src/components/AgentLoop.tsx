"use client";

import { useState } from "react";
import { agentLoopSteps } from "@/data/pi-data";

export default function AgentLoop() {
  const [activeStep, setActiveStep] = useState(0);
  const step = agentLoopSteps[activeStep];

  return (
    <div>
      {/* Section header */}
      <div className="section-number">
        <span>01</span>
      </div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        The Agent Loop
      </h2>
      <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>
        From keypress to rendered response, step by step through the source.
      </p>

      {/* Horizontal timeline */}
      <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto pb-2">
        {agentLoopSteps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            {/* Circle */}
            <button
              onClick={() => setActiveStep(i)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all"
                style={{
                  border: activeStep === i ? "2px solid var(--accent)" : "1px solid var(--border)",
                  background: activeStep === i ? "var(--accent-dim)" : "transparent",
                  color: activeStep === i ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-[0.65rem] font-medium whitespace-nowrap transition-colors"
                style={{
                  color: activeStep === i ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {s.title.split(" ")[0]}
              </span>
            </button>
            {/* Connector line */}
            {i < agentLoopSteps.length - 1 && (
              <div
                className="w-6 sm:w-10 h-px mx-1"
                style={{
                  background: i < activeStep ? "var(--accent-border)" : "var(--border)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {step.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {step.description}
            </p>
          </div>
          <a
            href={step.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link shrink-0"
          >
            {step.sourceFile}
          </a>
        </div>

        <ul className="space-y-2">
          {step.details.map((detail, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <span
                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
