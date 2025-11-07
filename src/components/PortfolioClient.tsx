'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EducationComponent from '@/components/Education';
import ProjectsComponent, { type ProjectsRef } from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
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
  const tContact = useTranslations('contact');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [typingPhase, setTypingPhase] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroObserverRef = useRef<IntersectionObserver | null>(null);
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

  // Observe hero section once ref is set
  useEffect(() => {
    // Use setTimeout to ensure ref is set after render
    const timeoutId = setTimeout(() => {
      if (!heroRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              if (id === 'hero') {
                setActiveSection('hero');
              }
            }
          });
        },
        { threshold: 0.3, rootMargin: '0px 0px -200px 0px' }
      );

      heroObserverRef.current = observer;
      const heroElement = heroRef.current;
      observer.observe(heroElement);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (heroObserverRef.current && heroRef.current) {
        heroObserverRef.current.unobserve(heroRef.current);
        heroObserverRef.current = null;
      }
    };
  }, []);

  // Keyboard navigation for section-to-section scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const sectionIds = ['hero', 'about', 'education', 'projects', 'contact'];
      let currentIndex = sectionIds.indexOf(activeSection);
      
      // If activeSection is not in the list, determine based on scroll position
      if (currentIndex === -1) {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        if (scrollY < heroHeight * 0.5) {
          currentIndex = 0; // hero
        } else {
          currentIndex = 1; // about
        }
      }

      // Special handling for projects section
      if (activeSection === 'projects' && projectsRef.current) {
        const currentSlideIndex = projectsRef.current.getCurrentSlideIndex();
        const totalSlides = projectsRef.current.getTotalSlides();
        const isLastSlide = currentSlideIndex === totalSlides - 1;
        const isFirstSlide = currentSlideIndex === 0;

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          e.stopPropagation();
          
          // Only allow scrolling to contact if we're on the last slide
          if (isLastSlide) {
            scrollToSection('contact');
            return;
          }
          // Otherwise, navigate to next slide in carousel
          projectsRef.current?.slideNext();
          return;
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          e.stopPropagation();
          
          // Only allow scrolling to education if we're on the first slide
          if (isFirstSlide) {
            scrollToSection('education');
            return;
          }
          // Otherwise, navigate to previous slide in carousel
          projectsRef.current?.slidePrev();
          return;
        }
        // For other keys (Home, End), still handle them
      }

      // Normal section-to-section navigation for non-projects sections
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < sectionIds.length - 1) {
          if (sectionIds[currentIndex + 1] === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToSection(sectionIds[currentIndex + 1]);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          if (sectionIds[currentIndex - 1] === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollToSection(sectionIds[currentIndex - 1]);
          }
        } else {
          // Scroll to top/hero section
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection('contact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Scroll listener to detect when scrolling back to hero section (at the very top)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // If we're at or near the top of the page, set hero as active
      // This handles cases where IntersectionObserver might not trigger immediately
      if (scrollY < 100) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-white dark:bg-transparent text-[#0a0a0a] dark:text-[#ededed] scroll-smooth">
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
            <div className="h5 font-semibold">{t('portfolio')}</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="body-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="body-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors duration-200"
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
            sectionRef={(el) => {
              heroRef.current = el;
            }}
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
            scrollToContact={() => scrollToSection('contact')}
          />

          {/* Footer */}
          <footer
            id="contact"
            ref={(el) => {
              sectionsRef.current[3] = el;
            }}
            className="pt-12 sm:pt-16 border-t border-zinc-200 dark:border-zinc-800 snap-start opacity-0 translate-y-8 transition-all duration-700"
          >
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <h3 className="h4 text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 text-center">
                {tContact('title')}
              </h3>
              <ContactForm />
            </div>
            <div className="text-center body-sm text-zinc-600 dark:text-zinc-400 mt-8 sm:mt-12">
              <p>{tFooter('designed')}</p>
              <p className="mt-2">© {new Date().getFullYear()}</p>
            </div>
          </footer>
        </Container>
      </main>
    </div>
  );
}

