import React from "react";
import { fretboardStrings } from "../data.js";
import { midiToNoteName, midiToFreq } from "../audio.js";

export function FretboardTrainer({ lastGuess, onGuess }) {
  return (
    <div className="fretboard-wrap">
      <div className="fret-header">
        <div className="fret-spacer">String</div>
        {[0, 1, 2, 3, 4, 5].map((fret) => (
          <div key={fret} className="fret-label">
            {fret === 0 ? "Open" : fret}
          </div>
        ))}
      </div>
      {fretboardStrings.map((string) => (
        <div key={string.name} className="fret-row">
          <div className="string-label">{string.name}</div>
          {[0, 1, 2, 3, 4, 5].map((fret) => {
            const midi = string.openMidi + fret;
            const note = midiToNoteName(midi);
            const active = lastGuess && lastGuess.string === string.name && lastGuess.fret === fret;
            return (
              <button
                key={`${string.name}-${fret}`}
                className={`fret-cell ${active ? "target-cell" : ""}`}
                onClick={() => onGuess({ string: string.name, fret, note, midi, frequency: midiToFreq(midi) })}
              >
                <span>{note}</span>
                <small>{fret}</small>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
