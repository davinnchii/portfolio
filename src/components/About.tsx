'use client';

interface AboutProps {
  sectionRef: (el: HTMLElement | null) => void;
}

export default function About({ sectionRef }: AboutProps) {
  return (
    <section
      ref={sectionRef}
      id="about"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700 text-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-100">
          <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">01.</span>{' '}
          About Me
        </h2>
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>
            Hello! I'm a frontend developer based in Norway, Telemark, specializing in building
            exceptional digital experiences using JavaScript and modern frameworks. I'm easily adaptable, 
            a quick learner, and able to thrive in fast-paced environments.
          </p>
          <p>
            I have a proven ability to create new projects from scratch using modern technologies, 
            such as React + TypeScript with TailwindCSS, as well as maintain and refactor existing 
            software by integrating new technologies and architectural improvements.
          </p>
          <p>Here are a few technologies I've been working with recently:</p>
          <ul className="grid grid-cols-2 gap-2 mt-4 list-none justify-center max-w-md mx-auto">
            <li className="flex items-center justify-center before:content-['▹'] before:text-indigo-500 dark:before:text-indigo-400 before:mr-2">
              TypeScript
            </li>
            <li className="flex items-center justify-center before:content-['▹'] before:text-indigo-500 dark:before:text-indigo-400 before:mr-2">
              Shopify
            </li>
            <li className="flex items-center justify-center before:content-['▹'] before:text-indigo-500 dark:before:text-indigo-400 before:mr-2">
              Next.js
            </li>
            <li className="flex items-center justify-center before:content-['▹'] before:text-indigo-500 dark:before:text-indigo-400 before:mr-2">
              TailwindCSS
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

