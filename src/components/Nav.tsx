"use client";

import { useState, useEffect } from "react";
import { PI_VERSION, PI_REPO, PI_SITE } from "@/data/pi-data";

const sections = [
  { id: "agent-loop", label: "Agent Loop" },
  { id: "architecture", label: "Architecture" },
  { id: "tools", label: "Tools" },
  { id: "commands", label: "Commands" },
  { id: "extensions", label: "Extensions" },
  { id: "providers", label: "Providers" },
  { id: "keybindings", label: "Keybindings" },
  { id: "extension-api", label: "API" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return { id: s.id, top: Infinity };
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter((o) => o.top < 200);

      if (offsets.length > 0) {
        setActive(offsets[offsets.length - 1].id);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-4">
          <a href="#" className="font-mono font-bold text-[var(--text-primary)] text-sm">
            pi<span className="text-[var(--text-muted)]"> unpacked</span>
          </a>
          <span className="tag tag-accent text-[0.65rem]">v{PI_VERSION}</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                active === s.id
                  ? "text-[var(--accent)] bg-[var(--accent-dim)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PI_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            pi.dev
          </a>
          <a
            href={PI_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
