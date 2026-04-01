import { extensionApi, PI_REPO } from "@/data/pi-data";

const CATEGORY_ICON: Record<string, string> = {
  "UI Primitives": "◆",
  "Lifecycle Events": "◈",
  Registration: "◇",
  "Session Control": "○",
};

const CATEGORY_COLOR: Record<string, string> = {
  "UI Primitives": "var(--accent)",
  "Lifecycle Events": "var(--green)",
  Registration: "var(--blue)",
  "Session Control": "var(--orange)",
};

export default function ExtensionAPI() {
  return (
    <div>
      <div>
        {/* Header */}
        <div className="mb-10">
          <span className="section-header">Extension API</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            The full surface area
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--text-secondary)]">
            TypeScript modules with access to everything. Tools, commands,
            keyboard shortcuts, events, UI primitives, and the full TUI.{" "}
            <a
              href={`${PI_REPO}/blob/main/packages/coding-agent/src/core/extensions/types.ts`}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link hover:text-[var(--accent)]"
            >
              types.ts →
            </a>
          </p>
        </div>

        {/* API categories */}
        <div className="grid gap-6 md:grid-cols-2">
          {extensionApi.map((surface) => {
            const color = CATEGORY_COLOR[surface.category] ?? "var(--accent)";
            const icon = CATEGORY_ICON[surface.category] ?? "◆";

            return (
              <div key={surface.category} className="card p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span
                    className="text-base"
                    style={{ color }}
                  >
                    {icon}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {surface.category}
                  </h3>
                  <span className="ml-auto text-xs text-[var(--text-muted)]">
                    {surface.methods.length} methods
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {surface.methods.map((method) => (
                    <div key={method.name} className="flex items-start gap-3">
                      <code
                        className="shrink-0 rounded border border-[var(--border)] bg-[var(--bg-secondary)] px-1.5 py-0.5 font-mono text-xs"
                        style={{ color }}
                      >
                        {method.name}
                      </code>
                      <span className="text-xs leading-relaxed text-[var(--text-secondary)]">
                        {method.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Extension examples callout */}
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                56+ example extensions ship with pi
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                From hello-world to Doom, plan mode, sub-agents, sandboxing,
                permission gates, and custom providers.
              </p>
            </div>
            <a
              href={`${PI_REPO}/tree/main/packages/coding-agent/examples/extensions`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-[var(--accent-dim)] bg-[var(--accent-dim)] px-4 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
            >
              Browse on GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
