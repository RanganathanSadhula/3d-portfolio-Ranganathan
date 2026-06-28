'use client';

import dynamic from 'next/dynamic';
import { Suspense, useRef, useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import { usePortfolioStore } from '@/lib/store';

const EntranceScreen = dynamic(() => import('@/components/ui/EntranceScreen'), { ssr: false });
const CampusExperience = dynamic(() => import('@/components/canvas/CampusExperience'), { ssr: false });

export default function Home() {
  const { isLoaded, isEntered, soundOn } = usePortfolioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Boot the audio element once
  useEffect(() => {
    audioRef.current = new Audio('/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // React to soundOn changes from anywhere in the app
  useEffect(() => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay — user must interact first, that's fine
      });
    } else {
      audioRef.current.pause();
    }
  }, [soundOn]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050A14]">
      <CustomCursor />
      {!isLoaded && <LoadingScreen />}
      {isLoaded && !isEntered && <EntranceScreen />}
      <Suspense fallback={null}>
        <CampusExperience />
      </Suspense>
    </main>
  );
}