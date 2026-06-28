'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';

const LINKS = [
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, icon: '💼', color: '#0A66C2', desc: 'Connect professionally' },
  { label: 'GitHub', href: PERSONAL_INFO.github, icon: '⚡', color: '#00D4FF', desc: 'See my code' },
  { label: 'Portfolio', href: PERSONAL_INFO.oldPortfolio, icon: '🌐', color: '#7C3AED', desc: 'Previous portfolio' },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, icon: '📩', color: '#F59E0B', desc: PERSONAL_INFO.email },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Contact Lounge</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Let's Talk</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #00D4FF, #7C3AED)' }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-white/50 leading-relaxed mb-8"
      >
        Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox
        is always open. Let's build something amazing together.
      </motion.p>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="glass rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-all duration-300 group"
            style={{ borderLeft: `2px solid ${link.color}40` }}
            whileHover={{ scale: 1.02, borderLeftColor: link.color }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{link.icon}</span>
              <motion.span className="text-white/20 group-hover:text-white/60 transition-colors text-sm">→</motion.span>
            </div>
            <div>
              <div className="text-sm font-display font-semibold text-white">{link.label}</div>
              <div className="text-xs text-white/30 font-mono truncate">{link.desc}</div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-sm font-display font-semibold text-white/80 mb-5">Send a Message</h3>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 0.6 }}
            >
              ✅
            </motion.div>
            <h4 className="text-lg font-display font-bold text-white mb-2">Message Sent!</h4>
            <p className="text-sm text-white/40">I'll get back to you soon. Looking forward to connecting!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white/40 font-mono block mb-1.5">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/50 transition-colors font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 font-mono block mb-1.5">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/50 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/40 font-mono block mb-1.5">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none font-mono"
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full py-3 rounded-lg font-display font-semibold text-sm text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⟳
                  </motion.span>
                  Sending...
                </span>
              ) : (
                'Send Message 📡'
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-xs text-white/20 font-mono"
      >
        <span>📍 Based in Vijayawada, AP, India</span>
        <span className="mx-2">·</span>
        <span>Junior Full Stack and AI/ML Developer</span>
      </motion.div>
    </div>
  );
}
