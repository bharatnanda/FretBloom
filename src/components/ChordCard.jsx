import React from "react";
import { Card } from "./ui.jsx";
import { ChordDiagram } from "./diagrams.jsx";

export function ChordCard({ chord, onPlayChord, onPlayArpeggio }) {
  return (
    <Card title={chord.name} className="chord-card">
      <div className="chord-box">
        <ChordDiagram top={chord.top} dots={chord.dots} fingers={chord.fingers} />
      </div>
      <p className="small muted">Finger numbers on the dots: 1 index, 2 middle, 3 ring, 4 pinky.</p>
      <div className="pill-row">
        {chord.hints.map((hint) => (
          <span key={hint} className="pill">
            {hint}
          </span>
        ))}
      </div>
      <div className="button-row wrap">
        <button className="primary" onClick={onPlayChord}>Play Chord</button>
        <button onClick={onPlayArpeggio}>Play Notes</button>
      </div>
    </Card>
  );
}
