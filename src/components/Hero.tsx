"use client";

import { PI_VERSION, PI_REPO, PI_SITE } from "@/data/pi-data";

const stats = [
  { value: "293", suffix: "+", label: "FILES" },
  { value: "7", suffix: "", label: "PACKAGES" },
  { value: "7", suffix: "", label: "TOOLS" },
  { value: "56", suffix: "+", label: "EXTENSIONS" },
  { value: "20", suffix: "", label: "COMMANDS" },
  { value: "16", suffix: "", label: "PROVIDERS" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Title */}
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-1">
          <span style={{ color: "var(--text-primary)" }}>pi</span>
        </h1>
        <h2
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6"
          style={{ color: "var(--accent)" }}
        >
          Unpacked
        </h2>

        {/* Version badge */}
        <span className="tag tag-accent text-xs tracking-wider font-mono mb-6">
          v{PI_VERSION}
        </span>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          What actually happens when you type a message into pi?{" "}
          <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
            The agent loop, 7 built-in tools, 56+ extensions, and the full
            extensibility surface
          </span>
          , mapped straight from the source.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: "var(--accent)" }}>
                {s.value}
                <span className="text-xl" style={{ color: "var(--text-muted)" }}>
                  {s.suffix}
                </span>
              </div>
              <div
                className="text-[0.65rem] font-medium tracking-[0.15em] mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Start exploring */}
        <a
          href="#agent-loop"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-medium tracking-[0.1em] uppercase transition-all"
          style={{
            border: "1px solid var(--accent-border)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-dim)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Start exploring
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
