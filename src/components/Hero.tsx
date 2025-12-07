'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TypingText from './TypingText';
import GhostAnimation from './GhostAnimation';
// import LaptopAnimation from './LaptopAnimation';

interface HeroProps {
  isVisible: boolean;
  typingPhase: number;
  setTypingPhase: (phase: number) => void;
  sectionRef?: (el: HTMLElement | null) => void;
}

export default function Hero({ isVisible, typingPhase, setTypingPhase, sectionRef }: HeroProps) {
  const t = useTranslations('hero');
  
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
      ref={sectionRef}
      id="hero"
      className={`relative min-h-screen flex flex-col justify-center items-center text-center mb-32 px-4 sm:px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <GhostAnimation />
      {/* <LaptopAnimation /> */}
      
      
      <div className="relative z-10 mb-4 max-w-4xl w-full">
        {typingPhase >= 0 && (
          <p className="body-lg text-text-tertiary mb-2">
            <TypingText
              key="intro-0"
              text={t('greeting')}
              showCursor={typingPhase === 0}
              speed={100}
            />
          </p>
        )}
        {typingPhase >= 1 && (
          <h1 className="h1 mb-4 bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            <TypingText
              key="name-1"
              text={t('name')}
              showCursor={typingPhase === 1}
              speed={80}
            />
          </h1>
        )}
        {typingPhase >= 2 && (
          <h2 className="h2 mb-6 text-text-secondary">
            <TypingText
              key="tagline-2"
              text={t('tagline')}
              showCursor={typingPhase === 2}
              speed={80}
            />
          </h2>
        )}
        {typingPhase >= 3 && (
          <p className="body-lg text-text-tertiary max-w-2xl mx-auto">
            <TypingText
              key="description-3"
              text={t('description')}
              speed={30}
              showCursor={false}
            />
          </p>
        )}
      </div>
      <div className="relative z-10 mt-8 flex flex-col items-center">
        <a
          href="#projects"
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border border-accent-primary rounded body-sm font-medium hover:bg-accent-primary hover:text-text-inverse transition-all duration-300"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  );
}

