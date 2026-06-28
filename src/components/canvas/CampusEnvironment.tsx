'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Cloud } from '@react-three/drei';
import * as THREE from 'three';

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.6, 6]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
      {/* Canopy layers */}
      {[0, 0.8, 1.5].map((y, i) => (
        <mesh key={i} castShadow position={[0, y + 1.5, 0]}>
          <coneGeometry args={[1.2 - i * 0.2, 1.5, 7]} />
          <meshStandardMaterial color={`hsl(${130 + i * 10}, 50%, ${20 + i * 5}%)`} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function WaterFeature({ position }: { position: [number, number, number] }) {
  const waterRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Basin */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[3, 16]} />
        <meshStandardMaterial color="#001f3f" roughness={0} metalness={1} />
      </mesh>
      {/* Water surface */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <circleGeometry args={[2.8, 16]} />
        <meshStandardMaterial
          color="#0a4080"
          emissive="#00D4FF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      {/* Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.9, 3.1, 16]} />
        <meshStandardMaterial color="#1a3a5f" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

function DataPillar({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.y = 0.8 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.3, 2, 0.3]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
    </mesh>
  );
}

function Pathway({ from, to }: { from: [number, number, number]; to: [number, number, number] }) {
  const mid: [number, number, number] = [
    (from[0] + to[0]) / 2,
    0.02,
    (from[2] + to[2]) / 2,
  ];
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  return (
    <mesh position={mid} rotation={[0, angle, 0]} receiveShadow>
      <boxGeometry args={[1.5, 0.02, length]} />
      <meshStandardMaterial color="#0f1e35" roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

export function CampusEnvironment({ isDay }: { isDay: boolean }) {
  const TREE_POSITIONS: [number, number, number][] = [
    [-8, 0, -8], [-8, 0, 8], [8, 0, -8], [8, 0, 8],
    [-20, 0, 0], [20, 0, 0], [-20, 0, -12], [20, 0, -12],
    [-12, 0, 20], [12, 0, 20], [-5, 0, -15], [5, 0, -15],
    [-35, 0, 0], [35, 0, 0], [-35, 0, 10], [35, 0, 10],
  ];

  return (
    <group>
      {/* Trees */}
      {TREE_POSITIONS.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}

      {/* Water features */}
      <WaterFeature position={[-8, 0, 0]} />
      <WaterFeature position={[8, 0, 0]} />

      {/* Data pillars decorating pathways */}
      {[-6, -3, 0, 3, 6].map((x, i) => (
        <DataPillar
          key={i}
          position={[x, 0, -12]}
          color={['#00D4FF', '#7C3AED', '#F59E0B', '#10B981', '#EC4899'][i]}
        />
      ))}

      {/* Pathways connecting buildings */}
      <Pathway from={[0, 0, 0]} to={[-15, 0, -5]} />
      <Pathway from={[0, 0, 0]} to={[15, 0, -5]} />
      <Pathway from={[0, 0, 0]} to={[-15, 0, 15]} />
      <Pathway from={[0, 0, 0]} to={[15, 0, 15]} />
      <Pathway from={[0, 0, 0]} to={[0, 0, -20]} />
      <Pathway from={[0, 0, 0]} to={[0, 0, 30]} />
      <Pathway from={[0, 0, 0]} to={[-25, 0, 5]} />
      <Pathway from={[0, 0, 0]} to={[25, 0, 5]} />

      {/* Day clouds */}
      {isDay && (
        <>
          <Cloud position={[-30, 25, -40]} speed={0.2} opacity={0.5} />
          <Cloud position={[30, 30, -50]} speed={0.15} opacity={0.4} />
          <Cloud position={[0, 22, -60]} speed={0.1} opacity={0.3} />
        </>
      )}

      {/* Night: floating energy orbs */}
      {!isDay && (
        <>
          {[
            { pos: [-10, 8, -10] as [number,number,number], color: '#00D4FF' },
            { pos: [10, 10, -8] as [number,number,number], color: '#7C3AED' },
            { pos: [-8, 6, 10] as [number,number,number], color: '#F59E0B' },
            { pos: [12, 9, 12] as [number,number,number], color: '#10B981' },
          ].map((orb, i) => (
            <Float key={i} speed={1.5 + i * 0.3} floatIntensity={1} rotationIntensity={0.2}>
              <mesh position={orb.pos}>
                <sphereGeometry args={[0.3, 12, 12]} />
                <meshStandardMaterial
                  color={orb.color}
                  emissive={orb.color}
                  emissiveIntensity={3}
                  transparent
                  opacity={0.8}
                />
              </mesh>
              <pointLight position={orb.pos} color={orb.color} intensity={2} distance={8} />
            </Float>
          ))}
        </>
      )}

      {/* Decorative rings on ground */}
      {[10, 20, 35].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[r - 0.2, r, 64]} />
          <meshStandardMaterial
            color="#00D4FF"
            transparent
            opacity={0.05 - i * 0.01}
          />
        </mesh>
      ))}
    </group>
  );
}
