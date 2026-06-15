import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, Award } from 'lucide-react';

const textReveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

const metricVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 380);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    let angle = 0;
    let pulse = 0;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.32;

      angle += 0.004;
      pulse += 0.009;
      const breathe = 1 + Math.sin(pulse) * 0.025;

      for (let layer = 0; layer < 3; layer++) {
        const radius = baseRadius * (1 - layer * 0.15) * breathe;
        const layerAngle = angle * (layer % 2 === 0 ? 1 : -1.2);

        ctx.beginPath();
        ctx.ellipse(cx, cy, radius, radius * 0.45, layerAngle + (layer * Math.PI) / 3, 0, Math.PI * 2);
        ctx.strokeStyle = layer === 0 ? `rgba(212, 175, 55, ${0.28 * breathe})` : `rgba(96, 165, 250, ${0.16 * breathe})`;
        ctx.lineWidth = layer === 0 ? 2 : 1.2;
        ctx.stroke();

        const dotCount = layer === 0 ? 4 : 2;
        for (let d = 0; d < dotCount; d++) {
          const dotAngle = layerAngle + (d * Math.PI * 2) / dotCount;
          const rx = radius * Math.cos(dotAngle);
          const ry = radius * 0.45 * Math.sin(dotAngle);
          const skewAngle = layerAngle + (layer * Math.PI) / 3;
          const rotatedX = cx + rx * Math.cos(skewAngle) - ry * Math.sin(skewAngle);
          const rotatedY = cy + rx * Math.sin(skewAngle) + ry * Math.cos(skewAngle);

          const dotSize = (layer === 0 ? 5.5 : 3.8) * breathe;
          ctx.beginPath();
          ctx.arc(rotatedX, rotatedY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = layer === 0 ? '#D4AF37' : '#60A5FA';
          ctx.shadowBlur = layer === 0 ? 18 : 8;
          ctx.shadowColor = layer === 0 ? 'rgba(212, 175, 55, 0.8)' : 'rgba(96, 165, 250, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Center sphere with pulsing glow
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 0.23 * breathe, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, baseRadius * 0.23 * breathe);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      gradient.addColorStop(0.5, 'rgba(6, 20, 46, 0.82)');
      gradient.addColorStop(1, `rgba(212, 175, 55, ${0.35 * breathe})`);
      ctx.fillStyle = gradient;
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.45 * breathe})`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();

      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(212, 175, 55, ${0.5 * breathe})`;
      ctx.textAlign = 'center';
      ctx.fillText('ENGINEERING ROTATE_A_0093', cx, cy + baseRadius * 1.18);

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animFrame); resizeObserver.disconnect(); };
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-layout" id="about-layout-container">

        {/* Left: text content — staggered whileInView reveals */}
        <motion.div
          className="about-copy-content"
          id="about-content-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div className="section-pre-title" id="about-pre-label" variants={textReveal}>
            About NovaOps
          </motion.div>
          <motion.h2 className="section-title" id="about-main-headline" variants={textReveal}>
            Turning ideas into <span className="gold">intelligent digital solutions.</span>
          </motion.h2>
          <motion.p className="section-description" id="about-first-paragraph" variants={textReveal}>
            NOVAOPS develops AI-powered software, intelligent automation, enterprise platforms, and digital experiences designed around unique business requirements.
          </motion.p>
          <motion.p className="section-description" id="about-second-paragraph" style={{ marginTop: '-0.5rem' }} variants={textReveal}>
            We focus on understanding challenges, engineering practical solutions, and creating technology that helps organizations operate smarter and more efficiently.
          </motion.p>

          {/* Metric items — custom stagger with x offset */}
          <div className="about-metrics-list" id="about-metrics-bullets">
            {[
              { icon: Compass, title: 'Vision Centered', desc: 'We work around your constraints and execute tailored systems.', id: 'metric-item-1' },
              { icon: Shield, title: 'Secure & Scalable', desc: 'Every piece of database architecture is optimized for industry safety.', id: 'metric-item-2' },
              { icon: Award, title: 'Thoughtful Engineering', desc: 'Pristine code standard that respects maintenance over rapid templates.', id: 'metric-item-3' },
            ].map((metric, i) => (
              <motion.div
                className="about-metric-item"
                id={metric.id}
                key={metric.id}
                custom={i}
                variants={metricVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              >
                <div className="metric-icon-shell">
                  <metric.icon size={18} color="var(--accent-gold)" />
                </div>
                <div className="metric-info">
                  <h4>{metric.title}</h4>
                  <p>{metric.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: canvas visual — scale in on scroll */}
        <motion.div
          className="about-visual-container"
          id="about-visual-wrapper"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <div className="about-glass-backdrop" id="about-orb-card">
            <div className="glass-ambient-spotlight" id="about-spotlight" />
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
              id="about-vector-canvas"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
