import { useState, useRef, useEffect, useReducer } from 'react';
import { DINOS } from '../dinos';
import Pteranodon from '../dinos/Pteranodon';
import HomeButton from '../components/HomeButton';
import Confetti from '../components/Confetti';
import { ensureAudio, playJump, playCoin, playBonk, playChirp, playVictory } from '../sounds';
import './run.css';

let uid = Math.floor(Math.random() * 1e9);

const SPEED = 185;       // px/s world scroll
const GRAVITY = 1750;    // px/s^2
const JUMP_V = 640;      // px/s -> ~115px jump height
const DINO_X = 85;       // dino's fixed x on screen
const GROUND_H = 92;
const DINO_SIZE = 76;

// Obstacle hitbox sizes
const OB = {
  rock:   { w: 40, h: 34 },
  cactus: { w: 34, h: 48 },
  roller: { w: 38, h: 38 },
  flyer:  { w: 46, h: 34 },
};

function CoinSVG({ className, style }) {
  return (
    <svg viewBox="0 0 32 32" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#FBC02D" />
      <circle cx="16" cy="16" r="10" fill="#FDD835" />
      <ellipse cx="12" cy="11" rx="4" ry="2.5" fill="rgba(255,255,255,.55)" transform="rotate(-30 12 11)" />
    </svg>
  );
}

function FlagSVG({ className, style }) {
  return (
    <svg viewBox="0 0 60 190" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="0" width="7" height="180" rx="3.5" fill="#8D6E63" />
      <circle cx="9.5" cy="4" r="6" fill="#FDD835" />
      <path d="M13 10 L56 24 L13 38 Z" fill="#EF5350" />
      <rect x="0" y="176" width="34" height="14" rx="5" fill="#795548" />
    </svg>
  );
}

function CloudSVG({ className, style }) {
  return (
    <svg viewBox="0 0 90 40" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="26" rx="26" ry="13" fill="#fff" opacity=".9" />
      <ellipse cx="56" cy="22" rx="20" ry="11" fill="#fff" opacity=".85" />
      <ellipse cx="44" cy="15" rx="16" ry="10" fill="#fff" opacity=".95" />
    </svg>
  );
}

function BushSVG({ className, style }) {
  return (
    <svg viewBox="0 0 80 36" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="24" rx="20" ry="13" fill="#66BB6A" />
      <ellipse cx="46" cy="20" rx="18" ry="15" fill="#4CAF50" />
      <ellipse cx="64" cy="26" rx="14" ry="10" fill="#81C784" />
    </svg>
  );
}

function RockSVG({ className }) {
  return (
    <svg viewBox="0 0 40 34" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 34 Q2 16 12 8 Q22 2 32 10 Q39 17 37 34 Z" fill="#90A4AE" />
      <path d="M10 34 Q9 20 16 14" stroke="#78909C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="26" cy="14" rx="5" ry="3" fill="#B0BEC5" />
    </svg>
  );
}

function CactusSVG({ className }) {
  return (
    <svg viewBox="0 0 34 48" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="13" y="6" width="9" height="42" rx="4.5" fill="#66BB6A" />
      <rect x="2" y="14" width="8" height="16" rx="4" fill="#4CAF50" />
      <rect x="4" y="26" width="10" height="7" rx="3.5" fill="#4CAF50" />
      <rect x="24" y="10" width="8" height="14" rx="4" fill="#4CAF50" />
      <rect x="21" y="20" width="10" height="7" rx="3.5" fill="#4CAF50" />
      <circle cx="17.5" cy="9" r="2" fill="#FFEE58" />
    </svg>
  );
}

function RollerSVG({ className }) {
  return (
    <svg viewBox="0 0 38 38" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="19" cy="19" r="17" fill="#A1887F" />
      <circle cx="19" cy="19" r="11" fill="#8D6E63" />
      <path d="M19 4 L19 12 M19 26 L19 34 M4 19 L12 19 M26 19 L34 19" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="19" r="4" fill="#5D4037" />
    </svg>
  );
}

function makeLevel(levelNum) {
  const coins = [];
  let x = 420;
  while (x < 3050) {
    if (Math.random() < 0.5) {
      for (let i = 0; i < 3; i++) coins.push({ id: uid++, x: x + i * 46, y: 18, got: false });
    } else {
      coins.push({ id: uid++, x, y: 40, got: false });
      coins.push({ id: uid++, x: x + 52, y: 94, got: false });
      coins.push({ id: uid++, x: x + 104, y: 40, got: false });
    }
    x += 270 + Math.random() * 160;
  }

  const decor = [];
  for (let d = 150; d < 3500; d += 260 + Math.random() * 240) {
    decor.push({
      id: uid++,
      x: d,
      type: Math.random() < 0.45 ? 'cloud' : 'bush',
      alt: 380 + Math.random() * 180, // cloud height above the ground (world px)
    });
  }

  const obstacles = [];
  if (levelNum >= 2) {
    let ox = 650;
    let i = 0;
    const gap = levelNum === 3 ? 560 : 400;
    while (ox < 2950) {
      obstacles.push({
        id: uid++, x: ox, type: i % 2 ? 'cactus' : 'rock',
        hit: false, phase: Math.random() * 6.28, ox, oy: 0,
      });
      i++;
      ox += gap + Math.random() * 140;
    }
  }
  if (levelNum >= 3) {
    for (const [mx, mtype] of [[900, 'roller'], [1650, 'flyer'], [2300, 'roller'], [2850, 'flyer']]) {
      obstacles.push({
        id: uid++, x: mx, type: mtype,
        hit: false, phase: Math.random() * 6.28,
        ox: mx, oy: mtype === 'flyer' ? 44 : 0,
      });
    }
  }

  return { coins, decor, obstacles, flagX: 3400 };
}

function makeWorld(level) {
  return {
    scroll: 0, y: 0, vy: 0, onGround: true,
    coinCount: 0, finished: false, winHandled: false,
    t: 0, stumble: 0, level,
  };
}

function step(w, dt) {
  if (w.finished) return;
  w.t += dt;
  w.stumble = Math.max(0, w.stumble - dt);
  w.scroll += (w.stumble > 0 ? SPEED * 0.4 : SPEED) * dt;

  if (!w.onGround) {
    w.vy -= GRAVITY * dt;
    w.y += w.vy * dt;
    if (w.y <= 0) {
      w.y = 0;
      w.vy = 0;
      w.onGround = true;
    }
  }

  const dinoCx = w.scroll + DINO_X + DINO_SIZE / 2;
  const dinoCy = w.y + 34;
  for (const c of w.level.coins) {
    if (!c.got && Math.abs(c.x - dinoCx) < 40 && Math.abs(c.y - dinoCy) < 52) {
      c.got = true;
      w.coinCount++;
      playCoin();
    }
  }

  for (const o of w.level.obstacles) {
    if (o.type === 'roller') {
      o.ox = o.x + Math.sin(w.t * 1.5 + o.phase) * 70;
      o.oy = 0;
    } else if (o.type === 'flyer') {
      o.ox = o.x;
      o.oy = 44 + Math.sin(w.t * 2 + o.phase) * 32;
    }
    if (!o.hit && w.stumble === 0) {
      const dims = OB[o.type];
      const overlapX = Math.abs((o.ox + dims.w / 2) - dinoCx) < dims.w / 2 + 22;
      const dinoBottom = w.y;
      const dinoTop = w.y + 56;
      if (overlapX && dinoBottom < o.oy + dims.h - 4 && dinoTop > o.oy + 4) {
        o.hit = true;
        w.stumble = 0.7;
        playBonk();
      }
    }
  }

  if (w.scroll + DINO_X >= w.level.flagX - 40) {
    w.finished = true;
  }
}

const LEVEL_INFO = [
  { n: 1, emoji: '🌱', name: 'Level 1', tag: 'Just run!' },
  { n: 2, emoji: '🪨', name: 'Level 2', tag: 'Jump the rocks!' },
  { n: 3, emoji: '🌋', name: 'Level 3', tag: 'Look out!' },
];

export default function DinoRun({ onHome }) {
  const [phase, setPhase] = useState('select'); // select | level | play | win
  const [dino, setDino] = useState(DINOS[0]);
  const [level, setLevel] = useState(1);
  const worldRef = useRef(null);
  const [, force] = useReducer(c => c + 1, 0);

  useEffect(() => {
    if (phase !== 'play') return;
    let raf, winTimer;
    let last = performance.now();

    const finish = () => {
      const w = worldRef.current;
      if (w.winHandled) return;
      w.winHandled = true;
      playVictory();
      winTimer = setTimeout(() => setPhase('win'), 700);
    };

    const loop = (t) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const w = worldRef.current;
      step(w, dt);
      force();
      if (w.finished) {
        finish();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    if (import.meta.env.DEV) {
      window.__runStep = (secs) => {
        const w = worldRef.current;
        for (let i = 0; i < Math.round(secs * 60) && !w.finished; i++) step(w, 1 / 60);
        force();
        if (w.finished) finish();
      };
      window.__runWorld = () => {
        const w = worldRef.current;
        return {
          scroll: w.scroll, y: w.y, vy: w.vy, onGround: w.onGround,
          finished: w.finished, coins: w.coinCount, stumble: w.stumble,
          obstacles: w.level.obstacles.length,
          hits: w.level.obstacles.filter(o => o.hit).length,
          movers: w.level.obstacles.filter(o => o.type === 'roller' || o.type === 'flyer')
            .map(o => ({ type: o.type, ox: Math.round(o.ox), oy: Math.round(o.oy) })),
        };
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(winTimer);
      if (import.meta.env.DEV) {
        delete window.__runStep;
        delete window.__runWorld;
      }
    };
  }, [phase]);

  function start(d) {
    ensureAudio().catch(() => {});
    playChirp();
    setDino(d);
    setPhase('level');
  }

  function pickLevel(n) {
    ensureAudio().catch(() => {});
    playChirp();
    setLevel(n);
    worldRef.current = makeWorld(makeLevel(n));
    setPhase('play');
  }

  function jump() {
    ensureAudio().catch(() => {});
    const w = worldRef.current;
    if (phase === 'play' && w && w.onGround && !w.finished) {
      w.onGround = false;
      w.vy = JUMP_V;
      playJump();
    }
  }

  const w = worldRef.current;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 400;
  const DinoC = dino.Component;

  const visCoins = w
    ? w.level.coins.filter(c => !c.got && c.x - w.scroll > -60 && c.x - w.scroll < vw + 60)
    : [];
  const visDecor = w
    ? w.level.decor.filter(d => d.x - w.scroll > -140 && d.x - w.scroll < vw + 140)
    : [];
  const visObstacles = w
    ? w.level.obstacles.filter(o => o.ox - w.scroll > -120 && o.ox - w.scroll < vw + 120)
    : [];
  const flagLeft = w ? w.level.flagX - w.scroll : Infinity;

  return (
    <div className="run-game">
      {w && (
        <div className="run-tap" onPointerDown={jump} onClick={jump}>
          {visDecor.map(d =>
            d.type === 'cloud' ? (
              <CloudSVG key={d.id} className="run-cloud" style={{ left: d.x - w.scroll, bottom: d.alt }} />
            ) : (
              <BushSVG key={d.id} className="run-bush" style={{ left: d.x - w.scroll }} />
            )
          )}

          <div className="run-ground" style={{ backgroundPositionX: `${-w.scroll}px` }} />

          {visCoins.map(c => (
            <div
              key={c.id}
              className="run-coin"
              style={{ left: c.x - w.scroll - 16, bottom: GROUND_H + c.y - 16 }}
            >
              <CoinSVG className="run-coin-svg" />
            </div>
          ))}

          {visObstacles.map(o => {
            const dims = OB[o.type];
            return (
              <div
                key={o.id}
                className={`run-ob run-ob-${o.type} ${o.hit ? 'hit' : ''}`}
                style={{ left: o.ox - w.scroll, bottom: GROUND_H + o.oy, width: dims.w, height: dims.h }}
              >
                {o.type === 'rock' && <RockSVG className="run-ob-svg" />}
                {o.type === 'cactus' && <CactusSVG className="run-ob-svg" />}
                {o.type === 'roller' && <RollerSVG className="run-ob-svg run-ob-spin" />}
                {o.type === 'flyer' && <Pteranodon className="run-ob-svg run-ob-flyer-svg" />}
                {o.hit && <span className="run-ob-pow">💥</span>}
              </div>
            );
          })}

          {flagLeft < vw + 200 && (
            <FlagSVG className="run-flag" style={{ left: flagLeft }} />
          )}

          <div
            className={`run-dino ${w.onGround && !w.finished ? 'bobbing' : ''} ${!w.onGround ? 'air' : ''} ${w.stumble > 0 ? 'stumble' : ''}`}
            style={{ left: DINO_X, bottom: GROUND_H + w.y }}
          >
            <DinoC className="run-dino-svg" />
          </div>
        </div>
      )}

      <HomeButton onHome={onHome} />

      {w && (
        <div className="run-hud">
          <span className="run-hud-level">L{level}</span>
          <CoinSVG className="run-hud-coin" />
          <span>× {w.coinCount}</span>
        </div>
      )}

      {phase === 'select' && (
        <div className="run-overlay run-select">
          <h1 className="run-select-title">🏃 Choose your dino!</h1>
          <div className="run-select-grid">
            {DINOS.map(d => {
              const D = d.Component;
              return (
                <button key={d.id} className="run-select-card" onClick={() => start(d)}>
                  <D className="run-select-svg" />
                  <span className="run-select-name">{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'level' && (
        <div className="run-overlay run-levels">
          <h1 className="run-select-title">Pick a level!</h1>
          <div className="run-level-list">
            {LEVEL_INFO.map(li => (
              <button key={li.n} className={`run-level-btn run-level-${li.n}`} onClick={() => pickLevel(li.n)}>
                <span className="run-level-emoji">{li.emoji}</span>
                <span className="run-level-text">
                  <span className="run-level-name">{li.name}</span>
                  <span className="run-level-tag">{li.tag}</span>
                </span>
                <span className="card-go">▶</span>
              </button>
            ))}
          </div>
          <button className="run-change-dino" onClick={() => setPhase('select')}>◀ Change dino</button>
        </div>
      )}

      {phase === 'win' && (
        <div className="run-overlay run-win">
          <Confetti />
          <p className="run-win-text">You did it! 🎉</p>
          <div className="run-win-coins">
            <CoinSVG className="run-hud-coin" />
            <span>× {w.coinCount} collected!</span>
          </div>
          {level < 3 ? (
            <button className="play-again" onClick={() => pickLevel(level + 1)}>Next Level! ▶</button>
          ) : (
            <button className="play-again" onClick={() => pickLevel(level)}>Play Again!</button>
          )}
          {level < 3 && (
            <button className="run-change-dino" onClick={() => pickLevel(level)}>Replay Level {level}</button>
          )}
          <button className="run-change-dino" onClick={() => setPhase('select')}>Choose Dino</button>
        </div>
      )}
    </div>
  );
}
