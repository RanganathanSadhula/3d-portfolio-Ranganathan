'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';

const LOADING_STEPS = [
  'Initializing AI Campus...',
  'Loading 3D Environment...',
  'Calibrating Neural Networks...',
  'Preparing Interactive Zones...',
  'Rendering Campus Architecture...',
  'Launching Experience...',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const setLoaded = usePortfolioStore((s) => s.setLoaded);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 3 + 1, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 600);
        }
        return next;
      });
    }, 60);

    const stepInterval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, LOADING_STEPS.length - 1));
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [setLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020609]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#00D4FF] opacity-5 blur-[100px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#7C3AED] opacity-5 blur-[80px]" />
      </div>

      {/* Neural network SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 3 + 1}
            fill="#00D4FF"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>

      {/* Logo / Name */}
      <motion.div
        className="relative z-10 text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-xs tracking-[0.4em] text-[#00D4FF] mb-4 uppercase font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Sweet Design Hub
        </motion.div>
        <h1
          className="text-5xl md:text-7xl font-display font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 60%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ranganathan
          <br />
          Sadhula
        </h1>
        <div className="text-[#00D4FF] text-lg tracking-widest font-mono">
          FULL STACK · AI/ML ENGINEER
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative z-10 w-72 md:w-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between mb-3">
          <span className="font-mono text-xs text-white/40">Loading Campus</span>
          <span className="font-mono text-xs text-[#00D4FF]">{Math.floor(progress)}%</span>
        </div>
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #00D4FF, #7C3AED)',
              width: `${progress}%`,
            }}
          />
          {/* Scanline */}
          <motion.div
            className="absolute inset-y-0 w-8 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
              left: `${progress}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
        <motion.p
          key={stepIndex}
          className="font-mono text-xs text-white/40 mt-3 text-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {LOADING_STEPS[stepIndex]}
        </motion.p>
      </motion.div>

      {/* Corner decorations */}
      {[
        'top-4 left-4',
        'top-4 right-4',
        'bottom-4 left-4',
        'bottom-4 right-4',
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 opacity-30`}>
          <div className="w-full h-px bg-[#00D4FF]" />
          <div className="w-px h-full bg-[#00D4FF]" />
        </div>
      ))}
    </motion.div>
  );
}
