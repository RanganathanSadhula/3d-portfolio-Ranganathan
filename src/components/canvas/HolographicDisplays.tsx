'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

function HoloPanel({
  position,
  rotation,
  text,
  color,
  width = 3,
  height = 2,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  text: string;
  color: string;
  width?: number;
  height?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.3} rotationIntensity={0}>
      <group position={position} rotation={rotation}>
        {/* Panel background */}
        <mesh ref={meshRef}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Border */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
          <lineBasicMaterial color={color} transparent opacity={0.8} />
        </lineSegments>
        {/* Text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={width - 0.2}
          textAlign="center"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function DataStream({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.position.y = ((state.clock.elapsedTime * 2 + i * 0.5) % 4) - 2;
      });
    }
  });

  return (
    <group position={position} ref={ref}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.5 - 2, 0]}>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={2}
            transparent
            opacity={0.8 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HolographicDisplays() {
  return (
    <group>
      {/* Main entrance hologram */}
      <HoloPanel
        position={[0, 4, -8]}
        text={"RANGANATHAN SADHULA\nFull Stack Developer\nAI / ML Engineer"}
        color="#00D4FF"
        width={4}
        height={2.5}
      />

      {/* Skills hologram */}
      <HoloPanel
        position={[-22, 5, 5]}
        rotation={[0, Math.PI / 4, 0]}
        text={"SKILLS ARENA\nReact · Next.js\nPython · AI/ML\nCloud · DevOps"}
        color="#7C3AED"
        width={3}
        height={2}
      />

      {/* AI Lab hologram */}
      <HoloPanel
        position={[22, 6, -5]}
        rotation={[0, -Math.PI / 4, 0]}
        text={"AI RESEARCH LAB\nLangChain · OpenAI\nPyTorch · TensorFlow\nRAG · LLM Pipelines"}
        color="#10B981"
        width={3}
        height={2}
      />

      {/* Data streams */}
      <DataStream position={[-5, 1, -10]} />
      <DataStream position={[5, 1, -10]} />
      <DataStream position={[-3, 1, 25]} />
      <DataStream position={[3, 1, 25]} />
    </group>
  );
}
