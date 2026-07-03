import { useState, useEffect } from 'react';
import { DINOS } from '../dinos';
import HomeButton from '../components/HomeButton';
import { ensureAudio, playPop, playBoing, playChirp } from '../sounds';
import './bubble.css';

let uid = Math.floor(Math.random() * 1e9);
const DINO_MAP = Object.fromEntries(DINOS.map(d => [d.id, d]));

function makeBubble() {
  const dino = DINOS[Math.floor(Math.random() * DINOS.length)];
  const tablet = typeof window !== 'undefined' && window.innerWidth >= 700 && window.innerHeight >= 600;
  return {
    id: uid++,
    x: 6 + Math.random() * 70,
    dur: 9 + Math.random() * 5,
    sway: 2.6 + Math.random() * 2,
    size: (88 + Math.random() * 34) * (tablet ? 1.35 : 1),
    dinoId: dino.id,
    born: Date.now(),
  };
}

export default function BubblePop({ onHome }) {
  const [bubbles, setBubbles] = useState(() => [makeBubble()]);
  const [bursts, setBursts] = useState([]);
  const [landed, setLanded] = useState([]);
  const [freed, setFreed] = useState(0);
  const [hopId, setHopId] = useState(null);

  useEffect(() => {
    const iv = setInterval(() => {
      setBubbles(bs => {
        const now = Date.now();
        const alive = bs.filter(b => now - b.born < b.dur * 1000);
        return alive.length >= 5 ? alive : [...alive, makeBubble()];
      });
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  function pop(b, e) {
    ensureAudio().catch(() => {});
    playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setBubbles(bs => bs.filter(x => x.id !== b.id));

    const burstId = uid++;
    setBursts(xs => [...xs, { id: burstId, x: cx, y: cy, size: b.size }]);
    setTimeout(() => setBursts(xs => xs.filter(x => x.id !== burstId)), 550);

    const fall = Math.max(30, window.innerHeight * 0.88 - cy);
    setLanded(ds => [
      ...ds,
      {
        id: uid++,
        xPct: Math.min(84, Math.max(2, (cx / window.innerWidth) * 100 - 8)),
        fall,
        dinoId: b.dinoId,
        flip: Math.random() < 0.5,
      },
    ].slice(-8));
    setFreed(n => n + 1);
    setTimeout(playBoing, 600);
  }

  function hop(id) {
    ensureAudio().catch(() => {});
    playChirp();
    setHopId(id);
    setTimeout(() => setHopId(h => (h === id ? null : h)), 550);
  }

  return (
    <div className="bubble-game">
      <div className="bp-sun" />
      <div className="bp-cloud bp-cloud-1" />
      <div className="bp-cloud bp-cloud-2" />
      <div className="bubble-ground" />

      <HomeButton onHome={onHome} />

      <div className="bubble-header">
        <h1 className="bubble-title">🫧 Bubble Pop!</h1>
        <p className="bubble-counter">{freed} {freed === 1 ? 'dino' : 'dinos'} freed</p>
      </div>

      {bubbles.map(b => {
        const Dino = DINO_MAP[b.dinoId].Component;
        return (
          <div
            key={b.id}
            className="bubble-rise"
            style={{ left: `${b.x}%`, width: b.size, height: b.size, animationDuration: `${b.dur}s` }}
            onClick={e => pop(b, e)}
          >
            <div className="bubble-sway" style={{ animationDuration: `${b.sway}s` }}>
              <div className="bubble-skin">
                <Dino className="bubble-dino" />
              </div>
            </div>
          </div>
        );
      })}

      {bursts.map(bu => (
        <div
          key={bu.id}
          className="bubble-burst"
          style={{ left: bu.x, top: bu.y, '--bsize': `${bu.size}px` }}
        >
          <div className="burst-ring" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="burst-drop" style={{ '--angle': `${i * 60}deg` }} />
          ))}
        </div>
      ))}

      {landed.map(d => {
        const Dino = DINO_MAP[d.dinoId].Component;
        return (
          <div
            key={d.id}
            className="landed"
            style={{ left: `${d.xPct}%`, '--fall-dist': `${d.fall}px` }}
          >
            <div className="landed-fall">
              <div className="landed-waddle" onClick={() => hop(d.id)}>
                <div className={`landed-hop ${hopId === d.id ? 'hopping' : ''}`}>
                  <div className="landed-flip" style={{ transform: d.flip ? 'scaleX(-1)' : 'none' }}>
                    <Dino className="landed-svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
