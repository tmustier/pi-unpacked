import { keybindings, type KeybindingInfo } from "@/data/pi-data";

const CATEGORY_ORDER = [
  "Core",
  "Model & Thinking",
  "Display",
  "Session",
  "Editor",
  "Messaging",
];

function groupByCategory(
  items: KeybindingInfo[]
): Map<string, KeybindingInfo[]> {
  const map = new Map<string, KeybindingInfo[]>();
  for (const cat of CATEGORY_ORDER) {
    const group = items.filter((k) => k.category === cat);
    if (group.length > 0) map.set(cat, group);
  }
  return map;
}

function KbdKey({ combo }: { combo: string }) {
  const parts = combo.split("+");
  return (
    <span className="inline-flex items-center gap-0.5">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-0.5">
          {i > 0 && (
            <span className="text-[0.6rem] text-[var(--text-muted)]">+</span>
          )}
          <kbd
            className="inline-block min-w-[1.6em] rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-1.5 py-0.5 text-center font-mono text-xs font-medium text-[var(--text-primary)] shadow-[0_1px_0_var(--border)]"
          >
            {part}
          </kbd>
        </span>
      ))}
    </span>
  );
}

const CATEGORY_ACCENT: Record<string, string> = {
  Core: "var(--red)",
  "Model & Thinking": "var(--accent)",
  Display: "var(--green)",
  Session: "var(--blue)",
  Editor: "var(--yellow)",
  Messaging: "var(--orange)",
};

export default function Keybindings() {
  const groups = groupByCategory(keybindings);

  return (
    <div>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <span className="section-header">Keybindings</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Every keyboard shortcut, all configurable
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--text-secondary)]">
            Override any binding in{" "}
            <code className="code-inline">~/.pi/agent/keybindings.json</code>.
            Extensions can register additional shortcuts.
          </p>
        </div>

        {/* Groups grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from(groups.entries()).map(([category, items]) => (
            <div key={category} className="card p-5">
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: CATEGORY_ACCENT[category] ?? "var(--accent)" }}
                />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {category}
                </h3>
                <span className="ml-auto text-xs text-[var(--text-muted)]">
                  {items.length}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {items.map((kb) => (
                  <div
                    key={kb.action}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-xs text-[var(--text-secondary)]">
                      {kb.description}
                    </span>
                    <KbdKey combo={kb.keys} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
