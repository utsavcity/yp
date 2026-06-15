import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, Sparkles, Check, Loader2, ArrowUpRight, User, Building, FileText } from 'lucide-react';

interface ContactFormState {
  fullName: string; email: string; phone: string; companyName: string; projectRequirement: string;
}
interface FormErrors {
  fullName?: string; email?: string; phone?: string; projectRequirement?: string;
}

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

const headerReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function Contact() {
  const [form, setForm] = useState<ContactFormState>({ fullName: '', email: '', phone: '', companyName: '', projectRequirement: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = (field: string) => { setFocusedField(null); validateField(field); };
  const handleInputChange = (field: keyof ContactFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };
    if (field === 'fullName') { if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.'; else delete newErrors.fullName; }
    if (field === 'email') { const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!form.email.trim()) newErrors.email = 'Email Address is required.'; else if (!re.test(form.email.trim())) newErrors.email = 'Please provide a valid email format.'; else delete newErrors.email; }
    if (field === 'phone') { const re = /^[+]?[0-9\s\-()]{8,20}$/; if (!form.phone.trim()) newErrors.phone = 'Phone Number is required.'; else if (!re.test(form.phone.trim())) newErrors.phone = 'Please provide a valid contact number format.'; else delete newErrors.phone; }
    if (field === 'projectRequirement') { if (!form.projectRequirement.trim()) newErrors.projectRequirement = 'Project Requirement description is required.'; else if (form.projectRequirement.trim().length < 25) newErrors.projectRequirement = `Please elaborate (${form.projectRequirement.trim().length}/25 min).`; else delete newErrors.projectRequirement; }
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9\s\-()]{8,20}$/;
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email address is required.';
    else if (!emailRegex.test(form.email.trim())) newErrors.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!phoneRegex.test(form.phone.trim())) newErrors.phone = 'Please enter a valid phone number.';
    if (!form.projectRequirement.trim()) newErrors.projectRequirement = 'Please specify your project requirement details.';
    else if (form.projectRequirement.trim().length < 25) newErrors.projectRequirement = 'Please describe your requirement in at least 25 characters.';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => { setIsSuccess(false); setForm({ fullName: '', email: '', phone: '', companyName: '', projectRequirement: '' }); }, 5000);
    }, 2400);
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917738410534?text=Hello%20NOVAOPS!%20I'd%20love%20to%20discuss%20a%20project%20requirement%20concerning%20intelligent%20software.", "_blank");
  };

  const infoCards = [
    { id: 'card-address', icon: MapPin, label: '📍 ADDRESS', content: 'Green Meadows, Shirdhon,', sub: 'Panvel, Maharashtra - 410221' },
    { id: 'card-founder-yagesh', icon: User, label: '📞 FOUNDER', contentName: 'Yagesh Pandey', phone: '+91 82914 19044', telHref: 'tel:+918291419044' },
    { id: 'card-founder-varun', icon: User, label: '📞 CO-FOUNDER', contentName: 'Varun Sharma', phone: '+91 77384 10534', telHref: 'tel:+917738410534' },
    { id: 'card-whatsapp', icon: MessageCircle, isWhatsapp: true },
    { id: 'card-email', icon: Mail, label: '✉ EMAIL', emailLink: 'info@novaops.com', sub: 'Expect a technical draft response in less than 4 hours.' },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg-glow">
        <div className="contact-glow-orb gold-glow" />
        <div className="contact-glow-orb blue-glow" />
      </div>

      <div className="contact-container" id="contact-inner-section">

        {/* Header */}
        <motion.div
          className="contact-header"
          id="contact-header-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div className="section-pre-title inline-title" id="contact-p-label" variants={headerReveal}>
            <Sparkles size={11} style={{ marginRight: '6px' }} />
            Let's Build Something Exceptional
          </motion.div>
          <motion.h2 className="section-title centered" id="contact-title" variants={headerReveal}>
            Tell us about your <span className="gold">idea.</span>
          </motion.h2>
          <motion.p className="section-description centered mx-auto max-w-2xl" id="contact-description" variants={headerReveal}>
            Every great digital product begins with a conversation. Share your vision with NOVAOPS, and let's explore how technology can bring it to life.
          </motion.p>
        </motion.div>

        <div className="contact-grid" id="contact-two-columns">

          {/* Left: info cards stagger from left */}
          <div className="contact-info-cards" id="contact-cards-container">

            {/* Address */}
            <motion.div className="info-glass-card glass-panel" id="card-address" custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }}>
              <div className="info-card-glow" />
              <div className="info-icon-wrapper"><MapPin size={18} /></div>
              <div className="info-text-details">
                <span className="info-label">📍 ADDRESS</span>
                <p className="info-content">Green Meadows, Shirdhon,</p>
                <p className="info-subcontent">Panvel, Maharashtra - 410221</p>
              </div>
            </motion.div>

            {/* Founder */}
            <motion.div className="info-glass-card glass-panel" id="card-founder-yagesh" custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }}>
              <div className="info-card-glow" />
              <div className="info-icon-wrapper"><User size={18} /></div>
              <div className="info-text-details">
                <span className="info-label">📞 FOUNDER</span>
                <p className="info-content-name">Yagesh Pandey</p>
                <a href="tel:+918291419044" className="info-phone-link"><Phone size={12} className="inline-icon" />+91 82914 19044</a>
              </div>
            </motion.div>

            {/* Co-Founder */}
            <motion.div className="info-glass-card glass-panel" id="card-founder-varun" custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }}>
              <div className="info-card-glow" />
              <div className="info-icon-wrapper"><User size={18} /></div>
              <div className="info-text-details">
                <span className="info-label">📞 CO-FOUNDER</span>
                <p className="info-content-name">Varun Sharma</p>
                <a href="tel:+917738410534" className="info-phone-link"><Phone size={12} className="inline-icon" />+91 77384 10534</a>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.div className="info-glass-card glass-panel whatsapp-interactive-card" onClick={handleWhatsAppClick} id="card-whatsapp" style={{ cursor: 'pointer' }} custom={3} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }}>
              <div className="whatsapp-green-gold-glow" />
              <div className="info-icon-wrapper whatsapp-theme-icon"><MessageCircle size={18} /></div>
              <div className="info-text-details">
                <span className="info-label text-emerald-400 font-mono flex items-center">💬 WHATSAPP <ArrowUpRight size={10} style={{ marginLeft: '4px' }} /></span>
                <p className="info-content text-emerald-300 font-medium">Chat with us instantly</p>
                <p className="info-subcontent">Active for immediate project consulting.</p>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div className="info-glass-card glass-panel" id="card-email" custom={4} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }}>
              <div className="info-card-glow" />
              <div className="info-icon-wrapper"><Mail size={18} /></div>
              <div className="info-text-details">
                <span className="info-label">✉ EMAIL</span>
                <p className="info-content font-mono"><a href="mailto:info@novaops.com" className="email-mailto-link">info@novaops.com</a></p>
                <p className="info-subcontent">Expect a technical draft response in less than 4 hours.</p>
              </div>
            </motion.div>

          </div>

          {/* Right: form slides in from right */}
          <motion.div
            className="contact-form-wrapper"
            id="contact-form-section"
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="form-glass-card glass-panel" id="form-container">
              <div className="form-card-glow-aurora" />

              {isSuccess ? (
                <motion.div
                  className="form-success-overlay"
                  id="form-success-overlay-box"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="success-halo-circle">
                    <Check size={36} color="var(--accent-gold)" />
                  </div>
                  <h3 className="success-headline">Project Consultation Initiated!</h3>
                  <p className="success-desc">Thank you, <strong className="text-white">{form.fullName}</strong>. Your project requirement has been parsed and logged successfully.</p>
                  <p className="success-meta font-mono">Yagesh Pandey or Varun Sharma will contact you within the next 4 hours at <span className="gold">{form.email}</span> with a customized architectural breakdown draft.</p>
                  <button className="btn btn-secondary text-xs font-mono tracking-widest mt-6" onClick={() => setIsSuccess(false)} id="btn-dismiss-success">SUBMIT ANOTHER DISCOVERY REQUEST</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-discovery-form" id="intake-form" noValidate>

                  <div className={`form-field-group ${focusedField === 'fullName' ? 'focused' : ''} ${form.fullName ? 'has-value' : ''} ${errors.fullName ? 'has-error' : ''}`} id="field-container-fullName">
                    <div className="field-inner-wrapper">
                      <User size={16} className="input-row-icon" />
                      <div className="input-relative-label-container">
                        <label htmlFor="fullname-input" className="form-floating-label">Full Name <span className="gold-text-accent">*</span></label>
                        <input type="text" id="fullname-input" value={form.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} onFocus={() => handleFocus('fullName')} onBlur={() => handleBlur('fullName')} required placeholder={focusedField === 'fullName' ? 'e.g. Rahul Mehta' : ''} />
                      </div>
                    </div>
                    {errors.fullName && <span className="field-error-message" id="error-fullName">{errors.fullName}</span>}
                  </div>

                  <div className="form-twin-grid">
                    <div className={`form-field-group ${focusedField === 'email' ? 'focused' : ''} ${form.email ? 'has-value' : ''} ${errors.email ? 'has-error' : ''}`} id="field-container-email">
                      <div className="field-inner-wrapper">
                        <Mail size={16} className="input-row-icon" />
                        <div className="input-relative-label-container">
                          <label htmlFor="email-input" className="form-floating-label">Email Address <span className="gold-text-accent">*</span></label>
                          <input type="email" id="email-input" value={form.email} onChange={(e) => handleInputChange('email', e.target.value)} onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')} required placeholder={focusedField === 'email' ? 'e.g. rahul@company.com' : ''} />
                        </div>
                      </div>
                      {errors.email && <span className="field-error-message" id="error-email">{errors.email}</span>}
                    </div>
                    <div className={`form-field-group ${focusedField === 'phone' ? 'focused' : ''} ${form.phone ? 'has-value' : ''} ${errors.phone ? 'has-error' : ''}`} id="field-container-phone">
                      <div className="field-inner-wrapper">
                        <Phone size={16} className="input-row-icon" />
                        <div className="input-relative-label-container">
                          <label htmlFor="phone-input" className="form-floating-label">Phone Number <span className="gold-text-accent">*</span></label>
                          <input type="tel" id="phone-input" value={form.phone} onChange={(e) => handleInputChange('phone', e.target.value)} onFocus={() => handleFocus('phone')} onBlur={() => handleBlur('phone')} required placeholder={focusedField === 'phone' ? 'e.g. +91 99999 99999' : ''} />
                        </div>
                      </div>
                      {errors.phone && <span className="field-error-message" id="error-phone">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className={`form-field-group ${focusedField === 'companyName' ? 'focused' : ''} ${form.companyName ? 'has-value' : ''}`} id="field-container-companyName">
                    <div className="field-inner-wrapper">
                      <Building size={16} className="input-row-icon" />
                      <div className="input-relative-label-container">
                        <label htmlFor="company-input" className="form-floating-label">Company Name <span className="optional-tag-text">(Optional)</span></label>
                        <input type="text" id="company-input" value={form.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} onFocus={() => handleFocus('companyName')} onBlur={() => handleBlur('companyName')} placeholder={focusedField === 'companyName' ? 'e.g. Nexora Technologies' : ''} />
                      </div>
                    </div>
                  </div>

                  <div className={`form-field-group textarea-group ${focusedField === 'projectRequirement' ? 'focused' : ''} ${form.projectRequirement ? 'has-value' : ''} ${errors.projectRequirement ? 'has-error' : ''}`} id="field-container-projectRequirement">
                    <div className="field-inner-wrapper items-start pt-3">
                      <FileText size={16} className="input-row-icon mt-1" />
                      <div className="input-relative-label-container">
                        <label htmlFor="requirement-input" className="form-floating-label">Project Requirement <span className="gold-text-accent">*</span></label>
                        <textarea id="requirement-input" rows={5} value={form.projectRequirement} onChange={(e) => handleInputChange('projectRequirement', e.target.value)} onFocus={() => handleFocus('projectRequirement')} onBlur={() => handleBlur('projectRequirement')} required placeholder={focusedField === 'projectRequirement' ? 'Describe what you wish to automate, build, or deploy...' : ''} />
                      </div>
                    </div>
                    {errors.projectRequirement && <span className="field-error-message" id="error-projectRequirement">{errors.projectRequirement}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className={`nav-cta submit-project-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                    id="btn-submit-project"
                    style={{ width: '100%', padding: '1.1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.92rem', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                  >
                    {isSubmitting ? (
                      <><Loader2 size={16} className="spinner-loader-icon" /><span>ANALYZING SYSTEM REQUIREMENTS...</span></>
                    ) : (
                      <><span>Start Your Project</span><ArrowUpRight size={16} /></>
                    )}
                  </motion.button>

                  <div className="form-trust-statement">
                    <span className="bullet-signal" />
                    <span>Direct line connection bypasses sales departments. Connects to Founders instantly.</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
