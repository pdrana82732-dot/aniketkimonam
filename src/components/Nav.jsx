import { useState, useEffect } from "react";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the viewport grows back to desktop size
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="ws-nav">
      <a className="ws-nav-mark ws-mono" href="#top" onClick={() => setOpen(false)}>
        A <b>&amp;</b> R
      </a>

      <nav className="ws-nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <button
        className={`ws-nav-toggle ${open ? "is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`ws-nav-drawer ${open ? "is-open" : ""}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );
}