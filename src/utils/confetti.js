/**
 * Zero-dependency celebratory confetti particle explosion
 * Creates an ephemeral fullscreen canvas and animates colored confetti.
 */
export const triggerConfetti = (options = {}) => {
  if (typeof window === "undefined") return;

  const count = options.count || 80;
  const colors = options.colors || [
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const particles = [];
  const originX = options.x !== undefined ? options.x : width / 2;
  const originY = options.y !== undefined ? options.y : height * 0.4;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 6;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.28,
      drag: 0.96,
      opacity: 1,
      shape: Math.random() > 0.4 ? "rect" : "circle",
    });
  }

  let animationFrame;
  const startTime = Date.now();
  const maxDuration = 3200; // 3.2 seconds total animation

  const render = () => {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    let aliveCount = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - elapsed / maxDuration);

      if (p.opacity > 0 && p.y < height + 50) {
        aliveCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (aliveCount > 0 && elapsed < maxDuration) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  };

  animationFrame = requestAnimationFrame(render);
};
