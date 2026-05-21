import React from "react";

const S = { fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };

export function NavIcon({ sectionId, size = 22 }) {
  const icons = {
    dashboard: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    "lesson-mode": (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    "start-here": (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    visuals: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 8l3 4 2-2 3 3" />
      </svg>
    ),
    "chords-tabs": (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <line x1="8" y1="3" x2="8" y2="21" />
        <line x1="13" y1="3" x2="13" y2="21" />
        <line x1="18" y1="3" x2="18" y2="21" />
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="17" x2="21" y2="17" />
      </svg>
    ),
    "audio-lab": (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
        <path d="M19.07 4.93a10 10 0 010 14.14" />
      </svg>
    ),
    "rhythm-lab": (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    practice: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    roadmap: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="M13 13l6 6" />
      </svg>
    ),
    theory: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    songs: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    resources: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
        <polyline points="13 2 13 9 20 9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
    notes: (
      <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),
  };

  return icons[sectionId] ?? (
    <svg viewBox="0 0 24 24" width={size} height={size} {...S}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
