'use client';

import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '@/lib/data';

export default function CertificationsSection() {
  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Certification Gallery</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Credentials</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
      </motion.div>

      <div className="grid grid-cols-1 gap-5">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.1 }}
            className="relative"
          >
            {/* Certificate frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${cert.color}08, rgba(5,10,20,0.8))`,
                border: `1px solid ${cert.color}25`,
              }}
            >
              {/* Spotlight effect */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 20% 50%, ${cert.color}, transparent 60%)`,
                }}
              />

              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 opacity-40" style={{ borderTop: `1px solid ${cert.color}`, borderLeft: `1px solid ${cert.color}` }} />
              <div className="absolute top-2 right-2 w-3 h-3 opacity-40" style={{ borderTop: `1px solid ${cert.color}`, borderRight: `1px solid ${cert.color}` }} />
              <div className="absolute bottom-2 left-2 w-3 h-3 opacity-40" style={{ borderBottom: `1px solid ${cert.color}`, borderLeft: `1px solid ${cert.color}` }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 opacity-40" style={{ borderBottom: `1px solid ${cert.color}`, borderRight: `1px solid ${cert.color}` }} />

              <div className="relative z-10 p-5 flex items-center gap-5">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {cert.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-sm font-display font-bold text-white mb-1">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40 font-mono">{cert.issuer}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Verified badge */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}
                  animate={{ boxShadow: [`0 0 0px ${cert.color}00`, `0 0 10px ${cert.color}40`, `0 0 0px ${cert.color}00`] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="text-sm">✓</span>
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
        <div className="text-4xl mb-3">🏆</div>
        <h3 className="text-lg font-display font-bold text-white mb-2">Continuous Learning</h3>
        <p className="text-sm text-white/40 max-w-xs mx-auto">
          Always expanding knowledge with the latest technologies and industry best practices.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-xs text-white/20 font-mono">More certifications in progress</span>
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
