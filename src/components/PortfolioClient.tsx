'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EducationComponent from '@/components/Education';
import ProjectsComponent, { type ProjectsRef } from '@/components/Projects';
import Container from '@/components/Container';
import type { Education } from '@/components/Education';
import type { Project } from '@/components/Projects';
import { SidebarNav } from './SidebarNav';
import LanguageSwitcher from './LanguageSwitcher';

interface PortfolioClientProps {
  projects: Project[];
  education: Education[];
}

export default function PortfolioClient({ projects, education }: PortfolioClientProps) {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [typingPhase, setTypingPhase] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const projectsRef = useRef<ProjectsRef>(null);

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

  const scrollToProject = (projectId: number) => {
    scrollToSection('projects');
    // Small delay to ensure the section is scrolled before changing the project
    setTimeout(() => {
      projectsRef.current?.goToProject(projectId);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-[#0a0a0a] dark:text-[#ededed]">
      {/* Sidebar Navigation - Brittany Style */}
      <SidebarNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      {/* Language Switcher - Desktop */}
      <div className="fixed top-6 right-6 z-50 hidden md:block">
        <LanguageSwitcher />
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/40 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50 md:hidden">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="text-xl font-semibold">{t('portfolio')}</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
              >
                {t('projects')}
              </button>
              <LanguageSwitcher />
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
            scrollToProject={scrollToProject}
          />

          <ProjectsComponent
            ref={projectsRef}
            sectionRef={(el) => {
              sectionsRef.current[2] = el;
            }}
            projects={projects}
          />

          {/* Footer */}
          <footer className="text-center text-sm text-zinc-600 dark:text-zinc-400 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <p>{tFooter('designed')}</p>
            <p className="mt-2">© {new Date().getFullYear()}</p>
          </footer>
        </Container>
      </main>
    </div>
  );
}

