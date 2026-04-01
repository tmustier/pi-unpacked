"use client";

import { useState } from "react";
import { tools, type ToolInfo } from "@/data/pi-data";

const categories = ["File System", "Execution", "Search"] as const;

export default function ToolSystem() {
  const [selected, setSelected] = useState<ToolInfo | null>(null);

  const byCategory = categories.map((cat) => ({
    name: cat,
    tools: tools.filter((t) => t.category === cat),
  }));

  return (
    <div>
      <div className="section-number"><span>03</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Tool System
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        Every built-in tool pi can call, sorted by what it does.
      </p>

      {/* Multi-column layout */}
      <div className="grid grid-cols-3 gap-6 mb-4">
        {byCategory.map((cat) => (
          <div key={cat.name}>
            <div className="mb-3">
              <span className="text-[0.65rem] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--accent)" }}>
                {cat.name}
              </span>
              <span className="text-[0.6rem] ml-2" style={{ color: "var(--text-muted)" }}>
                {cat.tools.length} tools
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {cat.tools.map((tool) => (
                <button
                  key={tool.name}
                  onClick={() => setSelected(selected?.name === tool.name ? null : tool)}
                  className="pill text-left"
                  style={
                    selected?.name === tool.name
                      ? { borderColor: "var(--accent-border)", background: "var(--accent-dim)" }
                      : {}
                  }
                >
                  {tool.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
        Click a tool to see details and source code
      </p>

      {/* Detail panel */}
      {selected && (
        <div className="card p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <code className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {selected.name}
              </code>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                {selected.description}
              </p>
            </div>
            <a href={selected.sourceLink} target="_blank" rel="noopener noreferrer" className="source-link shrink-0">
              {selected.sourceFile}
            </a>
          </div>

          {/* Parameters */}
          <div className="mt-3 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "var(--bg-primary)" }}>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Name</th>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Type</th>
                  <th className="text-left px-3 py-2 font-medium" style={{ color: "var(--text-muted)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {selected.parameters.map((p) => (
                  <tr key={p.name} style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-3 py-2">
                      <code style={{ color: "var(--accent)" }}>{p.name}</code>
                      {p.required && (
                        <span className="ml-1 text-[0.6rem]" style={{ color: "var(--text-muted)" }}>*</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <code style={{ color: "var(--yellow)" }}>{p.type}</code>
                    </td>
                    <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
