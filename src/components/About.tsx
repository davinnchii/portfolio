'use client';

import { SiTypescript, SiShopify, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

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
  return (
    <section
      ref={sectionRef}
      id="about"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">01.</span>{' '}
          About Me
        </h2>
        <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p className="text-lg sm:text-xl">
            Hello! I'm a{' '}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              frontend developer
            </span>{' '}
            based in Norway, Telemark, specializing in building exceptional digital experiences using 
            JavaScript and modern frameworks. I'm easily adaptable, a quick learner, and thrive in 
            fast-paced environments.
          </p>
          <p className="text-lg sm:text-xl">
            I have a proven ability to create new projects from scratch using modern technologies, 
            such as{' '}
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              React + TypeScript with TailwindCSS
            </span>
            , as well as maintain and refactor existing software by integrating new technologies 
            and architectural improvements.
          </p>
          <p className="text-lg sm:text-xl font-medium text-zinc-800 dark:text-zinc-200 mt-8">
            Here are a few technologies I've been working with recently:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 list-none max-w-2xl mx-auto">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <li
                  key={tech.name}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  <Icon className={`text-3xl sm:text-4xl mb-2 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                    {tech.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

