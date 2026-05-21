import React from "react";

export function Section({ id, title, subtitle, children, hero = false, locked = false, lockedMessage = "", requiredPhase = 1, currentPhase = 0 }) {
  return (
    <section id={id} className={`section ${hero ? "hero" : ""} ${locked ? "section-locked" : ""}`}>
      {title ? (
        <div className="section-header">
          <div>
            <h2>{title}</h2>
            {subtitle ? <p className="muted">{subtitle}</p> : null}
          </div>
        </div>
      ) : null}
      <div className={locked ? "section-locked-body" : ""}>{children}</div>
      {locked ? (
        <div className="section-lock-banner" role="note">
          <div className="lock-banner-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div className="lock-banner-text">
            <strong className="lock-banner-title">Not unlocked yet</strong>
            <p className="small muted no-margin">{lockedMessage}</p>
          </div>
          <div className="lock-phase-dots" aria-label={`Phase ${currentPhase} of ${requiredPhase} needed`}>
            {Array.from({ length: requiredPhase + 1 }).map((_, i) => (
              <span key={i} className={`lock-phase-dot ${i <= currentPhase ? "dot-filled" : ""}`} />
            ))}
          </div>
          <a href="#lesson-mode" className="lock-link">Open Lesson Mode →</a>
        </div>
      ) : null}
    </section>
  );
}

export function Card({ title, children, className = "" }) {
  return (
    <article className={`card ${className}`.trim()}>
      {title ? <h3>{title}</h3> : null}
      {children}
    </article>
  );
}

export function CheckItem({ checked, onChange, label }) {
  return (
    <label className="check-item">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

export function SimpleLessonCard({ title, text, checked, onChange, label }) {
  return (
    <Card title={title}>
      <p className="small muted">{text}</p>
      <CheckItem checked={checked} onChange={onChange} label={label} />
    </Card>
  );
}
