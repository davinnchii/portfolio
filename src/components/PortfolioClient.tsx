'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Hero from '@/components/Hero';
import About from '@/components/About';
import EducationComponent from '@/components/Education';
import ProjectsComponent, { type ProjectsRef } from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
import Container from '@/components/Container';
import TestimonialsComponent from '@/components/Testimonials';
import type { Education } from '@/components/Education';
import type { Project } from '@/components/Projects';
import type { Testimonial } from '@/components/Testimonials';
import { SidebarNav } from './SidebarNav';
import LanguageSwitcher from './LanguageSwitcher';

interface PortfolioClientProps {
  projects: Project[];
  education: Education[];
  testimonials?: Testimonial[];
}

export default function PortfolioClient({ projects, education, testimonials }: PortfolioClientProps) {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tContact = useTranslations('contact');
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [typingPhase, setTypingPhase] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroObserverRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const projectsRef = useRef<ProjectsRef>(null);

  const hasTestimonials = locale === 'no' && testimonials && testimonials.length > 0;

  useEffect(() => {
    setIsVisible(true);

    // Detect if we're on mobile Safari
    const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // More lenient threshold for mobile Safari
    const threshold = isMobileSafari ? 0.1 : 0.3;
    const rootMargin = isMobileSafari ? '0px 0px -50px 0px' : '0px 0px -200px 0px';

    // Track sections that have been animated by IntersectionObserver
    const animatedSections = new Set<HTMLElement>();

    // Intersection Observer for scroll animations and active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Mark as animated
            animatedSections.add(entry.target as HTMLElement);
            
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
      { threshold, rootMargin }
    );

    // Function to observe all sections
    const observeSections = () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });
    };

    // Initial observation
    observeSections();

    // Re-observe sections after a delay to catch any that were set late
    const timeoutId = setTimeout(() => {
      observeSections();
    }, 100);

    // Fallback for mobile Safari: only trigger if IntersectionObserver hasn't worked after delay
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollFallback = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sectionsRef.current.forEach((section) => {
          if (section && !animatedSections.has(section)) {
            const rect = section.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport && section.classList.contains('opacity-0')) {
              // Only apply fallback if IntersectionObserver hasn't handled it
              section.classList.add('opacity-100', 'translate-y-0');
              section.classList.remove('opacity-0', 'translate-y-8');
            }
          }
        });
      }, 150);
    };

    if (isMobileSafari) {
      // Only start fallback after IntersectionObserver has had time to work
      const fallbackDelay = setTimeout(() => {
        window.addEventListener('scroll', handleScrollFallback, { passive: true });
      }, 1000); // Give IntersectionObserver 1 second to work first

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(scrollTimeout);
        clearTimeout(fallbackDelay);
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
        window.removeEventListener('scroll', handleScrollFallback);
      };
    }

    return () => {
      clearTimeout(timeoutId);
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

      const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const threshold = isMobileSafari ? 0.1 : 0.3;
      const rootMargin = isMobileSafari ? '0px 0px -50px 0px' : '0px 0px -200px 0px';

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
        { threshold, rootMargin }
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

  // Fallback: Ensure sections become visible on mobile Safari (only as last resort)
  useEffect(() => {
    const isMobileSafari = /iPhone|iPad|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (!isMobileSafari) return;

    // Only check after IntersectionObserver has had plenty of time to work
    // This ensures animations still play via IntersectionObserver
    const checkVisibility = () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight * 0.5;
          // Only apply fallback if section is still invisible after IntersectionObserver should have triggered
          if (isInViewport && section.classList.contains('opacity-0')) {
            section.classList.add('opacity-100', 'translate-y-0');
            section.classList.remove('opacity-0', 'translate-y-8');
          }
        }
      });
    };

    // Only check after delays (not immediately) to let IntersectionObserver work first
    const timeout1 = setTimeout(checkVisibility, 1500); // After IntersectionObserver has had time
    const timeout2 = setTimeout(checkVisibility, 3000); // Final fallback

    // Also check on scroll, but only after initial delay
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkVisibility, 200);
    };

    const scrollDelay = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 1500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(scrollTimeout);
      clearTimeout(scrollDelay);
      window.removeEventListener('scroll', handleScroll);
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

      const sectionIds = hasTestimonials
        ? ['hero', 'about', 'education', 'projects', 'testimonials', 'contact']
        : ['hero', 'about', 'education', 'projects', 'contact'];
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

      // Special handling for projects section (only on desktop with Swiper)
      if (activeSection === 'projects' && projectsRef.current) {
        // Check if Swiper is actually available (desktop only)
        // On mobile, isAtEnd() and isAtBeginning() both return false when Swiper isn't available
        const isAtEnd = projectsRef.current.isAtEnd();
        const isAtBeginning = projectsRef.current.isAtBeginning();
        const currentSlideIndex = projectsRef.current.getCurrentSlideIndex();
        const totalSlides = projectsRef.current.getTotalSlides();

        // Only do special handling if Swiper is active
        // On mobile (no Swiper), both isAtEnd and isAtBeginning will be false
        // and currentSlideIndex will be 0, so we check if we're actually at a boundary
        const hasSwiper = (isAtEnd || isAtBeginning) || (currentSlideIndex > 0 && currentSlideIndex < totalSlides - 1);

        if (hasSwiper) {
          const isLastSlide = currentSlideIndex === totalSlides - 1;
          const isFirstSlide = currentSlideIndex === 0;

          if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            e.stopPropagation();

            // Don't scroll to next section - just stay on the last slide
            if (isLastSlide) {
              // Stay on current slide, don't scroll
              return;
            }
            // Otherwise, navigate to next slide in carousel
            projectsRef.current?.slideNext();
            return;
          } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            e.stopPropagation();

            // Don't scroll to previous section - just stay on the first slide
            if (isFirstSlide) {
              // Stay on current slide, don't scroll
              return;
            }
            // Otherwise, navigate to previous slide in carousel
            projectsRef.current?.slidePrev();
            return;
          }
        }
        // For other keys (Home, End) or if Swiper isn't available, fall through to normal navigation
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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // If we're at or near the top of the page, set hero as active
          // This handles cases where IntersectionObserver might not trigger immediately
          if (scrollY < 100) {
            setActiveSection('hero');
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth mousewheel section-to-section scrolling
  useEffect(() => {
    // Only enable on desktop (not touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let isScrolling = false;
    let lastWheelTime = 0;
    let wheelDelta = 0;
    const throttleDelay = 600; // Minimum time between section scrolls (ms)
    const wheelThreshold = 40; // Accumulated wheel delta needed to trigger scroll

    const getSectionElement = (sectionId: string): HTMLElement | null => {
      if (sectionId === 'hero') {
        return heroRef.current;
      }
      return document.getElementById(sectionId);
    };

    const getSectionPosition = (sectionId: string): number => {
      const element = getSectionElement(sectionId);
      if (!element) return 0;
      return element.getBoundingClientRect().top + window.scrollY;
    };

    const scrollToSectionSmooth = (sectionId: string) => {
      if (isScrolling) return;

      const element = getSectionElement(sectionId);
      if (!element) return;

      isScrolling = true;
      const targetY = sectionId === 'hero' ? 0 : getSectionPosition(sectionId);

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scrolling
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // Check if we're in the projects section - let it handle its own scrolling
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const projectsRect = projectsSection.getBoundingClientRect();
        const mouseY = e.clientY;
        const isInProjectsSection = mouseY >= projectsRect.top && mouseY <= projectsRect.bottom;

        if (isInProjectsSection && projectsRef.current) {
          // Let projects section handle its own wheel events
          return;
        }
      }

      // Check if we're in an input/textarea - don't interfere
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.closest('input, textarea')
      ) {
        return;
      }

      const now = Date.now();
      wheelDelta += Math.abs(e.deltaY);

      // Only process if enough wheel movement accumulated and enough time passed
      if (wheelDelta >= wheelThreshold && (now - lastWheelTime >= throttleDelay)) {
        wheelDelta = 0;
        lastWheelTime = now;

        const sectionIds = hasTestimonials
          ? ['hero', 'about', 'education', 'projects', 'testimonials', 'contact']
          : ['hero', 'about', 'education', 'projects', 'contact'];
        let currentIndex = sectionIds.indexOf(activeSection);

        // If activeSection is not in the list, determine based on scroll position
        if (currentIndex === -1) {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;

          // Determine current section based on scroll position
          const heroPos = getSectionPosition('hero');
          const aboutPos = getSectionPosition('about');
          const educationPos = getSectionPosition('education');
          const projectsPos = getSectionPosition('projects');
          const testimonialsPos = hasTestimonials ? getSectionPosition('testimonials') : null;
          const contactPos = getSectionPosition('contact');

          if (scrollY < aboutPos - viewportHeight * 0.3) {
            currentIndex = 0; // hero
          } else if (scrollY < educationPos - viewportHeight * 0.3) {
            currentIndex = 1; // about
          } else if (scrollY < projectsPos - viewportHeight * 0.3) {
            currentIndex = 2; // education
          } else if (hasTestimonials && testimonialsPos && scrollY < testimonialsPos - viewportHeight * 0.3) {
            currentIndex = 3; // projects
          } else if (hasTestimonials && testimonialsPos && scrollY < contactPos - viewportHeight * 0.3) {
            currentIndex = 4; // testimonials
          } else if (!hasTestimonials && scrollY < contactPos - viewportHeight * 0.3) {
            currentIndex = 3; // projects
          } else {
            currentIndex = hasTestimonials ? 5 : 4; // contact
          }
        }

        // Prevent default scrolling
        e.preventDefault();

        // Determine scroll direction and navigate
        if (e.deltaY > 0) {
          // Scrolling down
          if (currentIndex < sectionIds.length - 1) {
            scrollToSectionSmooth(sectionIds[currentIndex + 1]);
          }
        } else {
          // Scrolling up
          if (currentIndex > 0) {
            scrollToSectionSmooth(sectionIds[currentIndex - 1]);
          } else {
            // Scroll to top/hero section
            scrollToSectionSmooth('hero');
          }
        }
      }
    };

    // Reset wheel delta after a delay to prevent accumulation over time
    const resetWheelDelta = setInterval(() => {
      if (Date.now() - lastWheelTime > 500) {
        wheelDelta = 0;
      }
    }, 200);

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearInterval(resetWheelDelta);
    };
  }, [activeSection]);

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
    <div className="min-h-screen bg-transparent text-text-primary scroll-smooth snap-y">
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-nav backdrop-blur-xl border-b border-border-accent md:hidden shadow-sm">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="h5 font-semibold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              {t('portfolio')}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection('about')}
                className={`body-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${activeSection === 'about'
                    ? 'text-accent-primary bg-accent-light'
                    : 'text-text-tertiary hover:text-text-primary hover:bg-accent-light'
                  }`}
              >
                {t('about')}
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={`body-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${activeSection === 'projects'
                    ? 'text-accent-primary bg-accent-light'
                    : 'text-text-tertiary hover:text-text-primary hover:bg-accent-light'
                  }`}
              >
                {t('projects')}
              </button>
              {hasTestimonials && (
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className={`body-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${activeSection === 'testimonials'
                      ? 'text-accent-primary bg-accent-light'
                      : 'text-text-tertiary hover:text-text-primary hover:bg-accent-light'
                    }`}
                >
                  {t('testimonials')}
                </button>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </nav>

      <main className="md:ml-24 pt-24 pb-20">
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
            scrollToContact={() => scrollToSection(hasTestimonials ? 'testimonials' : 'contact')}
          />

          {hasTestimonials && (
            <TestimonialsComponent
              sectionRef={(el) => {
                sectionsRef.current[3] = el;
              }}
              testimonials={testimonials!}
            />
          )}
        </Container>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        ref={(el) => {
          sectionsRef.current[hasTestimonials ? 4 : 3] = el;
        }}
        className="min-h-screen flex flex-col justify-center md:ml-24 pt-12 sm:pt-16 snap-start opacity-0 translate-y-8 transition-all duration-700"
      >
        <Container>
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <h3 className="h4 text-text-primary mb-4 sm:mb-6 text-center">
              {tContact('title')}
            </h3>
            <ContactForm />
          </div>
          <div className="text-center body-sm text-text-tertiary mt-8 sm:mt-12">
            <p>{tFooter('designed')}</p>
            <p className="mt-2">© {new Date().getFullYear()}</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

