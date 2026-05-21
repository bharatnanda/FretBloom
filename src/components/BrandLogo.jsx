import React from "react";

export function BrandLogo() {
  return (
    <div className="brand-logo" aria-hidden="true">
      <svg viewBox="0 0 84 84" role="img">
        <defs>
          <linearGradient id="brand-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1c07d" />
            <stop offset="100%" stopColor="#b86a2d" />
          </linearGradient>
        </defs>
        <circle cx="42" cy="42" r="34" fill="rgba(255,255,255,0.08)" stroke="url(#brand-ring)" strokeWidth="4" />
        <path d="M28 54c8-16 20-30 32-38" stroke="#fff6e6" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M25 28c8 0 16 7 16 16 0 8-5 15-13 18" stroke="#7ad1aa" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="56" cy="22" r="5" fill="#fff6e6" />
        <circle cx="33" cy="48" r="4" fill="#7ad1aa" />
      </svg>
    </div>
  );
}
