import React from "react";

function GuitarSilhouette() {
  return (
    <svg viewBox="0 0 260 520" role="img" aria-label="Acoustic guitar illustration" className="intro-guitar-svg">
      <defs>
        <linearGradient id="intro-wood-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4915a" />
          <stop offset="55%" stopColor="#b97543" />
          <stop offset="100%" stopColor="#8a5530" />
        </linearGradient>
        <linearGradient id="intro-wood-neck" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9b6b3e" />
          <stop offset="100%" stopColor="#7a5230" />
        </linearGradient>
        <linearGradient id="intro-nut" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0e0c6" />
          <stop offset="100%" stopColor="#d4c4a8" />
        </linearGradient>
        <filter id="intro-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="6" dy="8" stdDeviation="10" floodColor="#7a4828" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Headstock */}
      <rect x="102" y="12" width="56" height="72" rx="12" fill="url(#intro-wood-neck)" />
      <rect x="94" y="52" width="72" height="16" rx="6" fill="#5a3d22" />
      {/* Tuning pegs — 3 per side */}
      {[20, 38, 56].map((y) => (
        <React.Fragment key={`peg-l-${y}`}>
          <circle cx="96" cy={y} r="7" fill="#c8a870" stroke="#a07840" strokeWidth="1.5" />
          <circle cx="96" cy={y} r="3" fill="#8a6030" />
        </React.Fragment>
      ))}
      {[20, 38, 56].map((y) => (
        <React.Fragment key={`peg-r-${y}`}>
          <circle cx="164" cy={y} r="7" fill="#c8a870" stroke="#a07840" strokeWidth="1.5" />
          <circle cx="164" cy={y} r="3" fill="#8a6030" />
        </React.Fragment>
      ))}

      {/* Nut */}
      <rect x="112" y="82" width="36" height="8" rx="3" fill="url(#intro-nut)" />

      {/* Neck */}
      <rect x="114" y="88" width="32" height="192" rx="6" fill="url(#intro-wood-neck)" />
      {/* Fret lines */}
      {[18, 36, 54, 72, 90, 108, 128, 148, 168].map((offset) => (
        <line key={offset} x1="114" y1={88 + offset} x2="146" y2={88 + offset} stroke="#4a3520" strokeWidth="2" />
      ))}
      {/* Fret position dots */}
      <circle cx="130" cy="133" r="3.5" fill="rgba(255,248,232,0.7)" />
      <circle cx="130" cy="169" r="3.5" fill="rgba(255,248,232,0.7)" />

      {/* Heel / body join */}
      <rect x="108" y="272" width="44" height="20" rx="4" fill="#8a5530" />

      {/* Body — upper bout */}
      <ellipse cx="130" cy="330" rx="88" ry="72" fill="url(#intro-wood-body)" filter="url(#intro-shadow)" />
      {/* Body — lower bout (larger) */}
      <ellipse cx="130" cy="428" rx="112" ry="86" fill="url(#intro-wood-body)" filter="url(#intro-shadow)" />
      {/* Body binding — upper */}
      <ellipse cx="130" cy="330" rx="88" ry="72" fill="none" stroke="#e8c890" strokeWidth="3" />
      {/* Body binding — lower */}
      <ellipse cx="130" cy="428" rx="112" ry="86" fill="none" stroke="#e8c890" strokeWidth="3" />

      {/* Waist cut-in */}
      <rect x="42" y="372" width="176" height="40" fill="url(#intro-wood-body)" />
      <ellipse cx="42" cy="392" rx="22" ry="26" fill="url(#intro-wood-body)" />
      <ellipse cx="218" cy="392" rx="22" ry="26" fill="url(#intro-wood-body)" />

      {/* Sound hole */}
      <circle cx="130" cy="380" r="38" fill="#2e1e10" />
      <circle cx="130" cy="380" r="38" fill="none" stroke="#e8c890" strokeWidth="3" />
      {/* Rosette rings */}
      <circle cx="130" cy="380" r="32" fill="none" stroke="#c8a050" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="130" cy="380" r="28" fill="none" stroke="#c8a050" strokeWidth="1" />

      {/* Bridge */}
      <rect x="94" y="448" width="72" height="14" rx="5" fill="#4a3020" />
      <rect x="98" y="443" width="64" height="8" rx="3" fill="#d8c090" />
      {/* Bridge pins */}
      {[108, 118, 128, 138, 148, 158].map((x) => (
        <circle key={x} cx={x} cy="455" r="3.5" fill="#c8a870" />
      ))}

      {/* Strings — 6 lines from nut to bridge */}
      {[-10, -6, -2, 2, 6, 10].map((offset, i) => (
        <line
          key={`string-${i}`}
          x1={130 + offset * 0.8}
          y1="90"
          x2={130 + offset}
          y2="448"
          stroke={i < 3 ? "rgba(220,210,190,0.85)" : "rgba(200,185,160,0.7)"}
          strokeWidth={i < 3 ? 1.5 : 2.2}
        />
      ))}

      {/* Strap pin */}
      <circle cx="130" cy="510" r="8" fill="#4a3020" stroke="#6a4830" strokeWidth="2" />
    </svg>
  );
}

export function SiteIntro() {
  return (
    <section className="site-intro" aria-label="Introduction">
      <div className="site-intro-inner">
        <div className="site-intro-text">
          <div className="site-intro-tags">
            {["Acoustic", "20 Min / Day", "Beginner-Focused"].map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h2 className="site-intro-heading">
            From first chord<br />to real music.
          </h2>
          <p className="site-intro-body">
            FretBloom is a structured companion for acoustic guitar beginners. Short daily sessions, guided progression, and enough theory to understand what you're playing — not just copy it.
          </p>
          <div className="button-row wrap">
            <a className="hero-link" href="#lesson-mode">Start Your Path</a>
            <a className="hero-link hero-link-secondary" href="#dashboard">Explore Dashboard</a>
          </div>
        </div>
        <div className="site-intro-art" aria-hidden="true">
          <GuitarSilhouette />
        </div>
      </div>
    </section>
  );
}
