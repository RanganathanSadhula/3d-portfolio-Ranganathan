'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { usePortfolioStore } from '@/lib/store';
import CampusScene from './CampusScene';
import SectionPanel from '@/components/ui/SectionPanel';
import RoomHUD from '@/components/ui/RoomHUD';
import { TVOverlay } from './HouseExterior';
import { useState, useEffect } from 'react';

export default function CampusExperience() {
  const { isEntered, soundOn, toggleSound } = usePortfolioStore();
  const [tvStage, setTvStage] = useState<'idle' | 'zoomed' | 'bio'>('idle');

  // Auto-enable sound on first entry
  useEffect(() => {
    if (isEntered && !soundOn) {
      toggleSound();
    }
  }, [isEntered]);

  if (!isEntered) return null;

  return (
    <>
      {tvStage !== 'idle' && <TVOverlay stage={tvStage} setStage={setTvStage} />}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 8, 22], fov: 55, near: 0.1, far: 500 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          style={{ background: '#1a0a2e' }}
        >
          <Suspense fallback={null}>
            <CampusScene onTvOpen={() => setTvStage('zoomed')} />
          </Suspense>
        </Canvas>
      </div>
      <RoomHUD />
      <SectionPanel />
    </>
  );
}
