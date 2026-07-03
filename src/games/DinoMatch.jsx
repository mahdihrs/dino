import { useState, useRef } from 'react';
import { DINOS } from '../dinos';
import HomeButton from '../components/HomeButton';
import Confetti from '../components/Confetti';
import { ensureAudio, playFlip, playYuck, playVictory, trickSounds } from '../sounds';
import './match.css';

const LEVELS = [3, 4, 6]; // pairs per round — grows as they win
const DINO_MAP = Object.fromEntries(DINOS.map(d => [d.id, d]));

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeDeck(nPairs) {
  const picks = shuffle(DINOS).slice(0, nPairs);
  return shuffle(picks.flatMap(d => [
    { key: `${d.id}-a`, dinoId: d.id },
    { key: `${d.id}-b`, dinoId: d.id },
  ]));
}

function CardBack() {
  return (
    <svg viewBox="0 0 60 76" className="mcard-back-egg" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="40" rx="22" ry="28" fill="rgba(255,255,255,0.85)" />
      <circle cx="23" cy="30" r="4.5" fill="rgba(126,87,194,0.45)" />
      <circle cx="37" cy="44" r="4" fill="rgba(126,87,194,0.45)" />
      <circle cx="26" cy="52" r="3.5" fill="rgba(126,87,194,0.45)" />
      <text x="30" y="46" textAnchor="middle" fontSize="22" fontWeight="800" fill="#7e57c2">?</text>
    </svg>
  );
}

export default function DinoMatch({ onHome }) {
  const [wins, setWins] = useState(0);
  const [deck, setDeck] = useState(() => makeDeck(LEVELS[0]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(() => new Set());
  const [won, setWon] = useState(false);
  // Refs mirror flipped/lock so two taps landing in the same tick can't
  // read stale state and overwrite each other
  const flippedRef = useRef([]);
  const lockRef = useRef(false);

  const totalPairs = deck.length / 2;
  const foundPairs = matched.size / 2;

  function setFlippedBoth(v) {
    flippedRef.current = v;
    setFlipped(v);
  }

  function tap(i) {
    if (lockRef.current || won || matched.has(i) || flippedRef.current.includes(i)) return;
    ensureAudio().catch(() => {});
    playFlip();

    if (flippedRef.current.length === 0) {
      setFlippedBoth([i]);
      return;
    }

    const j = flippedRef.current[0];
    setFlippedBoth([j, i]);
    lockRef.current = true;

    if (deck[j].dinoId === deck[i].dinoId) {
      // match — let the flip finish, then celebrate with that dino's own sound
      setTimeout(() => {
        trickSounds[deck[i].dinoId]?.();
        setMatched(m => {
          const next = new Set(m);
          next.add(i);
          next.add(j);
          if (next.size === deck.length) {
            setTimeout(() => {
              setWon(true);
              setWins(n => n + 1);
              playVictory();
            }, 650);
          }
          return next;
        });
        setFlippedBoth([]);
        lockRef.current = false;
      }, 400);
    } else {
      // no match — brief glimpse, then both flip back
      setTimeout(() => {
        playYuck();
        setFlippedBoth([]);
        lockRef.current = false;
      }, 700);
    }
  }

  function nextRound() {
    ensureAudio().catch(() => {});
    const nPairs = LEVELS[Math.min(wins, LEVELS.length - 1)];
    setDeck(makeDeck(nPairs));
    setFlippedBoth([]);
    setMatched(new Set());
    lockRef.current = false;
    setWon(false);
  }

  const cols = deck.length <= 6 ? 3 : 4;
  const levelingUp = wins < LEVELS.length;

  return (
    <div className="match-game">
      <HomeButton onHome={onHome} />

      <div className="match-header">
        <h1 className="match-title">🦖 Dino Match!</h1>
        <p className="match-counter">{foundPairs} / {totalPairs} pairs found</p>
      </div>

      <div className={`match-grid match-cols-${cols}`}>
        {deck.map((c, i) => {
          const D = DINO_MAP[c.dinoId].Component;
          const isUp = flipped.includes(i) || matched.has(i);
          return (
            <button
              key={c.key}
              className={`mcard ${isUp ? 'up' : ''} ${matched.has(i) ? 'matched' : ''}`}
              onClick={() => tap(i)}
            >
              <div className="mcard-inner">
                <div className="mcard-back">
                  <CardBack />
                </div>
                <div
                  className="mcard-front"
                  style={{ background: `${DINO_MAP[c.dinoId].eggColor}22` }}
                >
                  <D className="mcard-dino" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {won && (
        <div className="match-win">
          <Confetti />
          <p className="match-win-text">You found all the pairs! 🎉</p>
          <button className="play-again" onClick={nextRound}>
            {levelingUp ? 'More dinos!' : 'Play Again!'}
          </button>
        </div>
      )}
    </div>
  );
}
