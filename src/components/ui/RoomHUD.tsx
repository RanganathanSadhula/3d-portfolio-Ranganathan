'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';

export default function RoomHUD() {
  const { isDay, soundOn, showUI, toggleDayNight, toggleSound, sceneView, setSceneView, setActiveSection } = usePortfolioStore();

  if (!showUI) return null;

  const isInterior = sceneView === 'interior';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 pointer-events-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left - Logo + back button */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <div className="glass rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              <span className="font-display font-semibold text-sm text-white/80">Raghav</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-[#00D4FF] text-xs font-mono">AAVIL Inc</span>
            </div>

            {/* Back to exterior */}
            {isInterior && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => { setSceneView('exterior'); setActiveSection('entrance'); }}
                className="glass rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors text-sm"
                style={{ border: '1px solid rgba(255,215,0,0.3)' }}
              >
                <span>🏠</span>
                <span className="text-[#FFD700] text-xs font-display font-semibold">Back Outside</span>
              </motion.button>
            )}
          </motion.div>

          {/* Right controls */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={toggleDayNight}
              className="glass rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors text-sm pointer-events-auto"
            >
              <span>{isDay ? '☀️' : '🌙'}</span>
              <span className="text-white/60 text-xs hidden md:block">{isDay ? 'Day' : 'Night'}</span>
            </button>
            <button
              onClick={toggleSound}
              className="glass rounded-xl px-3 py-2 hover:bg-white/10 transition-colors text-sm pointer-events-auto"
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="glass rounded-xl px-6 py-3 flex items-center gap-5 text-xs text-white/40 font-mono">
          {isInterior ? (
            <>
              <span>🖱️ Drag to rotate</span>
              <span className="w-px h-3 bg-white/10" />
              <span>🔍 Scroll to zoom</span>
              <span className="w-px h-3 bg-white/10" />
              <span>🖥️ Click monitor to explore</span>
            </>
          ) : (
            <>
              <span>🖱️ Drag to rotate</span>
              <span className="w-px h-3 bg-white/10" />
              <span>🔍 Scroll to zoom</span>
              <span className="w-px h-3 bg-white/10" />
              <span>🚪 Click door to enter</span>
              <span className="w-px h-3 bg-white/10" />
              <span>👆 Click avatar for bio</span>
            </>
          )}
          <span className="w-px h-3 bg-white/10" />
          <motion.span
            className="text-[#00D4FF]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● LIVE
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
