import { motion } from 'motion/react';
import { Award, Zap, Shield, UserCheck } from 'lucide-react';

const copyVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const copyItem = {
  hidden: { opacity: 0, x: -36, filter: 'blur(5px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

export default function WhyNovaops() {
  const cards = [
    { id: 1, icon: Award, title: 'Custom Engineering', description: 'Every solution is designed according to your exact requirements rather than forcing a one-size-fits-all product.' },
    { id: 2, icon: Zap, title: 'AI-Powered Intelligence', description: 'Modern AI capabilities integrated where they create meaningful efficiency and real daily business value.' },
    { id: 3, icon: Shield, title: 'Scalable Architecture', description: 'Systems designed with security, high-scale performance, and long-term modular maintainability in mind.' },
    { id: 4, icon: UserCheck, title: 'Long-Term Partnership', description: 'Technology development focused on absolute reliability, client support, and continuous improvement.' },
  ];

  return (
    <section className="why-section" id="why-novaops">
      <div className="why-layout" id="why-layout-container">

        {/* Left: copy — slides in from left */}
        <motion.div
          className="why-copy"
          id="why-copywriting"
          variants={copyVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="section-pre-title" id="why-pre-label" variants={copyItem}>
            Why NovaOps
          </motion.div>
          <motion.h2 className="section-title" id="why-headline" variants={copyItem}>
            Technology built <span className="gold">around your vision.</span>
          </motion.h2>
          <motion.p className="section-description" id="why-description" variants={copyItem}>
            Every business has unique architectural challenges. We approach every single project by deeply understanding your constraints, designing thoughtful structures, and building technology that is reliable, scalable, and fully aligned with your organizational goals.
          </motion.p>
        </motion.div>

        {/* Right: asymmetric bento grid — cards rise in with stagger */}
        <div className="why-asymmetric-grid" id="why-cards-showcase">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                className={`why-item-card glass-panel why-card-pos-${card.id}`}
                key={card.id}
                id={`why-card-${card.id}`}
                custom={card.id - 1}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{
                  scale: 1.03,
                  borderColor: 'var(--glass-border-hover)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.07)',
                  transition: { type: 'spring', stiffness: 280, damping: 22 },
                }}
              >
                <div className="why-card-light-leak" />

                <motion.div
                  className="why-card-icon-wrapper"
                  whileHover={{ rotate: 8, scale: 1.12, transition: { type: 'spring', stiffness: 400 } }}
                >
                  <Icon size={20} color="var(--accent-gold)" />
                </motion.div>

                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-description">{card.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
