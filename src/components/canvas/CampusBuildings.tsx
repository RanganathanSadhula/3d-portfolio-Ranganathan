'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { CampusSection } from '@/lib/store';
import { usePortfolioStore } from '@/lib/store';

interface BuildingsProps {
  activeSection: CampusSection;
}

// Building component
function Building({
  position,
  size,
  color,
  emissive,
  label,
  sectionId,
  icon,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive: string;
  label: string;
  sectionId: CampusSection;
  icon: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { activeSection, setActiveSection } = usePortfolioStore();
  const isActive = activeSection === sectionId;

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      if (isActive) {
        meshRef.current.scale.y = 1 + pulse;
      }
    }
  });

  return (
    <group position={position}>
      {/* Main building */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={() => setActiveSection(sectionId)}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'none';
        }}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          emissive={isActive ? emissive : '#000000'}
          emissiveIntensity={isActive ? 0.5 : 0}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glass panels overlay */}
      <mesh position={[0, 0, size[2] / 2 + 0.01]}>
        <planeGeometry args={[size[0] - 0.2, size[1] - 0.2]} />
        <meshStandardMaterial
          color="#00D4FF"
          transparent
          opacity={0.05}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Active glow ring */}
      {isActive && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={[0, -size[1] / 2 - 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size[0] * 0.8, size[0] * 0.9, 32]} />
            <meshStandardMaterial
              color={emissive}
              emissive={emissive}
              emissiveIntensity={2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      )}

      {/* Label */}
      <Float speed={1} floatIntensity={0.2}>
        <Text
          position={[0, size[1] / 2 + 0.8, 0]}
          fontSize={0.3}
          color={isActive ? emissive : 'white'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.ttf"
        >
          {label}
        </Text>
      </Float>

      {/* Icon floating above */}
      <Float speed={2} floatIntensity={0.5}>
        <Text
          position={[0, size[1] / 2 + 1.4, 0]}
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </Float>
    </group>
  );
}

// Futuristic tower
function Tower({
  position,
  height,
  color,
}: {
  position: [number, number, number];
  height: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.8, 1.2, height, 6]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Top sphere */}
      <Float speed={2} floatIntensity={0.3}>
        <mesh ref={ref} position={[0, height + 0.5, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            roughness={0}
            metalness={1}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

// Central hub building
function CentralHub() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base platform */}
      <mesh receiveShadow position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0a1628" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Ring */}
      <mesh ref={ref} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.5, 5, 6]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>

      {/* Central column */}
      <mesh castShadow position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
        <meshStandardMaterial color="#0a1f3d" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Floating hologram */}
      <Float speed={2} floatIntensity={0.8}>
        <mesh position={[0, 5, 0]}>
          <torusGeometry args={[1.5, 0.1, 8, 32]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 5, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 8, 32]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={2} transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export function CampusBuildings({ activeSection }: BuildingsProps) {
  const BUILDINGS = [
    {
      id: 'lobby' as CampusSection,
      label: 'Reception',
      icon: '🏛️',
      position: [-15, 0, -5] as [number, number, number],
      size: [8, 10, 6] as [number, number, number],
      color: '#0a1f3d',
      emissive: '#00D4FF',
    },
    {
      id: 'ai-lab' as CampusSection,
      label: 'AI Lab',
      icon: '🧠',
      position: [15, 0, -5] as [number, number, number],
      size: [8, 12, 6] as [number, number, number],
      color: '#1a0a2e',
      emissive: '#7C3AED',
    },
    {
      id: 'projects' as CampusSection,
      label: 'Projects',
      icon: '💡',
      position: [-15, 0, 15] as [number, number, number],
      size: [8, 8, 6] as [number, number, number],
      color: '#1f1400',
      emissive: '#F59E0B',
    },
    {
      id: 'github' as CampusSection,
      label: 'GitHub',
      icon: '⚡',
      position: [15, 0, 15] as [number, number, number],
      size: [7, 9, 6] as [number, number, number],
      color: '#0a1e0a',
      emissive: '#10B981',
    },
    {
      id: 'skills' as CampusSection,
      label: 'Skills',
      icon: '🛠️',
      position: [-25, 0, 5] as [number, number, number],
      size: [6, 7, 5] as [number, number, number],
      color: '#1a0f0a',
      emissive: '#F97316',
    },
    {
      id: 'experience' as CampusSection,
      label: 'Experience',
      icon: '📜',
      position: [25, 0, 5] as [number, number, number],
      size: [6, 11, 5] as [number, number, number],
      color: '#0f1a1a',
      emissive: '#06B6D4',
    },
    {
      id: 'certifications' as CampusSection,
      label: 'Certs',
      icon: '🏆',
      position: [0, 0, -20] as [number, number, number],
      size: [10, 8, 6] as [number, number, number],
      color: '#1a1500',
      emissive: '#EAB308',
    },
    {
      id: 'contact' as CampusSection,
      label: 'Contact',
      icon: '📡',
      position: [0, 0, 30] as [number, number, number],
      size: [8, 6, 5] as [number, number, number],
      color: '#0a0a1a',
      emissive: '#EC4899',
    },
  ];

  return (
    <group>
      {/* Central hub */}
      <CentralHub />

      {/* All buildings */}
      {BUILDINGS.map((b) => (
        <Building
          key={b.id}
          position={[b.position[0], b.size[1] / 2, b.position[2]]}
          size={b.size}
          color={b.color}
          emissive={b.emissive}
          label={b.label}
          sectionId={b.id}
          icon={b.icon}
        />
      ))}

      {/* Decorative towers */}
      <Tower position={[-30, 0, -20]} height={15} color="#00D4FF" />
      <Tower position={[30, 0, -20]} height={12} color="#7C3AED" />
      <Tower position={[-30, 0, 25]} height={10} color="#F59E0B" />
      <Tower position={[30, 0, 25]} height={13} color="#10B981" />
    </group>
  );
}
