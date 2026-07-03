import * as Tone from 'tone';

let started = false;
let synth, noiseSynth, membrane;

function initSynths() {
  if (synth) return;
  try {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.1, release: 0.4 },
      volume: -8,
    }).toDestination();
    noiseSynth = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.01, decay: 0.15, sustain: 0, release: 0.1 },
      volume: -18,
    }).toDestination();
    membrane = new Tone.MembraneSynth({
      volume: -10,
    }).toDestination();
  } catch { /* audio unavailable */ }
}

export async function ensureAudio() {
  if (!started) {
    try {
      await Tone.start();
      started = true;
      initSynths();
    } catch { /* audio unavailable */ }
  }
}

export function playWobble() {
  try { membrane?.triggerAttackRelease('C2', '8n'); } catch {}
}

export function playCrack() {
  try { noiseSynth?.triggerAttack(); setTimeout(() => noiseSynth?.triggerRelease(), 80); } catch {}
}

export function playHatch() {
  try {
    const now = Tone.now();
    synth?.triggerAttackRelease('C5', '16n', now);
    synth?.triggerAttackRelease('E5', '16n', now + 0.1);
    synth?.triggerAttackRelease('G5', '16n', now + 0.2);
  } catch {}
}

export function playVictory() {
  try {
    const now = Tone.now();
    synth?.triggerAttackRelease('C5', '8n', now);
    synth?.triggerAttackRelease('E5', '8n', now + 0.15);
    synth?.triggerAttackRelease('G5', '8n', now + 0.3);
    synth?.triggerAttackRelease('C6', '4n', now + 0.45);
  } catch {}
}

const trickSynths = {};

function getTrickSynth(type, config) {
  try {
    if (!trickSynths[type]) {
      trickSynths[type] = new Tone.Synth(config).toDestination();
    }
    return trickSynths[type];
  } catch { return null; }
}

/* --- Bubble Pop sounds --- */

export function playPop() {
  try {
    noiseSynth?.triggerAttack();
    setTimeout(() => noiseSynth?.triggerRelease(), 50);
    synth?.triggerAttackRelease('C6', '32n');
  } catch {}
}

export function playBoing() {
  const s = getTrickSynth('boing', {
    oscillator: { type: 'sine' },
    portamento: 0.1,
    envelope: { attack: 0.01, decay: 0.25, sustain: 0.05, release: 0.15 },
    volume: -8,
  });
  try {
    const now = Tone.now();
    s?.triggerAttackRelease('C4', '8n', now);
    s?.setNote('G4', now + 0.06);
  } catch {}
}

export function playChirp() {
  try {
    const now = Tone.now();
    synth?.triggerAttackRelease('G5', '32n', now);
    synth?.triggerAttackRelease('C6', '32n', now + 0.09);
  } catch {}
}

/* --- Dino Match sounds --- */

export function playFlip() {
  try { synth?.triggerAttackRelease('E5', '32n'); } catch {}
}

/* --- Dino Run sounds --- */

export function playJump() {
  const s = getTrickSynth('jump', {
    oscillator: { type: 'square' },
    portamento: 0.02,
    envelope: { attack: 0.01, decay: 0.12, sustain: 0, release: 0.08 },
    volume: -16,
  });
  try {
    const now = Tone.now();
    s?.triggerAttackRelease('C5', '16n', now);
    s?.setNote('G5', now + 0.05);
  } catch {}
}

export function playCoin() {
  try {
    const now = Tone.now();
    synth?.triggerAttackRelease('B5', '32n', now);
    synth?.triggerAttackRelease('E6', '16n', now + 0.07);
  } catch {}
}

export function playBonk() {
  try { membrane?.triggerAttackRelease('C2', '16n'); } catch {}
  const s = getTrickSynth('bonk', {
    oscillator: { type: 'square' },
    portamento: 0.03,
    envelope: { attack: 0.01, decay: 0.15, sustain: 0, release: 0.1 },
    volume: -14,
  });
  try {
    const now = Tone.now();
    s?.triggerAttackRelease('E4', '16n', now);
    s?.setNote('A3', now + 0.06);
  } catch {}
}

/* --- Dino Wash sounds --- */

export function playSqueak() {
  const s = getTrickSynth('squeak', {
    oscillator: { type: 'sine' },
    portamento: 0.04,
    envelope: { attack: 0.01, decay: 0.12, sustain: 0.05, release: 0.08 },
    volume: -10,
  });
  try {
    const now = Tone.now();
    s?.triggerAttackRelease('E6', '16n', now);
    s?.setNote('B6', now + 0.05);
  } catch {}
}

export function playSplash() {
  try {
    noiseSynth?.triggerAttack();
    setTimeout(() => noiseSynth?.triggerRelease(), 200);
  } catch {}
}

/* --- Feed the Dino sounds --- */

export function playChomp() {
  try { membrane?.triggerAttackRelease('G1', '16n'); } catch {}
}

export function playYum() {
  try {
    const now = Tone.now();
    synth?.triggerAttackRelease('E5', '16n', now);
    synth?.triggerAttackRelease('G5', '16n', now + 0.12);
    synth?.triggerAttackRelease('C6', '8n', now + 0.24);
  } catch {}
}

export function playYuck() {
  const s = getTrickSynth('yuck', {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.02, decay: 0.25, sustain: 0.1, release: 0.2 },
    volume: -12,
  });
  try {
    const now = Tone.now();
    s?.triggerAttackRelease('E3', '16n', now);
    s?.triggerAttackRelease('C3', '16n', now + 0.16);
    s?.triggerAttackRelease('A2', '8n', now + 0.32);
  } catch {}
}

export function playBurp() {
  const s = getTrickSynth('burp', {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.04, decay: 0.5, sustain: 0.3, release: 0.2 },
    volume: -7,
  });
  try {
    s?.triggerAttack('E2');
    s?.frequency.rampTo('G1', 0.35);
    setTimeout(() => { try { s?.triggerRelease(); } catch {} }, 450);
  } catch {}
}

export const trickSounds = {
  trex() {
    const s = getTrickSynth('trex', {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.05, decay: 0.6, sustain: 0.1, release: 0.3 },
      volume: -6,
    });
    s?.triggerAttackRelease('C2', '4n');
  },
  brachio() {
    const s = getTrickSynth('brachio', {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, decay: 0.8, sustain: 0.2, release: 0.5 },
      volume: -8,
    });
    s?.triggerAttackRelease('G2', '4n');
  },
  stego() {
    try {
      const now = Tone.now();
      synth?.triggerAttackRelease('C5', '16n', now);
      synth?.triggerAttackRelease('D5', '16n', now + 0.1);
      synth?.triggerAttackRelease('E5', '16n', now + 0.2);
      synth?.triggerAttackRelease('F5', '16n', now + 0.3);
      synth?.triggerAttackRelease('G5', '16n', now + 0.4);
    } catch {}
  },
  trice() {
    const s = getTrickSynth('trice', {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.1 },
      volume: -10,
    });
    s?.triggerAttackRelease('G3', '8n');
  },
  pteranodon() {
    try { noiseSynth?.triggerAttack(); setTimeout(() => noiseSynth?.triggerRelease(), 300); } catch {}
  },
  ankylo() {
    try { membrane?.triggerAttackRelease('E1', '4n'); } catch {}
  },
  para() {
    const s = getTrickSynth('para', {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.05, decay: 0.4, sustain: 0.3, release: 0.3 },
      volume: -10,
    });
    try {
      const now = Tone.now();
      s?.triggerAttackRelease('C4', '8n', now);
      s?.triggerAttackRelease('E4', '8n', now + 0.15);
      s?.triggerAttackRelease('G4', '8n', now + 0.3);
    } catch {}
  },
  spino() {
    try { noiseSynth?.triggerAttack(); setTimeout(() => noiseSynth?.triggerRelease(), 400); } catch {}
  },
  raptor() {
    const s = getTrickSynth('raptor', {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 },
      volume: -8,
    });
    try {
      const now = Tone.now();
      s?.triggerAttackRelease('E5', '32n', now);
      s?.triggerAttackRelease('G5', '32n', now + 0.08);
      s?.triggerAttackRelease('E5', '32n', now + 0.16);
    } catch {}
  },
};
