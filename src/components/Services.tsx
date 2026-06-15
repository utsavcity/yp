import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Database, Workflow, Globe, Server, LineChart } from 'lucide-react';

const headerReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, delay: i * 0.09, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    { id: 1, title: 'AI Software Development', description: 'Custom intelligent software solutions, AI integrations, and digital products built around business requirements.', icon: Cpu },
    { id: 2, title: 'Enterprise ERP Systems', description: 'Scalable ERP platforms including management systems, workflow automation, HR, payroll, accounting, and operational tools.', icon: Database },
    { id: 3, title: 'AI Automation & Agents', description: 'Intelligent workflows and AI agents that reduce repetitive tasks and improve efficiency.', icon: Workflow },
    { id: 4, title: 'Web Applications & Websites', description: 'Modern responsive websites and web applications with premium user experiences.', icon: Globe },
    { id: 5, title: 'Cloud & Infrastructure', description: 'Reliable cloud architecture, deployment pipelines, and scalable digital infrastructure.', icon: Server },
    { id: 6, title: 'Technology Consulting', description: 'Strategic technical guidance, software planning, and digital transformation consulting.', icon: LineChart },
  ];

  return (
    <section className="services-section" id="services">

      {/* Header */}
      <motion.div
        className="section-header-centered"
        id="services-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-pre-title" id="services-pre-label" style={{ margin: '0 auto' }} variants={headerReveal}>
          OUR CAPABILITIES
        </motion.div>
        <motion.h2 className="section-title centered" id="services-headline" variants={headerReveal}>
          Intelligent Solutions. <span className="gold">Engineered Elegantly.</span>
        </motion.h2>
        <motion.p className="section-description centered" id="services-subheadline" variants={headerReveal}>
          Discover our specialized architectural systems crafted meticulously to automate and scale your vision.
        </motion.p>
      </motion.div>

      {/* Cards — staggered grid reveal */}
      <div className="services-grid" id="services-rectangular-grid">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              className="service-card glass-panel"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              id={`service-card-item-${service.id}`}
              custom={service.id - 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              whileHover={{
                y: -8,
                scale: 1.02,
                borderColor: 'rgba(212, 175, 55, 0.38)',
                transition: { type: 'spring', stiffness: 300, damping: 22 },
              }}
            >
              <div className="service-card-glow" />

              <motion.div
                className="service-card-icon-shell"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <IconComponent className="service-card-icon" size={20} />
              </motion.div>

              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-description">{service.description}</p>

              <div className="service-card-action">
                <span>Explore Solutions</span>
                <ArrowRight size={12} className="service-card-arrow" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="transition-footer-fade" id="services-fade-transition">
        <div className="fade-line" />
        <p className="fade-text">SCROLL TO DISCOVER EXCELLENCE</p>
      </div>
    </section>
  );
}
