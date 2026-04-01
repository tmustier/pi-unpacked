import { keybindings } from "@/data/pi-data";

const CATEGORY_ORDER = ["Core", "Model & Thinking", "Display", "Session", "Editor", "Messaging"];
const CATEGORY_COLOR: Record<string, string> = {
  Core: "var(--accent)",
  "Model & Thinking": "var(--blue)",
  Display: "var(--green)",
  Session: "var(--purple)",
  Editor: "var(--yellow)",
  Messaging: "var(--orange)",
};

function KbdCombo({ keys }: { keys: string }) {
  const parts = keys.split("+");
  return (
    <span className="inline-flex items-center gap-0.5">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-0.5">
          {i > 0 && <span className="text-[0.55rem]" style={{ color: "var(--text-muted)" }}>+</span>}
          <kbd
            className="inline-block min-w-[1.4em] rounded border px-1 py-0.5 text-center font-mono text-[0.65rem] font-medium"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            {part}
          </kbd>
        </span>
      ))}
    </span>
  );
}

export default function Keybindings() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    name: cat,
    bindings: keybindings.filter((k) => k.category === cat),
  }));

  return (
    <div>
      <div className="section-number"><span>07</span></div>
      <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
        Keybindings
      </h2>
      <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
        Every keyboard shortcut, all configurable.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {grouped.map((g) => (
          <div key={g.name} className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: CATEGORY_COLOR[g.name] ?? "var(--accent)" }} />
              <h3 className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{g.name}</h3>
              <span className="ml-auto text-[0.6rem]" style={{ color: "var(--text-muted)" }}>{g.bindings.length}</span>
            </div>
            <div className="space-y-2">
              {g.bindings.map((b) => (
                <div key={b.action} className="flex items-center justify-between gap-2">
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{b.description}</span>
                  <KbdCombo keys={b.keys} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
