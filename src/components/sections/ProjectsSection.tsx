'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/lib/data';

const CATEGORIES = ['All', 'AI / ML', 'Full Stack', 'Data Science', 'DevOps'];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const selectedProject = PROJECTS.find((p) => p.id === selected);

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Projects Studio</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">My Work</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
              filter === cat
                ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(selected === project.id ? null : project.id)}
              className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                selected === project.id ? 'border border-opacity-50' : 'hover:bg-white/5'
              }`}
              style={{ borderColor: selected === project.id ? project.color : undefined }}
            >
              {/* Header */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {project.featured && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-mono"
                          style={{ background: `${project.color}22`, color: project.color, border: `1px solid ${project.color}33` }}>
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-white/30 font-mono">{project.category}</span>
                    </div>
                    <h3 className="text-base font-display font-bold text-white">{project.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: selected === project.id ? 45 : 0 }}
                    className="text-white/30 text-xl flex-shrink-0 ml-2"
                  >
                    +
                  </motion.div>
                </div>

                {/* Color accent */}
                <div className="h-0.5 rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

                <AnimatePresence>
                  {selected === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-white/60 leading-relaxed mb-4">{project.description}</p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors"
                          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)' }}
                        >
                          <span>⚡</span> GitHub
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-colors text-white"
                          style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`, border: `1px solid ${project.color}40` }}
                        >
                          <span>🔗</span> Live Demo
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
