export default function TRex({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="55" cy="72" rx="28" ry="22" fill="#E8501A" />
      {/* Belly */}
      <ellipse cx="50" cy="78" rx="18" ry="14" fill="#F4A261" />
      {/* Head */}
      <ellipse cx="82" cy="42" rx="20" ry="16" fill="#E8501A" />
      {/* Jaw */}
      <ellipse cx="90" cy="50" rx="14" ry="7" fill="#D4400E" />
      {/* Teeth grin */}
      <path d="M80 48 L83 52 L86 48 L89 52 L92 48 L95 52 L98 48" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="86" cy="38" r="4" fill="white" />
      <circle cx="87" cy="38" r="2.5" fill="#222" />
      {/* Eye shine */}
      <circle cx="88" cy="37" r="1" fill="white" />
      {/* Neck */}
      <ellipse cx="72" cy="56" rx="10" ry="14" fill="#E8501A" />
      {/* Tiny arms */}
      <ellipse cx="68" cy="65" rx="4" ry="7" fill="#D4400E" transform="rotate(-20 68 65)" />
      <ellipse cx="74" cy="66" rx="4" ry="7" fill="#D4400E" transform="rotate(10 74 66)" />
      {/* Left leg */}
      <ellipse cx="40" cy="92" rx="8" ry="12" fill="#D4400E" />
      <ellipse cx="40" cy="102" rx="10" ry="5" fill="#D4400E" />
      {/* Right leg */}
      <ellipse cx="62" cy="92" rx="8" ry="12" fill="#D4400E" />
      <ellipse cx="62" cy="102" rx="10" ry="5" fill="#D4400E" />
      {/* Tail */}
      <path d="M28 70 Q15 60 10 55" fill="none" stroke="#E8501A" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}
