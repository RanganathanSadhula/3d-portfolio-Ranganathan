'use client';

import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '@/lib/data';
import { CheckIcon, AwardIcon } from '@/components/ui/Icons';

export default function CertificationsSection() {
  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Certification Gallery</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Credentials</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 + 0.1 }}
            className="relative"
          >
            {/* Certificate frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${cert.color}08, rgba(5,10,20,0.85))`,
                border: `1px solid ${cert.color}25`,
              }}
            >
              {/* Spotlight effect */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 20% 50%, ${cert.color}, transparent 60%)`,
                }}
              />

              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 opacity-40" style={{ borderTop: `1px solid ${cert.color}`, borderLeft: `1px solid ${cert.color}` }} />
              <div className="absolute top-2 right-2 w-3 h-3 opacity-40" style={{ borderTop: `1px solid ${cert.color}`, borderRight: `1px solid ${cert.color}` }} />
              <div className="absolute bottom-2 left-2 w-3 h-3 opacity-40" style={{ borderBottom: `1px solid ${cert.color}`, borderLeft: `1px solid ${cert.color}` }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 opacity-40" style={{ borderBottom: `1px solid ${cert.color}`, borderRight: `1px solid ${cert.color}` }} />

              <div className="relative z-10 p-5 flex items-center gap-4">
                {/* Tag Badge */}
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}40`,
                    color: cert.color,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {cert.tag}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-display font-bold text-white mb-1 truncate">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50 font-mono truncate mr-2">{cert.issuer}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono font-medium flex-shrink-0"
                      style={{ background: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Verified badge */}
                <motion.div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                  animate={{ boxShadow: [`0 0 0px ${cert.color}00`, `0 0 8px ${cert.color}40`, `0 0 0px ${cert.color}00`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <CheckIcon className="w-3.5 h-3.5" style={{ color: cert.color }} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-10 glass rounded-2xl p-6 text-center"
      >
        <AwardIcon className="w-10 h-10 mx-auto mb-3 text-[#F59E0B]" />
        <h3 className="text-lg font-display font-bold text-white mb-2">Continuous Learning</h3>
        <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
          Continuously advancing proficiency across Generative AI, Cloud infrastructure, and software engineering standards.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-xs text-white/30 font-mono">More certifications in progress</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-[#00D4FF]"
          >
            ●
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
