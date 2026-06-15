import { motion } from 'motion/react';
import { Phone, MessageSquare, Linkedin, Mail } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, delay: i * 0.14, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function Leadership() {
  const leaders = [
    {
      name: 'Yagesh Pandey',
      role: 'Founder',
      phone: '+91 82914 19044',
      description: 'Leading NOVAOPS with a focus on technology solutions, business understanding, and long-term client relationships.',
      avatarInitials: 'YP',
      linkedin: 'https://linkedin.com',
      email: 'mailto:info@novaops.com',
    },
    {
      name: 'Varun Sharma',
      role: 'Co-Founder',
      phone: '+91 7738410534',
      description: 'Focused on engineering modern digital solutions, AI-driven workflows, and scalable software systems.',
      avatarInitials: 'VS',
      linkedin: 'https://linkedin.com',
      email: 'mailto:varunsharmaus40@gmail.com',
    }
  ];

  const handleWhatsAppRedirect = (phone: string, name: string) => {
    const cleanNum = phone.replace(/[^0-9]/g, '');
    const firstName = name.split(' ')[0];
    window.open(`https://wa.me/${cleanNum}?text=Hello%20${firstName}!%20I'm%20interested%20in%20partnering%20with%20NOVAOPS.`, '_blank');
  };

  return (
    <section className="leadership-section" id="leadership">

      {/* Header stagger reveal */}
      <motion.div
        className="section-header-centered"
        id="leadership-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-pre-title" id="leadership-label" style={{ margin: '0 auto' }} variants={headerVariants}>
          Our Team
        </motion.div>
        <motion.h2 className="section-title centered" id="leadership-headline" variants={headerVariants}>
          Leadership
        </motion.h2>
        <motion.p className="section-description centered" id="leadership-subheadline" variants={headerVariants}>
          The people behind NOVAOPS, focused on delivering thoughtful technology solutions and creative engineering.
        </motion.p>
      </motion.div>

      {/* Cards — custom stagger with vertical rise */}
      <div className="leadership-grid" id="leadership-cards-wrapper">
        {leaders.map((leader, index) => (
          <motion.div
            className="leadership-card glass-panel"
            key={index}
            id={`leader-card-${index}`}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -10, scale: 1.016, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
          >
            <div className="leader-ambient-glow" />

            <div className="leader-header">
              <motion.div
                className="leader-avatar"
                whileHover={{ scale: 1.08, borderColor: 'var(--accent-gold-bright)', transition: { type: 'spring', stiffness: 400 } }}
              >
                <span>{leader.avatarInitials}</span>
              </motion.div>
              <div className="leader-meta">
                <h3 className="leader-name">{leader.name}</h3>
                <span className="leader-role">{leader.role}</span>
              </div>
            </div>

            <p className="leader-description">{leader.description}</p>

            {leader.phone && (
              <div className="leader-phone-row" id={`leader-${index}-phone`}>
                <span className="phone-label">Direct Line:</span>
                <a href={`tel:${leader.phone}`} className="phone-number-link">
                  <Phone size={13} style={{ marginRight: '6px' }} />
                  {leader.phone}
                </a>
              </div>
            )}

            <div className="leader-actions-bar">
              {leader.phone && (
                <button
                  className="leader-action-btn whatsapp-action"
                  onClick={() => handleWhatsAppRedirect(leader.phone!, leader.name)}
                  title="Connect on WhatsApp"
                  id={`wa-redirect-${index}`}
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </button>
              )}
              <a href={leader.linkedin} target="_blank" rel="noreferrer" className="leader-social-icon" title="LinkedIn Profile">
                <Linkedin size={16} />
              </a>
              <a href={leader.email} className="leader-social-icon" title="Send Email">
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
