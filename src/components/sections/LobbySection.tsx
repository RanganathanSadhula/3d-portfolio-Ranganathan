'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';
import { LocationIcon, BrainIcon, CodeIcon, DatabaseIcon, CloudIcon } from '@/components/ui/Icons';

const STATS = [
  { label: 'Projects Completed', value: '15+' },
  { label: 'Production Pipelines', value: '3+' },
  { label: 'Core Technologies', value: '12+' },
  { label: 'Industry Recognitions', value: '3' },
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
          Hello, World
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
          {/* Avatar monogram badge */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-white flex-shrink-0 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.25))',
              border: '1px solid rgba(0,212,255,0.4)',
              boxShadow: '0 0 25px rgba(0,212,255,0.25)',
            }}
          >
            <span style={{ background: 'linear-gradient(135deg, #00D4FF, #ffffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RS
            </span>
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-1">
              {PERSONAL_INFO.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {PERSONAL_INFO.role.map((r) => (
                <span
                  key={r}
                  className="text-xs px-2.5 py-0.5 rounded-full font-mono"
                  style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.25)' }}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
              <LocationIcon className="w-3.5 h-3.5 text-[#00D4FF]" />
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
          I'm an <span className="text-[#00D4FF] font-medium">AI/ML Engineer</span> and <span className="text-[#7C3AED] font-medium">Full Stack Developer</span> focused on building
          production-ready AI applications, enterprise RAG pipelines, and scalable web solutions.
        </p>
        <p>
          Currently at{' '}
          <span className="text-[#F59E0B] font-medium">{PERSONAL_INFO.company}</span>, I engineer intelligent
          pipelines for <span className="text-white/80">DataGlow.ai</span> that automate workflows, enhance multi-modal reasoning, and solve real-world
          enterprise challenges.
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
        <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">
          What I Build
        </h3>
        <div className="space-y-3">
          {[
            { Icon: BrainIcon, title: 'AI/ML Powered Applications', desc: 'LLM integrations, RAG pipelines, AI agents, chatbots, intelligent document processing, and workflow automation', color: '#00D4FF' },
            { Icon: CodeIcon, title: 'Full Stack Web Applications', desc: 'Scalable, high-performance web applications using React, Next.js, Node.js, TypeScript, and modern APIs', color: '#7C3AED' },
            { Icon: DatabaseIcon, title: 'Data & Analytics Platforms', desc: 'Vector databases, retrieval pipelines, real-time dashboards, and AI-driven data intelligence', color: '#F59E0B' },
            { Icon: CloudIcon, title: 'Cloud & DevOps Engineering', desc: 'Docker, Linux systems, CI/CD pipelines, cloud deployment, and edge IoT devices', color: '#10B981' },
          ].map((item, i) => {
            const ItemIcon = item.Icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-white/5 transition-colors glass"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <ItemIcon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-sm font-display font-medium text-white/90">{item.title}</div>
                  <div className="text-xs text-white/45 mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
