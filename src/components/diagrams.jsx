import React from "react";

export function ChordDiagram({ top, dots, fingers = [] }) {
  const stringXs = [45, 65, 85, 105, 125, 145];
  const fretYs = [40, 72, 104, 136, 168];
  return (
    <svg viewBox="0 0 180 220" role="img" aria-label="Chord diagram">
      <rect x="30" y="18" width="120" height="170" rx="14" fill="#fffdf8" stroke="#d9ccb6" strokeWidth="2" />
      {stringXs.map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="170" stroke="#445247" strokeWidth="3" />
      ))}
      {fretYs.map((y) => (
        <line key={y} x1="45" y1={y} x2="145" y2={y} stroke="#7c6f5d" strokeWidth="2" />
      ))}
      {dots.map(([stringNumber, fret], index) => {
        const x = stringXs[stringNumber - 1];
        const y = fret === 1 ? 56 : fret === 2 ? 88 : fret === 3 ? 120 : 152;
        return (
          <g key={`${stringNumber}-${fret}`}>
            <circle cx={x} cy={y} r="11" fill="#1f5c4a" />
            <text x={x} y={y + 4} fill="#fffdf8" fontFamily="Trebuchet MS, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
              {fingers[index]}
            </text>
          </g>
        );
      })}
      {top.map((label, index) => (
        <text key={`${label}-${index}`} x={stringXs[index]} y="28" fill="#1f2a21" fontFamily="Trebuchet MS, sans-serif" fontSize="14" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
}

export function GuitarDiagram() {
  return (
    <div className="diagram-wrap">
      <svg viewBox="0 0 720 280" role="img" aria-label="Annotated acoustic guitar diagram">
        <defs>
          <linearGradient id="wood-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d7ab70" />
            <stop offset="100%" stopColor="#b97b43" />
          </linearGradient>
        </defs>
        <rect x="46" y="122" width="210" height="36" rx="16" fill="#6e4f34" />
        <rect x="52" y="116" width="22" height="48" rx="4" fill="#2d332d" />
        <circle cx="500" cy="108" r="76" fill="url(#wood-a)" stroke="#7a4d2a" strokeWidth="4" />
        <circle cx="500" cy="184" r="92" fill="url(#wood-a)" stroke="#7a4d2a" strokeWidth="4" />
        <circle cx="500" cy="146" r="26" fill="#3e2d20" />
        <rect x="214" y="130" width="230" height="20" rx="8" fill="#9b6d45" />
        <rect x="238" y="120" width="26" height="40" rx="6" fill="#f4e4ca" />
        <rect x="600" y="136" width="54" height="20" rx="8" fill="#6e4f34" />
        <rect x="618" y="124" width="8" height="46" rx="3" fill="#efe0c6" />
        {[124, 130, 136, 142, 148, 154].map((y, index) => (
          <line key={y} x1="66" y1={y} x2="623" y2={128 + index * 8} stroke="#d7d7d7" strokeWidth="2" />
        ))}
        {[272, 296, 320, 344, 368, 392].map((x) => (
          <line key={x} x1={x} y1="123" x2={x} y2="157" stroke="#5d4029" strokeWidth="2" />
        ))}
      </svg>
    </div>
  );
}

export function ChordAnatomyDiagram() {
  return (
    <div className="diagram-wrap">
      <svg viewBox="0 0 420 280" role="img" aria-label="Annotated chord diagram">
        <rect x="110" y="30" width="180" height="200" rx="16" fill="#fffdf8" stroke="#d9ccb6" strokeWidth="3" />
        {[135, 165, 195, 225, 255, 285].map((x) => (
          <line key={x} x1={x} y1="58" x2={x} y2="212" stroke="#415044" strokeWidth="3" />
        ))}
        {[58, 96, 134, 172, 210].map((y) => (
          <line key={y} x1="135" y1={y} x2="285" y2={y} stroke="#7c6f5d" strokeWidth="2" />
        ))}
        <circle cx="165" cy="115" r="12" fill="#1f5c4a" />
        <circle cx="225" cy="153" r="12" fill="#1f5c4a" />
        <circle cx="255" cy="77" r="12" fill="#1f5c4a" />
      </svg>
    </div>
  );
}

export function OneStringNotesDiagram() {
  return (
    <div className="diagram-wrap">
      <svg viewBox="0 0 720 180" role="img" aria-label="Notes along one guitar string">
        <rect x="40" y="72" width="620" height="20" rx="10" fill="#9b6d45" />
        {[90, 150, 210, 270, 330, 390, 450, 510, 570].map((x) => (
          <line key={x} x1={x} y1="58" x2={x} y2="106" stroke="#5a4532" strokeWidth="3" />
        ))}
        {["Open", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map((text, index) => (
          <text key={text} x={[40, 90, 150, 210, 270, 330, 390, 450, 510, 570][index]} y="40" fill="#1f2a21" fontSize="18" textAnchor="middle">
            {text}
          </text>
        ))}
        {["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"].map((text, index) => (
          <text key={text} x={[40, 90, 150, 210, 270, 330, 390, 450, 510, 570][index]} y="150" fill="#b86a2d" fontFamily="Georgia, serif" fontSize="22" textAnchor="middle">
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function NotationVsTabDiagram() {
  return (
    <div className="diagram-wrap">
      <svg viewBox="0 0 720 240" role="img" aria-label="Comparison of standard notation and guitar tab">
        <text x="84" y="30" fill="#1f2a21" fontFamily="Georgia, serif" fontSize="22">
          Standard notation
        </text>
        <text x="424" y="30" fill="#1f2a21" fontFamily="Georgia, serif" fontSize="22">
          TAB
        </text>
        {[60, 82, 104, 126, 148].map((y) => (
          <line key={y} x1="50" y1={y} x2="310" y2={y} stroke="#4f5d53" strokeWidth="2" />
        ))}
        {[126, 104, 82].map((y, index) => (
          <g key={y}>
            <ellipse cx={110 + index * 58} cy={y} rx="10" ry="7" fill="#1f2a21" />
            <line x1={120 + index * 58} y1={y} x2={120 + index * 58} y2={76 - index * 22} stroke="#1f2a21" strokeWidth="2" />
          </g>
        ))}
        {[60, 84, 108, 132, 156, 180].map((y) => (
          <line key={y} x1="390" y1={y} x2="670" y2={y} stroke="#4f5d53" strokeWidth="2" />
        ))}
        {["0", "2", "2", "1"].map((text, index) => (
          <text key={text + index} x={448 + index * 58} y={86 + index * 24} fill="#b86a2d" fontSize="24" textAnchor="middle">
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}
