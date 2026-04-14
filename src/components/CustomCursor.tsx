import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(followCursor);
    };

    const animationId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationId);
  }, [position]);

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className="custom-cursor-follower" 
        style={{ left: `${followerPosition.x}px`, top: `${followerPosition.y}px` }} 
      />
    </>
  );
};

export default CustomCursor;
