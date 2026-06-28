'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';

const STATS = [
  { label: 'Projects Completed', value: '15+' },
  { label: 'Production Apps', value: '3' },
  { label: 'Technologies', value: '10+' },
  { label: 'Months Experience', value: '8+' },
];

export default function LobbySection() {
  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">
          Reception Lobby
        </p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">
          Hello, World 👋
        </h2>
        <div
          className="h-px w-24 mt-4"
          style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }}
        />
      </motion.div>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 mb-8 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(circle at top right, #00D4FF, transparent 60%)' }}
        />
        <div className="flex items-start gap-5">
          {/* Avatar placeholder */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #00D4FF22, #7C3AED22)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            👨‍💻
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-1">
              {PERSONAL_INFO.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {PERSONAL_INFO.role.map((r) => (
                <span
                  key={r}
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
              <span>📍</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* About text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 space-y-4 text-white/60 text-sm leading-relaxed"
      >
        <p>
          I'm an <span className="text-[#7C3AED]">AI/ML Engineer</span> focused on building
          production-ready AI applications and scalable{' '}
          <span className="text-[#00D4FF]">full-stack solutions</span>. Based in Vijayawada,
          Andhra Pradesh, India.
        </p>
        <p>
          Currently at{' '}
          <span className="text-[#F59E0B]">{PERSONAL_INFO.company}</span>, I develop intelligent
          products that automate workflows, enhance user experiences, and solve real-world
          business challenges through modern AI technologies.
        </p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className="glass rounded-xl p-4 text-center"
          >
            <div
              className="text-3xl font-display font-bold mb-1"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {s.value}
            </div>
            <div className="text-xs text-white/40 font-mono">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* What I do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-sm font-display font-semibold text-white/80 mb-4 uppercase tracking-widest">
          What I Build
        </h3>
        <div className="space-y-3">
          {[
            { icon: '🤖', title: 'AI/ML Powered Applications', desc: 'LLM integrations, RAG pipelines, AI agents, chatbots, intelligent document processing, workflow automation' },
            { icon: '🌐', title: 'Full Stack Web Applications', desc: 'Scalable, high-performance web applications using React, Next.js, Node.js, TypeScript, and PostgreSQL' },
            { icon: '📊', title: 'Data & Analytics Platforms', desc: 'Real-time dashboards, analytics systems, data visualization, and AI-driven insights' },
            { icon: '☁️', title: 'Cloud & DevOps', desc: 'Docker, Linux, Git, CI/CD pipelines, cloud deployment, and backend infrastructure' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="text-sm font-display font-medium text-white/80">{item.title}</div>
                <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
