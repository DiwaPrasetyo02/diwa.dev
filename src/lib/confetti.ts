const COLORS = ["#ff90e8", "#ffc900", "#23a094", "#1e1e1e", "#ff6b6b"];
const CONFETTI_COUNT = 80;
const GRAVITY = 0.15;
const DURATION = 4000;

type ConfettiPiece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
};

export function burstConfetti(originX?: number, originY?: number) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cx = originX ?? window.innerWidth / 2;
  const cy = originY ?? window.innerHeight / 2;

  const pieces: ConfettiPiece[] = [];
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 10;
    pieces.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      opacity: 1,
    });
  }

  const start = performance.now();

  function animate(now: number) {
    const elapsed = now - start;
    if (elapsed > DURATION) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of pieces) {
      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      const fadeStart = DURATION * 0.5;
      const fadeElapsed = Math.max(0, elapsed - fadeStart);
      const fadeDuration = DURATION - fadeStart;
      p.opacity = 1 - fadeElapsed / fadeDuration;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
