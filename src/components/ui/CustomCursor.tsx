'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setRing({ x: e.clientX, y: e.clientY }), 80);
    };

    const handleDown = () => setIsClick(true);
    const handleUp = () => setIsClick(false);

    const handleOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest(
          'a, button, [role="button"], input, textarea, select, label'
        )
      ) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-custom"
        style={{ left: pos.x, top: pos.y }}
        animate={{
          width: isClick ? 8 : isHover ? 6 : 12,
          height: isClick ? 8 : isHover ? 6 : 12,
          backgroundColor: isHover ? '#F59E0B' : '#00D4FF',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{ left: ring.x, top: ring.y }}
        animate={{
          width: isClick ? 24 : isHover ? 50 : 36,
          height: isClick ? 24 : isHover ? 50 : 36,
          borderColor: isHover ? 'rgba(245,158,11,0.5)' : 'rgba(0,212,255,0.4)',
          opacity: isClick ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
}
