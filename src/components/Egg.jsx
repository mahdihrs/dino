import { useState, useEffect, useRef } from 'react';
import { playWobble, playCrack, playHatch, trickSounds, ensureAudio } from '../sounds';

const STATES = { IDLE: 'idle', WOBBLING: 'wobbling', CRACKING: 'cracking', HATCHING: 'hatching', HATCHED: 'hatched' };

export default function Egg({ dino, isAnimating, onAnimStart, onAnimEnd, onHatch, shakeScreen, gameKey }) {
  const [state, setState] = useState(STATES.IDLE);
  const [trickActive, setTrickActive] = useState(false);
  const trickRef = useRef(false);
  const { Component: DinoSVG, eggColor, eggSpots, eggSize = 1, name, id } = dino;

  useEffect(() => {
    setState(STATES.IDLE);
    setTrickActive(false);
    trickRef.current = false;
  }, [gameKey]);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(() => { if (!cancelled) fn(); }, ms); timers.push(t); };

    if (state === STATES.WOBBLING) {
      playWobble();
      later(() => playWobble(), 400);
      later(() => playWobble(), 800);
      later(() => { setState(STATES.CRACKING); playCrack(); }, 1500);
    }
    if (state === STATES.CRACKING) {
      later(() => { setState(STATES.HATCHING); playHatch(); }, 800);
    }
    if (state === STATES.HATCHING) {
      later(() => { setState(STATES.HATCHED); onAnimEnd(); onHatch(); }, 600);
    }

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [state, onAnimEnd, onHatch]);

  function handleTap() {
    ensureAudio().catch(() => {});
    if (state === STATES.IDLE && !isAnimating) {
      onAnimStart();
      setState(STATES.WOBBLING);
    }
    if (state === STATES.HATCHED && !trickRef.current) {
      trickRef.current = true;
      setTrickActive(true);
      if (trickSounds[id]) trickSounds[id]();
      if (id === 'trex') shakeScreen();
      setTimeout(() => {
        setTrickActive(false);
        trickRef.current = false;
      }, 1200);
    }
  }

  const scale = eggSize;

  if (state === STATES.HATCHED || state === STATES.HATCHING) {
    return (
      <div className="egg-cell" onClick={handleTap} style={{ touchAction: 'manipulation' }}>
        {state === STATES.HATCHING && (
          <>
            <div className="egg-half egg-top" style={{ background: eggColor }} />
            <div className="egg-half egg-bottom" style={{ background: eggColor }} />
          </>
        )}
        <div className={`dino-reveal ${state === STATES.HATCHED ? 'visible' : 'appearing'} ${trickActive ? `trick trick-${id}` : ''}`}>
          <DinoSVG className="dino-svg" />
        </div>
        {state === STATES.HATCHING && <Sparkles color={eggColor} />}
        {state === STATES.HATCHED && <div className="dino-name">{name}</div>}
      </div>
    );
  }

  return (
    <div className="egg-cell" onClick={handleTap} style={{ touchAction: 'manipulation' }}>
      <div
        className={`egg ${state}`}
        style={{
          '--egg-color': eggColor,
          '--egg-spots': eggSpots,
          '--egg-scale': scale,
        }}
      >
        <div className="egg-body">
          <div className="egg-spot spot-1" />
          <div className="egg-spot spot-2" />
          <div className="egg-spot spot-3" />
        </div>
        {state === STATES.CRACKING && (
          <svg className="crack-lines" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 20 L35 35 L42 45 L38 60" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 30 L45 42 L50 55" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function Sparkles({ color }) {
  return (
    <div className="sparkles">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            '--angle': `${i * 60}deg`,
            '--delay': `${i * 0.05}s`,
            background: color,
          }}
        />
      ))}
    </div>
  );
}
