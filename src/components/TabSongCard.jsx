import React from "react";
import { Card } from "./ui.jsx";
import { tabStringOrder } from "../data.js";

export function TabSongCard({ songId, song, step, onStepChange, onPlayPhrase }) {
  return (
    <Card title={song.title}>
      <p className="small muted">{song.intro}</p>
      <div className="button-row wrap">
        <button className="primary" onClick={onPlayPhrase}>Play Phrase</button>
      </div>
      <div className="button-row wrap">
        <button className={step === 0 ? "active-step" : ""} onClick={() => onStepChange(0)}>
          Start
        </button>
        {song.events.map((_, index) => (
          <button key={index + 1} className={step === index + 1 ? "active-step" : ""} onClick={() => onStepChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      <div className="step-note">{song.explainer[step]}</div>
      <div className="tab-display" role="img" aria-label={`${song.title} tablature`}>
        {tabStringOrder.map((stringName) => (
          <div key={`${songId}-${stringName}`} className="tab-line">
            <span>{stringName}|--</span>
            {song.events.map((event, index) => (
              <span
                key={`${songId}-${stringName}-${index}`}
                className={`tab-note ${event.string === stringName && step === index + 1 ? "active" : ""}`}
              >
                {event.string === stringName ? event.fret : "-"}
                {"--"}
              </span>
            ))}
            <span>|</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
