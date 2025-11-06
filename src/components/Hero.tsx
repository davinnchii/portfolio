'use client';

import { useState, useEffect } from 'react';
import TypingText from './TypingText';
import GhostAnimation from './GhostAnimation';
// import LaptopAnimation from './LaptopAnimation';

interface HeroProps {
  isVisible: boolean;
  typingPhase: number;
  setTypingPhase: (phase: number) => void;
}

export default function Hero({ isVisible, typingPhase, setTypingPhase }: HeroProps) {
  useEffect(() => {
    // Typing animation sequence
    const typingSequence = setTimeout(() => {
      setTypingPhase(1);
      setTimeout(() => {
        setTypingPhase(2);
      }, 1000);
      setTimeout(() => {
        setTypingPhase(3);
      }, 1500);
    }, 500);
    return () => clearTimeout(typingSequence);
  }, [setTypingPhase]);

  return (
    <section
      className={`relative min-h-screen flex flex-col justify-center items-center text-center mb-32 px-4 sm:px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <GhostAnimation />
      {/* <LaptopAnimation /> */}
      
      
      <div className="relative z-10 mb-4 max-w-4xl w-full">
        {typingPhase >= 0 && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            <TypingText
              key="intro-0"
              text="Hi, my name is"
              showCursor={typingPhase === 0}
              speed={100}
            />
          </p>
        )}
        {typingPhase >= 1 && (
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
            <TypingText
              key="name-1"
              text="Ivan Zayko."
              showCursor={typingPhase === 1}
              speed={80}
            />
          </h1>
        )}
        {typingPhase >= 2 && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-zinc-700 dark:text-zinc-300">
            <TypingText
              key="tagline-2"
              text="I build things for the web."
              showCursor={typingPhase === 2}
              speed={80}
            />
          </h2>
        )}
        {typingPhase >= 3 && (
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            <TypingText
              key="description-3"
              text='Passionate about building modern, elegant web apps with React, TypeScript, and TailwindCSS.'
              speed={30}
              showCursor={false}
            />
          </p>
        )}
      </div>
      <div className="relative z-10 mt-8">
        <a
          href="#projects"
          className="inline-block px-8 py-3 border border-indigo-500 dark:border-indigo-400 rounded text-sm font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-[#0a0a0a] transition-all duration-300"
        >
          Check out my work
        </a>
      </div>
    </section>
  );
}

