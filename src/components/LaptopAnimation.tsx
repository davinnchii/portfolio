'use client';

import { useEffect, useRef, useState } from 'react';

export default function LaptopAnimation() {
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const codeSnippets = [
    'const portfolio = {',
    '  name: "Ivan Zayko",',
    '  role: "Frontend Developer",',
    '  skills: ["React", "TypeScript", "Next.js"],',
    '  build: () => "amazing web apps"',
    '};',
  ];

  const currentLine = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animate = () => {
      if (currentLine.current < codeSnippets.length) {
        setCodeLines(codeSnippets.slice(0, currentLine.current + 1));
        currentLine.current += 1;
      }
    };

    intervalRef.current = setInterval(animate, 800);

    // ✅ Clean up on unmount or remount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-0 md:left-8 lg:left-16 -translate-y-1/2 opacity-90 dark:opacity-80 animate-fade-in hidden lg:block">
        <svg
          width="400"
          height="280"
          viewBox="0 0 400 280"
          className="drop-shadow-2xl w-[200px] h-[140px] md:w-[300px] md:h-[210px] lg:w-[400px] lg:h-[280px]"
        >
          <defs>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <filter id="laptopGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Laptop base */}
          <rect
            x="20"
            y="180"
            width="360"
            height="20"
            rx="4"
            fill="#2a2a2a"
            className="dark:fill-zinc-800"
            filter="url(#laptopGlow)"
          />

          {/* Keyboard area */}
          <rect
            x="30"
            y="200"
            width="340"
            height="60"
            rx="4"
            fill="#1a1a1a"
            className="dark:fill-zinc-900"
          />

          {/* Trackpad */}
          <ellipse
            cx="200"
            cy="230"
            rx="40"
            ry="15"
            fill="#0f0f0f"
            className="dark:fill-zinc-950"
          />

          {/* Screen bezel */}
          <rect
            x="0"
            y="0"
            width="400"
            height="200"
            rx="8"
            fill="#2a2a2a"
            className="dark:fill-zinc-800"
            filter="url(#laptopGlow)"
          />

          {/* Screen inner bezel */}
          <rect
            x="15"
            y="15"
            width="370"
            height="170"
            rx="4"
            fill="#000000"
          />

          {/* Screen content area */}
          <foreignObject x="25" y="25" width="350" height="150">
            <div
              className="w-full h-full bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] p-2 md:p-4 font-mono text-[8px] md:text-[10px] lg:text-xs overflow-hidden"
              style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
            >
              <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                <div className="flex gap-0.5 md:gap-1.5">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-zinc-500 text-[8px] md:text-[10px]">portfolio.ts</span>
              </div>
              <div className="space-y-0.5 md:space-y-1">
                {codeLines.map((line, index) => (
                  <div
                    key={index}
                    className="text-green-400"
                    style={{
                      animation: 'code-fade-in 0.4s ease-out',
                      animationFillMode: 'both',
                    }}
                  >
                    <span className="text-zinc-500 mr-2">{index + 1}</span>
                    {line}
                  </div>
                ))}
                {codeLines.length > 0 && codeLines.length < codeSnippets.length && (
                  <div className="text-green-400">
                    <span className="text-zinc-500 mr-2">{codeLines.length + 1}</span>
                    <span className="animate-pulse">|</span>
                  </div>
                )}
              </div>
            </div>
          </foreignObject>

          {/* Screen glow effect */}
          <rect
            x="15"
            y="15"
            width="370"
            height="170"
            rx="4"
            fill="none"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="1"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}

