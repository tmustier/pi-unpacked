"use client";

import { useState } from "react";
import { providers, type ProviderInfo } from "@/data/pi-data";

const AUTH_TAG_COLOR: Record<string, string> = {
  "ANTHROPIC_API_KEY": "tag-accent",
  "OPENAI_API_KEY": "tag-green",
  "GOOGLE_API_KEY": "tag-blue",
  "GCP credentials": "tag-blue",
  "AZURE_OPENAI_API_KEY": "tag-cyan",
  "AWS credentials": "tag-orange",
  "MISTRAL_API_KEY": "tag-yellow",
  "OAuth / gcloud": "tag-blue",
  "GitHub token": "tag-accent",
  "GROQ_API_KEY": "tag-green",
  "CEREBRAS_API_KEY": "tag-green",
  "XAI_API_KEY": "tag-red",
  "OPENROUTER_API_KEY": "tag-yellow",
  "Local (no key)": "tag-cyan",
};

/** First-party providers with dedicated source files get a subtle highlight. */
const FEATURED = new Set([
  "Anthropic",
  "OpenAI",
  "Google Gemini",
  "Amazon Bedrock",
  "Azure OpenAI",
]);

function ProviderCard({ provider }: { provider: ProviderInfo }) {
  const isFeatured = FEATURED.has(provider.name);
  const tagClass = AUTH_TAG_COLOR[provider.authMethod] ?? "tag-accent";

  return (
    <a
      href={provider.sourceLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`card card-interactive flex flex-col gap-3 p-5 no-underline ${
        isFeatured ? "ring-1 ring-[var(--accent-dim)]" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {provider.name}
        </h3>
        {isFeatured && (
          <span className="shrink-0 text-[0.6rem] font-medium uppercase tracking-widest text-[var(--accent)]">
            1st party
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
        {provider.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <span className={`tag ${tagClass}`}>
          <code className="text-[0.65rem]">{provider.authMethod}</code>
        </span>
        {provider.sourceFile !== "—" && (
          <span className="source-link truncate">{provider.sourceFile}</span>
        )}
      </div>
    </a>
  );
}

export default function ProviderSystem() {
  const [showAll, setShowAll] = useState(false);

  const featured = providers.filter((p) => FEATURED.has(p.name));
  const rest = providers.filter((p) => !FEATURED.has(p.name));
  const visible = showAll ? providers : featured;

  return (
    <div>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <span className="section-header">Provider System</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            15+ providers, hundreds of models
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--text-secondary)]">
            Switch mid-session with{" "}
            <kbd className="code-inline">Ctrl+L</kbd>. Cycle favorites with{" "}
            <kbd className="code-inline">Ctrl+P</kbd>. Add custom providers via{" "}
            <code className="code-inline">extensions</code> or{" "}
            <code className="code-inline">models.json</code>.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((provider) => (
            <ProviderCard key={provider.name} provider={provider} />
          ))}
        </div>

        {/* Show more / less */}
        {rest.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              {showAll
                ? "Show featured only"
                : `Show all ${providers.length} providers`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
