import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

interface Pixel {
  x: number;
  y: number;
  threshold: number;
}

interface SnakeSegment {
  c: number;
  r: number;
}

interface PixelSnake {
  body: SnakeSegment[];
  dir: { dc: number; dr: number };
  targetLength: number;
  lastStepTime: number;
  stepSpeed: number;
  life: number;
  maxLife: number;
  opacity: number;
  state: 'fadein' | 'alive' | 'fadeout';
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive grid cell size (30px to 44px)
    const pixelSize = Math.max(30, Math.min(44, Math.floor(width / 38)));
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);

    // 1. Base dissolve pixels
    const pixels: Pixel[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const normX = (c + 0.5) / cols;
        const normY = (r + 0.5) / rows;
        const dx = normX - 0.5;
        const dy = normY - 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy) * 1.25;
        const noise = Math.random() * 0.35;
        const threshold = Math.min(0.92, dist * 0.65 + noise);

        pixels.push({
          x: c * pixelSize,
          y: r * pixelSize,
          threshold,
        });
      }
    }

    // 2. Pixel Snakes that crawl, disappear, and respawn
    const CARDINAL_DIRS = [
      { dc: 1, dr: 0 },
      { dc: -1, dr: 0 },
      { dc: 0, dr: 1 },
      { dc: 0, dr: -1 },
    ];

    const createSnake = (initialDelay = 0): PixelSnake => {
      const startC = Math.floor(Math.random() * cols);
      const startR = Math.floor(Math.random() * rows);
      const dir = CARDINAL_DIRS[Math.floor(Math.random() * CARDINAL_DIRS.length)];
      const maxLife = Math.floor(Math.random() * 16 + 14); // 14 to 30 steps
      const targetLength = Math.floor(Math.random() * 3 + 2); // 2 to 4 segments

      return {
        body: [{ c: startC, r: startR }],
        dir,
        targetLength,
        lastStepTime: performance.now() + initialDelay,
        stepSpeed: Math.floor(Math.random() * 40 + 75), // 75ms - 115ms per grid step
        life: maxLife,
        maxLife,
        opacity: 0,
        state: 'fadein',
      };
    };

    // Stagger spawn 7 to 9 snakes across the screen
    const snakeCount = Math.max(6, Math.min(10, Math.floor(cols / 4)));
    const snakes: PixelSnake[] = Array.from({ length: snakeCount }, (_, i) =>
      createSnake(i * 120)
    );

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const state = {
      dissolve: 0,
    };

    let animationFrameId: number;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const bgColor = isDark ? '#000000' : '#ffffff';
      const gridBorder = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.035)';
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#FF3000';

      const d = state.dissolve;

      // Draw background pixel tiles
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        if (d <= p.threshold) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(p.x, p.y, pixelSize, pixelSize);

          ctx.strokeStyle = gridBorder;
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x + 0.5, p.y + 0.5, pixelSize - 1, pixelSize - 1);
        } else if (d < p.threshold + 0.18) {
          const progressInWindow = (d - p.threshold) / 0.18;
          const scale = 1 - progressInWindow;
          const currentSize = pixelSize * scale;
          const offset = (pixelSize - currentSize) / 2;

          ctx.fillStyle = bgColor;
          ctx.fillRect(p.x + offset, p.y + offset, currentSize, currentSize);

          ctx.strokeStyle = gridBorder;
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x + offset + 0.5, p.y + offset + 0.5, currentSize - 1, currentSize - 1);
        }
      }

      // Update and draw pixel snakes while loading
      if (d < 0.25) {
        const fadeOutMultiplier = Math.max(0, 1 - d * 4);

        for (let i = 0; i < snakes.length; i++) {
          const snake = snakes[i];

          // Advance snake step
          if (time - snake.lastStepTime > snake.stepSpeed) {
            snake.lastStepTime = time;

            // 30% chance to turn 90 degrees
            if (Math.random() < 0.35) {
              const currentDir = snake.dir;
              const possibleTurns = CARDINAL_DIRS.filter(
                (d) => !(d.dc === -currentDir.dc && d.dr === -currentDir.dr) && !(d.dc === currentDir.dc && d.dr === currentDir.dr)
              );
              snake.dir = possibleTurns[Math.floor(Math.random() * possibleTurns.length)];
            }

            const head = snake.body[0];
            const nextC = (head.c + snake.dir.dc + cols) % cols;
            const nextR = (head.r + snake.dir.dr + rows) % rows;

            snake.body.unshift({ c: nextC, r: nextR });
            if (snake.body.length > snake.targetLength) {
              snake.body.pop();
            }

            snake.life--;
            if (snake.life <= 0) {
              snake.state = 'fadeout';
            }
          }

          // Handle opacity lifecycle
          if (snake.state === 'fadein') {
            snake.opacity += 0.07;
            if (snake.opacity >= 1) {
              snake.opacity = 1;
              snake.state = 'alive';
            }
          } else if (snake.state === 'fadeout') {
            snake.opacity -= 0.08;
            if (snake.opacity <= 0) {
              // Respawn at a fresh location
              Object.assign(snake, createSnake());
            }
          }

          // Draw snake segments as solid orange pixel blocks
          const alpha = snake.opacity * fadeOutMultiplier;
          if (alpha > 0) {
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = alpha;

            for (let s = 0; s < snake.body.length; s++) {
              const seg = snake.body[s];
              const segX = seg.c * pixelSize;
              const segY = seg.r * pixelSize;
              ctx.fillRect(segX, segY, pixelSize, pixelSize);
            }

            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animationFrameId);
        onComplete();
      },
    });

    // 1. Ultra-smooth progress count from 000 to 100
    // Using direct DOM updates for 60/120fps buttery smooth count without React re-render lag
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.2,
        ease: 'power1.inOut',
        onUpdate: function () {
          const v = Math.round(this.targets()[0].val);
          if (numberRef.current) {
            numberRef.current.textContent = v.toString().padStart(3, '0');
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${v / 100})`;
          }
        },
      }
    );

    // Brief graceful hold at 100
    tl.to({}, { duration: 0.15 });

    // 2. Fade out center content cleanly
    tl.to(contentRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    });

    // 3. Pixel dissolve wave — reveals the landing page underneath
    tl.to(state, {
      dissolve: 1.15,
      duration: 1.0,
      ease: 'power3.inOut',
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden select-none pointer-events-none">
      {/* Pixel Curtain & Snake Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Pure Center Content — Minimalist loading indicator */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Loading Label */}
        <div className="flex items-center gap-2.5 mb-3 text-[11px] md:text-xs uppercase tracking-[0.35em] font-bold text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>Loading</span>
        </div>

        {/* Big Number at the Center — updated smoothly via direct DOM ref */}
        <div
          ref={numberRef}
          className="font-heavy text-[24vw] md:text-[18vw] lg:text-[15vw] uppercase leading-none tracking-tighter text-fg tabular-nums drop-shadow-sm select-none"
        >
          000
        </div>

        {/* Minimal Hairline Progress Bar */}
        <div className="w-44 sm:w-56 h-[2px] bg-border/15 relative overflow-hidden mt-6 sm:mt-8">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full bg-accent will-change-transform"
            style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }}
          />
        </div>
      </div>
    </div>
  );
};
