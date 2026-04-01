"use client";

import { useState } from "react";
import { extensions, type ExtensionInfo } from "@/data/pi-data";

const CATEGORIES = [
  "All",
  "UI & Appearance",
  "Tools & Capabilities",
  "Commands & Input",
  "Session & Workflow",
  "Safety & Guards",
  "Context & Providers",
  "Multi-Agent & Advanced",
  "Fun & Demo",
  "Events & Lifecycle",
] as const;

const NOTABLE = new Set(["doom-overlay", "plan-mode", "subagent", "sandbox", "permission-gate", "ssh"]);

export default function ExtensionGallery() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? extensions : extensions.filter((e) => e.category === filter);
  const counts = extensions.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="section-number"><span>05</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Extension Gallery
      </h2>
      <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
        {extensions.length}+ example extensions. Features other agents bake in, you can build yourself.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-pill ${filter === cat ? "active" : ""}`}
          >
            {cat === "All" ? "All" : cat}
            <span className="ml-1 opacity-60">{cat === "All" ? extensions.length : counts[cat] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* 2-column card grid (dense, like CC's hidden features) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((ext) => (
          <a
            key={ext.name}
            href={ext.sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interactive p-4 block"
            style={NOTABLE.has(ext.name) ? { borderColor: "var(--accent-border)" } : {}}
          >
            <div className="flex items-center gap-2 mb-1">
              {ext.isDirectory && (
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>📁</span>
              )}
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {ext.name}
              </span>
              {NOTABLE.has(ext.name) && (
                <span className="tag tag-accent text-[0.55rem]">notable</span>
              )}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {ext.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
