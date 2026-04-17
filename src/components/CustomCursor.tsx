import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const auraRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Raw mouse position (dot follows immediately)
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    if (!dot || !ring || !aura) return;

    // QuickSetters for maximum perf
    const setDotX  = gsap.quickSetter(dot,  'x', 'px');
    const setDotY  = gsap.quickSetter(dot,  'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');
    const setAuraX = gsap.quickSetter(aura, 'x', 'px');
    const setAuraY = gsap.quickSetter(aura, 'y', 'px');

    let mouse  = { x: 0, y: 0 };
    let ring_  = { x: 0, y: 0 };
    let aura_  = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Dot is instant
      setDotX(mouse.x);
      setDotY(mouse.y);
    };
    window.addEventListener('mousemove', onMove);

    // Tick: ring at 0.15 lerp, aura at 0.06 lerp
    const tick = () => {
      ring_.x += (mouse.x - ring_.x) * 0.15;
      ring_.y += (mouse.y - ring_.y) * 0.15;
      setRingX(ring_.x);
      setRingY(ring_.y);

      aura_.x += (mouse.x - aura_.x) * 0.06;
      aura_.y += (mouse.y - aura_.y) * 0.06;
      // Offset so the 500px orb is centered on the cursor
      setAuraX(aura_.x - 250);
      setAuraY(aura_.y - 250);
    };
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      {/* Magnetic aura orb — z-index 0, behind everything */}
      <div ref={auraRef} className="cursor-aura" />

      {/* Ring follower */}
      <div
        ref={ringRef}
        className="custom-cursor-follower"
        style={{ left: 0, top: 0 }}
      />

      {/* Dot — on top */}
      <div
        ref={dotRef}
        className="custom-cursor"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;
