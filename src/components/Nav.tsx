"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "agent-loop", num: "01" },
  { id: "architecture", num: "02" },
  { id: "tools", num: "03" },
  { id: "commands", num: "04" },
  { id: "extensions", num: "05" },
  { id: "providers", num: "06" },
  { id: "keybindings", num: "07" },
  { id: "extension-api", num: "08" },
];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return { id: s.id, top: Infinity };
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter((o) => o.top < 300);

      if (offsets.length > 0) {
        setActive(offsets[offsets.length - 1].id);
      } else {
        setActive("");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sidebar-nav">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? "active" : ""}
        >
          {s.num}
        </a>
      ))}
    </nav>
  );
}
