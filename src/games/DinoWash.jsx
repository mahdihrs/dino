import { useState } from 'react';
import { DINOS } from '../dinos';
import HomeButton from '../components/HomeButton';
import { ensureAudio, playSqueak, playSplash, playChirp, playVictory } from '../sounds';
import './wash.css';

let uid = Math.floor(Math.random() * 1e9);

function MudSplat({ className }) {
  return (
    <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="32" rx="20" ry="15" fill="#795548" />
      <ellipse cx="18" cy="24" rx="8" ry="6" fill="#6D4C41" />
      <ellipse cx="43" cy="26" rx="7" ry="5" fill="#8D6E63" />
      <ellipse cx="36" cy="44" rx="6" ry="4" fill="#6D4C41" />
      <circle cx="12" cy="38" r="4" fill="#8D6E63" />
      <circle cx="46" cy="40" r="3" fill="#6D4C41" />
    </svg>
  );
}

// Keep splats over the dino's body — all 9 dinos have their mass in the
// center-bottom of the 120x120 viewBox
const SPOT_SLOTS = [
  [36, 56], [52, 50], [65, 60], [42, 68], [30, 70], [57, 74],
];

function makeRound() {
  const dino = DINOS[Math.floor(Math.random() * DINOS.length)];
  const tablet = typeof window !== 'undefined' && window.innerWidth >= 700 && window.innerHeight >= 600;
  const spots = SPOT_SLOTS.map(([x, y]) => ({
    id: uid++,
    x: x + (Math.random() * 10 - 5),
    y: y + (Math.random() * 8 - 4),
    size: (46 + Math.random() * 16) * (tablet ? 1.35 : 1),
    rot: Math.floor(Math.random() * 360),
  }));
  return { dino, spots };
}

export default function DinoWash({ onHome }) {
  const [round, setRound] = useState(makeRound);
  const [spots, setSpots] = useState(round.spots);
  const [foams, setFoams] = useState([]);
  const [phase, setPhase] = useState('washing'); // washing | shake | clean
  const [washed, setWashed] = useState(0);

  const Dino = round.dino.Component;

  function scrub(spot) {
    if (phase !== 'washing') return;
    ensureAudio().catch(() => {});
    playSqueak();

    const foamId = uid++;
    setFoams(fs => [...fs, { id: foamId, x: spot.x, y: spot.y, size: spot.size }]);
    setTimeout(() => setFoams(fs => fs.filter(f => f.id !== foamId)), 750);

    setSpots(ss => {
      const left = ss.filter(s => s.id !== spot.id);
      if (left.length === 0) {
        setTimeout(() => {
          setPhase('shake');
          playSplash();
          setTimeout(() => {
            setPhase('clean');
            setWashed(n => n + 1);
            playVictory();
          }, 900);
        }, 450);
      }
      return left;
    });
  }

  function nextDino() {
    ensureAudio().catch(() => {});
    playChirp();
    const r = makeRound();
    setRound(r);
    setSpots(r.spots);
    setFoams([]);
    setPhase('washing');
  }

  return (
    <div className="wash-game">
      <div className="wash-water" />
      <HomeButton onHome={onHome} />

      <div className="wash-header">
        <h1 className="wash-title">🧽 Dino Wash!</h1>
        <p className="wash-counter">
          {washed} {washed === 1 ? 'dino' : 'dinos'} washed
        </p>
      </div>

      <div className={`wash-stage phase-${phase}`}>
        <div className="wash-dino">
          <Dino className="wash-dino-svg" />
        </div>

        {spots.map(s => (
          <div
            key={s.id}
            className="mud-spot"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
            }}
            onClick={() => scrub(s)}
          >
            <MudSplat className="mud-svg" />
          </div>
        ))}

        {foams.map(f => (
          <div
            key={f.id}
            className="foam"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}
          >
            <span className="foam-sponge">🧽</span>
            {[...Array(6)].map((_, i) => (
              <span key={i} className="foam-bubble" style={{ '--angle': `${i * 60 + 15}deg` }} />
            ))}
          </div>
        ))}

        {phase === 'shake' && (
          <div className="shake-drops">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="shake-drop" style={{ '--angle': `${i * 45}deg`, '--delay': `${(i % 3) * 0.08}s` }} />
            ))}
          </div>
        )}

        {phase === 'clean' && (
          <>
            <div className="clean-sparkles">
              <span className="clean-sparkle cs1">✨</span>
              <span className="clean-sparkle cs2">✨</span>
              <span className="clean-sparkle cs3">⭐</span>
              <span className="clean-sparkle cs4">✨</span>
            </div>
            <div className="clean-bubble">So clean! ✨</div>
          </>
        )}
      </div>

      <div className="wash-footer">
        {phase === 'washing' && spots.length === SPOT_SLOTS.length && (
          <p className="wash-hint">Tap the mud to scrub!</p>
        )}
        {phase === 'clean' && (
          <button className="play-again wash-again" onClick={nextDino}>
            Wash another dino!
          </button>
        )}
      </div>
    </div>
  );
}
