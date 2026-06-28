'use client';

import { Suspense, useState } from 'react';
import { Stars, Float, Sparkles, OrbitControls, PerspectiveCamera, Sky, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { usePortfolioStore } from '@/lib/store';
import { HouseExterior } from './HouseExterior';
import { RoomScene } from './RoomScene';
import { motion, AnimatePresence } from 'framer-motion';


export default function CampusScene({ onTvOpen }: { onTvOpen: () => void }) {
  const { isDay, sceneView, setSceneView } = usePortfolioStore();
  const [transitioning, setTransitioning] = useState(false);

  const handleEnter = () => {
    setTransitioning(true);
    setTimeout(() => { setSceneView('interior'); setTransitioning(false); }, 800);
  };
  const handleExit = () => {
    setTransitioning(true);
    setTimeout(() => { setSceneView('exterior'); setTransitioning(false); }, 800);
  };

  const isExterior = sceneView === 'exterior';

  return (
    <>
      {isExterior ? (
        <>
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true}
            maxPolarAngle={Math.PI / 2.08} minDistance={24} maxDistance={70}
            target={[0, 5, 2]} />
          <PerspectiveCamera makeDefault position={[0, 14, 42]} fov={55} />
        </>
      ) : (
        <>
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={true}
            maxPolarAngle={Math.PI / 2.05} minDistance={8} maxDistance={35}
            target={[0, 3, 0]} />
          <PerspectiveCamera makeDefault position={[0, 8, 22]} fov={55} />
        </>
      )}

      {/* Sky / BG */}
      {isDay ? (
        <>
          <color attach="background" args={['#87CEEB']} />
          <Sky distance={450000} sunPosition={[100, 20, 100]} inclination={0.5} azimuth={0.25} rayleigh={0.5} />
          {isExterior && (
            <>
              <Cloud position={[-30, 35, -40]} speed={0.15} opacity={0.6} />
              <Cloud position={[25, 40, -50]} speed={0.1} opacity={0.5} />
            </>
          )}
        </>
      ) : (
        <>
          <color attach="background" args={['#050208']} />
          <fog attach="fog" args={['#050208', isExterior ? 60 : 25, isExterior ? 200 : 70]} />
          <Stars radius={100} depth={50} count={6000} factor={3} saturation={0.5} fade speed={0.3} />
        </>
      )}

      {/* Lights */}
      <ambientLight intensity={isDay ? 1.2 : 0.5} color={isDay ? '#ffffff' : '#334466'} />
      <directionalLight position={[30, 50, 20]} intensity={isDay ? 2.5 : 0.3} color={isDay ? '#fff5e0' : '#4060ff'} castShadow />
      {!isDay && isExterior && (
        <>
          <pointLight position={[0, 20, 12]} intensity={2} color="#ffd070" distance={30} />
          <pointLight position={[-10, 5, 12]} intensity={1.5} color="#ff8800" distance={12} />
          <pointLight position={[10, 5, 12]} intensity={1.5} color="#ff8800" distance={12} />
        </>
      )}
      {!isExterior && (
        <>
          <ambientLight intensity={0.8} color="#ffffff" />
          <pointLight position={[0, 12, 0]} intensity={3} color="#ffffff" distance={30} />
          <pointLight position={[-8, 6, 4]} intensity={2} color="#ff6b35" distance={15} />
          <pointLight position={[8, 6, 4]} intensity={2} color="#00D4FF" distance={15} />
        </>
      )}

      {/* Scenes */}
      <Suspense fallback={null}>
        {isExterior ? (
          <HouseExterior onEnter={handleEnter} onTvOpen={onTvOpen} />
        ) : (
          <RoomScene />
        )}
      </Suspense>

      {!isExterior && <Sparkles count={80} scale={20} size={1.5} speed={0.1} color="#00D4FF" opacity={0.4} />}

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} intensity={isExterior ? 0.4 : 0.8} />
        <Vignette eskil={false} offset={0.15} darkness={0.65} />
      </EffectComposer>
    </>
  );
}
