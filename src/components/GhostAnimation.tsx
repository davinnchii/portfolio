'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function GhostAnimation() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ghostPositionRef = useRef({ x: 0, y: 0 });
  const [ghostTransform, setGhostTransform] = useState({ x: 0, y: 0, scale: 1 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  // 🌫️ Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 👻 Animate ghost movement + scale
  useEffect(() => {
    const animate = () => {
      if (ghostRef.current) {
        const ghostRect = ghostRef.current.getBoundingClientRect();
        const ghostCenterX = ghostRect.left + ghostRect.width / 2;
        const ghostCenterY = ghostRect.top + ghostRect.height / 2;

        const dx = mousePosition.x - ghostCenterX;
        const dy = mousePosition.y - ghostCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const interactionRadius = window.screen.width;
        const maxMovement = 100;
        const easing = 0.1;

        let targetX = 0;
        let targetY = 0;
        let scale = 1;

        if (distance < interactionRadius && mousePosition.x > 0 && mousePosition.y > 0) {
          const intensity = 1 - distance / interactionRadius;
          targetX = dx * intensity * 0.3;
          targetY = dy * intensity * 0.3;
          targetX = Math.max(-maxMovement, Math.min(maxMovement, targetX));
          targetY = Math.max(-maxMovement, Math.min(maxMovement, targetY));
          scale = 1 + intensity * 0.05;
        }

        ghostPositionRef.current = {
          x: ghostPositionRef.current.x + (targetX - ghostPositionRef.current.x) * easing,
          y: ghostPositionRef.current.y + (targetY - ghostPositionRef.current.y) * easing,
        };

        setGhostTransform({
          x: ghostPositionRef.current.x,
          y: ghostPositionRef.current.y,
          scale,
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }
  }, [mousePosition]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black animate-bg-pan"
    >
      {/* Background subtle particles or stars (optional) */}

      <div
        ref={ghostRef}
        className="absolute top-1/3 lg:top-1/2 right-0 md:right-8 lg:right-16 opacity-50 dark:opacity-70 hidden sm:block animate-ghost-bob"
        style={{
          transform: `translate(-50%, -50%) translate(${ghostTransform.x}px, ${ghostTransform.y}px) scale(${ghostTransform.scale})`,
          filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3)) blur(1px)',
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div className="relative w-[150px] h-[175px] md:w-[200px] md:h-[233px] lg:w-[300px] lg:h-[350px]">
          <Image
            src="/ghost.png"
            alt="Floating ghost"
            fill
            className="object-contain drop-shadow-2xl select-none"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Soft glow behind ghost */}
      <div
        className="absolute rounded-full blur-3xl opacity-40 dark:opacity-60"
        style={{
          top: '50%',
          right: '8%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
}
