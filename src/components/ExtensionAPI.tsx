import { extensionApi, PI_REPO } from "@/data/pi-data";

const CATEGORY_COLOR: Record<string, string> = {
  "UI Primitives": "var(--accent)",
  "Lifecycle Events": "var(--green)",
  Registration: "var(--blue)",
  "Session Control": "var(--orange)",
};

export default function ExtensionAPI() {
  return (
    <div>
      <div className="section-number"><span>08</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Extension API
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        TypeScript modules with access to everything. Tools, commands, keyboard shortcuts, events, and the full TUI.{" "}
        <a
          href={`${PI_REPO}/blob/main/packages/coding-agent/src/core/extensions/types.ts`}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link hover:text-[var(--accent)]"
        >
          types.ts →
        </a>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {extensionApi.map((cat) => (
          <div key={cat.category} className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full" style={{ background: CATEGORY_COLOR[cat.category] ?? "var(--accent)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{cat.category}</h3>
              <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>{cat.methods.length} methods</span>
            </div>
            <div className="space-y-2.5">
              {cat.methods.map((m) => (
                <div key={m.name} className="flex items-start gap-2.5">
                  <code
                    className="shrink-0 rounded border px-1.5 py-0.5 font-mono text-[0.7rem]"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-secondary)",
                      color: CATEGORY_COLOR[cat.category] ?? "var(--accent)",
                    }}
                  >
                    {m.name}
                  </code>
                  <span className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {m.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
