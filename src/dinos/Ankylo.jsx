export default function Ankylo({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body - low and wide */}
      <ellipse cx="55" cy="72" rx="34" ry="16" fill="#8D6E63" />
      {/* Armor shell */}
      <ellipse cx="55" cy="66" rx="30" ry="14" fill="#A1887F" />
      {/* Armor bumps */}
      <circle cx="40" cy="62" r="4" fill="#795548" />
      <circle cx="52" cy="58" r="5" fill="#795548" />
      <circle cx="65" cy="60" r="4" fill="#795548" />
      <circle cx="45" cy="68" r="3.5" fill="#6D4C41" />
      <circle cx="58" cy="66" r="3.5" fill="#6D4C41" />
      <circle cx="70" cy="66" r="3" fill="#6D4C41" />
      {/* Head */}
      <ellipse cx="90" cy="72" rx="12" ry="9" fill="#8D6E63" />
      {/* Snout */}
      <ellipse cx="98" cy="74" rx="6" ry="5" fill="#795548" />
      {/* Eye */}
      <circle cx="92" cy="69" r="3" fill="white" />
      <circle cx="93" cy="69" r="2" fill="#222" />
      <circle cx="94" cy="68" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M96 77 Q99 79 102 77" fill="none" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs - short and stubby */}
      <rect x="32" y="84" width="10" height="12" rx="5" fill="#795548" />
      <rect x="48" y="84" width="10" height="12" rx="5" fill="#795548" />
      <rect x="62" y="84" width="10" height="12" rx="5" fill="#795548" />
      <rect x="74" y="84" width="10" height="12" rx="5" fill="#795548" />
      {/* Tail */}
      <path d="M22 70 Q10 66 6 68" fill="none" stroke="#8D6E63" strokeWidth="7" strokeLinecap="round" />
      {/* Club */}
      <ellipse cx="5" cy="66" rx="7" ry="6" fill="#795548" />
    </svg>
  );
}
