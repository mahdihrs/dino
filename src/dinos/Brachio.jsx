export default function Brachio({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="55" cy="78" rx="30" ry="20" fill="#7CB342" />
      {/* Belly */}
      <ellipse cx="55" cy="84" rx="20" ry="12" fill="#AED581" />
      {/* Long neck */}
      <path d="M70 70 Q78 40 75 20" fill="none" stroke="#7CB342" strokeWidth="14" strokeLinecap="round" />
      {/* Neck front */}
      <path d="M70 70 Q78 40 75 20" fill="none" stroke="#8BC34A" strokeWidth="8" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="75" cy="16" rx="12" ry="8" fill="#7CB342" />
      {/* Snout */}
      <ellipse cx="84" cy="17" rx="6" ry="5" fill="#689F38" />
      {/* Eye */}
      <circle cx="78" cy="13" r="3" fill="white" />
      <circle cx="79" cy="13" r="2" fill="#222" />
      <circle cx="80" cy="12" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M82 20 Q85 22 88 20" fill="none" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Front left leg */}
      <rect x="38" y="90" width="10" height="20" rx="5" fill="#689F38" />
      {/* Front right leg */}
      <rect x="52" y="90" width="10" height="20" rx="5" fill="#689F38" />
      {/* Back left leg */}
      <rect x="62" y="90" width="10" height="20" rx="5" fill="#689F38" />
      {/* Back right leg */}
      <rect x="72" y="90" width="10" height="20" rx="5" fill="#689F38" />
      {/* Tail */}
      <path d="M26 76 Q15 72 8 78" fill="none" stroke="#7CB342" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
