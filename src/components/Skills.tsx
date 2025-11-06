'use client';

export interface TechSkill {
  category: string;
  skills: string[];
}

interface SkillsProps {
  sectionRef: (el: HTMLElement | null) => void;
  techSkills: TechSkill[];
}

export default function Skills({ sectionRef, techSkills }: SkillsProps) {
  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700 text-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">03.</span>{' '}
          Tech Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techSkills.map((skillGroup, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

