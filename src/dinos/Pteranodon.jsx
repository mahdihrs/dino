export default function Pteranodon({ className, style }) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="60" cy="65" rx="16" ry="12" fill="#42A5F5" />
      {/* Belly */}
      <ellipse cx="60" cy="70" rx="10" ry="7" fill="#90CAF9" />
      {/* Left wing */}
      <path d="M45 60 Q20 40 5 50 Q20 55 44 64" fill="#42A5F5" />
      <path d="M45 60 Q25 45 10 52" fill="#1E88E5" />
      {/* Right wing */}
      <path d="M75 60 Q100 40 115 50 Q100 55 76 64" fill="#42A5F5" />
      <path d="M75 60 Q95 45 110 52" fill="#1E88E5" />
      {/* Head */}
      <ellipse cx="72" cy="48" rx="10" ry="8" fill="#42A5F5" />
      {/* Crest */}
      <path d="M72 42 Q68 28 58 24" fill="#1E88E5" />
      <path d="M72 42 Q68 30 60 26" fill="#42A5F5" />
      {/* Beak */}
      <path d="M80 48 L94 46 L80 52" fill="#F9A825" />
      {/* Eye */}
      <circle cx="75" cy="45" r="3" fill="white" />
      <circle cx="76" cy="45" r="2" fill="#222" />
      <circle cx="77" cy="44" r="0.8" fill="white" />
      {/* Neck */}
      <path d="M65 56 Q68 52 72 50" fill="none" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
      {/* Feet */}
      <path d="M54 76 L50 86 L56 82" fill="#1E88E5" />
      <path d="M66 76 L62 86 L68 82" fill="#1E88E5" />
    </svg>
  );
}
