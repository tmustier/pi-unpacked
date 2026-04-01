import { PI_VERSION, PI_REPO, PI_SITE } from "@/data/pi-data";

export default function Footer() {
  return (
    <footer className="px-6 py-10 mt-16" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        <p>
          Built by reading the source at{" "}
          <a href={PI_REPO} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }}>
            github.com/badlogic/pi-mono
          </a>
        </p>
        <p>
          pi v{PI_VERSION} ·{" "}
          <a href={PI_SITE} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--accent)]" style={{ color: "var(--text-secondary)" }}>
            pi.dev
          </a>{" "}
          · Not affiliated with pi
        </p>
      </div>
    </footer>
  );
}
