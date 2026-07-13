(function () {
  // Prevent run on servers or if canvas isn't supported
  if (typeof window === 'undefined' || !document.createElement('canvas').getContext) {
    return;
  }

  // Detect touch device to optimize performance/behavior if needed
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Create canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Style canvas to cover viewport without blocking clicks
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = window.devicePixelRatio || 1;

  // Track particles and mouse coordinates
  const particles = [];
  const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, active: false };

  // Colors mapping the blue, purple, cyan and gold hues
  const bubbleHues = [217, 270, 190, 320]; // Blue, Purple, Cyan, Pink-Magenta
  const sparkleHues = [45, 180, 0]; // Gold, Bright Cyan, White (handled separately)

  class Particle {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type; // 'bubble' or 'sparkle'
      this.alpha = 1;
      
      if (type === 'bubble') {
        this.size = Math.random() * 8 + 4; // radius 4px to 12px
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = -Math.random() * 1.5 - 0.4; // upward drift
        this.decay = Math.random() * 0.012 + 0.008; // slower decay for bubbles
        this.hue = bubbleHues[Math.floor(Math.random() * bubbleHues.length)];
        this.wobbleSpeed = Math.random() * 0.08 + 0.02;
        this.wobble = Math.random() * Math.PI * 2;
      } else {
        this.size = Math.random() * 5 + 3; // size of star
        this.baseSize = this.size;
        this.vx = (Math.random() - 0.5) * 2; // wider scatter
        this.vy = (Math.random() - 0.5) * 2 - 0.5; // slight upward bias
        this.decay = Math.random() * 0.025 + 0.015; // faster decay for sparkles
        this.hue = sparkleHues[Math.floor(Math.random() * sparkleHues.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.15;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;

      if (this.type === 'bubble') {
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.25; // elegant sway
        this.size = this.baseSize * Math.max(0, this.alpha);
      } else {
        this.rotation += this.rotationSpeed;
        // Sparkle fades out and shrinks slightly
        this.size = this.baseSize * Math.max(0, this.alpha);
      }

      return this.alpha > 0 && this.size > 0.2;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));

      if (this.type === 'bubble') {
        // Create dynamic radial gradient for the 3D bubble effect
        const grad = ctx.createRadialGradient(
          this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.1,
          this.x, this.y, this.size
        );
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        grad.addColorStop(0.3, `hsla(${this.hue}, 90%, 65%, 0.3)`);
        grad.addColorStop(0.8, `hsla(${this.hue}, 85%, 55%, 0.15)`);
        grad.addColorStop(1, `hsla(${this.hue}, 85%, 50%, 0.7)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle thin outer highlight/stroke to make it feel glassy
        ctx.strokeStyle = `hsla(${this.hue}, 85%, 70%, 0.45)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 3D reflection specular point
        ctx.beginPath();
        ctx.arc(this.x - this.size * 0.35, this.y - this.size * 0.35, this.size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
      } else {
        // Draw elegant 4-pointed star
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        let color = `hsla(${this.hue}, 95%, 65%, 0.9)`;
        if (this.hue === 0) {
          // White star
          color = 'rgba(255, 255, 255, 0.95)';
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(0, -this.size);
          ctx.lineTo(this.size * 0.2, -this.size * 0.2);
          ctx.rotate(Math.PI / 2);
        }
        ctx.closePath();
        ctx.fill();

        // Optional tiny glowing center for sparkles
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Setup canvas size accounting for High DPI screens
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  // Listen for cursor movements
  let lastSpawnTime = 0;
  function handleMove(clientX, clientY) {
    mouse.x = clientX;
    mouse.y = clientY;

    const dx = mouse.x - mouse.lastX;
    const dy = mouse.y - mouse.lastY;
    const distance = Math.hypot(dx, dy);
    const now = performance.now();

    // Spawn when moving fast enough, or at a regular minimal interval when moving slowly
    if (distance > 3 || (now - lastSpawnTime > 40 && distance > 0.5)) {
      // Limit spawns based on movement speed
      const numToSpawn = Math.min(Math.floor(distance / 8) + 1, 3);
      for (let i = 0; i < numToSpawn; i++) {
        // Spawn slightly offset from pointer
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        // Alternating mix of bubbles and sparkles
        const type = Math.random() > 0.4 ? 'bubble' : 'sparkle';
        particles.push(new Particle(mouse.x + offsetX, mouse.y + offsetY, type));
      }
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      lastSpawnTime = now;
    }

    // Wake up loop if it is asleep
    if (!mouse.active) {
      mouse.active = true;
      requestAnimationFrame(tick);
    }
  }

  // Event handlers for mouse and touch
  window.addEventListener('mousemove', (e) => {
    handleMove(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      // Prevent spawning huge counts on multi-touch
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Animation render loop
  function tick() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles in reverse to safely splice
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.update()) {
        p.draw();
      } else {
        particles.splice(i, 1);
      }
    }

    // Keep updating as long as there are visible particles
    if (particles.length > 0) {
      requestAnimationFrame(tick);
    } else {
      mouse.active = false;
    }
  }
})();
