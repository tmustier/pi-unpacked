"use client";

import { providers } from "@/data/pi-data";

const FEATURED = new Set(["Anthropic", "OpenAI", "Google Gemini", "Amazon Bedrock", "Azure OpenAI"]);

export default function ProviderSystem() {
  return (
    <div>
      <div className="section-number"><span>06</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Provider System
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        15+ providers, hundreds of models. Switch mid-session with Ctrl+L.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {providers.map((p) => (
          <a
            key={p.name}
            href={p.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interactive p-4 block"
            style={FEATURED.has(p.name) ? { borderColor: "var(--accent-border)" } : {}}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{p.name}</span>
              <span className="text-[0.6rem] font-mono" style={{ color: "var(--text-muted)" }}>{p.authMethod}</span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
