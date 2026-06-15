import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, Sparkles, X, HeartHandshake } from 'lucide-react';

interface TestimonialItem {
  id: number; name: string; company: string; position: string; rating: number; text: string; initials: string;
}

const headerReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function Testimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    { id: 1, name: 'Rahul Mehta', company: 'Nexora Technologies', position: 'Founder', rating: 5, text: 'NOVAOPS transformed our ideas into a seamless digital solution. The attention to detail and technical understanding made the entire process smooth.', initials: 'RM' },
    { id: 2, name: 'Ananya Sharma', company: 'Elevate Solutions', position: 'Operations Manager', rating: 5, text: 'The team understood our requirements clearly and built an automated system that vastly improved the way our organization operates daily.', initials: 'AS' },
    { id: 3, name: 'Rohit Patel', company: 'Zenith Enterprises', position: 'Director', rating: 5, text: 'Professional execution, transparent communication, and a technology-first approach from start to finish. I highly recommend Varun, Yagesh, and team.', initials: 'RP' },
    { id: 4, name: 'Priya Kapoor', company: 'Vertex Associates', position: 'Managing Partner', rating: 5, text: 'A highly reliable technology partner that focuses on creating systems tailored to real business challenges. Outstanding maintenance and speed.', initials: 'PK' },
    { id: 5, name: 'Vikram Singh', company: 'Chronos Digital', position: 'Chief Product Officer', rating: 5, text: 'Their AI automated agent workflows cut down our administrative support tickets by 60%. Absolutely brilliant software craftsmanship.', initials: 'VS' },
  ]);

  const [formName, setFormName] = useState('');
  const [formReview, setFormReview] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsModalOpen(false); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formName.trim()) { setFormError('Please enter your full name.'); return; }
    if (!formReview.trim() || formReview.length < 10) { setFormError('Please write a review with at least 10 characters.'); return; }

    const nameParts = formName.trim().split(' ');
    const initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[1][0]).toUpperCase() : nameParts[0][0].toUpperCase();

    setTestimonials([{ id: Date.now(), name: formName.trim(), company: formCompany.trim() || 'Independent Partner', position: formPosition.trim() || 'Executive', rating: formRating, text: formReview.trim(), initials }, ...testimonials]);
    setFormSuccess(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setFormSuccess(false);
      setFormName(''); setFormReview(''); setFormCompany(''); setFormPosition(''); setFormRating(5);
    }, 1800);
  };

  const marqueeList = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section" id="testimonials">

      {/* Header stagger reveal */}
      <motion.div
        className="section-header-centered"
        id="testimonials-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-pre-title" id="testimonials-pre-label" style={{ margin: '0 auto' }} variants={headerReveal}>
          Client Stories
        </motion.div>
        <motion.h2 className="section-title centered" id="testimonials-headline" variants={headerReveal}>
          Trusted by <span className="gold">Founders &amp; Directors</span>
        </motion.h2>
        <motion.p className="section-description centered" id="testimonials-subheadline" variants={headerReveal}>
          Fictional client feedback representing our strict metrics, modern solutions, and high deployment performance. Let's see what they think.
        </motion.p>
      </motion.div>

      {/* Infinite marquee */}
      <div className="marquee-outer-container" id="testimonials-marquee-slider">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        <div className="infinite-marquee-track">
          {marqueeList.map((item, idx) => (
            <div
              className={`testimonial-marquee-card glass-panel ${activeHighlightId === item.id ? 'active' : ''}`}
              key={`${item.id}-${idx}`}
              onClick={() => setActiveHighlightId(activeHighlightId === item.id ? null : item.id)}
              id={`testimonial-card-${item.id}-${idx}`}
            >
              <div className="testimonial-card-glow" />
              <div className="testimonial-top">
                <div className="testimonial-avatar">{item.initials}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{item.name}</h4>
                  <p className="testimonial-comp">{item.position}, {item.company}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <Star key={sIdx} size={14} color={sIdx < item.rating ? 'var(--accent-gold-bright)' : '#2A3C56'} fill={sIdx < item.rating ? 'var(--accent-gold-bright)' : 'none'} />
                ))}
              </div>
              <p className="testimonial-body-text">"{item.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Write review CTA — rises in on scroll */}
      <motion.div
        className="write-review-container"
        id="write-review-prompt"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <div className="write-review-card glass-panel" id="review-invitation-box">
          <div className="write-card-ambient" />
          <div className="write-card-copy">
            <span className="write-tag">
              <Sparkles size={11} style={{ marginRight: '6px' }} />
              Your Feedback Matters
            </span>
            <h3 className="write-headline">Share your experience with NOVAOPS</h3>
            <p className="write-description">Have a system architecture experience to share? Your objective feedback helps us guide our long-term client support pipelines.</p>
          </div>
          <motion.button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
            id="btn-trigger-review-modal"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 16 }}
          >
            <MessageSquareCode size={16} />
            <span>Write a Review</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="transition-footer-fade" id="testimonials-fade-transition">
        <div className="fade-line" />
        <p className="fade-text">PROCEED TO PROJECT INITIATION</p>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-portal-overlay"
            id="review-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-glass-container glass-panel"
              ref={modalRef}
              id="review-modal-box"
              initial={{ opacity: 0, y: 48, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.25, 0.8, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-header-title">
                  <HeartHandshake size={18} color="var(--accent-gold)" />
                  <h4>Submit Client Review</h4>
                </div>
                <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close Modal" id="btn-close-review-modal">
                  <X size={16} />
                </button>
              </div>

              {formSuccess ? (
                <motion.div
                  className="modal-success-state"
                  id="modal-success-screen"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="success-sparkle-circle">
                    <Star fill="var(--accent-gold)" color="var(--accent-gold)" size={24} />
                  </div>
                  <h3>Review Published!</h3>
                  <p>Your testimonial has been dynamically appended to the infinite client timeline.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="modal-form" id="review-submission-form">
                  {formError && <div className="form-error-banner" id="review-validation-error">{formError}</div>}

                  <div className="form-double-col">
                    <div className="form-field">
                      <label htmlFor="client-name-input">Full Name <span className="gold-text-accent">*</span></label>
                      <input type="text" id="client-name-input" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Rahul Mehta" required />
                    </div>
                    <div className="form-field">
                      <label>Rating Selection</label>
                      <div className="rating-starrer-selector">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const starNum = idx + 1;
                          return (
                            <button type="button" key={idx} className={`star-select-btn ${starNum <= formRating ? 'filled' : ''}`} onClick={() => setFormRating(starNum)} aria-label={`Rate ${starNum} Stars`}>
                              <Star size={18} fill={starNum <= formRating ? 'var(--accent-gold-bright)' : 'none'} color={starNum <= formRating ? 'var(--accent-gold-bright)' : 'var(--text-muted)'} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="form-double-col">
                    <div className="form-field">
                      <label htmlFor="client-company-input">Company Name <span className="optional-text">(Optional)</span></label>
                      <input type="text" id="client-company-input" value={formCompany} onChange={(e) => setFormCompany(e.target.value)} placeholder="e.g. Nexora Tech" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="client-position-input">Position / Role <span className="optional-text">(Optional)</span></label>
                      <input type="text" id="client-position-input" value={formPosition} onChange={(e) => setFormPosition(e.target.value)} placeholder="e.g. Founder" />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="client-text-input">Your Review Testimony <span className="gold-text-accent">*</span></label>
                    <textarea id="client-text-input" rows={4} value={formReview} onChange={(e) => setFormReview(e.target.value)} placeholder="Describe your architecture experience with Varun and Yagesh..." required />
                  </div>

                  <div className="modal-actions-group">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} id="btn-cancel-form">Cancel</button>
                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      id="btn-publish-review"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Publish Testimony
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
