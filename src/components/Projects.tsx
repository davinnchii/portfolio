'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link?: string;
  github?: string;
}

interface ProjectsProps {
  sectionRef: (el: HTMLElement | null) => void;
  projects: Project[];
}

export default function Projects({ sectionRef, projects }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700 text-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
            <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">04.</span>{' '}
            Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Here are some of the projects I've worked on.
          </p>
        </div>

        {/* Project Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeProject === index
                  ? 'bg-indigo-500 dark:bg-indigo-400 text-white dark:text-[#0a0a0a]'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {String(index + 1).padStart(2, '0')} / {project.title}
            </button>
          ))}
        </div>

        {/* Active Project Display */}
        <div className="relative min-h-[500px]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-500 ${
                activeProject === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8 border border-zinc-200 dark:border-zinc-800">
                {/* Project Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                      <span className="text-zinc-400 dark:text-zinc-600 text-sm">
                        No preview available
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Project Details */}
                <div className="flex flex-col justify-center text-left">
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        View Project →
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

