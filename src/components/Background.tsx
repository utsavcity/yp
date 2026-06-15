import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // subtle size
        this.speedX = (Math.random() - 0.5) * 0.15; // slow speed
        this.speedY = -Math.random() * 0.15 - 0.05; // upwards drift
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        // 80% subtle blue particles, 20% faint gold particles
        this.color = Math.random() > 0.82 
          ? '212, 175, 55' // Gold
          : '59, 130, 246'; // Blue
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if out of bounds or completely faded
        if (this.y < 0 || this.x < 0 || this.x > width) {
          this.y = height + 10;
          this.x = Math.random() * width;
          this.opacity = 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = this.color.includes('212') ? 8 : 4;
        ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }
    }

    const particleCount = Math.min(80, Math.floor((width * height) / 25000));
    const particlesArray: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = canvas.width = w;
        height = canvas.height = h;
      }
    });

    resizeObserver.observe(document.body);

    // Main render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0; // reset default shadows for rest of clear
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="ambient-bg" id="ambient-layers">
      <div className="aurora-blue" id="ambient-aurora-blue"></div>
      <div className="aurora-gold" id="ambient-aurora-gold"></div>
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.85,
          pointerEvents: 'none'
        }}
        id="bg-canvas-particles"
      />
    </div>
  );
}
