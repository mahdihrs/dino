export default function Spino({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="55" cy="75" rx="30" ry="18" fill="#C62828" />
      {/* Belly */}
      <ellipse cx="55" cy="82" rx="20" ry="10" fill="#EF9A9A" />
      {/* Sail/fin */}
      <path d="M30 68 Q35 30 50 28 Q60 26 70 30 Q80 34 82 68" fill="#E53935" />
      <path d="M38 65 Q42 38 50 34 Q58 32 66 36 Q74 40 76 65" fill="#EF5350" />
      {/* Neck */}
      <path d="M78 70 Q86 58 88 50" fill="none" stroke="#C62828" strokeWidth="10" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="90" cy="45" rx="14" ry="9" fill="#C62828" />
      {/* Snout - long */}
      <ellipse cx="102" cy="46" rx="8" ry="5" fill="#B71C1C" />
      {/* Eye */}
      <circle cx="90" cy="42" r="3" fill="white" />
      <circle cx="91" cy="42" r="2" fill="#222" />
      <circle cx="92" cy="41" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M100 49 Q104 51 107 49" fill="none" stroke="#8E0000" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="35" y="88" width="10" height="18" rx="5" fill="#B71C1C" />
      <rect x="50" y="88" width="10" height="18" rx="5" fill="#B71C1C" />
      <rect x="65" y="88" width="10" height="18" rx="5" fill="#B71C1C" />
      {/* Tail */}
      <path d="M26 74 Q14 68 8 74" fill="none" stroke="#C62828" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
