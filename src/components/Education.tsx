'use client';

import { useTranslations } from 'next-intl';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';

export interface Education {
  period: string;
  institution: string;
  degree: string;
  description: string;
  projectId?: number;
}

interface EducationProps {
  sectionRef: (el: HTMLElement | null) => void;
  education: Education[];
  scrollToProject?: (projectId: number) => void;
}

export default function Education({ sectionRef, education, scrollToProject }: EducationProps) {
  const t = useTranslations('education');
  
  return (
    <section
      ref={sectionRef}
      id="education"
      className="min-h-screen flex flex-col justify-center mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="h2 mb-8 sm:mb-12 text-center text-text-primary">
          <span className="text-text-muted font-mono body-sm">02.</span>{' '}
          {t('title')}
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative bg-accent-light border border-border-accent rounded-lg p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:border-accent-primary hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent-primary flex items-center justify-center text-text-inverse">
                    {edu.institution.toLowerCase().includes('mate') ? (
                      <FaGraduationCap className="text-lg sm:text-xl" />
                    ) : (
                      <FaUniversity className="text-lg sm:text-xl" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="h4 text-text-primary mb-1">
                        {edu.degree}
                      </h3>
                      <p className="body-text font-medium text-accent-primary">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="body-sm font-medium text-text-secondary bg-accent-light px-3 py-1 rounded-full whitespace-nowrap">
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-text-tertiary body-text mb-4">
                    {edu.description}
                  </p>
                  {edu.projectId && scrollToProject && (
                    <button
                      onClick={() => scrollToProject(edu.projectId!)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary text-text-inverse rounded-lg hover:bg-accent-hover transition-colors duration-200 body-sm font-medium"
                    >
                      {t('viewProject')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

