'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/lib/store';
import { PERSONAL_INFO } from '@/lib/data';

// ─────────────────────────────────────────────────────────────
// CONSTANTS – tweak these to restyle the whole house
// ─────────────────────────────────────────────────────────────
const C = {
  wall:        '#f2f0eb',   // off-white main walls
  wallAccent:  '#e8e4dc',   // slightly darker panels
  dark:        '#1e1e1e',   // charcoal — roof, fascia, posts
  darkMid:     '#2a2a2a',   // gate, fence rails
  wood:        '#6b3f22',   // wood slat cladding / soffit
  woodLight:   '#8c5530',   // lighter wood trim
  glass:       '#b8dce8',   // window glass day
  glassNight:  '#ffe4a0',   // window glass night glow
  concrete:    '#c8c8c0',   // boundary wall stone
  concreteDk:  '#3a3a3a',   // dark gate pillars
  driveway:    '#b0afa8',   // concrete driveway
  grass:       '#3a7a22',   // garden grass
  carBody:     '#111418',   // black car
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function Box({
  position, size, color,
  emissive = '#000000', emissiveIntensity = 0,
  roughness = 0.7, metalness = 0.0,
  opacity = 1, rotation,
}: {
  position: [number,number,number]; size: [number,number,number]; color: string;
  emissive?: string; emissiveIntensity?: number; roughness?: number;
  metalness?: number; opacity?: number; rotation?: [number,number,number];
}) {
  return (
    <mesh position={position} rotation={rotation as any} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color} emissive={emissive} emissiveIntensity={emissiveIntensity}
        roughness={roughness} metalness={metalness}
        transparent={opacity < 1} opacity={opacity}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────
// MODERN WINDOW  – large horizontal aluminum-framed window
// ─────────────────────────────────────────────────────────────
function ModernWindow({
  position, size = [2.6, 1.6], rotation, isDay,
}: {
  position: [number,number,number]; size?: [number,number];
  rotation?: [number,number,number]; isDay: boolean;
}) {
  const glassRef = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!glassRef.current) return;
    const mat = glassRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = isDay
      ? 0.15
      : 0.9 + Math.sin(s.clock.elapsedTime * 1.2) * 0.15;
  });
  const [w, h] = size;
  return (
    <group position={position} rotation={rotation as any}>
      {/* Outer dark frame */}
      <Box position={[0,0,0]} size={[w+0.18, h+0.14, 0.1]} color={C.dark} roughness={0.4} metalness={0.5} />
      {/* Glass */}
      <mesh ref={glassRef} position={[0,0,0.06]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color={isDay ? C.glass : C.glassNight}
          emissive={isDay ? C.glass : C.glassNight}
          emissiveIntensity={0.15}
          transparent opacity={isDay ? 0.55 : 0.75}
          roughness={0} metalness={0.2}
        />
      </mesh>
      {/* Thin vertical divider */}
      <Box position={[0,0,0.1]} size={[0.05, h, 0.04]} color={C.dark} roughness={0.4} metalness={0.5} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// LARGE SLIDING GLASS DOOR (ground floor entrance)
// ─────────────────────────────────────────────────────────────
function SlidingDoor({
  position, onEnter, isDay,
}: { position: [number,number,number]; onEnter: () => void; isDay: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      {/* Frame */}
      <Box position={[0,0,0]} size={[3.6, 3.8, 0.12]} color={C.dark} roughness={0.3} metalness={0.6} />
      {/* Left panel glass */}
      <mesh position={[-0.86, 0.0, 0.07]}>
        <planeGeometry args={[1.5, 3.4]} />
        <meshStandardMaterial
          color={isDay ? C.glass : C.glassNight}
          emissive={isDay ? '#a8d8ea' : '#ffe4a0'}
          emissiveIntensity={isDay ? 0.15 : 0.8}
          transparent opacity={isDay ? 0.5 : 0.7} roughness={0} metalness={0.15}
        />
      </mesh>
      {/* Right panel glass */}
      <mesh position={[0.86, 0.0, 0.07]}>
        <planeGeometry args={[1.5, 3.4]} />
        <meshStandardMaterial
          color={isDay ? C.glass : C.glassNight}
          emissive={isDay ? '#a8d8ea' : '#ffe4a0'}
          emissiveIntensity={isDay ? 0.15 : 0.8}
          transparent opacity={isDay ? 0.5 : 0.7} roughness={0} metalness={0.15}
        />
      </mesh>
      {/* Center rail */}
      <Box position={[0,0,0.08]} size={[0.07,3.4,0.04]} color={C.dark} roughness={0.3} metalness={0.7} />
      {/* Handles */}
      <Box position={[-0.18, 0, 0.16]} size={[0.05,0.5,0.05]} color="#aaaaaa" roughness={0.2} metalness={0.9} />
      <Box position={[0.18, 0, 0.16]} size={[0.05,0.5,0.05]} color="#aaaaaa" roughness={0.2} metalness={0.9} />
      {/* Clickable invisible mesh */}
      <mesh position={[0,0,0.2]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor='pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor='none'; }}
        onClick={(e) => { e.stopPropagation(); onEnter(); }}
      >
        <planeGeometry args={[3.6,3.8]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <Float speed={2} floatIntensity={0.2} rotationIntensity={0}>
        <Text position={[0, 2.4, 0.3]} fontSize={0.28} color={hovered ? '#FFD700' : '#ffffff'} anchorX="center" anchorY="middle">
          {hovered ? '🚪 Enter Portfolio' : '🏠 Click to Enter'}
        </Text>
      </Float>
      {hovered && <pointLight position={[0,0,1.5]} intensity={3} color="#FFD700" distance={6} />}

      {/* Animated enter arrow — just above door */}
      <Float speed={4} floatIntensity={0.3} rotationIntensity={0}>
        <Text position={[0, 2.6, 0.4]} fontSize={0.28} color="#FFD700" anchorX="center" anchorY="middle">
          👆 CLICK TO ENTER
        </Text>
      </Float>
      <Float speed={3} floatIntensity={0.5} rotationIntensity={0}>
        <Text position={[0, 2.1, 0.4]} fontSize={0.45} color="#00D4FF" anchorX="center" anchorY="middle">
          ▼
        </Text>
      </Float>
      <Float speed={2.5} floatIntensity={0.4} rotationIntensity={0}>
        <Text position={[0, 1.65, 0.4]} fontSize={0.35} color="#FFD700" anchorX="center" anchorY="middle">
          ▼
        </Text>
      </Float>
      {/* Glow ring around door */}
      <pointLight position={[0, 0, 1.0]} intensity={hovered ? 5 : 2} color="#00D4FF" distance={5} />
      <pointLight position={[0, 1.5, 1.0]} intensity={hovered ? 3 : 1} color="#FFD700" distance={4} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// WOOD SLAT PANEL  – used on upper facade & carport ceiling
// ─────────────────────────────────────────────────────────────
function WoodSlatPanel({
  position, width, height, depth = 0.12, slatCount = 10, rotation,
}: {
  position: [number,number,number]; width: number; height: number;
  depth?: number; slatCount?: number; rotation?: [number,number,number];
}) {
  const gap = height / slatCount;
  return (
    <group position={position} rotation={rotation as any}>
      {Array.from({ length: slatCount }).map((_, i) => (
        <Box
          key={i}
          position={[0, -height/2 + gap * i + gap * 0.45, 0]}
          size={[width, gap * 0.62, depth]}
          color={i % 2 === 0 ? C.wood : C.woodLight}
          roughness={0.85} metalness={0}
        />
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// GLASS BALCONY RAILING
// ─────────────────────────────────────────────────────────────
function GlassRailing({
  position, width,
}: { position: [number,number,number]; width: number }) {
  return (
    <group position={position}>
      {/* Glass panel */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[width, 1.0, 0.04]} />
        <meshStandardMaterial color="#b8dce8" transparent opacity={0.35} roughness={0} metalness={0.1} />
      </mesh>
      {/* Top rail */}
      <Box position={[0, 1.04, 0]} size={[width+0.1, 0.08, 0.08]} color={C.dark} roughness={0.3} metalness={0.7} />
      {/* Bottom channel */}
      <Box position={[0, -0.02, 0]} size={[width+0.1, 0.06, 0.1]} color={C.dark} roughness={0.3} metalness={0.7} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// HIP ROOF  – dark tiled, wide overhanging eaves like the image
// ─────────────────────────────────────────────────────────────
function HipRoof({
  position, width, depth, height, overhang = 1.4,
}: {
  position: [number,number,number]; width: number; depth: number;
  height: number; overhang?: number;
}) {
  // Build as 4 flat trapezoid faces via trimmed boxes + ridge
  const W = width + overhang * 2;
  const D = depth + overhang * 2;
  return (
    <group position={position}>
      {/* Front slope */}
      <mesh position={[0, height/2, D/2 - 0.3]} rotation={[-Math.atan2(height, D/2), 0, 0]} castShadow>
        <boxGeometry args={[W, 0.15, Math.sqrt((D/2)**2 + height**2) + 0.5]} />
        <meshStandardMaterial color={C.dark} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Back slope */}
      <mesh position={[0, height/2, -D/2 + 0.3]} rotation={[Math.atan2(height, D/2), 0, 0]} castShadow>
        <boxGeometry args={[W, 0.15, Math.sqrt((D/2)**2 + height**2) + 0.5]} />
        <meshStandardMaterial color={C.dark} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Left hip slope */}
      <mesh position={[-W/2 + 0.3, height/2, 0]} rotation={[0, 0, Math.atan2(height, W/2)]} castShadow>
        <boxGeometry args={[Math.sqrt((W/2)**2 + height**2) + 0.3, 0.15, D * 0.45]} />
        <meshStandardMaterial color={C.dark} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Right hip slope */}
      <mesh position={[W/2 - 0.3, height/2, 0]} rotation={[0, 0, -Math.atan2(height, W/2)]} castShadow>
        <boxGeometry args={[Math.sqrt((W/2)**2 + height**2) + 0.3, 0.15, D * 0.45]} />
        <meshStandardMaterial color={C.dark} roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Ridge */}
      <Box position={[0, height, 0]} size={[W * 0.45, 0.18, 0.22]} color={C.dark} roughness={0.5} metalness={0.2} />
      {/* Fascia boards around eave perimeter */}
      <Box position={[0, 0.12, D/2]}  size={[W+0.1, 0.5, 0.18]} color={C.dark} roughness={0.4} metalness={0.3} />
      <Box position={[0, 0.12, -D/2]} size={[W+0.1, 0.5, 0.18]} color={C.dark} roughness={0.4} metalness={0.3} />
      <Box position={[-W/2, 0.12, 0]} size={[0.18, 0.5, D+0.1]} color={C.dark} roughness={0.4} metalness={0.3} />
      <Box position={[W/2, 0.12, 0]}  size={[0.18, 0.5, D+0.1]} color={C.dark} roughness={0.4} metalness={0.3} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// CARPORT (right side, flat dark roof, open front)
// ─────────────────────────────────────────────────────────────
function Carport({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {/* Flat roof */}
      <Box position={[0, 4.8, 0]} size={[7.5, 0.3, 9]} color={C.dark} roughness={0.4} metalness={0.3} />
      {/* Wood soffit underside */}
      <WoodSlatPanel position={[0, 4.64, 0]} width={7.3} height={8.8} slatCount={14} rotation={[-Math.PI/2, 0, 0]} />
      {/* Fascia */}
      <Box position={[0, 4.65, 4.65]}  size={[7.5, 0.5, 0.15]} color={C.dark} roughness={0.4} metalness={0.3} />
      <Box position={[3.78, 4.65, 0]}  size={[0.15, 0.5, 9]}   color={C.dark} roughness={0.4} metalness={0.3} />
      <Box position={[-3.78, 4.65, 0]} size={[0.15, 0.5, 9]}   color={C.dark} roughness={0.4} metalness={0.3} />
      {/* Posts – two slim dark steel columns */}
      <Box position={[-2.8, 2.3, 4.4]} size={[0.2, 4.6, 0.2]} color={C.concreteDk} roughness={0.3} metalness={0.7} />
      <Box position={[2.8, 2.3, 4.4]}  size={[0.2, 4.6, 0.2]} color={C.concreteDk} roughness={0.3} metalness={0.7} />
      {/* Back wall (connects to house) */}
      <Box position={[-3.7, 2.3, 0]} size={[0.15, 4.8, 8.8]} color={C.wall} roughness={0.85} />
      {/* Spot lights under roof */}
      {[-2, 0, 2].map((x,i) => (
        <group key={i} position={[x, 4.5, 1]}>
          <mesh>
            <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
            <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.1} />
          </mesh>
          <pointLight position={[0, -0.15, 0]} intensity={1.5} color="#ffe8c0" distance={5} />
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// MODERN CAR (black sedan, like Mercedes in image)
// ─────────────────────────────────────────────────────────────
const CAR_SPEED = 12;
const TURN_SPEED = 1.8;

function JaguarCar({ position }: { position: [number,number,number] }) {
  const [hovered, setHovered] = useState(false);
  const [riding, setRiding] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const carRef = useRef<THREE.Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  const carPos = useRef({ x: position[0], z: position[2] });
  const carAngle = useRef(0);
  const speed = useRef(0);
  const wheelAngle = useRef(0);

  useEffect(() => {
    if (!riding) return;
    const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; e.preventDefault(); };
    const up   = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup',   up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [riding]);

  useFrame((state, delta) => {
    if (!riding || !carRef.current) return;
    const k = keys.current;

    // ── THROTTLE with smooth acceleration ──
    const accel = 18;
    const maxFwd = CAR_SPEED;
    const maxRev = CAR_SPEED * 0.55;
    if      (k['arrowup']   || k['w']) speed.current = Math.min(speed.current + accel * delta, maxFwd);
    else if (k['arrowdown'] || k['s']) speed.current = Math.max(speed.current - accel * delta, -maxRev);
    else    speed.current *= 0.88; // natural friction

    // ── STEERING — proportional to speed ──
    const steerStrength = Math.min(Math.abs(speed.current) / 3, 1) * TURN_SPEED;
    if      (k['arrowleft']  || k['a']) { carAngle.current += steerStrength * delta * Math.sign(speed.current || 1); wheelAngle.current = 0.45; }
    else if (k['arrowright'] || k['d']) { carAngle.current -= steerStrength * delta * Math.sign(speed.current || 1); wheelAngle.current = -0.45; }
    else                                { wheelAngle.current *= 0.7; }

    // ── MOVE ── forward = +Z in world (toward camera = negative Z local)
    const nx = carPos.current.x + Math.sin(carAngle.current) * speed.current * delta;
    const nz = carPos.current.z - Math.cos(carAngle.current) * speed.current * delta;

    // ── COLLISION: only block solid house walls, allow full compound ──
    // House walls: X -14..14, Z -5..13  (don't block compound roads)
    const houseX = nx > -13 && nx < 13;
    const houseZ = nz > -4  && nz < 12;
    if (houseX && houseZ) {
      speed.current *= -0.3; // bounce
    } else {
      carPos.current.x = Math.max(-45, Math.min(45, nx));
      carPos.current.z = Math.max(-25, Math.min(35, nz));
    }

    carRef.current.position.set(carPos.current.x, 0.35, carPos.current.z);
    carRef.current.rotation.y = carAngle.current;

    // ── FOLLOW CAMERA ──
    if (riding) {
      const camDist   = 10;
      const camHeight = 4.5;
      const targetCamX = carPos.current.x - Math.sin(carAngle.current) * camDist;
      const targetCamZ = carPos.current.z + Math.cos(carAngle.current) * camDist;
      const targetCamY = 0.35 + camHeight;

      // Smooth lerp
      state.camera.position.x += (targetCamX - state.camera.position.x) * 5 * delta;
      state.camera.position.y += (targetCamY - state.camera.position.y) * 5 * delta;
      state.camera.position.z += (targetCamZ - state.camera.position.z) * 5 * delta;
      state.camera.lookAt(carPos.current.x, 0.8, carPos.current.z);
    }
  });

  const bodyColor  = riding ? '#1a2a4a' : '#0d1117';
  const accentColor = '#c8a84b'; // Jaguar gold

  return (
    <group
      ref={carRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); setShowPrompt(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); setShowPrompt(false); document.body.style.cursor = 'none'; }}
      onClick={(e) => {
        e.stopPropagation();
        if (!riding) { carPos.current = { x: (carRef.current?.position.x ?? position[0]), z: (carRef.current?.position.z ?? position[2]) }; }
        setRiding(r => !r);
      }}
    >
      {/* ── BODY ── */}
      {/* Lower body sill */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[4.6, 0.22, 2.0]} />
        <meshStandardMaterial color={bodyColor} roughness={0.05} metalness={0.95} />
      </mesh>
      {/* Main body */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[4.4, 0.42, 1.92]} />
        <meshStandardMaterial color={bodyColor} roughness={0.05} metalness={0.95} />
      </mesh>
      {/* Bonnet (tapered front) */}
      <mesh position={[1.6, 0.6, 0]} castShadow>
        <boxGeometry args={[1.2, 0.35, 1.75]} />
        <meshStandardMaterial color={bodyColor} roughness={0.05} metalness={0.95} />
      </mesh>
      {/* Cabin roof */}
      <mesh position={[0.1, 1.05, 0]} castShadow>
        <boxGeometry args={[2.2, 0.52, 1.6]} />
        <meshStandardMaterial color={bodyColor} roughness={0.08} metalness={0.9} />
      </mesh>
      {/* Roof taper front */}
      <mesh position={[1.05, 0.9, 0]} rotation={[0, 0, -0.45]} castShadow>
        <boxGeometry args={[0.6, 0.28, 1.55]} />
        <meshStandardMaterial color={bodyColor} roughness={0.08} metalness={0.9} />
      </mesh>
      {/* Roof taper rear */}
      <mesh position={[-0.95, 0.9, 0]} rotation={[0, 0, 0.35]} castShadow>
        <boxGeometry args={[0.5, 0.26, 1.55]} />
        <meshStandardMaterial color={bodyColor} roughness={0.08} metalness={0.9} />
      </mesh>
      {/* Boot/trunk */}
      <mesh position={[-1.7, 0.65, 0]} castShadow>
        <boxGeometry args={[0.9, 0.38, 1.85]} />
        <meshStandardMaterial color={bodyColor} roughness={0.05} metalness={0.95} />
      </mesh>

      {/* ── WINDOWS ── */}
      <mesh position={[0.85, 1.02, 0.82]} rotation={[0.08, 0, 0]}>
        <planeGeometry args={[0.85, 0.42]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.85} roughness={0} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.35, 1.02, 0.82]} rotation={[0.08, 0, 0]}>
        <planeGeometry args={[0.78, 0.42]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.85} roughness={0} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.85, 1.02, -0.82]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[0.85, 0.42]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.85} roughness={0} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.35, 1.02, -0.82]} rotation={[-0.08, 0, 0]}>
        <planeGeometry args={[0.78, 0.42]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.85} roughness={0} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Windscreen */}
      <mesh position={[1.12, 0.92, 0]} rotation={[0, 0, -0.52]}>
        <planeGeometry args={[0.78, 1.56]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.8} roughness={0} metalness={0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* Rear screen */}
      <mesh position={[-1.05, 0.88, 0]} rotation={[0, 0, 0.42]}>
        <planeGeometry args={[0.68, 1.5]} />
        <meshStandardMaterial color="#1a2a35" transparent opacity={0.8} roughness={0} metalness={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* ── JAGUAR GOLD TRIM ── */}
      <Box position={[0, 0.38, 0.97]}  size={[4.3, 0.06, 0.04]} color={accentColor} roughness={0.2} metalness={0.9} />
      <Box position={[0, 0.38, -0.97]} size={[4.3, 0.06, 0.04]} color={accentColor} roughness={0.2} metalness={0.9} />
      {/* Grille */}
      <Box position={[2.28, 0.52, 0]} size={[0.06, 0.28, 1.2]}  color={accentColor} roughness={0.2} metalness={0.95} />
      {Array.from({length:5}).map((_,i) => (
        <Box key={i} position={[2.29, 0.42 + i*0.065, 0]} size={[0.06, 0.03, 1.1]} color="#333" roughness={0.3} metalness={0.8} />
      ))}
      {/* Jaguar leaping cat badge */}
      <mesh position={[2.3, 0.72, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={accentColor} metalness={0.99} roughness={0.02} emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>

      {/* ── WHEELS (4) — realistic rubber + alloy ── */}
      {([[-1.45, 1.02], [1.45, 1.02], [-1.45, -1.02], [1.45, -1.02]] as [number,number][]).map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Fat rubber tyre */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.36, 0.19, 16, 32]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.98} metalness={0} />
          </mesh>
          {/* Tyre sidewall */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.01, 32]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.99} />
          </mesh>
          {/* 8 tread blocks sitting ON the tyre surface */}
          {Array.from({length:8}).map((_,t) => {
            const ang = (t/8)*Math.PI*2;
            return (
              <mesh key={t}
                position={[0, Math.sin(ang)*0.36, Math.cos(ang)*0.36]}
                rotation={[ang, 0, 0]}
              >
                <boxGeometry args={[0.38, 0.08, 0.12]} />
                <meshStandardMaterial color="#080808" roughness={1} metalness={0} />
              </mesh>
            );
          })}
          {/* Alloy dish */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.2, 16]} />
            <meshStandardMaterial color="#181818" metalness={0.55} roughness={0.45} />
          </mesh>
          {/* 5 Y-spokes radiating from centre */}
          {Array.from({length:5}).map((_,s) => {
            const a = (s/5)*Math.PI*2;
            return (
              <group key={s} rotation={[0, 0, a]}>
                {/* spoke arm */}
                <mesh position={[0, 0.14, 0]} rotation={[Math.PI/2, 0, 0]}>
                  <boxGeometry args={[0.055, 0.055, 0.26]} />
                  <meshStandardMaterial color="#d8d8d8" metalness={0.95} roughness={0.05} />
                </mesh>
                {/* spoke tip */}
                <mesh position={[0, 0.27, 0]} rotation={[Math.PI/2, 0, 0]}>
                  <boxGeometry args={[0.11, 0.06, 0.06]} />
                  <meshStandardMaterial color="#c8c8c8" metalness={0.95} roughness={0.05} />
                </mesh>
              </group>
            );
          })}
          {/* Brake disc */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.21, 0.21, 0.04, 16]} />
            <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Red brake caliper — sits at bottom of disc */}
          <mesh position={[0, -0.19, 0.06]}>
            <boxGeometry args={[0.12, 0.14, 0.06]} />
            <meshStandardMaterial color="#cc0000" metalness={0.6} roughness={0.3} emissive="#660000" emissiveIntensity={0.3} />
          </mesh>
          {/* Gold centre cap */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.26, 8]} />
            <meshStandardMaterial color={accentColor} metalness={0.99} roughness={0.02} emissive={accentColor} emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}

      {/* ── LIGHTS ── */}
      {/* LED headlights */}
      <Box position={[2.25, 0.62, 0.62]}  size={[0.08, 0.1, 0.35]} color="#e8f4ff" emissive="#e8f4ff" emissiveIntensity={riding ? 4 : 1.5} roughness={0} />
      <Box position={[2.25, 0.62, -0.62]} size={[0.08, 0.1, 0.35]} color="#e8f4ff" emissive="#e8f4ff" emissiveIntensity={riding ? 4 : 1.5} roughness={0} />
      {/* DRL strip */}
      <Box position={[2.26, 0.68, 0]}     size={[0.05, 0.05, 1.1]} color="#e8f4ff" emissive="#e8f4ff" emissiveIntensity={riding ? 2 : 0.8} roughness={0} />
      {/* Tail lights */}
      <Box position={[-2.26, 0.62, 0.65]}  size={[0.07, 0.12, 0.4]} color="#ff2200" emissive="#ff2200" emissiveIntensity={1.2} roughness={0} />
      <Box position={[-2.26, 0.62, -0.65]} size={[0.07, 0.12, 0.4]} color="#ff2200" emissive="#ff2200" emissiveIntensity={1.2} roughness={0} />
      <Box position={[-2.27, 0.68, 0]}     size={[0.05, 0.05, 1.1]} color="#ff2200" emissive="#ff2200" emissiveIntensity={0.8} roughness={0} />
      {/* Headlight beams when riding */}
      {riding && <>
        <pointLight position={[3.5, 0.6, 0.6]}  intensity={8} color="#e8f4ff" distance={18} />
        <pointLight position={[3.5, 0.6, -0.6]} intensity={8} color="#e8f4ff" distance={18} />
      </>}

      {/* ── UNDERCARRIAGE GLOW when riding ── */}
      {riding && <pointLight position={[0, -0.1, 0]} intensity={2} color="#00aaff" distance={4} />}

      {/* ── HUD LABEL ── */}
      {(showPrompt || riding) && (
        <Float speed={3} floatIntensity={0.3} rotationIntensity={0}>
          <Text position={[0, 2.2, 0]} fontSize={0.26} color={riding ? '#00ff88' : accentColor} anchorX="center" anchorY="middle">
            {riding ? '🏎 ↑/W=Forward  ↓/S=Back  ←/A=Left  →/D=Right  Click=Exit' : '🏎 Jaguar XF — Click to Drive'}
          </Text>
        </Float>
      )}

      {/* Jaguar logo above car when hovered */}
      {hovered && !riding && (
        <Float speed={2} floatIntensity={0.5} rotationIntensity={0}>
          <Text position={[0, 1.8, 0]} fontSize={0.18} color={accentColor} anchorX="center" anchorY="middle">
            ✦ JAGUAR ✦
          </Text>
        </Float>
      )}
    </group>
  );
}
  
      

// ─────────────────────────────────────────────────────────────
// TROPICAL PALM  (like image)
// ─────────────────────────────────────────────────────────────
function Palm({ position, height = 6 }: { position: [number,number,number]; height?: number }) {
  return (
    <group position={position}>
      {/* Trunk – slightly curved via stacked segments */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[i * 0.08, height * 0.1 * i + height * 0.1, 0]}>
          <cylinderGeometry args={[0.14 - i*0.01, 0.18 - i*0.01, height * 0.22, 7]} />
          <meshStandardMaterial color="#6b4c30" roughness={0.9} />
        </mesh>
      ))}
      {/* Fronds */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return (
          <Float key={i} speed={1.2 + i*0.1} floatIntensity={0.2} rotationIntensity={0.05}>
            <mesh
              position={[
                Math.cos(angle) * 1.4 + 0.4,
                height + 0.3,
                Math.sin(angle) * 1.4,
              ]}
              rotation={[Math.cos(angle) * 0.6, angle, -0.5]}
            >
              <planeGeometry args={[2.8, 0.45]} />
              <meshStandardMaterial color="#3a7a22" roughness={0.9} side={THREE.DoubleSide} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// SHRUB / GROUND COVER
// ─────────────────────────────────────────────────────────────
function Shrub({ position, scale = 1, color = '#2d6e1a' }: { position: [number,number,number]; scale?: number; color?: string }) {
  return (
    <group position={position}>
      {[0, 0.45, 0.85].map((y, i) => (
        <mesh key={i} position={[0, y * scale, 0]}>
          <sphereGeometry args={[(0.5 - i * 0.08) * scale, 8, 6]} />
          <meshStandardMaterial color={color} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// WALL SCONCE LIGHT (like in image on boundary wall)
// ─────────────────────────────────────────────────────────────
function WallSconce({ position, isDay }: { position: [number,number,number]; isDay: boolean }) {
  return (
    <group position={position}>
      {/* Back plate */}
      <Box position={[0,0,0]} size={[0.18, 0.5, 0.1]} color={C.concreteDk} roughness={0.4} metalness={0.7} />
      {/* Up-light */}
      <mesh position={[0, 0.28, 0.08]}>
        <coneGeometry args={[0.12, 0.22, 6, 1, true, 0, Math.PI*2]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Down-light */}
      <mesh position={[0, -0.28, 0.08]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.12, 0.22, 6, 1, true, 0, Math.PI*2]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>
      <pointLight position={[0, 0.4, 0.3]} intensity={isDay ? 0.3 : 2.5} color="#ffd080" distance={4} />
      <pointLight position={[0, -0.4, 0.3]} intensity={isDay ? 0.2 : 2.0} color="#ffd080" distance={3} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOFTOP TV — DOM portal popups, scale-safe
// ─────────────────────────────────────────────────────────────
function TVOverlay({ stage, setStage }: { stage: 'zoomed' | 'bio'; setStage: (s: 'idle' | 'zoomed' | 'bio') => void }) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <>
      <style>{`
        @keyframes tvZoomIn { from { opacity:0; transform:scale(0.6); } to { opacity:1; transform:scale(1); } }
        @keyframes tvBioIn  { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        .tv-overlay { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:999999; pointer-events:all !important; }
        .tv-overlay * { pointer-events:all !important; }
        canvas { pointer-events:none !important; }
      `}</style>

      {stage === 'zoomed' && (
        <div className="tv-overlay" style={{ background: 'rgba(0,0,0,0.85)', cursor: 'pointer', animation: 'tvZoomIn 0.35s ease-out' }}
          onClick={() => setStage('bio')}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 340, height: 400, borderRadius: 16, overflow: 'hidden', border: '4px solid #00D4FF', boxShadow: '0 0 80px rgba(0,212,255,0.6)' }}>
              <img src="/avatar.jpg" alt="Raghav" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div style={{ color: '#FFD700', marginTop: 16, fontFamily: 'monospace', fontSize: 14 }}>👆 Click anywhere to open Bio</div>
            <button onClick={(e) => { e.stopPropagation(); setStage('idle'); }} style={{
              marginTop: 14, background: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.4)',
              color: '#ff6666', borderRadius: 8, padding: '6px 16px', fontSize: 12, cursor: 'pointer',
            }}>✕ Close</button>
          </div>
        </div>
      )}

      {stage === 'bio' && (
        <div className="tv-overlay" style={{ background: 'rgba(0,0,0,0.9)', animation: 'tvBioIn 0.3s ease-out' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 420, background: 'rgba(0,0,0,0.97)', border: '3px solid #00D4FF', borderRadius: 12, fontFamily: 'monospace', overflow: 'hidden', boxShadow: '0 0 60px rgba(0,212,255,0.5)', pointerEvents: 'all' }}>
            <div style={{ background: 'linear-gradient(90deg,#001a2e,#003a5e)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #00D4FF44' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </div>
              <span style={{ color: '#00D4FF', fontSize: 11, letterSpacing: '0.2em' }}>📺 RAGHAV.Bio</span>
              <button onClick={() => setStage('idle')} style={{ background: 'rgba(255,0,0,0.2)', border: '1px solid rgba(255,0,0,0.4)', color: '#ff4444', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 8, border: '2px solid #00D4FF', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 20px rgba(0,212,255,0.5)' }}>
                  <img src="/avatar.jpg" alt={PERSONAL_INFO.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div>
                  <div style={{ color: '#00D4FF', fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{PERSONAL_INFO.name}</div>
                  <div style={{ color: '#FFD700', fontSize: 11, marginBottom: 3 }}>⚡ Junior Full Stack & AI/ML Developer</div>
                  <div style={{ color: '#888', fontSize: 11 }}>@ AAVIL Inc - https://aavilabs.com/</div>
                </div>
              </div>
              <div style={{ height: 1, background: 'linear-gradient(90deg,#00D4FF,#7C3AED,transparent)', marginBottom: 14 }} />
              {[
                { icon: '📧', label: 'ranganathansadhula@gmail.com' },
                { icon: '🎓', label: 'B.Tech CSE (AI&ML) — LBRCE' },
                { icon: '🏆', label: 'Best Final Year Project — NIT 2025' },
                { icon: '🥈', label: '2nd Prize National Level — GMRIT 2025' },
                { icon: '🥇', label: '1st Prize — NEONITE 2k22' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start', color: 'rgba(255,255,255,0.75)', fontSize: 11, lineHeight: 1.5 }}>
                  <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { label: ' LinkedIn', href: PERSONAL_INFO.linkedin, color: '#0A66C2' },
                  { label: ' GitHub', href: PERSONAL_INFO.github, color: '#00D4FF' },
                  { label: ' Portfolio', href: PERSONAL_INFO.portfolio, color: '#7C3AED' },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                    padding: '7px 14px', borderRadius: 8, fontSize: 11, background: `${link.color}22`,
                    color: link.color, border: `1px solid ${link.color}55`, textDecoration: 'none', fontWeight: 700,
                  }}>{link.label} →</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}

function TerraceTV({ position, onOpen }: { position: [number, number, number]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/avatar.jpg', (tex) => setTexture(tex), undefined, () => setTexture(null));
  }, []);

  useFrame((s) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = hovered
        ? 1.2 + Math.sin(s.clock.elapsedTime * 4) * 0.3
        : 0.15 + Math.sin(s.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={position} scale={2.2}>
        <Box position={[0, -0.08, 0]} size={[1.2, 0.12, 0.6]} color="#222" roughness={0.4} metalness={0.7} />
        <Box position={[0, -0.4, 0]} size={[0.18, 0.65, 0.18]} color="#1a1a1a" roughness={0.4} metalness={0.8} />
        <Box position={[0, -0.74, 0]} size={[1.0, 0.1, 0.4]} color="#111" roughness={0.3} metalness={0.9} />
        <Box position={[0, 1.0, 0]} size={[3.6, 2.2, 0.18]} color="#111111" roughness={0.3} metalness={0.8} />
        <Box position={[0, 1.0, 0.08]} size={[3.3, 1.9, 0.06]} color="#0a0a0a" roughness={0.2} metalness={0.6} />

        <mesh ref={screenRef} position={[0, 1.0, 0.12]}>
          <planeGeometry args={[3.0, 1.75]} />
          {texture
            ? <meshStandardMaterial map={texture} emissive="#ffffff" emissiveMap={texture} emissiveIntensity={0.15} />
            : <meshStandardMaterial color="#1a1a2e" emissive="#00D4FF" emissiveIntensity={0.4} />
          }
        </mesh>

        <mesh
          position={[0, 1.0, 0.25]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'none'; }}
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          <planeGeometry args={[3.9, 2.6]} />
          <meshStandardMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <mesh position={[1.4, 0.18, 0.1]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={hovered ? 3 : 1.5} />
        </mesh>
        <pointLight position={[1.4, 0.18, 0.2]} intensity={hovered ? 1 : 0.3} color="#00ff44" distance={1} />
        <pointLight position={[0, 1.0, 0.8]} intensity={hovered ? 2.5 : 1.0} color="#00D4FF" distance={4} />

        <Float speed={2} floatIntensity={0.3} rotationIntensity={0}>
          <Text position={[0, 2.4, 0.2]} fontSize={0.22} color={hovered ? '#FFD700' : '#00D4FF'} anchorX="center" anchorY="middle">
            {hovered ? '📺 Click!' : '👋 Raghav — Click Me'}
          </Text>
        </Float>
      </group>
  );
}
  
  
  

// ─────────────────────────────────────────────────────────────
// BIO PANEL (unchanged)
// ─────────────────────────────────────────────────────────────
function BioPanel({ onClose }: { onClose: () => void }) {
  return (
    <Html center position={[0,0,0]} style={{ pointerEvents:'auto' }}>
      <div style={{
        width:380, background:'rgba(5,10,20,0.97)', backdropFilter:'blur(20px)',
        border:'1px solid rgba(0,212,255,0.3)', borderRadius:16, padding:24,
        color:'white', fontFamily:'Inter,sans-serif', position:'relative',
        boxShadow:'0 0 40px rgba(0,212,255,0.2)',
      }}>
        <button onClick={onClose} style={{
          position:'absolute',top:12,right:12,background:'rgba(255,255,255,0.1)',
          border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,color:'white',
          width:32,height:32,cursor:'pointer',fontSize:14,
          display:'flex',alignItems:'center',justifyContent:'center',
        }}>✕</button>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
          <div style={{
            width:70,height:70,borderRadius:'50%',
            overflow:'hidden',flexShrink:0,
            border:'2px solid #00D4FF',
            boxShadow:'0 0 20px rgba(0,212,255,0.4)',
          }}>
            <img
              src="/avatar.jpg"
              alt="Raghav"
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
            />
          </div>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:'#00D4FF'}}>{PERSONAL_INFO.name}</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:2}}>Junior Full Stack & AI/ML Developer</div>
            <div style={{fontSize:11,color:'#FFD700',marginTop:2}}>@ AAVIL Inc</div>
          </div>
        </div>
        <div style={{height:1,background:'linear-gradient(90deg,#00D4FF,#7C3AED,transparent)',marginBottom:14}} />
        {[
          {icon:'📍',text:'Vijayawada, AP, India - 521225'},
          {icon:'📧',text:'ranganathansadhula@gmail.com'},
          {icon:'📱',text:'+91 7013608858'},
          {icon:'🎓',text:'B.Tech CSE (AI&ML) — LBRCE, CGPA 8.5/10'},
        ].map((item,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:8,alignItems:'flex-start'}}>
            <span style={{fontSize:14}}>{item.icon}</span>
            <span style={{fontSize:11,color:'rgba(255,255,255,0.7)',lineHeight:1.5}}>{item.text}</span>
          </div>
        ))}
        <div style={{height:1,background:'rgba(255,255,255,0.06)',margin:'12px 0'}} />
        <p style={{fontSize:10.5,color:'rgba(255,255,255,0.55)',lineHeight:1.7,marginBottom:14}}>
          Passionate AI/ML Developer & Full Stack Engineer. Winner of Best Final Year Project Award (NIT-2025),
          2nd Prize at National Level (GMRIT-2025), and 1st Prize at NEONITE-2k22.
        </p>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {[
            {label:'LinkedIn',href:PERSONAL_INFO.linkedin,color:'#0A66C2'},
            {label:'GitHub',href:PERSONAL_INFO.github,color:'#00D4FF'},
            {label:'Portfolio',href:PERSONAL_INFO.portfolio,color:'#7C3AED'},
          ].map(link=>(
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              padding:'6px 14px',borderRadius:8,fontSize:11,
              background:`${link.color}22`,color:link.color,
              border:`1px solid ${link.color}44`,textDecoration:'none',fontWeight:600,
            }}>{link.label} →</a>
          ))}
        </div>
      </div>
    </Html>
  );
}

// ─────────────────────────────────────────────────────────────
// BALCONY FLOWER PLANTER
// ─────────────────────────────────────────────────────────────
function BalconyPlanter({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <Box position={[0,0,0]} size={[1.8,0.35,0.4]} color="#555" roughness={0.6} metalness={0.3} />
      {/* Soil */}
      <Box position={[0,0.2,0]} size={[1.7,0.15,0.35]} color="#3d2010" roughness={1} />
      {/* Flowers */}
      {[-0.6,-0.1,0.4].map((x,i)=>(
        <group key={i} position={[x,0.35,0]}>
          <mesh position={[0,0.3,0]}>
            <cylinderGeometry args={[0.03,0.03,0.6,5]} />
            <meshStandardMaterial color="#2d6a10" roughness={0.9} />
          </mesh>
          <mesh position={[0,0.65,0]}>
            <sphereGeometry args={[0.16,8,6]} />
            <meshStandardMaterial color={['#e83030','#ff9a30','#e84090'][i]} emissive={['#e83030','#ff9a30','#e84090'][i]} emissiveIntensity={0.3} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN HOUSE EXTERIOR  – matches reference image
// ─────────────────────────────────────────────────────────────
export function HouseExterior({ onEnter, onTvOpen }: { onEnter: () => void; onTvOpen: () => void }) {
  const { isDay } = usePortfolioStore();

  // House dims
  const HW = 14;   // half-width of main block
  const HD = 9;    // half-depth
  const G1 = 4.2;  // ground floor height
  const G2 = 4.0;  // first floor height
  const roofBase = G1 + G2; // = 8.2

  return (
    <group>
      {/* ══ GROUND ══════════════════════════════════════════════ */}
      {/* Grass base */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,0]} receiveShadow>
        <planeGeometry args={[120,120]} />
        <meshStandardMaterial color="#3d7a25" roughness={0.95} />
      </mesh>

      {/* Concrete driveway (right side carport + front) */}
      <Box position={[8,0.01,14]}   size={[10,0.04,18]} color={C.driveway} roughness={0.9} />
      <Box position={[0,0.01,18.5]} size={[28,0.04,3]}  color={C.driveway} roughness={0.9} />

      {/* Footpath to front door */}
      <Box position={[0,0.02,12]}  size={[4,0.04,8]}  color="#c0bdb4" roughness={0.9} />
      {/* Step up */}
      <Box position={[0,0.1,8.6]}  size={[4,0.2,1.2]} color="#c8c4b8" roughness={0.8} />

      {/* ══ BOUNDARY WALL (front) ════════════════════════════════ */}
      {/* Left wall section */}
      <Box position={[-8.5,1.0,20]}  size={[8,2.0,0.5]}  color={C.concrete}  roughness={0.85} />
      {/* Right wall section */}
      <Box position={[10.5,1.0,20]}  size={[4.5,2.0,0.5]} color={C.concrete} roughness={0.85} />
      {/* Wall top cap */}
      <Box position={[-8.5,2.1,20]}  size={[8.1,0.15,0.65]}  color="#b8b5ad" roughness={0.7} />
      <Box position={[10.5,2.1,20]}  size={[4.6,0.15,0.65]}  color="#b8b5ad" roughness={0.7} />

      {/* Gate pillars – dark square columns */}
      {[-3.5, 3.5].map((x,i)=>(
        <group key={i} position={[x,0,20]}>
          <Box position={[0,2.2,0]} size={[0.9,4.4,0.8]} color={C.concreteDk} roughness={0.4} metalness={0.2} />
          {/* Pillar cap light */}
          <Box position={[0,4.55,0]} size={[1.0,0.2,0.9]} color={C.concreteDk} roughness={0.3} metalness={0.5} />
          <mesh position={[0,4.72,0]}><boxGeometry args={[0.8,0.1,0.7]} /><meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} /></mesh>
          <pointLight position={[0,4.9,0]} intensity={isDay?0.3:2.5} color="#ffd080" distance={5} />
        </group>
      ))}

      {/* Gate – dark vertical bars */}
      {[-1.4, 1.4].map((x,i)=>(
        <group key={i} position={[x,0,20.05]}>
          <Box position={[0,1.8,0]} size={[1.4,3.6,0.08]} color={C.darkMid} roughness={0.3} metalness={0.7} />
          {/* Vertical bars */}
          {Array.from({length:6}).map((_,j)=>(
            <Box key={j} position={[-0.55+j*0.22,1.8,0.06]} size={[0.05,3.4,0.05]} color="#444" roughness={0.3} metalness={0.8} />
          ))}
          {/* Horizontal rails */}
          <Box position={[0,0.4,0.04]}  size={[1.4,0.08,0.06]} color={C.darkMid} roughness={0.3} metalness={0.7} />
          <Box position={[0,3.2,0.04]}  size={[1.4,0.08,0.06]} color={C.darkMid} roughness={0.3} metalness={0.7} />
        </group>
      ))}

      {/* Side walls */}
      <Box position={[-13.5,1.0,11]} size={[0.5,2.0,18]} color={C.concrete} roughness={0.85} />
      <Box position={[13.5,1.0,11]}  size={[0.5,2.0,18]} color={C.concrete} roughness={0.85} />

      {/* Wall sconces on boundary pillars */}
      <WallSconce position={[-6,1.5,19.75]}  isDay={isDay} />
      <WallSconce position={[7.5,1.5,19.75]} isDay={isDay} />

      {/* ══ HOUSE FOUNDATION PLINTH ══════════════════════════════ */}
      <Box position={[0,0.25,4]} size={[HW*2+1, 0.5, HD*2+2]} color="#c0bcb2" roughness={0.9} />

      {/* ══ GROUND FLOOR WALLS ═══════════════════════════════════ */}
      {/* Main body */}
      <Box position={[0, G1/2+0.5, 4]} size={[HW*2, G1, HD*2]} color={C.wall} roughness={0.85} />
      {/* Front face – slightly lighter */}
      <Box position={[0, G1/2+0.5, 4+HD+0.02]} size={[HW*2, G1, 0.05]} color="#faf8f3" roughness={0.8} />

      {/* ── Covered portico / entrance canopy ── */}
      {/* Flat dark roof */}
      <Box position={[0, G1+0.5, 4+HD+1.5]} size={[HW*2, 0.25, 4.5]} color={C.dark} roughness={0.4} metalness={0.3} />
      {/* Wood soffit */}
      <WoodSlatPanel position={[0, G1+0.35, 4+HD+1.5]} width={HW*2-0.4} height={4.2} slatCount={12} rotation={[-Math.PI/2,0,0]} />
      {/* Fascia front edge */}
      <Box position={[0, G1+0.38, 4+HD+3.72]} size={[HW*2+0.1, 0.55, 0.2]} color={C.dark} roughness={0.4} metalness={0.3} />
      {/* Recessed ceiling lights in portico */}
      {[-4,0,4].map((x,i)=>(
        <group key={i} position={[x, G1+0.32, 4+HD+1.5]}>
          <mesh rotation={[-Math.PI/2,0,0]}><circleGeometry args={[0.15,10]} /><meshStandardMaterial color="#fff" emissive="#ffe8c0" emissiveIntensity={isDay?0.5:3} /></mesh>
          <pointLight position={[0,-0.1,0]} intensity={isDay?0.5:2.5} color="#ffe8c0" distance={5} />
        </group>
      ))}

      {/* ── Ground floor windows ── */}
      {/* Far left */}
      <ModernWindow position={[-HW+2.2, G1*0.52, 4+HD+0.08]} size={[2.4,1.8]} isDay={isDay} />
      {/* Left of door */}
      <ModernWindow position={[-3.8, G1*0.52, 4+HD+0.08]} size={[2.2,1.8]} isDay={isDay} />
      {/* Right of door */}
      <ModernWindow position={[3.8, G1*0.52, 4+HD+0.08]} size={[2.2,1.8]} isDay={isDay} />
      {/* Far right */}
      <ModernWindow position={[HW-2.2, G1*0.52, 4+HD+0.08]} size={[2.4,1.8]} isDay={isDay} />
      {/* Back wall windows */}
      <ModernWindow position={[-4, G1*0.52, 4-HD-0.05]} size={[2.4,1.6]} rotation={[0,Math.PI,0]} isDay={isDay} />
      <ModernWindow position={[4, G1*0.52, 4-HD-0.05]} size={[2.4,1.6]} rotation={[0,Math.PI,0]} isDay={isDay} />

      {/* ── Front door ── */}
      <SlidingDoor position={[0, G1*0.5-0.3, 4+HD+0.1]} onEnter={onEnter} isDay={isDay} />

      {/* ══ FIRST FLOOR WALLS ════════════════════════════════════ */}
      <Box position={[0, G1+G2/2+0.5, 4]} size={[HW*2, G2, HD*2]} color={C.wall} roughness={0.85} />
      {/* Front face */}
      <Box position={[0, G1+G2/2+0.5, 4+HD+0.02]} size={[HW*2, G2, 0.05]} color="#faf8f3" roughness={0.8} />

      {/* ── Wood slat cladding panels (left side of first floor front) ── */}
      <WoodSlatPanel
        position={[-HW+3.0, G1+G2/2+0.5, 4+HD+0.16]}
        width={4.5} height={G2-0.4} slatCount={14}
      />
      {/* Wood slat panel (right side) */}
      <WoodSlatPanel
        position={[HW-3.0, G1+G2/2+0.5, 4+HD+0.16]}
        width={4.5} height={G2-0.4} slatCount={14}
      />

      {/* ── Dark horizontal band between floors ── */}
      <Box position={[0, G1+0.5, 4]} size={[HW*2+0.2, 0.55, HD*2+0.2]} color={C.dark} roughness={0.4} metalness={0.3} />

      {/* ── First floor balcony slab ── */}
      <Box position={[0, G1+0.28, 4+HD+1.8]} size={[HW*2, 0.3, 4.2]} color={C.dark} roughness={0.4} metalness={0.3} />
      {/* Balcony ceiling (underside = wood soffit) */}
      <WoodSlatPanel position={[0, G1+0.12, 4+HD+1.8]} width={HW*2-0.3} height={3.8} slatCount={10} rotation={[-Math.PI/2,0,0]} />

      {/* ── Balcony glass railing ── */}
      <GlassRailing position={[0, G1+0.44, 4+HD+3.7]} width={HW*2+0.1} />

      {/* ── First floor windows ── */}
      <ModernWindow position={[-HW+2.2, G1+G2*0.5+0.5, 4+HD+0.08]} size={[2.4,1.8]} isDay={isDay} />
      <ModernWindow position={[-2.5, G1+G2*0.5+0.5, 4+HD+0.08]} size={[3.5,2.0]} isDay={isDay} />
      <ModernWindow position={[2.5,  G1+G2*0.5+0.5, 4+HD+0.08]} size={[3.5,2.0]} isDay={isDay} />
      <ModernWindow position={[HW-2.2, G1+G2*0.5+0.5, 4+HD+0.08]} size={[2.4,1.8]} isDay={isDay} />
      {/* Side windows first floor */}
      <ModernWindow position={[-HW-0.05, G1+G2*0.5+0.5, 4-2]} size={[3,1.8]} rotation={[0,-Math.PI/2,0]} isDay={isDay} />
      <ModernWindow position={[HW+0.05, G1+G2*0.5+0.5, 4-2]}  size={[3,1.8]} rotation={[0,Math.PI/2,0]}  isDay={isDay} />

      {/* ── Balcony planters ── */}
      <BalconyPlanter position={[-5.5, G1+0.6, 4+HD+2.8]} />
      <BalconyPlanter position={[3.8,  G1+0.6, 4+HD+2.8]} />

      {/* ── Second dark band / floor separator ── */}
      <Box position={[0, roofBase+0.5, 4]} size={[HW*2+0.2, 0.4, HD*2+0.2]} color={C.dark} roughness={0.4} metalness={0.3} />

      {/* ══ ROOF ════════════════════════════════════════════════ */}
      <HipRoof position={[0, roofBase+0.7, 4]} width={HW*2} depth={HD*2} height={3.2} overhang={1.5} />

      {/* ══ ROOFTOP TV — mounted high on the ridge, clearly on top ═ */}
      <TerraceTV position={[0, roofBase + 4.3, 4]} onOpen={onTvOpen} />

      {/* ══ CARPORT (right side) ════════════════════════════════ */}
      <Carport position={[HW+4.3, 0, 9]} />

      {/* ══ CAR ════════════════════════════════════════════════ */}
      <JaguarCar position={[HW+3.8, 0.35, 10]} />

      {/* ══ LANDSCAPING ════════════════════════════════════════ */}
      {/* Tall palms left */}
      <Palm position={[-10, 0, 10]} height={9} />
      <Palm position={[-12, 0, 5]}  height={7} />
      {/* Palms right background */}
      <Palm position={[11, 0, 5]}   height={8} />
      {/* Trees background */}
      {[[-15,0,3],[-17,0,8],[12,0,3],[15,0,6],[-14,0,-3],[13,0,-3]].map(([x,y,z],i)=>(
        <group key={i} position={[x,y,z] as [number,number,number]}>
          <mesh position={[0,2,0]}><cylinderGeometry args={[0.22,0.28,4,7]} /><meshStandardMaterial color="#5c3d1f" roughness={0.9} /></mesh>
          {[0,0.8,1.5].map((hy,hi)=>(
            <mesh key={hi} position={[0,3.8+hy,0]}><coneGeometry args={[1.6-hi*0.35,2,8]} /><meshStandardMaterial color={`hsl(${120+hi*12},48%,${17+hi*6}%)`} roughness={0.9} /></mesh>
          ))}
        </group>
      ))}

      {/* Ground cover shrubs — left garden bed */}
      {[[-6.5,0,11],[-9,0,9],[-7,0,7],[-5,0,8]].map(([x,y,z],i)=>(
        <Shrub key={i} position={[x,y,z] as [number,number,number]} scale={0.8+Math.random()*0.4} />
      ))}
      {/* Right garden bed */}
      {[[6,0,8],[8,0,10],[7,0,6]].map(([x,y,z],i)=>(
        <Shrub key={i} position={[x,y,z] as [number,number,number]} scale={0.7+Math.random()*0.4} color="#2a6018" />
      ))}
      {/* Agave / spiky plants along boundary wall */}
      {[[-10,0,19],[10,0,19],[-6,0,19],[6,0,19],[-3,0,19],[3,0,19]].map(([x,y,z],i)=>(
        <group key={i} position={[x,y,z] as [number,number,number]}>
          {Array.from({length:6}).map((_,j)=>(
            <mesh key={j} position={[0,0.5,0]} rotation={[0,(j/6)*Math.PI*2,0.8]}>
              <coneGeometry args={[0.08,0.9,4]} />
              <meshStandardMaterial color="#1d4a10" roughness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ══ STREET / FOOTPATH outside compound ═════════════════ */}
      <Box position={[0,0.005,24]} size={[50,0.01,6]} color="#a8a8a0" roughness={0.95} />

      {/* ══ HOUSE NAMEPLATE (glowing) ════════════════════════ */}
      <group position={[7.5, 1.4, 19.75]}>
        <Box position={[0,0,0]} size={[2.2,0.75,0.12]} color="#0a0a1a" roughness={0.2} metalness={0.9} />
        <Box position={[0,0,0.04]} size={[2.1,0.65,0.02]} color="#001a2e" roughness={0.1} metalness={0.8} />
        <Text position={[0,0.1,0.09]} fontSize={0.2} color="#00D4FF" anchorX="center" anchorY="middle">
          SADHULA RESIDENCE
        </Text>
        <Text position={[0,-0.14,0.09]} fontSize={0.1} color="#FFD700" anchorX="center" anchorY="middle">
          ✦ Vijayawada, AP ✦
        </Text>
        <pointLight position={[0, 0, 0.5]} intensity={isDay ? 0.5 : 2.5} color="#00D4FF" distance={2} />
      </group>

      {/* ══ DECORATIVE FLOATING ORBS (atmospheric) ═══════════ */}
      <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0}>
        <mesh position={[-11, 3, 10]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={3} />
        </mesh>
      </Float>
      <Float speed={2.0} floatIntensity={0.6} rotationIntensity={0}>
        <mesh position={[11, 4, 8]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={3} />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0}>
        <mesh position={[-9, 5, 5]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={3} />
        </mesh>
      </Float>
      {/* Ambient colored fill lights for drama */}
      <pointLight position={[-8, 2, 13]} intensity={isDay ? 0.2 : 1.5} color="#00D4FF" distance={10} />
      <pointLight position={[8, 2, 13]} intensity={isDay ? 0.2 : 1.5} color="#7C3AED" distance={10} />
      <pointLight position={[0, 6, 4]} intensity={isDay ? 0.3 : 2.0} color="#FFD700" distance={12} />

      {/* ══ AMBIENT / FACADE LIGHTS ════════════════════════════ */}
      {/* Under-eave strips (warm) */}
      <pointLight position={[-6, G1+0.2, 4+HD+2]} intensity={isDay?0.3:1.8} color="#ffc870" distance={8} />
      <pointLight position={[6,  G1+0.2, 4+HD+2]} intensity={isDay?0.3:1.8} color="#ffc870" distance={8} />
      {/* Ground uplights on facade */}
      <pointLight position={[-6, 0.5, 4+HD+0.5]} intensity={isDay?0:2.0} color="#ffe4a0" distance={6} />
      <pointLight position={[6,  0.5, 4+HD+0.5]} intensity={isDay?0:2.0} color="#ffe4a0" distance={6} />
    </group>
  );
}

export { TVOverlay };