export default function Stego({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="55" cy="75" rx="32" ry="18" fill="#5C6BC0" />
      {/* Belly */}
      <ellipse cx="55" cy="82" rx="22" ry="10" fill="#9FA8DA" />
      {/* Back plates */}
      <ellipse cx="35" cy="55" rx="6" ry="10" fill="#7E57C2" transform="rotate(-10 35 55)" />
      <ellipse cx="45" cy="50" rx="7" ry="12" fill="#9575CD" transform="rotate(-5 45 50)" />
      <ellipse cx="55" cy="48" rx="7" ry="13" fill="#7E57C2" />
      <ellipse cx="65" cy="50" rx="7" ry="12" fill="#9575CD" transform="rotate(5 65 50)" />
      <ellipse cx="75" cy="55" rx="6" ry="10" fill="#7E57C2" transform="rotate(10 75 55)" />
      {/* Head */}
      <ellipse cx="90" cy="68" rx="12" ry="10" fill="#5C6BC0" />
      {/* Snout */}
      <ellipse cx="98" cy="70" rx="6" ry="5" fill="#4A5AB5" />
      {/* Eye */}
      <circle cx="92" cy="65" r="3" fill="white" />
      <circle cx="93" cy="65" r="2" fill="#222" />
      <circle cx="94" cy="64" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M96 73 Q99 75 102 73" fill="none" stroke="#3F51B5" strokeWidth="1.5" strokeLinecap="round" />
      {/* Neck */}
      <ellipse cx="82" cy="72" rx="10" ry="8" fill="#5C6BC0" />
      {/* Legs */}
      <rect x="38" y="88" width="10" height="16" rx="5" fill="#4A5AB5" />
      <rect x="52" y="88" width="10" height="16" rx="5" fill="#4A5AB5" />
      <rect x="62" y="88" width="10" height="16" rx="5" fill="#4A5AB5" />
      {/* Tail */}
      <path d="M24 74 Q12 68 8 72" fill="none" stroke="#5C6BC0" strokeWidth="8" strokeLinecap="round" />
      {/* Tail spikes */}
      <ellipse cx="10" cy="66" rx="3" ry="6" fill="#7E57C2" transform="rotate(-30 10 66)" />
      <ellipse cx="6" cy="70" rx="3" ry="6" fill="#9575CD" transform="rotate(-45 6 70)" />
    </svg>
  );
}
