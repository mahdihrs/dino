import { useState, useCallback, useRef } from 'react';
import { DINOS } from '../dinos';
import Egg from '../components/Egg';
import Background from '../components/Background';
import Confetti from '../components/Confetti';
import HomeButton from '../components/HomeButton';
import { playVictory } from '../sounds';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DinoHatch({ onHome }) {
  const [eggs, setEggs] = useState(() => shuffle(DINOS));
  const [hatched, setHatched] = useState(new Set());
  const [animating, setAnimating] = useState(false);
  const [won, setWon] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const shakeRef = useRef(false);

  const hatchedCount = hatched.size;

  const handleHatch = useCallback((id) => {
    setHatched(prev => {
      const next = new Set(prev);
      next.add(id);
      if (next.size === 9) {
        setTimeout(() => {
          playVictory();
          setWon(true);
        }, 500);
      }
      return next;
    });
  }, []);

  const shakeScreen = useCallback(() => {
    if (shakeRef.current) return;
    shakeRef.current = true;
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      shakeRef.current = false;
    }, 500);
  }, []);

  function handleReset() {
    setEggs(shuffle(DINOS));
    setHatched(new Set());
    setAnimating(false);
    setWon(false);
    setGameKey(k => k + 1);
  }

  return (
    <div className={`game-container ${shaking ? 'screen-shake' : ''}`}>
      <Background hatchedCount={hatchedCount} />
      <HomeButton onHome={onHome} />

      <div className="game-content">
        <h1 className="game-title">🦕 Dino Hatch!</h1>
        <p className="game-counter">{hatchedCount} / 9 hatched</p>

        <div className="egg-grid">
          {eggs.map((dino) => (
            <Egg
              key={`${gameKey}-${dino.id}`}
              dino={dino}
              isAnimating={animating}
              onAnimStart={() => setAnimating(true)}
              onAnimEnd={() => setAnimating(false)}
              onHatch={() => handleHatch(dino.id)}
              shakeScreen={shakeScreen}
            />
          ))}
        </div>

        {won && (
          <div className="win-state">
            <Confetti />
            <p className="win-text">You found them all! 🎉</p>
            <button className="play-again" onClick={handleReset}>
              Play Again!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
