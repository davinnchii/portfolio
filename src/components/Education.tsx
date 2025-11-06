'use client';

import { useTranslations } from 'next-intl';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';

export interface Education {
  period: string;
  institution: string;
  degree: string;
  description: string;
}

interface EducationProps {
  sectionRef: (el: HTMLElement | null) => void;
  education: Education[];
}

export default function Education({ sectionRef, education }: EducationProps) {
  const t = useTranslations('education');
  
  return (
    <section
      ref={sectionRef}
      id="education"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">02.</span>{' '}
          {t('title')}
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-indigo-500 dark:bg-indigo-400 flex items-center justify-center text-white">
                    {edu.institution.toLowerCase().includes('mate') ? (
                      <FaGraduationCap className="text-xl" />
                    ) : (
                      <FaUniversity className="text-xl" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-base font-medium text-indigo-600 dark:text-indigo-400">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

