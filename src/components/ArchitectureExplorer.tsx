"use client";

import { useState } from "react";
import { packages, PI_REPO, type PackageInfo } from "@/data/pi-data";

export default function ArchitectureExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const totalFiles = packages.reduce((sum, p) => sum + p.fileCount, 0);

  return (
    <div>
      <div className="section-number"><span>02</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Architecture Explorer
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        Click around the source tree to explore what&apos;s inside.
      </p>

      {/* Root label */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
        <span className="font-mono text-sm font-medium" style={{ color: "var(--text-primary)" }}>packages/</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{packages.length} packages · {totalFiles} source files</span>
      </div>

      {/* Package grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="card card-interactive p-4"
            style={expanded === pkg.name ? { borderColor: "var(--accent-border)" } : {}}
            onClick={() => setExpanded(expanded === pkg.name ? null : pkg.name)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {pkg.name}
              </span>
              <span className="tag tag-accent text-[0.6rem]">{pkg.fileCount} files</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {pkg.description}
            </p>

            {/* Expanded subdirectories */}
            <div className={`expandable ${expanded === pkg.name ? "open" : ""}`}>
              <div className="mt-3 space-y-1.5">
                {pkg.directories.map((dir) => (
                  <div key={dir.name} className="flex items-center justify-between text-xs">
                    <span className="font-mono" style={{ color: "var(--text-muted)" }}>{dir.name}</span>
                    <span style={{ color: "var(--text-muted)" }}>{dir.fileCount}</span>
                  </div>
                ))}
                <a href={pkg.sourceLink} target="_blank" rel="noopener noreferrer" className="source-link inline-block mt-2">
                  View on GitHub →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
