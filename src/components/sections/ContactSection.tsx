'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';
import {
  LinkedInIcon,
  GitHubIcon,
  GlobeIcon,
  MailIcon,
  LocationIcon,
  CheckIcon,
  SendIcon,
} from '@/components/ui/Icons';

const LINKS = [
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: LinkedInIcon, color: '#0A66C2', desc: 'Connect professionally' },
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: GitHubIcon, color: '#00D4FF', desc: 'Explore my code' },
  { label: 'Live Portfolio', href: PERSONAL_INFO.portfolio, Icon: GlobeIcon, color: '#7C3AED', desc: 'View deployment' },
  { label: 'Direct Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: MailIcon, color: '#F59E0B', desc: PERSONAL_INFO.email },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="p-8 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-xs tracking-[0.3em] text-[#00D4FF]/60 font-mono uppercase mb-3">Contact Lounge</p>
        <h2 className="text-4xl font-display font-bold text-white mb-2">Let's Connect</h2>
        <div className="h-px w-24 mt-4" style={{ background: 'linear-gradient(90deg, #00D4FF, #7C3AED)' }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-white/60 leading-relaxed mb-8"
      >
        Whether you have a project in mind, an opportunity to collaborate, or wish to discuss AI systems and engineering—my inbox is always open.
      </motion.p>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {LINKS.map((link, i) => {
          const ItemIcon = link.Icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-all duration-300 group"
              style={{ borderLeft: `2px solid ${link.color}60` }}
              whileHover={{ scale: 1.02, borderLeftColor: link.color }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${link.color}15`, color: link.color }}
                >
                  <ItemIcon className="w-4 h-4" />
                </div>
                <motion.span className="text-white/30 group-hover:text-white/70 transition-colors text-sm">→</motion.span>
              </div>
              <div>
                <div className="text-sm font-display font-semibold text-white">{link.label}</div>
                <div className="text-xs text-white/40 font-mono truncate">{link.desc}</div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-sm font-display font-semibold text-white/90 mb-5">Send a Direct Message</h3>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981]">
              <CheckIcon className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-display font-bold text-white mb-2">Message Dispatched</h4>
            <p className="text-sm text-white/50">Thank you for reaching out. I'll get back to you promptly!</p>
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
                placeholder="Tell me about your project or inquiry..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D4FF]/50 transition-colors resize-none font-mono"
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={sending}
              className="w-full py-3 rounded-lg font-display font-semibold text-sm text-white relative overflow-hidden flex items-center justify-center gap-2"
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
                <>
                  <SendIcon className="w-4 h-4" />
                  <span>Send Message</span>
                </>
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
        className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40 font-mono"
      >
        <LocationIcon className="w-3.5 h-3.5 text-[#00D4FF]" />
        <span>Based in Vijayawada, AP, India</span>
        <span className="mx-1">·</span>
        <span>J&J</span>
      </motion.div>
    </div>
  );
}
