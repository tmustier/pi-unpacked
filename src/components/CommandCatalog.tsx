"use client";

import { useState } from "react";
import { commands, type CommandInfo } from "@/data/pi-data";

const categoryOrder = ["Session", "Model & Provider", "Sharing", "Context", "Configuration", "Auth", "Info"];

export default function CommandCatalog() {
  const [selected, setSelected] = useState<CommandInfo | null>(null);

  const grouped = categoryOrder.map((cat) => ({
    name: cat,
    cmds: commands.filter((c) => c.category === cat),
  }));

  return (
    <div>
      <div className="section-number"><span>04</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Command Catalog
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        Every slash command available in pi, sorted by what it does.
      </p>

      {/* Category groups with flowing pills */}
      <div className="space-y-6 mb-4">
        {grouped.map((g) => (
          <div key={g.name}>
            <div className="mb-2">
              <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
                {g.name}
              </span>
              <span className="text-[0.6rem] ml-2" style={{ color: "var(--text-muted)" }}>
                {g.cmds.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.cmds.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => setSelected(selected?.name === cmd.name ? null : cmd)}
                  className="pill"
                  style={
                    selected?.name === cmd.name
                      ? { borderColor: "var(--accent-border)", background: "var(--accent-dim)" }
                      : {}
                  }
                >
                  {cmd.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
        Click a command to see details and source code
      </p>

      {selected && (
        <div className="card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <code className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{selected.name}</code>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{selected.description}</p>
            </div>
            <a href={selected.sourceLink} target="_blank" rel="noopener noreferrer" className="source-link shrink-0">
              source
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
