/**
 * HeroScene.tsx
 * Lazy-loaded 3D background for the Hero section.
 * Uses @react-three/fiber + @react-three/drei with React 18 Suspense.
 *
 * Design: Dark cinematic scene with floating dark-glass geometries,
 * metallic rings and subtle mouse-parallax via useFrame.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Environment,
  Float,
} from '@react-three/drei';
import * as THREE from 'three';

// ─── Mouse tracker (normalised -1 → +1) ──────────────────────────────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return mouse;
}

// ─── Dark glass torus knot ────────────────────────────────────────────────────
const GlassTorusKnot: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.x = t * 0.12 + mouse.current.y * 0.15;
    meshRef.current.rotation.y = t * 0.18 + mouse.current.x * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, -2]} scale={[1.6, 1.6, 1.6]}>
        <torusKnotGeometry args={[1, 0.32, 200, 32, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.5}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.1}
          iridescence={0.5}
          iridescenceIOR={1.2}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0.05}
          color="#0a0a14"
          transmission={0.97}
          reflectivity={0.6}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

// ─── Metallic floating ring ───────────────────────────────────────────────────
interface RingProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  color: string;
}

const MetallicRing: React.FC<RingProps> = ({ position, rotation, scale, speed, mouse, color }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.x = rotation[0] + t * speed * 0.7 + mouse.current.y * 0.08;
    meshRef.current.rotation.y = rotation[1] + t * speed + mouse.current.x * 0.08;
    meshRef.current.rotation.z = rotation[2] + t * speed * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.04, 24, 120]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.08}
        envMapIntensity={2}
      />
    </mesh>
  );
};

// ─── Floating glass lens / disc ───────────────────────────────────────────────
const GlassDisc: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.position.x = Math.sin(t * 0.3) * 0.4 + mouse.current.x * 0.25;
    meshRef.current.position.y = Math.cos(t * 0.25) * 0.2 + mouse.current.y * 0.2;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <Float speed={0.8} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[3.5, -1.5, -3]} scale={[1.4, 1.4, 0.12]}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={4}
          thickness={0.2}
          chromaticAberration={0.12}
          roughness={0.0}
          transmission={0.98}
          color="#060613"
          iridescence={1}
          iridescenceIOR={2.5}
          iridescenceThicknessRange={[0, 1200]}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
};

// ─── Particle field ───────────────────────────────────────────────────────────
const ParticleField: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 280;

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.025 + mouse.current.x * 0.04;
    pointsRef.current.rotation.x = mouse.current.y * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7c8aff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
};

// ─── Camera parallax ─────────────────────────────────────────────────────────
const CameraRig: React.FC<{ mouse: React.MutableRefObject<{ x: number; y: number }> }> = ({ mouse }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.035;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// ─── Scene root ──────────────────────────────────────────────────────────────
const Scene: React.FC = () => {
  const mouse = useMouse();

  return (
    <>
      <CameraRig mouse={mouse} />

      {/* Ambient & Directional lights */}
      <ambientLight intensity={0.15} color="#1a1a3a" />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#7c8aff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color="#a78bfa" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#312e81" distance={12} />

      {/* HDR environment for reflections (minimal, no visible background) */}
      <Environment preset="night" />

      {/* 3D objects */}
      <GlassTorusKnot mouse={mouse} />

      <MetallicRing
        position={[-4.2, 1.8, -4]}
        rotation={[Math.PI * 0.3, 0.4, 0]}
        scale={1.9}
        speed={0.22}
        mouse={mouse}
        color="#4338ca"
      />
      <MetallicRing
        position={[4.5, -1.2, -5]}
        rotation={[Math.PI * 0.1, 0.8, 0.5]}
        scale={2.4}
        speed={0.16}
        mouse={mouse}
        color="#6d28d9"
      />
      <MetallicRing
        position={[-1, -3, -3.5]}
        rotation={[0.8, Math.PI * 0.2, 0.2]}
        scale={1.2}
        speed={0.3}
        mouse={mouse}
        color="#312e81"
      />

      <GlassDisc mouse={mouse} />

      <ParticleField mouse={mouse} />
    </>
  );
};

// ─── Exported Canvas shell ────────────────────────────────────────────────────
const HeroScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,            // transparent canvas → dark site bg shows through
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}            // cap pixel-ratio for perf
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',  // text/buttons stay clickable
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default HeroScene;
