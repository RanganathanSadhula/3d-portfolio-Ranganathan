'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore, CampusSection } from '@/lib/store';

// ── Reusable box ──────────────────────────────────────────────
function Box({
  position, size, color, emissive = '#000000', emissiveIntensity = 0,
  roughness = 0.7, metalness = 0.1, opacity = 1,
}: {
  position: [number, number, number]; size: [number, number, number];
  color: string; emissive?: string; emissiveIntensity?: number;
  roughness?: number; metalness?: number; opacity?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color} emissive={emissive} emissiveIntensity={emissiveIntensity}
        roughness={roughness} metalness={metalness}
        transparent={opacity < 1} opacity={opacity}
      />
    </mesh>
  );
}

// ── Monitor with click interaction ────────────────────────────
function Monitor({
  position, rotation = [0, 0, 0], label, sectionId, color, screenColor, icon,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  label: string; sectionId: CampusSection;
  color: string; screenColor: string; icon: string;
}) {
  const { setActiveSection, activeSection } = usePortfolioStore();
  const isActive = activeSection === sectionId;
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = isActive
        ? 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
        : hovered ? 1.0 : 0.5 + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation as any}>
      {/* Stand base */}
      <Box position={[0, -1.2, 0]} size={[1.2, 0.1, 0.8]} color="#2a2a2a" />
      {/* Stand neck */}
      <Box position={[0, -0.7, 0]} size={[0.15, 1.0, 0.15]} color="#333333" />
      {/* Monitor body */}
      <Box position={[0, 0, 0]} size={[2.8, 1.8, 0.12]} color={color} roughness={0.2} metalness={0.8} />
      {/* Bezel inner */}
      <Box position={[0, 0, 0.05]} size={[2.5, 1.55, 0.05]} color="#111111" />
      {/* Screen */}
      <mesh
        ref={screenRef}
        position={[0, 0, 0.09]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'none'; }}
        onClick={(e) => { e.stopPropagation(); setActiveSection(sectionId); }}
      >
        <planeGeometry args={[2.4, 1.45]} />
        <meshStandardMaterial
          color={screenColor} emissive={screenColor} emissiveIntensity={0.5}
          roughness={0} metalness={0.1}
        />
      </mesh>

      {/* Screen content */}
      <Text
        position={[0, 0.25, 0.15]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {icon}
      </Text>
      <Text
        position={[0, -0.1, 0.15]}
        fontSize={0.18}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.2}
      >
        {label}
      </Text>
      <Text
        position={[0, -0.38, 0.15]}
        fontSize={0.1}
        color="rgba(255,255,255,0.5)"
        anchorX="center"
        anchorY="middle"
      >
        {isActive ? '● OPEN' : hovered ? 'CLICK TO OPEN' : 'Click to explore'}
      </Text>

      {/* Active glow under monitor */}
      {isActive && (
        <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.2, 16]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={3} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}

// ── Desk lamp ────────────────────────────────────────────────
function DeskLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box position={[0, 0, 0]} size={[0.5, 0.05, 0.5]} color="#brass" />
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 12]} />
        <meshStandardMaterial color="#c8a050" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.0, 6]} />
        <meshStandardMaterial color="#b8902a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[0.3, 0.4, 12, 1, true]} />
        <meshStandardMaterial color="#e8c060" metalness={0.6} roughness={0.3} side={THREE.DoubleSide} emissive="#ff9900" emissiveIntensity={0.3} />
      </mesh>
      <pointLight position={[0, 0.9, 0]} intensity={2} color="#ffd090" distance={4} />
    </group>
  );
}

// ── Indian pot / diya ─────────────────────────────────────────
function Diya({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.15;
      flameRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.08;
    }
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c87040" roughness={0.9} />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.12, 0]}>
        <coneGeometry args={[0.04, 0.18, 6]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff6600" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0.2, 0]} intensity={0.8} color="#ff8800" distance={2} />
    </group>
  );
}

// ── Bookshelf ─────────────────────────────────────────────────
function BookShelf({ position }: { position: [number, number, number] }) {
  const BOOK_COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#e91e63'];
  return (
    <group position={position}>
      {/* Shelf frame */}
      <Box position={[0, 0, 0]} size={[3.0, 2.4, 0.5]} color="#5c3d1e" roughness={0.9} />
      <Box position={[0, 0, 0.22]} size={[2.8, 2.2, 0.06]} color="#3a2510" roughness={0.9} />
      {/* Shelves */}
      {[-0.65, 0, 0.65].map((y, si) => (
        <group key={si}>
          <Box position={[0, y, 0.22]} size={[2.8, 0.06, 0.5]} color="#6b4520" roughness={0.8} />
          {/* Books */}
          {BOOK_COLORS.slice(0, 6).map((c, bi) => (
            <Box
              key={bi}
              position={[-1.1 + bi * 0.38, y + 0.22, 0.22]}
              size={[0.3, 0.5, 0.4]}
              color={c}
              roughness={0.8}
            />
          ))}
        </group>
      ))}
    </group>
  );
}

// ── Chai cup ──────────────────────────────────────────────────
function ChaiCup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 10]} />
        <meshStandardMaterial color="#c8855a" roughness={0.6} />
      </mesh>
      {/* Tea surface */}
      <mesh position={[0, 0.09, 0]}>
        <circleGeometry args={[0.09, 10]} />
        <meshStandardMaterial color="#7b3f00" roughness={0.8} />
      </mesh>
      {/* Steam */}
      <Float speed={3} floatIntensity={0.3} rotationIntensity={0}>
        <Text position={[0, 0.3, 0]} fontSize={0.12} color="rgba(255,255,255,0.3)">〰️</Text>
      </Float>
    </group>
  );
}

// ── Photo frame ────────────────────────────────────────────────
function PhotoFrame({
  position, rotation = [0, 0, 0], label, color,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  label: string; color: string;
}) {
  return (
    <group position={position} rotation={rotation as any}>
      {/* Frame */}
      <Box position={[0, 0, 0]} size={[1.2, 1.4, 0.06]} color="#8B4513" roughness={0.9} />
      {/* Photo area */}
      <Box position={[0, 0, 0.04]} size={[1.0, 1.2, 0.02]} color={color} roughness={0.2} emissive={color} emissiveIntensity={0.1} />
      <Text position={[0, 0, 0.08]} fontSize={0.35} anchorX="center" anchorY="middle">{label}</Text>
    </group>
  );
}

// ── Indian wall art / rangoli ──────────────────────────────────
function WallArt({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
  });
  return (
    <group position={position} ref={ref}>
      {/* Canvas */}
      <Box position={[0, 0, 0]} size={[2.0, 1.4, 0.05]} color="#f5e6c8" roughness={0.9} />
      {/* Decorative dots pattern */}
      {[-0.6, 0, 0.6].map((x, xi) =>
        [-0.4, 0, 0.4].map((y, yi) => (
          <mesh key={`${xi}-${yi}`} position={[x, y, 0.04]}>
            <circleGeometry args={[0.06, 8]} />
            <meshStandardMaterial
              color={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'][((xi + yi) % 4)]}
              emissive={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'][((xi + yi) % 4)]}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))
      )}
      <Text position={[0, -0.55, 0.06]} fontSize={0.12} color="#8B4513" anchorX="center">
        🪷 Namaste 🪷
      </Text>
    </group>
  );
}

// ── Name plate ────────────────────────────────────────────────
function NamePlate({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[4.5, 0.9, 0.1]} />
        <meshStandardMaterial color="#0a1628" emissive="#00D4FF" emissiveIntensity={0.4} roughness={0.1} metalness={0.9} />
      </mesh>
      <Text position={[0, 0.15, 0.08]} fontSize={0.25} color="#00D4FF" anchorX="center" anchorY="middle" maxWidth={4.2}>
        RANGANATHAN SADHULA
      </Text>
      <Text position={[0, -0.18, 0.08]} fontSize={0.14} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={4.2}>
        Full Stack Developer  ·  AI / ML Engineer
      </Text>
    </group>
  );
}

// ── Keyboard ──────────────────────────────────────────────────
function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box position={[0, 0, 0]} size={[1.8, 0.06, 0.7]} color="#1a1a2e" roughness={0.7} metalness={0.3} />
      {[0, 1, 2, 3].map((row) =>
        [...Array(10)].map((_, col) => (
          <Box
            key={`${row}-${col}`}
            position={[-0.76 + col * 0.17, 0.05, -0.24 + row * 0.14]}
            size={[0.14, 0.04, 0.12]}
            color={row === 0 ? '#00D4FF' : '#2a2a3e'}
            emissive={row === 0 ? '#00D4FF' : '#000'}
            emissiveIntensity={row === 0 ? 0.5 : 0}
            roughness={0.8}
          />
        ))
      )}
    </group>
  );
}

// ── Plant pot ─────────────────────────────────────────────────
function PlantPot({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.25, 0.18, 0.4, 10]} />
        <meshStandardMaterial color="#c0392b" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.19, 0]}>
        <circleGeometry args={[0.23, 10]} />
        <meshStandardMaterial color="#3d1f00" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={0.2} rotationIntensity={0.1}>
          <mesh
            position={[
              Math.cos((i / 3) * Math.PI * 2) * 0.2,
              0.4 + i * 0.15,
              Math.sin((i / 3) * Math.PI * 2) * 0.2,
            ]}
            rotation={[0, (i / 3) * Math.PI * 2, Math.PI / 6]}
          >
            <planeGeometry args={[0.15, 0.28, 8]} />
            <meshStandardMaterial color={`hsl(${120 + i * 15}, 60%, ${25 + i * 5}%)`} roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── Neon sign ─────────────────────────────────────────────────
function NeonSign({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((c) => {
        if ((c as THREE.Mesh).isMesh) {
          const mat = (c as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat.emissive) mat.emissiveIntensity = 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
        }
      });
    }
  });
  return (
    <group position={position} ref={ref}>
      <Box position={[0, 0, 0]} size={[3.0, 0.7, 0.08]} color="#111" roughness={0.5} />
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.8, 0.5, 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.15} />
      </mesh>
      <Text position={[0, 0, 0.1]} fontSize={0.22} color={color} anchorX="center" anchorY="middle" maxWidth={2.8}>
        {text}
      </Text>
      <pointLight position={[0, 0, 0.3]} intensity={2} color={color} distance={4} />
    </group>
  );
}

// ── Main Room ─────────────────────────────────────────────────
export function RoomScene() {
  const MONITORS = [
    { pos: [-5.5, 3.8, -4.5] as [number,number,number], rot: [0, 0.4, 0] as [number,number,number], label: 'About Me',       section: 'lobby'          as CampusSection, color: '#1a2a4a', screen: '#001f4d', icon: '👨‍💻' },
    { pos: [-2.5, 3.8, -5.5] as [number,number,number], rot: [0, 0.15, 0] as [number,number,number], label: 'AI Research',    section: 'ai-lab'         as CampusSection, color: '#2a1a4a', screen: '#1a004d', icon: '🧠' },
    { pos: [0.5,  3.8, -5.8] as [number,number,number], rot: [0, 0, 0] as [number,number,number],    label: 'Projects',       section: 'projects'       as CampusSection, color: '#2a1f00', screen: '#2a1000', icon: '💡' },
    { pos: [3.5,  3.8, -5.5] as [number,number,number], rot: [0, -0.15, 0] as [number,number,number],label: 'GitHub',         section: 'github'         as CampusSection, color: '#0a2a1a', screen: '#002a10', icon: '⚡' },
    { pos: [6.0,  3.8, -4.5] as [number,number,number], rot: [0, -0.4, 0] as [number,number,number], label: 'Skills',         section: 'skills'         as CampusSection, color: '#2a1500', screen: '#1a0800', icon: '🛠️' },
    { pos: [-6.5, 1.6, -4.0] as [number,number,number], rot: [0, 0.5, 0] as [number,number,number],  label: 'Experience',     section: 'experience'     as CampusSection, color: '#0a2030', screen: '#001830', icon: '📜' },
    { pos: [7.0,  1.6, -4.0] as [number,number,number], rot: [0, -0.5, 0] as [number,number,number], label: 'Certifications', section: 'certifications' as CampusSection, color: '#2a2000', screen: '#1a1200', icon: '🏆' },
    { pos: [0.5,  1.6,  3.5] as [number,number,number], rot: [0, Math.PI, 0] as [number,number,number], label: 'Contact Me',  section: 'contact'        as CampusSection, color: '#1a002a', screen: '#10001a', icon: '📡' },
  ];

  return (
    <group>
      {/* ── FLOOR ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 14]} />
        <meshStandardMaterial color="#3d2a1a" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Floor tiles pattern */}
      {[...Array(5)].map((_, r) =>
        [...Array(7)].map((_, c) => (
          <mesh key={`t${r}${c}`} rotation={[-Math.PI / 2, 0, 0]} position={[-8 + c * 2.6 + (r % 2) * 0.05, 0.002, -5 + r * 2.6]}>
            <planeGeometry args={[2.5, 2.5]} />
            <meshStandardMaterial color={(r + c) % 2 === 0 ? '#4a3520' : '#3a2812'} roughness={0.95} />
          </mesh>
        ))
      )}

      {/* ── WALLS ── */}
      {/* Back wall */}
      <mesh position={[0, 5, -7]} receiveShadow>
        <planeGeometry args={[22, 12]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.95} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#f0dcc0" roughness={0.95} />
      </mesh>
      {/* Right wall */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#f0dcc0" roughness={0.95} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 10.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 14]} />
        <meshStandardMaterial color="#fdf6ee" roughness={0.95} />
      </mesh>

      {/* ── WALL DECORATIONS ── */}
      {/* Indian border on back wall */}
      {[-7, 7].map((x, i) => (
        <Box key={i} position={[x, 5, -6.92]} size={[0.4, 10, 0.05]} color="#c8860a" emissive="#c8860a" emissiveIntensity={0.2} />
      ))}
      <Box position={[0, 9.8, -6.92]} size={[14, 0.4, 0.05]} color="#c8860a" emissive="#c8860a" emissiveIntensity={0.2} />
      <Box position={[0, 0.2, -6.92]} size={[14, 0.4, 0.05]} color="#c8860a" emissive="#c8860a" emissiveIntensity={0.2} />

      {/* Neon sign - top center */}
      <NeonSign position={[0, 8.5, -6.8]} text="✦ RAGHAV'S TECH DEN ✦" color="#00D4FF" />

      {/* Wall art */}
      <WallArt position={[-7.5, 6, -3.9]} />
      <WallArt position={[7.5, 6, -3.9]} />

      {/* Photo frames on side walls */}
      <PhotoFrame position={[-9.88, 6, -2]} rotation={[0, Math.PI / 2, 0]} label="🏠" color="#f5d0a0" />
      <PhotoFrame position={[-9.88, 6, 1]} rotation={[0, Math.PI / 2, 0]} label="🎓" color="#a0c8f5" />
      <PhotoFrame position={[9.88, 6, -2]} rotation={[0, -Math.PI / 2, 0]} label="🏆" color="#f5a0d0" />
      <PhotoFrame position={[9.88, 6, 1]} rotation={[0, -Math.PI / 2, 0]} label="💼" color="#a0f5c8" />

      {/* ── MAIN DESK ── */}
      {/* Desk surface - large L-shape */}
      <Box position={[0, 2.5, -4.5]} size={[16, 0.12, 3.0]} color="#5c3d1e" roughness={0.7} />
      {/* Desk legs */}
      {[[-7.5, -4.5], [-7.5, -3.2], [7.5, -4.5], [7.5, -3.2]].map(([x, z], i) => (
        <Box key={i} position={[x, 1.25, z]} size={[0.2, 2.5, 0.2]} color="#4a2e10" roughness={0.8} />
      ))}
      {/* Desk back rail */}
      <Box position={[0, 2.9, -5.8]} size={[16, 0.7, 0.2]} color="#4a2e10" roughness={0.8} />
      {/* Monitor shelf - raised */}
      <Box position={[0, 3.1, -5.4]} size={[15, 0.1, 1.8]} color="#3a2010" roughness={0.8} />

      {/* ── MONITORS ── */}
      {MONITORS.map((m) => (
        <Monitor
          key={m.section}
          position={m.pos}
          rotation={m.rot}
          label={m.label}
          sectionId={m.section}
          color={m.color}
          screenColor={m.screen}
          icon={m.icon}
        />
      ))}

      {/* ── NAME PLATE on desk ── */}
      <NamePlate position={[0, 2.65, -3.8]} />

      {/* ── DESK ITEMS ── */}
      <Keyboard position={[0, 2.58, -3.0]} />
      <ChaiCup position={[3.5, 2.6, -3.2]} />
      <ChaiCup position={[-3.5, 2.6, -3.2]} />
      <DeskLamp position={[-6.5, 2.58, -4.8]} />
      <DeskLamp position={[6.5, 2.58, -4.8]} />
      <PlantPot position={[-8.5, 2.6, -4.0]} />
      <PlantPot position={[8.5, 2.6, -4.0]} />

      {/* Diyas on desk */}
      <Diya position={[-4.5, 2.62, -3.5]} />
      <Diya position={[4.5, 2.62, -3.5]} />
      <Diya position={[0, 2.62, -3.5]} />

      {/* Notebooks */}
      <Box position={[2.0, 2.57, -3.0]} size={[0.8, 0.06, 1.0]} color="#e74c3c" roughness={0.8} />
      <Box position={[2.0, 2.63, -3.0]} size={[0.75, 0.04, 0.95]} color="#ffffff" roughness={0.9} />

      {/* ── BOOKSHELF left side ── */}
      <BookShelf position={[-8.5, 3.7, -6.5]} />

      {/* ── SMALL TABLE right ── */}
      <Box position={[8.5, 1.8, 0]} size={[3.0, 0.1, 2.0]} color="#6b4520" roughness={0.7} />
      {[[-1, 0], [1, 0], [-1, 1.2], [1, 1.2]].map(([x, z], i) => (
        <Box key={i} position={[8.5 + x * 1.2, 0.9, z]} size={[0.12, 1.8, 0.12]} color="#5a3a18" roughness={0.8} />
      ))}
      {/* Laptop on side table */}
      <Box position={[8.5, 1.87, 0]} size={[1.4, 0.06, 1.0]} color="#2a2a2a" roughness={0.3} metalness={0.8} />
      <Box position={[8.5, 2.35, -0.48]} size={[1.4, 0.9, 0.06]} color="#1a1a1a" roughness={0.3} metalness={0.8} />
      <mesh position={[8.5, 2.35, -0.44]}>
        <planeGeometry args={[1.3, 0.8]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.4} />
      </mesh>
      <Text position={[8.5, 2.35, -0.40]} fontSize={0.12} color="white" anchorX="center" anchorY="middle">{'</> Coding...'}</Text>

      {/* ── COUCH / SEATING AREA ── */}
      <Box position={[0, 0.7, 3.5]} size={[5.0, 1.4, 1.2]} color="#8B4513" roughness={0.9} />
      <Box position={[0, 1.5, 4.0]} size={[5.0, 0.8, 0.3]} color="#7a3b10" roughness={0.9} />
      {[-1.8, 1.8].map((x, i) => (
        <Box key={i} position={[x, 1.4, 3.5]} size={[0.3, 1.5, 1.2]} color="#7a3b10" roughness={0.9} />
      ))}
      {/* Cushions */}
      {[-1.0, 0, 1.0].map((x, i) => (
        <Box key={i} position={[x, 1.5, 3.3]} size={[0.9, 0.3, 0.9]} color={['#e74c3c', '#f39c12', '#2ecc71'][i]} roughness={0.9} />
      ))}
      {/* Throw blanket */}
      <Box position={[1.5, 1.45, 3.0]} size={[1.2, 0.08, 1.5]} color="#9b59b6" roughness={0.95} opacity={0.9} />

      {/* Coffee table */}
      <Box position={[0, 0.5, 2.0]} size={[2.8, 0.1, 1.2]} color="#5c3d1e" roughness={0.7} />
      {[[-1, 0.6], [1, 0.6], [-1, -0.6], [1, -0.6]].map(([x, z], i) => (
        <Box key={i} position={[x, 0.25, z + 2.0]} size={[0.1, 0.5, 0.1]} color="#4a2e10" roughness={0.8} />
      ))}
      <ChaiCup position={[0.5, 0.58, 2.0]} />
      <Diya position={[-0.5, 0.58, 2.0]} />

      {/* ── FLOOR PLANTS ── */}
      <PlantPot position={[-9.2, 0, 3.5]} />
      <PlantPot position={[9.2, 0, 3.5]} />

      {/* ── RUG ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 1.5]}>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#8B0000" roughness={0.95} />
      </mesh>
      {/* Rug pattern border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 1.5]}>
        <ringGeometry args={[2.8, 3.2, 4]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>

      {/* ── CEILING LIGHT ── */}
      <mesh position={[0, 10.3, -2]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#fff5c0" emissive="#fff5c0" emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0, 10, -2]} intensity={4} color="#fff5c0" distance={25} />

      {/* Fan on ceiling */}
      <mesh position={[0, 10.1, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── CALENDAR on wall ── */}
      <group position={[4, 7, -6.88]}>
        <Box position={[0, 0, 0]} size={[1.2, 1.5, 0.04]} color="#ffffff" roughness={0.9} />
        <Text position={[0, 0.4, 0.05]} fontSize={0.15} color="#e74c3c" anchorX="center">Aprial </Text>
        <Text position={[0, -0.1, 0.05]} fontSize={0.22} color="#333" anchorX="center">16</Text>
        <Text position={[0, -0.4, 0.05]} fontSize={0.1} color="#666" anchorX="center">Vijayawada, India</Text>
      </group>

      {/* ── AAVIL INC LOGO plate ── */}
      <group position={[-4, 7.5, -6.88]}>
        {/* Plate background */}
        <Box position={[0, 0, 0]} size={[2.3, 1.1, 0.06]} color="#0a0a0a" roughness={0.15} metalness={0.85} emissive="#ffffff" emissiveIntensity={0.04} />
        {/* 3D logo mark — three angled parallel slabs, like the uploaded AAVIL mark */}
        <group position={[-0.62, 0.28, 0.05]} rotation={[0, 0, 0]}>
          {[-0.26, 0, 0.26].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
              <boxGeometry args={[0.07, 0.34, 0.03]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
        </group>
        {/* Wordmark */}
        <Text position={[0, 0.1, 0.06]} fontSize={0.24} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.05}>
          AAVIL INC
        </Text>
        <Text position={[0, -0.2, 0.06]} fontSize={0.1} color="rgba(255,255,255,0.55)" anchorX="center" anchorY="middle">
          Design · Engineering · AI
        </Text>
      </group>

      {/* ── HINT TEXT floating ── */}
      <Float speed={1} floatIntensity={0.2} rotationIntensity={0}>
        <Text
          position={[0, 0.3, 1.8]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.18}
          color="rgba(255,215,0,0.6)"
          anchorX="center"
          anchorY="middle"
        >
          👆 Click any monitor to explore
        </Text>
      </Float>
    </group>
  );
}
