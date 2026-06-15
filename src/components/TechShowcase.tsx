import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Cloud, Layers, Settings2, Sparkles, CheckCircle2 } from 'lucide-react';

const headerReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
};

export default function TechShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('ai');

  const categories = [
    { id: 'ai', label: 'Artificial Intelligence', icon: Cpu },
    { id: 'software', label: 'Software Engineering', icon: Terminal },
    { id: 'cloud', label: 'Cloud Infrastructure', icon: Cloud },
    { id: 'web', label: 'Web Technologies', icon: Layers },
    { id: 'automation', label: 'Automation Systems', icon: Settings2 },
  ];

  const techNodes: Record<string, Array<{ name: string; tag: string; description: string; parentId: string }>> = {
    ai: [
      { name: 'Large Language Models (LLMs)', tag: 'GPT-4o & Gemini 1.5 Pro', description: 'Deep tuning of commercial LLMs for smart prompt engineering & customized business task handling.', parentId: 'AI' },
      { name: 'Model Fine-Tuning & Prompt Tuning', tag: 'PyTorch / LLaMA-Index', description: 'Domain-specific enterprise knowledge base embedding and bespoke model weight optimizations.', parentId: 'AI' },
      { name: 'Computer Vision & Classification', tag: 'OpenCV / TensorRT', description: 'High-speed object identification, video parsing workflows, and optical character document recognition.', parentId: 'AI' },
      { name: 'Retrieval Augmented Generation (RAG)', tag: 'Pinecone / Milvus', description: 'Contextually aware, zero-leak enterprise search systems grounded on secure company directories.', parentId: 'AI' },
    ],
    software: [
      { name: 'High-Performance Backend systems', tag: 'Go / Node.js ESM', description: 'Robust, concurrent REST and gRPC servers constructed with structured telemetry.', parentId: 'Soft' },
      { name: 'Safe Relational Databases', tag: 'Postgres / Cloud Spanner', description: 'Surgical database transaction logs, ACID compliance, and relational schema integrity.', parentId: 'Soft' },
      { name: 'Real-Time Event Streams', tag: 'Apache Kafka / RabbitMQ', description: 'Asynchronous messaging loops guiding high-throughput multi-agent execution lanes.', parentId: 'Soft' },
      { name: 'Custom SDKs & APIs', tag: 'GraphQL / OpenAPI', description: 'Clean external-facing API models perfectly documented to accelerate integration.', parentId: 'Soft' },
    ],
    cloud: [
      { name: 'Modern Microservices Architectures', tag: 'Kubernetes / GKE', description: 'Self-healing, auto-scaling container orchestration environments operating at maximum efficiency.', parentId: 'Cloud' },
      { name: 'Serverless APIs & Functions', tag: 'Cloud Run / AWS Lambda', description: 'Scale-to-zero infrastructure models minimizing monthly compute overhead.', parentId: 'Cloud' },
      { name: 'Infrastructure as Code (IaC)', tag: 'Terraform / Pulumi', description: 'Fully documented, repeatable infrastructure deployments guaranteeing high disaster recovery.', parentId: 'Cloud' },
      { name: 'Secure Secret Managers', tag: 'HashiCorp Vault / GCP KMS', description: 'Encrypted environmental configuration variables with secure, rotating access keys.', parentId: 'Cloud' },
    ],
    web: [
      { name: 'Fluid SPA Architectures', tag: 'React 19 / Next.js', description: 'Fully fluid single-page experiences built with strict responsive layouts.', parentId: 'Web' },
      { name: 'State Management Systems', tag: 'Zustand / Redux Toolkit', description: 'Highly stabilized client-side persistence models with minimum frame impact.', parentId: 'Web' },
      { name: 'Stunning Animation Engines', tag: 'Tailwind CSS / Motion', description: 'Apple-quality micro-interactions, spring physics, and hardware-accelerated transitions.', parentId: 'Web' },
      { name: 'Custom Performance Auditing', tag: 'Lighthouse / Web Vitals', description: 'Achieving sub-second loading speeds through strict image compilation and code-splitting.', parentId: 'Web' },
    ],
    automation: [
      { name: 'Self-Operating Agent Loops', tag: 'LangChain Agents / CrewAI', description: 'Independent digital execution loops managing real-world client workflows.', parentId: 'Auto' },
      { name: 'ETL Pipeline Automations', tag: 'Apache Airflow / Python', description: 'Scheduled business intelligence gathering, extraction, and automated report compilation.', parentId: 'Auto' },
      { name: 'Smart Messaging Interfaces', tag: 'WhatsApp API / Slack Webhooks', description: 'Triggering transactional messaging, alerts, and workflow tasks inside common chat environments.', parentId: 'Auto' },
      { name: 'Legacy RPA Migrations', tag: 'Selenium / Playwright Web Agents', description: 'Automating legacy administrative structures lacking standard API endpoints.', parentId: 'Auto' },
    ]
  };

  return (
    <section className="tech-showcase-section" id="tech-showcase">

      {/* Header reveal */}
      <motion.div
        className="section-header-centered"
        id="tech-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="section-pre-title" id="tech-pre-label" style={{ margin: '0 auto' }} variants={headerReveal}>
          Tech Matrix
        </motion.div>
        <motion.h2 className="section-title centered" id="tech-headline" variants={headerReveal}>
          Ecosystem <span className="gold">&amp; Innovation</span>
        </motion.h2>
        <motion.p className="section-description centered" id="tech-subheadline" variants={headerReveal}>
          An interactive map of the modern frameworks, advanced models, and robust cloud configurations integrated into our bespoke digital architectures.
        </motion.p>
      </motion.div>

      {/* Tab bar */}
      <motion.div
        className="tech-tab-scroller-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <div className="tech-categories-tabs" id="tech-tab-bar">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                className={`tech-tab-btn glass-panel ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                id={`tech-tab-${cat.id}`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <CatIcon size={16} className="tech-tab-icon" />
                <span>{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* AnimatePresence for tab switching — cards fade+slide in/out */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="tech-details-grid"
          id="tech-details-container"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
          transition={{ duration: 0.38, ease: [0.25, 0.8, 0.25, 1] }}
        >
          {techNodes[activeCategory].map((node, index) => (
            <motion.div
              className="tech-node-card glass-panel"
              key={`${activeCategory}-${index}`}
              id={`tech-node-${activeCategory}-${index}`}
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.8, 0.25, 1] }}
              whileHover={{ y: -5, borderColor: 'var(--glass-border-hover)', transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            >
              <div className="node-glow-leak" />

              <div className="node-top-bar">
                <span className="node-badge">
                  <Sparkles size={11} style={{ marginRight: '4px' }} />
                  {node.tag}
                </span>
                <span className="node-parent-tag">{node.parentId}</span>
              </div>

              <h3 className="node-name">
                <CheckCircle2 size={15} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                {node.name}
              </h3>

              <p className="node-description">{node.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
