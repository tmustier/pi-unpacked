import { PI_VERSION, PI_REPO, PI_SITE } from "@/data/pi-data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-xs text-[var(--text-muted)]">
        <p>
          Built by reading the source at{" "}
          <a
            href={PI_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            github.com/badlogic/pi-mono
          </a>
        </p>
        <p>
          pi v{PI_VERSION} ·{" "}
          <a
            href={PI_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            pi.dev
          </a>{" "}
          · Not affiliated with pi
        </p>
      </div>
    </footer>
  );
}
