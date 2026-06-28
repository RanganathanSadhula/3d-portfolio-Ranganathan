'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';

const ROLES = ['Full Stack Developer', 'AI / ML Engineer', 'Creative Technologist'];

export default function EntranceScreen() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const setEntered = usePortfolioStore((s) => s.setEntered);
  const setShowUI = usePortfolioStore((s) => s.setShowUI);

  useEffect(() => {
    const t = setTimeout(() => setShowBtn(true), 2000);
    const interval = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2500
    );
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      setEntered(true);
      setShowUI(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isEntering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, #0A1628 0%, #020609 70%)' }}
        >
          {/* Animated grid */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '80px 80px'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00D4FF] opacity-[0.06] blur-[80px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#7C3AED] opacity-[0.06] blur-[80px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

          {/* Particle dots */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {[...Array(30)].map((_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const size = Math.random() * 2 + 0.5;
              return (
                <motion.circle
                  key={i}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r={size}
                  fill={i % 3 === 0 ? '#00D4FF' : i % 3 === 1 ? '#7C3AED' : '#F59E0B'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              );
            })}
          </svg>

          {/* Main content */}
          <div className="relative z-10 text-center px-6 max-w-4xl">
            {/* Pre-title */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs tracking-[0.5em] uppercase font-mono text-[#00D4FF]/70 mb-8"
            >
              Welcome to the AI Innovation Campus
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-none mb-6"
            >
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #00D4FF 40%, #7C3AED 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                RANGANATHAN
              </span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #00D4FF 60%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                SADHULA
              </span>
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl md:text-2xl font-display text-white/70 mb-4 h-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white/40 text-sm tracking-widest font-mono mb-16"
            >
              Building intelligent digital experiences.
            </motion.p>

            {/* Enter button */}
            <AnimatePresence>
              {showBtn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.button
                    onClick={handleEnter}
                    className="relative group px-12 py-5 font-display font-semibold text-lg tracking-widest uppercase overflow-hidden rounded-sm"
                    style={{ background: 'transparent' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Border */}
                    <span
                      className="absolute inset-0 rounded-sm"
                      style={{
                        background:
                          'linear-gradient(135deg, #00D4FF, #7C3AED, #F59E0B)',
                        padding: '1px',
                      }}
                    >
                      <span
                        className="absolute inset-[1px] rounded-sm"
                        style={{ background: '#050A14' }}
                      />
                    </span>

                    {/* Hover fill */}
                    <motion.span
                      className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                      }}
                    />

                    {/* Scanline on hover */}
                    <motion.span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden rounded-sm"
                    >
                      <motion.span
                        className="absolute left-0 right-0 h-px bg-[#00D4FF]/30"
                        animate={{ top: ['-10%', '110%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.span>

                    <span className="relative z-10 text-gradient-primary">
                      Enter Experience
                    </span>
                  </motion.button>

                  <motion.div
                    className="flex items-center gap-2 text-white/30 text-xs font-mono"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-4 h-px bg-white/30" />
                    Use WASD / Arrow Keys to explore
                    <span className="w-4 h-px bg-white/30" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-white/20 text-xs font-mono"
          >
            <span>Sweet Design Hub</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Vijayawada, India</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>2024</span>
          </motion.div>
        </motion.div>
      )}

      {/* Enter transition overlay */}
      {isEntering && (
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300]"
          style={{ background: 'linear-gradient(90deg, #020609, #050A14)' }}
        />
      )}
    </AnimatePresence>
  );
}
