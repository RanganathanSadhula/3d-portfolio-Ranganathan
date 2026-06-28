'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore, CampusSection } from '@/lib/store';
import { PERSONAL_INFO } from '@/lib/data';

const NAV_ITEMS: { id: CampusSection; label: string; icon: string; short: string }[] = [
  { id: 'lobby', label: 'Reception Lobby', icon: '🏛️', short: 'Lobby' },
  { id: 'ai-lab', label: 'AI Research Lab', icon: '🧠', short: 'AI Lab' },
  { id: 'projects', label: 'Projects Studio', icon: '💡', short: 'Projects' },
  { id: 'github', label: 'GitHub Center', icon: '⚡', short: 'GitHub' },
  { id: 'skills', label: 'Skills Arena', icon: '🛠️', short: 'Skills' },
  { id: 'experience', label: 'Experience Hall', icon: '📜', short: 'Experience' },
  { id: 'certifications', label: 'Cert Gallery', icon: '🏆', short: 'Certs' },
  { id: 'contact', label: 'Contact Lounge', icon: '📡', short: 'Contact' },
];

export default function HUDOverlay() {
  const { showUI, isDay, isMuted, activeSection, setActiveSection, toggleDayNight, toggleMute } =
    usePortfolioStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!showUI) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 pointer-events-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Logo */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-lg px-4 py-2 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="font-display font-semibold text-sm text-white/80">
              {PERSONAL_INFO.shortName}
            </span>
            <span className="text-white/20 text-xs font-mono">·</span>
            <span className="text-[#00D4FF] text-xs font-mono">SDH</span>
          </motion.div>

          {/* Right: Controls */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2"
          >
            {/* Day/Night toggle */}
            <button
              onClick={toggleDayNight}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors text-sm"
            >
              <span>{isDay ? '☀️' : '🌙'}</span>
              <span className="text-white/60 text-xs hidden md:block">
                {isDay ? 'Day' : 'Night'}
              </span>
            </button>

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors text-sm"
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
            </button>

            {/* Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col gap-1 w-4">
                <motion.div
                  className="h-px bg-white/70 w-full"
                  animate={{ width: isMenuOpen ? '100%' : '100%', rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 5 : 0 }}
                />
                <motion.div
                  className="h-px bg-white/70"
                  animate={{ opacity: isMenuOpen ? 0 : 1, width: '70%' }}
                />
                <motion.div
                  className="h-px bg-white/70 w-full"
                  animate={{ width: isMenuOpen ? '100%' : '100%', rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -5 : 0 }}
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Side nav - vertical */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-auto">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-2"
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              onClick={() => setActiveSection(item.id)}
              className={`group flex items-center gap-3 glass rounded-lg px-3 py-2.5 transition-all duration-300 ${
                activeSection === item.id
                  ? 'border-[#00D4FF]/50 bg-[#00D4FF]/10'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <motion.span
                className={`text-xs font-display font-medium overflow-hidden whitespace-nowrap transition-colors ${
                  activeSection === item.id ? 'text-[#00D4FF]' : 'text-white/50 group-hover:text-white/80'
                }`}
                initial={{ width: 0, opacity: 0 }}
                whileHover={{ width: 'auto', opacity: 1 }}
                style={{ maxWidth: 120 }}
              >
                {item.short}
              </motion.span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-0.5 h-6 bg-[#00D4FF] rounded-r"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="glass rounded-xl px-6 py-3 flex items-center gap-6"
        >
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">W</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">A</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">S</kbd>
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">D</kbd>
            <span className="ml-1">Move</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <span>🖱️</span>
            <span>Look</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">E</kbd>
            <span>Interact</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#00D4FF' }}
            />
            <span className="text-[#00D4FF]">LIVE</span>
          </div>
        </motion.div>
      </div>

      {/* Full menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020609]/90 backdrop-blur-xl pointer-events-auto z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xs tracking-[0.4em] uppercase text-[#00D4FF]/60 font-mono mb-8">
                Campus Navigation
              </h2>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 px-8 py-3 rounded-xl transition-all duration-300 w-64 ${
                    activeSection === item.id
                      ? 'bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF]'
                      : 'hover:bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-display font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <span className="ml-auto text-[#00D4FF] text-xs">●</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
