'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/lib/data';
import {
  CodeIcon,
  TerminalIcon,
  BrainIcon,
  DatabaseIcon,
  GitForkIcon,
  CloudIcon,
} from '@/components/ui/Icons';

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', Icon: CodeIcon, color: '#00D4FF' },
  { key: 'backend', label: 'Backend', Icon: TerminalIcon, color: '#7C3AED' },
  { key: 'aiMl', label: 'AI / ML', Icon: BrainIcon, color: '#10B981' },
  { key: 'databases', label: 'Databases', Icon: DatabaseIcon, color: '#F59E0B' },
  { key: 'devops', label: 'DevOps', Icon: GitForkIcon, color: '#EF4444' },
  { key: 'cloud', label: 'Cloud', Icon: CloudIcon, color: '#3B82F6' },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const cat = CATEGORIES.find((c) => c.key === activeCategory)!;
  const skills = SKILLS[activeCategory as keyof typeof SKILLS];
  const ActiveIcon = cat.Icon;

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Skills Arena</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Tech Stack</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #10B981, transparent)' }} />
      </motion.div>

      {/* Category selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-2.5 mb-8"
      >
        {CATEGORIES.map((c) => {
          const ItemIcon = c.Icon;
          const isActive = activeCategory === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`p-3 rounded-xl text-center transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${
                isActive ? 'border shadow-lg' : 'glass hover:bg-white/10'
              }`}
              style={
                isActive
                  ? { background: `${c.color}15`, borderColor: `${c.color}40`, color: c.color }
                  : { color: 'rgba(255,255,255,0.7)' }
              }
            >
              <ItemIcon className="w-5 h-5" />
              <div className="text-xs font-mono">{c.label}</div>
            </button>
          );
        })}
      </motion.div>

      {/* Skills for category */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${cat.color}20`, border: `1px solid ${cat.color}40`, color: cat.color }}
            >
              <ActiveIcon className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">{cat.label}</h3>
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
          </div>

          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-display font-medium text-white/80">{skill.name}</span>
                <motion.span
                  className="text-xs font-mono font-semibold"
                  style={{ color: cat.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Animated bar */}
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${cat.color}80, ${cat.color})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 1, ease: 'easeOut' }}
                />
                {/* Glow */}
                <motion.div
                  className="absolute inset-y-0 w-8 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                    left: `${skill.level - 5}%`,
                    filter: 'blur(4px)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 0.2 + i * 0.05 + 1, duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* All technologies cloud */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <h3 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">All Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {Object.values(SKILLS)
            .flat()
            .map((s, i) => (
              <motion.span
                key={`${s.name}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.01 }}
                className="text-xs px-2.5 py-1 rounded-md font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {s.name}
              </motion.span>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
