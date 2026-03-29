/**
 * ScrollScene.tsx
 *
 * A `position: fixed` 3D canvas that covers the entire viewport.
 * Scroll progress is read directly from `window.scrollY` inside `useFrame`
 * (Lenis continuously updates the native scroll position each RAF tick, so
 * this is always accurate without needing a separate scroll listener).
 *
 * Architecture rationale – why NOT Drei's <ScrollControls>:
 *   ScrollControls creates its own overflow scroll container, which directly
 *   conflicts with Lenis's smooth‑scroll driver and breaks the existing HTML
 *   layout. Reading window.scrollY in useFrame is semantically identical and
 *   has zero conflicts.
 *
 * Performance targets:
 *   - dpr capped at [1, 1.5]
 *   - MeshTransmissionMaterial limited to ≤2 objects, samples=4
 *   - All geometry is low-poly (torusGeometry ≤80 segments)
 *   - Particles: 350 points (pointsMaterial – GPU-cheap)
 *   - pointerEvents: none → no hit-testing overhead
 */

import React, { useRef, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────
const RING_COUNT   = 22;
const RING_SPACING = 5.5;           // units between each ring along Z
const CAM_Z_START  = 8;
const CAM_Z_END    = -(RING_COUNT * RING_SPACING + 8);   // flies past all rings

// ─── Mouse tracker (passive, no React state → zero re-renders) ───────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return mouse;
}

// ─── Camera rig ───────────────────────────────────────────────────────────────
// Reads window.scrollY each frame (safe with Lenis – it writes to scrollY on
// every RAF). Lerps camera Z toward the target for cinematic inertia.
const CameraRig: React.FC<{
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}> = ({ mouse }) => {
  const { camera } = useThree();
  const currentZ = useRef<number>(CAM_Z_START);
  const lookTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    const max      = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, window.scrollY / max);
    const targetZ  = THREE.MathUtils.lerp(CAM_Z_START, CAM_Z_END, progress);

    // Smooth Z flythrough (lag = cinematic weight)
    currentZ.current += (targetZ - currentZ.current) * 0.06;
    camera.position.z  = currentZ.current;

    // Mouse-driven XY parallax
    camera.position.x += (mouse.current.x * 1.4 - camera.position.x) * 0.045;
    camera.position.y += (mouse.current.y * 0.9 - camera.position.y) * 0.045;

    // Look slightly ahead with subtle tilt from mouse
    lookTarget.current.set(
      camera.position.x * 0.25,
      camera.position.y * 0.25,
      currentZ.current - 10,
    );
    camera.lookAt(lookTarget.current);
  });

  return null;
};

// ─── Tunnel ring ─────────────────────────────────────────────────────────────
const RING_COLORS = ['#312e81', '#4338ca', '#5b21b6', '#6d28d9', '#1e1b4b'];

interface TunnelRingProps { z: number; idx: number; inner?: boolean }

const TunnelRing: React.FC<TunnelRingProps> = ({ z, idx, inner = false }) => {
  const ref  = useRef<THREE.Mesh>(null!);
  const baseR = idx % 3 === 0 ? Math.PI * 0.15 : idx % 3 === 1 ? Math.PI * 0.05 : 0;
  const spin  = 0.08 + (idx % 7) * 0.012;
  const color = RING_COLORS[idx % RING_COLORS.length];
  const radius = inner ? 1.6 : 2.6 + (idx % 4) * 0.3;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = baseR + clock.getElapsedTime() * spin;
  });

  return (
    <mesh ref={ref} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, inner ? 0.025 : 0.04, 16, 80]} />
      <meshStandardMaterial
        color={color}
        metalness={0.92}
        roughness={0.08}
        emissive={color}
        emissiveIntensity={0.35}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

// ─── Glass octahedron (premium accent) ───────────────────────────────────────
interface GlassAccentProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

const GlassAccent: React.FC<GlassAccentProps> = ({ position, scale = 0.55, speed = 1 }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.rotation.x = t * 0.14;
    ref.current.rotation.y = t * 0.09;
    ref.current.rotation.z = t * 0.06;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        samples={4}
        thickness={0.4}
        chromaticAberration={0.1}
        roughness={0.0}
        transmission={0.97}
        color="#060618"
        iridescence={1}
        iridescenceIOR={2.2}
        iridescenceThicknessRange={[0, 1400]}
        envMapIntensity={2.5}
        backside
      />
    </mesh>
  );
};

// ─── Metallic floating torus (non-transmission — cheap) ──────────────────────
interface FloatingTorusProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}
const FloatingTorus: React.FC<FloatingTorusProps> = ({ position, scale = 0.7, color = '#4338ca' }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const rot = useRef<[number, number, number]>([
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0,
  ]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = rot.current[0] + t * 0.11;
    ref.current.rotation.y = rot.current[1] + t * 0.07;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.32, 18, 60]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.07}
        envMapIntensity={2}
      />
    </mesh>
  );
};

// ─── Particle stream ─────────────────────────────────────────────────────────
const Particles: React.FC<{ count?: number }> = ({ count = 350 }) => {
  const ref = useRef<THREE.Points>(null!);
  const depth = Math.abs(CAM_Z_END) + 20;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = -(Math.random() * depth);
    }
    return arr;
  }, [count, depth]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#818cf8"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
const Scene: React.FC = () => {
  const mouse = useMouse();

  return (
    <>
      <CameraRig mouse={mouse} />

      {/* Lighting */}
      <ambientLight intensity={0.12} color="#12122a" />
      <directionalLight position={[4, 6, 4]}    intensity={0.7} color="#818cf8" />
      <directionalLight position={[-4, -4, 2]}  intensity={0.3} color="#a78bfa" />
      {/* Moving spotlight beams through tunnel */}
      <pointLight position={[0, 0,  -20]} intensity={4} color="#4338ca" distance={28} decay={2} />
      <pointLight position={[0, 0,  -55]} intensity={5} color="#5b21b6" distance={30} decay={2} />
      <pointLight position={[0, 0,  -90]} intensity={4} color="#4338ca" distance={28} decay={2} />

      {/* HDR environment – reflections only, no visible sky */}
      <Environment preset="night" />

      {/* ── Tunnel rings (outer) ── */}
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <TunnelRing key={`outer-${i}`} z={-(i * RING_SPACING)} idx={i} />
      ))}

      {/* ── Tunnel rings (inner, offset by half-spacing) ── */}
      {Array.from({ length: RING_COUNT }, (_, i) => (
        <TunnelRing
          key={`inner-${i}`}
          z={-(i * RING_SPACING + RING_SPACING * 0.5)}
          idx={i + 5}
          inner
        />
      ))}

      {/* ── Glass accent objects scattered through tunnel ── */}
      <GlassAccent position={[ 2.8,  1.2, -12]}  scale={0.5}  speed={1.1} />
      <GlassAccent position={[-2.5, -1.4, -38]}  scale={0.65} speed={0.8} />
      <GlassAccent position={[ 1.8,  2.2, -68]}  scale={0.45} speed={1.3} />
      <GlassAccent position={[-3.0,  0.8, -98]}  scale={0.6}  speed={0.9} />

      {/* ── Metallic floating tori off-axis ── */}
      <FloatingTorus position={[-3.5,  2,  -25]} scale={0.55} color="#6d28d9" />
      <FloatingTorus position={[ 3.2, -1.5, -50]} scale={0.7}  color="#4338ca" />
      <FloatingTorus position={[-2.0, -2.5, -80]} scale={0.5}  color="#5b21b6" />

      {/* ── Particles ── */}
      <Particles count={350} />
    </>
  );
};

// ─── Exported component ───────────────────────────────────────────────────────
const ScrollScene: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',   // HTML stays fully interactive
    }}
  >
    <Canvas
      camera={{ position: [0, 0, CAM_Z_START], fov: 55, near: 0.1, far: 300 }}
      gl={{
        antialias: true,
        alpha: true,             // transparent → body bg-slate-950 shows through
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}             // cap DPR for mobile perf
    >
      <Scene />
    </Canvas>
  </div>
);

export default ScrollScene;
