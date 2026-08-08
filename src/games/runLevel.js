let uid = Math.floor(Math.random() * 1e9);

export const COIN_RADIUS = 16;
// Roughly one dino-width of empty space keeps rewards readable and reachable
// without making obstacle-heavy levels feel empty.
export const COIN_CLEARANCE = 72;
export const ROLLER_TRAVEL = 70;

// Obstacle hitbox sizes are shared by generation, rendering, and collision.
export const OB = {
  rock:   { w: 40, h: 34 },
  cactus: { w: 34, h: 48 },
  roller: { w: 38, h: 38 },
  flyer:  { w: 46, h: 34 },
};

function makeObstacles(levelNum) {
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

  return obstacles.sort((a, b) => a.x - b.x);
}

export function obstacleSafeZone(obstacle) {
  const travel = obstacle.type === 'roller' ? ROLLER_TRAVEL : 0;
  return {
    left: obstacle.x - travel - COIN_CLEARANCE,
    right: obstacle.x + travel + OB[obstacle.type].w + COIN_CLEARANCE,
  };
}

function makeCoinPattern(x, kind) {
  const phase = Math.random() * -1.2;
  if (kind === 'line') {
    return Array.from({ length: 3 }, (_, i) => ({
      id: uid++, x: x + i * 46, y: 18, got: false, phase: phase - i * 0.08,
    }));
  }
  return [
    { id: uid++, x, y: 40, got: false, phase },
    { id: uid++, x: x + 52, y: 94, got: false, phase: phase - 0.08 },
    { id: uid++, x: x + 104, y: 40, got: false, phase: phase - 0.16 },
  ];
}

function safeCorridors(obstacles) {
  const mergedZones = [];
  for (const obstacle of obstacles) {
    const zone = obstacleSafeZone(obstacle);
    const previous = mergedZones[mergedZones.length - 1];
    if (previous && zone.left <= previous.right) {
      previous.right = Math.max(previous.right, zone.right);
    } else {
      mergedZones.push({ ...zone });
    }
  }

  const corridors = [];
  let left = 420;
  for (const zone of mergedZones) {
    const right = zone.left - COIN_RADIUS - 1;
    if (right >= left) corridors.push({ left, right });
    left = Math.max(left, zone.right + COIN_RADIUS + 1);
  }
  if (left <= 3050) corridors.push({ left, right: 3050 });
  return corridors;
}

function makeCoins(obstacles) {
  const coins = [];
  for (const corridor of safeCorridors(obstacles)) {
    let x = corridor.left;
    let placedGroup = false;
    while (corridor.right - x >= 92) {
      const remaining = corridor.right - x;
      const kind = remaining >= 104 && Math.random() < 0.5 ? 'arc' : 'line';
      const patternWidth = kind === 'arc' ? 104 : 92;
      coins.push(...makeCoinPattern(x, kind));
      placedGroup = true;

      // Keep groups visually distinct while using every viable safe corridor.
      x += patternWidth + 120 + Math.random() * 80;
    }

    // A narrow but genuinely safe corridor can still hold one centered reward.
    if (!placedGroup && corridor.right - corridor.left >= 24) {
      coins.push({
        id: uid++,
        x: (corridor.left + corridor.right) / 2,
        y: 42,
        got: false,
        phase: Math.random() * -1.2,
      });
    }
  }

  return coins;
}

export function makeLevel(levelNum) {
  const obstacles = makeObstacles(levelNum);
  const coins = makeCoins(obstacles);

  const decor = [];
  for (let d = 150; d < 3500; d += 260 + Math.random() * 240) {
    decor.push({
      id: uid++,
      x: d,
      type: Math.random() < 0.45 ? 'cloud' : 'bush',
      alt: 380 + Math.random() * 180,
    });
  }

  return { coins, decor, obstacles, flagX: 3400 };
}
