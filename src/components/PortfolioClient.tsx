'use client';

import { useEffect, useState, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EducationComponent from '@/components/Education';
import SkillsComponent from '@/components/Skills';
import ProjectsComponent from '@/components/Projects';
import Container from '@/components/Container';
import type { Education } from '@/components/Education';
import type { TechSkill } from '@/components/Skills';
import type { Project } from '@/components/Projects';
import { SidebarNav } from './SidebarNav';

interface PortfolioClientProps {
  projects: Project[];
  education: Education[];
  techSkills: TechSkill[];
}

export default function PortfolioClient({ projects, education, techSkills }: PortfolioClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [typingPhase, setTypingPhase] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for scroll animations and active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');

            // Update active section for sidebar navigation
            const id = entry.target.getAttribute('id');
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -200px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#ededed]">
      {/* Sidebar Navigation - Brittany Style */}
      <SidebarNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 md:hidden">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="text-xl font-semibold">Portfolio</div>
            <div className="flex gap-4 text-sm">
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
              >
                Work
              </button>
            </div>
          </div>
        </Container>
      </nav>

      <main className="md:ml-20 pt-24 pb-20">
        <Container>
          <Hero
            isVisible={isVisible}
            typingPhase={typingPhase}
            setTypingPhase={setTypingPhase}
          />

          <About
            sectionRef={(el) => {
              sectionsRef.current[0] = el;
            }}
          />

          <EducationComponent
            sectionRef={(el) => {
              sectionsRef.current[1] = el;
            }}
            education={education}
          />

          <SkillsComponent
            sectionRef={(el) => {
              sectionsRef.current[2] = el;
            }}
            techSkills={techSkills}
          />

          <ProjectsComponent
            sectionRef={(el) => {
              sectionsRef.current[3] = el;
            }}
            projects={projects}
          />

          {/* Footer */}
          <footer className="text-center text-sm text-zinc-600 dark:text-zinc-400 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <p>Designed & Built by You</p>
            <p className="mt-2">© {new Date().getFullYear()}</p>
          </footer>
        </Container>
      </main>
    </div>
  );
}

