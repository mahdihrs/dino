export default function Background({ hatchedCount }) {
  return (
    <div className="game-background">
      {/* Ground - always visible */}
      <div className="bg-ground" />

      {/* 1 egg: fern */}
      <svg className={`bg-element bg-fern ${hatchedCount >= 1 ? 'visible' : ''}`} viewBox="0 0 60 80" style={{ left: '5%', bottom: '8%' }}>
        <path d="M30 75 Q25 50 15 40 Q25 45 30 40 Q20 30 12 20 Q25 28 30 25 Q25 15 22 5 Q30 18 35 25 Q35 15 40 5 Q38 18 35 25 Q40 28 48 20 Q42 30 35 40 Q45 45 40 40 Q35 50 30 75" fill="#4CAF50" />
        <path d="M30 75 L30 25" stroke="#388E3C" strokeWidth="2" fill="none" />
      </svg>

      {/* 2 eggs: hill */}
      <div className={`bg-element bg-hill ${hatchedCount >= 2 ? 'visible' : ''}`} />

      {/* 3 eggs: palm tree */}
      <svg className={`bg-element bg-palm ${hatchedCount >= 3 ? 'visible' : ''}`} viewBox="0 0 80 120" style={{ left: '2%', bottom: '12%' }}>
        <rect x="36" y="40" width="8" height="70" rx="4" fill="#795548" />
        <path d="M40 45 Q20 30 5 40" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M40 45 Q60 30 75 40" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M40 42 Q25 20 10 25" stroke="#66BB6A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M40 42 Q55 20 70 25" stroke="#66BB6A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M40 40 Q40 15 35 5" stroke="#81C784" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      {/* 4 eggs: volcano */}
      <svg className={`bg-element bg-volcano ${hatchedCount >= 4 ? 'visible' : ''}`} viewBox="0 0 100 80" style={{ right: '3%', top: '5%' }}>
        <path d="M10 80 L35 20 Q50 10 65 20 L90 80 Z" fill="#795548" />
        <path d="M35 20 Q50 10 65 20 L58 30 Q50 25 42 30 Z" fill="#D84315" />
        <ellipse cx="50" cy="18" rx="8" ry="4" fill="#FF6F00" opacity="0.8" />
      </svg>

      {/* 5 eggs: more plants */}
      <svg className={`bg-element bg-plants ${hatchedCount >= 5 ? 'visible' : ''}`} viewBox="0 0 200 40" style={{ left: '15%', bottom: '6%', width: '70%' }}>
        <path d="M10 35 Q15 20 10 15 Q20 22 20 35" fill="#66BB6A" />
        <path d="M40 35 Q45 22 42 18 Q50 24 50 35" fill="#81C784" />
        <path d="M80 35 Q82 20 78 12 Q88 22 85 35" fill="#4CAF50" />
        <path d="M120 35 Q125 22 122 16 Q130 24 128 35" fill="#66BB6A" />
        <path d="M160 35 Q162 18 158 10 Q168 20 165 35" fill="#81C784" />
        <path d="M190 35 Q192 24 189 18 Q196 25 194 35" fill="#4CAF50" />
      </svg>

      {/* 6 eggs: pond */}
      <svg className={`bg-element bg-pond ${hatchedCount >= 6 ? 'visible' : ''}`} viewBox="0 0 80 30" style={{ right: '8%', bottom: '6%' }}>
        <ellipse cx="40" cy="15" rx="38" ry="14" fill="#1565C0" opacity="0.5" />
        <ellipse cx="40" cy="15" rx="30" ry="10" fill="#42A5F5" opacity="0.5" />
        <ellipse cx="35" cy="13" rx="12" ry="4" fill="rgba(255,255,255,0.2)" />
      </svg>

      {/* 7 eggs: clouds */}
      <div className={`bg-element bg-clouds ${hatchedCount >= 7 ? 'visible' : ''}`}>
        <svg className="cloud cloud-1" viewBox="0 0 80 35">
          <ellipse cx="30" cy="20" rx="25" ry="12" fill="white" opacity="0.7" />
          <ellipse cx="50" cy="18" rx="20" ry="10" fill="white" opacity="0.7" />
          <ellipse cx="20" cy="22" rx="15" ry="8" fill="white" opacity="0.6" />
        </svg>
        <svg className="cloud cloud-2" viewBox="0 0 80 35">
          <ellipse cx="35" cy="18" rx="22" ry="11" fill="white" opacity="0.6" />
          <ellipse cx="55" cy="20" rx="18" ry="9" fill="white" opacity="0.6" />
        </svg>
      </div>

      {/* 8 eggs: sun */}
      <svg className={`bg-element bg-sun ${hatchedCount >= 8 ? 'visible' : ''}`} viewBox="0 0 60 60" style={{ left: '5%', top: '3%' }}>
        <circle cx="30" cy="30" r="18" fill="#FFD54F" />
        <circle cx="30" cy="30" r="14" fill="#FFEB3B" />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="30" y1="30"
            x2={30 + Math.cos((i * Math.PI) / 4) * 28}
            y2={30 + Math.sin((i * Math.PI) / 4) * 28}
            stroke="#FFD54F"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
