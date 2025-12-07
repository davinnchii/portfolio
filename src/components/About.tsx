'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SiTypescript, SiShopify, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { FaBriefcase } from 'react-icons/fa';
import ExperienceModal from './ExperienceModal';

interface AboutProps {
  sectionRef: (el: HTMLElement | null) => void;
}

const technologies = [
  { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
  { name: 'Shopify', icon: SiShopify, color: 'text-emerald-600' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'text-zinc-900 dark:text-zinc-100' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: 'text-cyan-500' },
];

export default function About({ sectionRef }: AboutProps) {
  const t = useTranslations('about');
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen flex flex-col justify-center mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="h2 mb-8 sm:mb-12 text-center text-text-primary">
            <span className="text-text-muted font-mono body-sm">01.</span>{' '}
            {t('title')}
          </h2>
          <div className="space-y-4 sm:space-y-6 text-text-tertiary">
            <p className="body-lg">
              {t('intro')}{' '}
              <span className="font-semibold text-text-primary bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                {t('role')}
              </span>{' '}
              {t('location')}
            </p>
            <p className="body-lg">
              {t('skills')}{' '}
              <span className="font-medium text-text-secondary">
                {t('techStack')}
              </span>
              {t('maintenance')}
            </p>
            <p className="body-lg font-medium text-text-secondary mt-6 sm:mt-8">
              {t('recentTech')}
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 list-none max-w-2xl mx-auto">
              {technologies.map((tech) => {
                const Icon = tech.icon;
                return (
                  <li
                    key={tech.name}
                    className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-accent-light border border-border-accent hover:border-accent-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <Icon className={`text-2xl sm:text-3xl lg:text-4xl mb-2 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="body-sm font-medium text-text-secondary mt-1">
                      {tech.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            
            {/* Experience Button */}
            {locale === 'no' && (
            <div className="flex justify-center mt-8 sm:mt-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-text-inverse rounded-lg hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:-translate-y-1 body-sm font-medium"
              >
                <FaBriefcase className="w-4 h-4" />
                {t('experienceButton')}
              </button>
            </div>
            )}
          </div>
        </div>
      </section>
      
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

