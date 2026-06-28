'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CampusLights({ isDay }: { isDay: boolean }) {
  const sunRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (sunRef.current && isDay) {
      sunRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 100;
      sunRef.current.position.y = 50 + Math.sin(state.clock.elapsedTime * 0.03) * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={isDay ? 0.6 : 0.15} color={isDay ? '#b9d5ff' : '#0a1628'} />

      {isDay ? (
        <>
          <directionalLight
            ref={sunRef}
            position={[100, 80, 50]}
            intensity={2}
            color="#ffe8c0"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={200}
            shadow-camera-left={-80}
            shadow-camera-right={80}
            shadow-camera-top={80}
            shadow-camera-bottom={-80}
          />
          <hemisphereLight args={['#b9d5ff', '#1a3a1a', 0.4]} />
        </>
      ) : (
        <>
          <directionalLight position={[20, 40, 20]} intensity={0.3} color="#4060ff" />
          <pointLight position={[0, 20, 0]} intensity={1} color="#00D4FF" distance={60} />
          {/* Building accent lights */}
          <pointLight position={[-15, 8, -5]} intensity={1.5} color="#00D4FF" distance={20} />
          <pointLight position={[15, 10, -5]} intensity={1.5} color="#7C3AED" distance={20} />
          <pointLight position={[-15, 6, 15]} intensity={1.5} color="#F59E0B" distance={20} />
          <pointLight position={[15, 8, 15]} intensity={1.5} color="#10B981" distance={20} />
          <pointLight position={[0, 6, -20]} intensity={1.5} color="#EAB308" distance={20} />
          <pointLight position={[0, 5, 30]} intensity={1.5} color="#EC4899" distance={20} />
        </>
      )}
    </>
  );
}
