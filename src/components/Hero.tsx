import { useEffect, useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onStartProject, onExploreServices }: HeroProps) {
  const visualRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef as RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);

  useEffect(() => {
    const canvas = visualRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);
    let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.4;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    interface Point3D { x: number; y: number; z: number; color: string; size: number; }

    const points: Point3D[] = [];
    const pointCount = 210;
    let radius = Math.min(width, height) * 0.38;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const isGold = Math.random() > 0.82;
      points.push({
        x: x * radius, y: y * radius, z: z * radius,
        color: isGold ? '212, 175, 55' : '59, 130, 246',
        size: isGold ? 2.9 : 1.6,
      });
    }

    const angleX = 0.002, angleY = 0.003;
    let breathe = 0;

    const rotateX = (p: Point3D, a: number) => { const c = Math.cos(a), s = Math.sin(a); const y1 = p.y * c - p.z * s, z1 = p.z * c + p.y * s; p.y = y1; p.z = z1; };
    const rotateY = (p: Point3D, a: number) => { const c = Math.cos(a), s = Math.sin(a); const x1 = p.x * c - p.z * s, z1 = p.z * c + p.x * s; p.x = x1; p.z = z1; };
    const rotateZ = (p: Point3D, a: number) => { const c = Math.cos(a), s = Math.sin(a); const x1 = p.x * c - p.y * s, y1 = p.y * c + p.x * s; p.x = x1; p.y = y1; };

    const draw = () => {
      if (!ctx) return;
      radius = Math.min(width, height) * 0.38;
      ctx.clearRect(0, 0, width, height);

      breathe += 0.007;
      const breatheAmp = 1 + Math.sin(breathe) * 0.018;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const cx = width / 2 + mouseX * 0.15;
      const cy = height / 2 + mouseY * 0.15;

      // Subtle inner glow
      const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.7);
      innerGlow.addColorStop(0, `rgba(59, 130, 246, ${0.05 * breatheAmp})`);
      innerGlow.addColorStop(0.55, `rgba(212, 175, 55, ${0.018 * breatheAmp})`);
      innerGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      const currentRotX = angleX + mouseY * 0.00003;
      const currentRotY = angleY + mouseX * 0.00003;

      const projected = points.map((p) => {
        rotateY(p, currentRotY);
        rotateX(p, currentRotX);
        rotateZ(p, 0.0005);
        const fov = 350;
        const scale = fov / (fov + p.z);
        return { px: cx + p.x * scale * breatheAmp, py: cy + p.y * scale * breatheAmp, size: p.size * scale, z: p.z, color: p.color };
      });

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        let connectionCount = 0;
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 52 && connectionCount < 3 && p1.z > -100) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            const alpha = Math.max(0, 0.22 * (1 - dist / 52) * (1 - (p1.z + p2.z) / 2 / radius));
            const hasGold = p1.color.includes('212') || p2.color.includes('212');
            ctx.strokeStyle = hasGold ? `rgba(212, 175, 55, ${alpha})` : `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = hasGold ? 1.0 : 0.6;
            ctx.stroke();
            connectionCount++;
          }
        }
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, p1.size, 0, Math.PI * 2);
        const alphaPoint = Math.max(0.1, 0.9 * (1 - p1.z / (radius * 1.5)));
        ctx.fillStyle = `rgba(${p1.color}, ${alphaPoint})`;
        ctx.shadowBlur = p1.color.includes('212') ? 18 : 7;
        ctx.shadowColor = `rgba(${p1.color}, ${alphaPoint * 0.7})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Three orbital rings at different angles
      const orbAlpha = 0.06 * breatheAmp;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.12, radius * 0.16, Math.PI / 12 + mouseX * 0.0001, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 175, 55, ${orbAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.22, radius * 0.09, -Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${orbAlpha * 0.6})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.3, radius * 0.06, Math.PI / 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212, 175, 55, ${orbAlpha * 0.4})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      className="hero-section"
      id="home"
      ref={heroRef as RefObject<HTMLElement>}
    >
      {/* Floating atmospheric orbs */}
      <motion.div
        className="hero-float-orb hero-orb-gold"
        animate={{ y: [0, -30, 0], x: [0, 16, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-float-orb hero-orb-blue"
        animate={{ y: [0, 24, 0], x: [0, -12, 0], scale: [1.05, 0.96, 1.05] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-float-orb hero-orb-mini"
        animate={{ y: [0, 16, 0], x: [0, 9, 0], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        aria-hidden="true"
      />

      <div className="hero-layout" id="hero-layout-grid">

        {/* Hero copy — entrance stagger + scroll parallax */}
        <motion.div
          className="hero-content"
          id="hero-headlines"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            className="brand-label"
            id="brand-indicator"
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            NovaOps Technologies
          </motion.div>

          <motion.h1
            className="hero-headline"
            id="hero-main-title"
            initial={{ opacity: 0, y: 38, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.05, delay: 0.16, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <span className="accent">Your imagination,</span>
            <span className="gold">our creation.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            id="hero-subheading"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.33, ease: [0.25, 0.8, 0.25, 1] }}
          >
            AI-powered software, intelligent enterprise systems, and custom digital experiences engineered with absolute craftsmanship around your vision.
          </motion.p>

          <motion.div
            className="cta-group"
            id="hero-action-buttons"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={onStartProject}
              id="btn-cta-start"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 16 }}
            >
              Start Your Project <ArrowRight className="btn-icon" size={16} />
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              onClick={onExploreServices}
              id="btn-cta-explore"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 16 }}
            >
              Explore Services <Sparkles size={15} style={{ opacity: 0.8 }} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D sphere — entrance + scroll parallax */}
        <motion.div
          className="hero-visual-container"
          id="hero-kinetic-visual"
          initial={{ opacity: 0, scale: 0.82, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.22, ease: [0.25, 0.8, 0.25, 1] }}
          style={{ y: visualY, scale: visualScale }}
        >
          <div className="kinetic-placeholder" id="kinetic-sphere-wrapper">
            <div className="visual-ambient-glow" id="kinetic-core-glow" />
            <canvas
              ref={visualRef}
              style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
              id="kinetic-3d-canvas"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
