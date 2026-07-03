export default function Raptor({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body - small and sleek */}
      <ellipse cx="52" cy="68" rx="22" ry="14" fill="#7CB342" />
      {/* Belly */}
      <ellipse cx="52" cy="74" rx="14" ry="8" fill="#AED581" />
      {/* Feathered arms */}
      <path d="M58 60 Q68 52 72 56 Q66 58 60 64" fill="#689F38" />
      <path d="M48 62 Q42 52 38 54 Q42 58 48 66" fill="#689F38" />
      {/* Neck */}
      <path d="M66 62 Q74 52 78 44" fill="none" stroke="#7CB342" strokeWidth="8" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="82" cy="40" rx="11" ry="8" fill="#7CB342" />
      {/* Snout */}
      <ellipse cx="91" cy="41" rx="6" ry="4" fill="#689F38" />
      {/* Eye - bigger for cute look */}
      <circle cx="84" cy="37" r="3.5" fill="white" />
      <circle cx="85" cy="37" r="2.2" fill="#222" />
      <circle cx="86" cy="36" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M90 44 Q93 46 96 44" fill="none" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs - long and lean */}
      <rect x="38" y="78" width="7" height="20" rx="3.5" fill="#689F38" />
      <rect x="54" y="78" width="7" height="20" rx="3.5" fill="#689F38" />
      {/* Feet with claw */}
      <path d="M36 96 L44 96 L40 100 Z" fill="#689F38" />
      <path d="M52 96 L60 96 L56 100 Z" fill="#689F38" />
      {/* Tail - long */}
      <path d="M30 66 Q16 58 6 62" fill="none" stroke="#7CB342" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
