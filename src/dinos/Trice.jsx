export default function Trice({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="50" cy="75" rx="30" ry="20" fill="#FDD835" />
      {/* Belly */}
      <ellipse cx="50" cy="82" rx="20" ry="12" fill="#FFF176" />
      {/* Frill */}
      <ellipse cx="85" cy="48" rx="18" ry="22" fill="#F9A825" />
      <ellipse cx="85" cy="48" rx="12" ry="16" fill="#FDD835" />
      {/* Head */}
      <ellipse cx="90" cy="62" rx="16" ry="12" fill="#FDD835" />
      {/* Snout / beak */}
      <ellipse cx="102" cy="64" rx="8" ry="6" fill="#F9A825" />
      {/* Eye */}
      <circle cx="92" cy="58" r="3.5" fill="white" />
      <circle cx="93" cy="58" r="2" fill="#222" />
      <circle cx="94" cy="57" r="0.8" fill="white" />
      {/* Three horns */}
      <path d="M100 60 L112 56" stroke="#F57F17" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M88 48 L92 34" stroke="#F57F17" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M82 48 L78 34" stroke="#F57F17" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Smile */}
      <path d="M100 68 Q103 70 106 68" fill="none" stroke="#F57F17" strokeWidth="1.5" strokeLinecap="round" />
      {/* Neck */}
      <ellipse cx="78" cy="68" rx="10" ry="10" fill="#FDD835" />
      {/* Legs */}
      <rect x="30" y="90" width="11" height="16" rx="5" fill="#F9A825" />
      <rect x="46" y="90" width="11" height="16" rx="5" fill="#F9A825" />
      <rect x="58" y="90" width="11" height="16" rx="5" fill="#F9A825" />
      {/* Tail */}
      <path d="M20 74 Q10 70 6 76" fill="none" stroke="#FDD835" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
