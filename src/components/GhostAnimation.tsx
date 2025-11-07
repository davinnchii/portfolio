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
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Detect if device has a mouse/pointer
  useEffect(() => {
    // Check for precise pointing device (mouse, trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    
    const checkMouse = () => {
      setHasMouse(mediaQuery.matches);
    };
    
    // Initial check
    checkMouse();
    
    // Listen for changes (e.g., when external mouse is connected/disconnected)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMouse);
      return () => mediaQuery.removeEventListener('change', checkMouse);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(checkMouse);
      return () => mediaQuery.removeListener(checkMouse);
    }
  }, []);

  // 🌫️ Track mouse position globally (desktop only, and only if mouse is present)
  useEffect(() => {
    if (!isDesktop || !hasMouse) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, hasMouse]);

  // 👻 Animate ghost movement + scale (desktop only, and only if mouse is present)
  useEffect(() => {
    if (!isDesktop || !hasMouse) {
      // Reset transform for mobile/tablet or touch-only devices
      setGhostTransform({ x: 0, y: 0, scale: 1 });
      return;
    }

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
    };
  }, [mousePosition, isDesktop, hasMouse]);

  return (
    <>
      {/* Desktop: Right side with cursor-reactive animation */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black animate-bg-pan hidden lg:block"
      >
        <div
          ref={isDesktop ? ghostRef : null}
          className={`absolute top-1/4 -right-4 xl:right-16 xl:top-1/2 opacity-50 dark:opacity-70 ${hasMouse ? '' : 'animate-ghost-float'}`}
          style={{
            transform: `translate(-50%, -50%) translate(${ghostTransform.x}px, ${ghostTransform.y}px) scale(${ghostTransform.scale})`,
            filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3)) blur(1px)',
            transition: hasMouse ? 'transform 0.05s ease-out' : 'none',
          }}
        >
          <div className="relative w-[200px] h-[233px] lg:w-[250px] lg:h-[292px] xl:w-[300px] xl:h-[350px]">
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

        {/* Soft glow behind ghost (desktop) */}
        <div
          className="absolute rounded-full blur-3xl opacity-40 dark:opacity-60"
          style={{
            top: '50%',
            right: '8%',
            width: 'clamp(200px, 25vw, 300px)',
            height: 'clamp(200px, 25vw, 300px)',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)',
            transform: 'translateY(-50%)',
          }}
        />
      </div>

      {/* Mobile/Tablet: Under button with static animation */}
      <div className="absolute inset-0 pointer-events-none overflow-visible lg:hidden">
        <div
          className="absolute top-[calc(50vh+15rem)] md:top-[calc(50vh+13rem)] left-1/2 -translate-x-1/2 opacity-50 dark:opacity-70 animate-ghost-float"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3)) blur(1px)',
          }}
        >
          <div className="relative w-[120px] h-[140px] sm:w-[150px] sm:h-[175px]">
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

        {/* Soft glow behind ghost (mobile/tablet) */}
        <div
          className="absolute rounded-full blur-3xl opacity-30 dark:opacity-50"
          style={{
            top: 'calc(50vh + 21rem)',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)',
          }}
        />
      </div>
    </>
  );
}
