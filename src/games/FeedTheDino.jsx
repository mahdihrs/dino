import { useState, useRef } from 'react';
import HomeButton from '../components/HomeButton';
import { ensureAudio, playChomp, playYum, playYuck, playBurp } from '../sounds';
import './feed.css';

let uid = Math.floor(Math.random() * 1e9);

/* --- Food SVGs (48x48) --- */

function Melon({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18 A19 19 0 0 0 42 18 Z" fill="#EF5350" />
      <path d="M5 17 A20 20 0 0 0 43 17 L40 19 A17 17 0 0 1 8 19 Z" fill="#66BB6A" />
      <ellipse cx="18" cy="24" rx="1.8" ry="2.6" fill="#37474F" />
      <ellipse cx="26" cy="27" rx="1.8" ry="2.6" fill="#37474F" />
      <ellipse cx="32" cy="22" rx="1.8" ry="2.6" fill="#37474F" />
    </svg>
  );
}

function Cookie({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="17" fill="#D7A86E" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="#C08D4E" strokeWidth="2" />
      <circle cx="17" cy="19" r="3" fill="#5D4037" />
      <circle cx="29" cy="16" r="2.5" fill="#5D4037" />
      <circle cx="32" cy="27" r="3" fill="#5D4037" />
      <circle cx="21" cy="30" r="2.5" fill="#5D4037" />
    </svg>
  );
}

function Broccoli({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="26" width="8" height="14" rx="4" fill="#AED581" />
      <circle cx="16" cy="20" r="9" fill="#43A047" />
      <circle cx="28" cy="14" r="10" fill="#4CAF50" />
      <circle cx="33" cy="24" r="8" fill="#43A047" />
      <circle cx="22" cy="24" r="7" fill="#66BB6A" />
    </svg>
  );
}

function IceCream({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 22 L24 44 L32 22 Z" fill="#D7A86E" />
      <path d="M18 26 L30 26 M19.5 31 L28.5 31 M21.5 36 L26.5 36" stroke="#B8834A" strokeWidth="1.5" />
      <circle cx="24" cy="16" r="11" fill="#F48FB1" />
      <circle cx="20" cy="12" r="3" fill="rgba(255,255,255,.5)" />
      <circle cx="24" cy="5" r="3" fill="#C62828" />
    </svg>
  );
}

function Sock({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6 H30 V22 Q30 30 24 33 L19 36 Q11 40 9 33 Q7 27 14 24 L18 22 Z" fill="#ECEFF1" />
      <rect x="18" y="6" width="12" height="5" rx="2" fill="#42A5F5" />
      <rect x="18" y="13" width="12" height="3" rx="1.5" fill="#90CAF9" />
    </svg>
  );
}

function Boot({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8 H28 V26 L38 30 Q42 32 40 36 Q38 39 33 38 L14 36 Q12 30 14 24 Z" fill="#8D6E63" />
      <rect x="16" y="8" width="12" height="5" rx="2" fill="#6D4C41" />
      <path d="M14 34 L40 37 L40 39 Q38 41 33 40 L15 38 Z" fill="#4E342E" />
    </svg>
  );
}

const FOODS = [
  { id: 'melon', yum: true, Component: Melon },
  { id: 'cookie', yum: true, Component: Cookie },
  { id: 'broccoli', yum: true, Component: Broccoli },
  { id: 'icecream', yum: true, Component: IceCream },
  { id: 'sock', yum: false, Component: Sock },
  { id: 'boot', yum: false, Component: Boot },
];

/* --- Big dino --- */

function BigDino({ belly }) {
  return (
    <svg viewBox="0 0 240 240" className="big-dino-svg" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <path d="M62 172 Q22 152 12 120 Q32 140 64 152 Z" fill="#4CAF50" />
      {/* Body */}
      <ellipse cx="103" cy="170" rx="60" ry="46" fill="#66BB6A" />
      {/* Belly (grows as it eats) */}
      <ellipse
        className="belly"
        cx="103" cy="184" rx="40" ry="30" fill="#C5E1A5"
        style={{ transform: `scale(${1 + belly * 0.06})` }}
      />
      {/* Legs */}
      <rect x="68" y="204" width="26" height="30" rx="13" fill="#4CAF50" />
      <rect x="116" y="204" width="26" height="30" rx="13" fill="#4CAF50" />
      {/* Arm */}
      <ellipse cx="140" cy="158" rx="10" ry="16" fill="#4CAF50" transform="rotate(-24 140 158)" />

      <g className="head">
        {/* Neck */}
        <ellipse cx="133" cy="120" rx="26" ry="32" fill="#66BB6A" />
        {/* Head */}
        <circle cx="150" cy="76" r="42" fill="#66BB6A" />
        {/* Upper snout */}
        <ellipse cx="186" cy="86" rx="27" ry="15" fill="#81C784" />
        <circle cx="200" cy="81" r="2.5" fill="#33691E" />
        {/* Mouth interior */}
        <ellipse cx="176" cy="103" rx="25" ry="13" fill="#7B1F2B" />
        {/* Tongue (yuck only) */}
        <ellipse className="tongue" cx="192" cy="116" rx="10" ry="16" fill="#F48FB1" transform="rotate(24 192 116)" />
        {/* Lower jaw */}
        <path className="jaw" d="M148 102 Q176 100 202 96 Q201 119 178 124 Q157 127 146 112 Z" fill="#4CAF50" />
        {/* Eye (normal) */}
        <g className="eye-open">
          <circle cx="152" cy="62" r="10" fill="#fff" />
          <circle cx="155" cy="63" r="5.5" fill="#263238" />
          <circle cx="157" cy="61" r="2" fill="#fff" />
        </g>
        {/* Eye (happy arc) */}
        <path className="eye-happy" d="M143 63 Q152 53 161 63" stroke="#263238" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        {/* Blush */}
        <circle className="blush" cx="130" cy="86" r="8" fill="#FF8A80" opacity="0.55" />
      </g>
    </svg>
  );
}

export default function FeedTheDino({ onHome }) {
  const [phase, setPhase] = useState('idle');
  const [flying, setFlying] = useState(null);
  const [fed, setFed] = useState(0);
  const dinoRef = useRef(null);

  const belly = fed % 5;

  function feed(food, e) {
    if (phase !== 'idle') return;
    ensureAudio().catch(() => {});

    const r = e.currentTarget.getBoundingClientRect();
    const m = dinoRef.current.getBoundingClientRect();
    const startX = r.left + r.width / 2;
    const startY = r.top + r.height / 2;
    const dx = (m.left + m.width * 0.72) - startX;
    const dy = (m.top + m.height * 0.42) - startY;

    setFlying({ id: uid++, x: startX, y: startY, dx, dy, Component: food.Component });
    setPhase('fly');

    setTimeout(() => {
      setFlying(null);
      setPhase('chomp');
      playChomp();
      setTimeout(playChomp, 230);
      setTimeout(playChomp, 460);

      setTimeout(() => {
        if (food.yum) {
          const count = fed + 1;
          setFed(count);
          if (count % 5 === 0) {
            setPhase('burp');
            setTimeout(playBurp, 250);
            setTimeout(() => setPhase('idle'), 1500);
          } else {
            setPhase('yum');
            playYum();
            setTimeout(() => setPhase('idle'), 1100);
          }
        } else {
          setPhase('yuck');
          playYuck();
          setTimeout(() => setPhase('idle'), 1200);
        }
      }, 720);
    }, 620);
  }

  return (
    <div className="feed-game">
      <div className="feed-ground" />
      <HomeButton onHome={onHome} />

      <div className="feed-header">
        <h1 className="feed-title">🍉 Feed the Dino!</h1>
        <p className="feed-counter">{fed} {fed === 1 ? 'snack' : 'snacks'} eaten</p>
      </div>

      <div className={`dino-stage big-dino phase-${phase}`} ref={dinoRef}>
        <BigDino belly={belly} />

        {phase === 'yum' && (
          <div className="hearts">
            <span className="heart h1">❤️</span>
            <span className="heart h2">💚</span>
            <span className="heart h3">💛</span>
          </div>
        )}
        {phase === 'yuck' && <div className="reaction-bubble">Bleh! 😝</div>}
        {phase === 'burp' && <div className="reaction-bubble burp-bubble">BUUURP! 💨</div>}
      </div>

      <div className="food-tray">
        {FOODS.map(f => {
          const Food = f.Component;
          return (
            <button
              key={f.id}
              className="food-btn"
              disabled={phase !== 'idle'}
              onClick={e => feed(f, e)}
            >
              <Food />
            </button>
          );
        })}
      </div>

      {flying && (
        <div
          className="fly-food"
          style={{ left: flying.x, top: flying.y, '--dx': `${flying.dx}px`, '--dy': `${flying.dy}px` }}
        >
          <flying.Component />
        </div>
      )}
    </div>
  );
}
