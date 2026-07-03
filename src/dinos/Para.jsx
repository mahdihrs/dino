export default function Para({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="75" rx="28" ry="18" fill="#26A69A" />
      {/* Belly */}
      <ellipse cx="50" cy="82" rx="18" ry="10" fill="#80CBC4" />
      {/* Neck */}
      <path d="M68 68 Q76 55 78 45" fill="none" stroke="#26A69A" strokeWidth="12" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="82" cy="40" rx="12" ry="10" fill="#26A69A" />
      {/* Crest - long curved tube */}
      <path d="M78 36 Q72 18 60 12" fill="none" stroke="#00897B" strokeWidth="6" strokeLinecap="round" />
      <path d="M78 36 Q74 22 64 16" fill="none" stroke="#26A69A" strokeWidth="3" strokeLinecap="round" />
      {/* Snout */}
      <ellipse cx="92" cy="42" rx="7" ry="5" fill="#00897B" />
      {/* Eye */}
      <circle cx="84" cy="37" r="3" fill="white" />
      <circle cx="85" cy="37" r="2" fill="#222" />
      <circle cx="86" cy="36" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M90 45 Q93 47 96 45" fill="none" stroke="#00796B" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="32" y="88" width="10" height="18" rx="5" fill="#00897B" />
      <rect x="48" y="88" width="10" height="18" rx="5" fill="#00897B" />
      <rect x="60" y="88" width="10" height="18" rx="5" fill="#00897B" />
      {/* Tail */}
      <path d="M22 74 Q10 68 6 74" fill="none" stroke="#26A69A" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
