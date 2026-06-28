'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore, CampusSection } from '@/lib/store';
import LobbySection from '@/components/sections/LobbySection';
import AILabSection from '@/components/sections/AILabSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GitHubSection from '@/components/sections/GitHubSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';

const SECTION_MAP: Record<Exclude<CampusSection, 'entrance'>, React.ComponentType> = {
  lobby: LobbySection,
  'ai-lab': AILabSection,
  projects: ProjectsSection,
  github: GitHubSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  certifications: CertificationsSection,
  contact: ContactSection,
};

const SECTION_LABELS: Record<Exclude<CampusSection, 'entrance'>, string> = {
  lobby: '🏠 About Me',
  'ai-lab': '🧠 AI Research Lab',
  projects: '💡 Projects Studio',
  github: '⚡ GitHub Center',
  skills: '🛠️ Skills Arena',
  experience: '📜 Experience Hall',
  certifications: '🏆 Certification Gallery',
  contact: '📡 Contact Lounge',
};

export default function SectionPanel() {
  const { activeSection, showUI, setActiveSection } = usePortfolioStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = showUI && activeSection !== 'entrance';
  const SectionComponent = activeSection !== 'entrance' ? SECTION_MAP[activeSection] : null;
  const sectionLabel = activeSection !== 'entrance' ? SECTION_LABELS[activeSection] : '';

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [activeSection]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') setActiveSection('entrance');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setActiveSection]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && SectionComponent && (
        <motion.div
          key={activeSection}
          ref={panelRef}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-screen overflow-y-auto z-[60] pointer-events-auto"
          style={{
            width: 'min(580px, 92vw)',
            background: 'rgba(5, 10, 20, 0.95)',
            backdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Top accent line */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #7C3AED, transparent)' }} />

          {/* Header bar */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
            style={{ background: 'rgba(5,10,20,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-xs text-white/30 font-mono uppercase tracking-widest">Raghav's Tech Den</p>
              <h2 className="text-base font-display font-bold text-white mt-0.5">
                {sectionLabel}
              </h2>
            </div>
            <button
              onClick={() => setActiveSection('entrance')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-lg font-light"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              title="Close (ESC)"
            >
              ✕
            </button>
          </div>

          <SectionComponent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
