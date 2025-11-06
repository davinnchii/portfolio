'use client';

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
  return (
    <section
      ref={sectionRef}
      id="education"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700 text-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">02.</span>{' '}
          Education
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-zinc-300 dark:bg-zinc-700 -translate-x-1/2"></div>
          <div className="space-y-12 relative">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative transition-all duration-500 hover:translate-y-1"
              >
                <div className="absolute left-1/2 top-1 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400 -translate-x-1/2 -translate-y-1"></div>
                <div className="pt-4">
                  <div className="text-sm text-zinc-500 dark:text-zinc-500 mb-1">
                    {edu.period}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

