'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Experience Hall</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">My Journey</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, #00D4FF, #7C3AED, #F59E0B, transparent)' }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <div className="space-y-8 ml-4">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
              className="relative pl-8"
            >
              {/* Dot */}
              <motion.div
                className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: exp.color, background: `${exp.color}20` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.3, type: 'spring' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
              </motion.div>

              {/* Card */}
              <div
                className="glass rounded-2xl p-5 relative overflow-hidden"
                style={{ borderLeft: `2px solid ${exp.color}30` }}
              >
                <div
                  className="absolute inset-0 opacity-5"
                  style={{ background: `radial-gradient(circle at top left, ${exp.color}, transparent 60%)` }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-display font-bold text-white">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium" style={{ color: exp.color }}>{exp.company}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-white/40">{exp.period}</div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono mt-1 inline-block"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-xs text-white/30 font-mono">
                    <span>📍</span>
                    <span>{exp.location}</span>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed mb-4">{exp.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((ach, ai) => (
                      <motion.div
                        key={ai}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + ai * 0.05 + 0.4 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-xs mt-0.5" style={{ color: exp.color }}>▸</span>
                        <span className="text-xs text-white/60">{ach}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
