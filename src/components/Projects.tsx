'use client';

import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  SiShopify,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiReact,
  SiSass,
  SiMui,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from 'react-icons/si';
import { HiCode } from 'react-icons/hi';
import type { Swiper as SwiperType } from 'swiper';
import type { IconType } from 'react-icons';

// Tech icon mapping
const techIcons: Record<string, IconType> = {
  Shopify: SiShopify,
  Liquid: HiCode, // Using code icon for Liquid
  JavaScript: SiJavascript,
  CSS: SiCss3,
  HTML: SiHtml5,
  'Next.js': SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  'Framer Motion': SiFramer,
  TypeScript: SiTypescript,
  React: SiReact,
  Sass: SiSass,
  MaterialUI: SiMui,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  Express: SiExpress,
};

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  scrollToContact?: () => void;
}

export interface ProjectsRef {
  goToProject: (projectId: number) => void;
  getCurrentSlideIndex: () => number;
  getTotalSlides: () => number;
  isAtEnd: () => boolean;
  isAtBeginning: () => boolean;
  slideNext: () => void;
  slidePrev: () => void;
}

const Projects = forwardRef<ProjectsRef, ProjectsProps>(({ sectionRef, projects, scrollToContact }, ref) => {
  const t = useTranslations('projects');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [prevButtonAnimating, setPrevButtonAnimating] = useState(false);
  const [nextButtonAnimating, setNextButtonAnimating] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionElementRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(ref, () => ({
    goToProject: (projectId: number) => {
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(projectIndex);
        setActiveIndex(projectIndex);
      }
    },
    getCurrentSlideIndex: () => {
      return swiperRef.current ? swiperRef.current.realIndex : activeIndex;
    },
    getTotalSlides: () => {
      return projects.length;
    },
    isAtEnd: () => {
      if (!swiperRef.current) return false;
      return swiperRef.current.realIndex === projects.length - 1 && swiperRef.current.isEnd;
    },
    isAtBeginning: () => {
      if (!swiperRef.current) return false;
      return swiperRef.current.realIndex === 0 && swiperRef.current.isBeginning;
    },
    slideNext: () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    },
    slidePrev: () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
    },
  }));

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
    setIsAtBeginning(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };


  const handlePrev = () => {
    setPrevButtonAnimating(true);
    setTimeout(() => setPrevButtonAnimating(false), 300);
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    setNextButtonAnimating(true);
    setTimeout(() => setNextButtonAnimating(false), 300);
    if (swiperRef.current && !swiperRef.current.isEnd) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section
      ref={(el) => {
        sectionElementRef.current = el;
        if (typeof sectionRef === 'function') {
          sectionRef(el);
        }
      }}
      id="projects"
      className="mb-32 scroll-mt-24 snap-center opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] mx-auto w-full px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="h2 mb-3 sm:mb-4 text-zinc-900 dark:text-zinc-100">
            <span className="text-zinc-400 dark:text-zinc-600 font-mono body-sm">03.</span>{' '}
            {t('title')}
          </h2>
          <p className="body-text text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 xl:gap-24 2xl:gap-28">
          {/* Vertical Swiper Section */}
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] animate-slide-in-left">
            <Swiper
              direction="vertical"
              slidesPerView={3}
              centeredSlides
              spaceBetween={-80}
              keyboard={{
                enabled: false, // Disabled - we handle keyboard navigation in PortfolioClient
              }}
              modules={[Navigation, Pagination, Keyboard]}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsAtBeginning(swiper.isBeginning);
                setIsAtEnd(swiper.isEnd);
              }}
              onSlideChange={handleSlideChange}
              className="h-full projects-vertical-swiper"
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <SwiperSlide key={project.id}>
                    <div
                      className={`
                        relative w-full h-[220px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 border-2
                        ${
                          isActive
                            ? 'scale-100 z-20 border-indigo-500 dark:border-indigo-400'
                            : 'scale-80 opacity-60 grayscale border-zinc-200 dark:border-zinc-800'
                        }
                      `}
                    >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 600px, (max-width: 1536px) 700px, 800px"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-2xl">
                        <span className="text-zinc-400 dark:text-zinc-600 text-sm">
                          No preview available
                        </span>
                      </div>
                    )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            
            {/* Custom Navigation Buttons - Positioned next to swiper */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full lg:translate-x-8 xl:translate-x-12 2xl:translate-x-16 flex flex-col gap-3 z-30 hidden lg:flex">
              <button
                onClick={handlePrev}
                disabled={isAtBeginning}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-white hover:shadow-xl hover:shadow-indigo-500/50 active:bg-gradient-to-br active:from-indigo-600 active:to-purple-700 dark:active:from-indigo-700 dark:active:to-purple-800 active:border-indigo-600 dark:active:border-indigo-500 active:shadow-2xl active:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-200 disabled:hover:dark:bg-zinc-800 disabled:hover:border-zinc-300 disabled:hover:dark:border-zinc-700 disabled:hover:text-zinc-700 disabled:hover:dark:text-zinc-300 disabled:hover:shadow-md ${
                  prevButtonAnimating ? 'arrow-click-animation' : ''
                }`}
                aria-label="Previous project"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                <FaArrowUp className="text-lg relative z-10 transition-colors duration-300" />
              </button>

              <button
                onClick={handleNext}
                disabled={isAtEnd}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-white hover:shadow-xl hover:shadow-indigo-500/50 active:bg-gradient-to-br active:from-indigo-600 active:to-purple-700 dark:active:from-indigo-700 dark:active:to-purple-800 active:border-indigo-600 dark:active:border-indigo-500 active:shadow-2xl active:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-200 disabled:hover:dark:bg-zinc-800 disabled:hover:border-zinc-300 disabled:hover:dark:border-zinc-700 disabled:hover:text-zinc-700 disabled:hover:dark:text-zinc-300 disabled:hover:shadow-md ${
                  nextButtonAnimating ? 'arrow-click-animation' : ''
                }`}
                aria-label="Next project"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                <FaArrowDown className="text-lg relative z-10 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center lg:items-start flex-1 max-w-lg xl:max-w-xl 2xl:max-w-2xl h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] justify-center animate-slide-in-right">
            <div className="text-center lg:text-left transition-all duration-500 w-full flex flex-col h-full justify-between py-4">
              {/* Title Section - Fixed Height */}
              <div className="h-[70px] sm:h-[80px] lg:h-[90px] flex flex-col justify-center flex-shrink-0">
                <h3 className="h3 text-zinc-900 dark:text-zinc-100 mb-3 relative inline-block">
                  {projects[activeIndex].title}
                  <span className="block w-12 sm:w-16 h-[2px] bg-indigo-500 dark:bg-indigo-400 mx-auto lg:mx-0 mt-2"></span>
                </h3>
              </div>
              
              {/* Description Section - Flexible but with min-height */}
              <div className="flex-1 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] xl:min-h-[200px] max-h-[200px] sm:max-h-[220px] md:max-h-[240px] lg:max-h-[260px] xl:max-h-[280px] overflow-y-auto scrollbar-hide my-2 sm:my-3 lg:my-4">
                <p className="text-zinc-600 dark:text-zinc-400 body-text">
                  {projects[activeIndex].description}
                </p>
              </div>

              {/* Tech Stack - Fixed Height to accommodate max 5 items */}
              <div className="h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px] overflow-y-auto scrollbar-hide flex-shrink-0 my-2 sm:my-3 lg:my-4">
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {projects[activeIndex].tech.map((tech, techIndex) => {
                    const Icon = techIcons[tech] || HiCode;
                    return (
                      <div
                        key={techIndex}
                        className="flex items-center gap-2 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-200"
                      >
                        <Icon className="text-base sm:text-lg flex-shrink-0" />
                        <span className="body-sm font-medium">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Links - Fixed Height */}
              <div className="h-[28px] flex items-center gap-4 justify-center lg:justify-start flex-shrink-0 my-2 sm:my-3 lg:my-4">
                {projects[activeIndex].link && (
                  <a
                    href={projects[activeIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {t('viewProject')}
                  </a>
                )}
                {projects[activeIndex].github && (
                  <a
                    href={projects[activeIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {t('github')}
                  </a>
                )}
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="flex flex-row items-center gap-3 justify-center lg:hidden flex-shrink-0 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={isAtBeginning}
                  className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-white hover:shadow-xl hover:shadow-indigo-500/50 active:bg-gradient-to-br active:from-indigo-600 active:to-purple-700 dark:active:from-indigo-700 dark:active:to-purple-800 active:border-indigo-600 dark:active:border-indigo-500 active:shadow-2xl active:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-200 disabled:hover:dark:bg-zinc-800 disabled:hover:border-zinc-300 disabled:hover:dark:border-zinc-700 disabled:hover:text-zinc-700 disabled:hover:dark:text-zinc-300 disabled:hover:shadow-md ${
                    prevButtonAnimating ? 'arrow-click-animation' : ''
                  }`}
                  aria-label="Previous project"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                  <FaArrowUp className="text-lg relative z-10 transition-colors duration-300" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isAtEnd}
                  className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-white hover:shadow-xl hover:shadow-indigo-500/50 active:bg-gradient-to-br active:from-indigo-600 active:to-purple-700 dark:active:from-indigo-700 dark:active:to-purple-800 active:border-indigo-600 dark:active:border-indigo-500 active:shadow-2xl active:shadow-indigo-600/60 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-zinc-200 disabled:hover:dark:bg-zinc-800 disabled:hover:border-zinc-300 disabled:hover:dark:border-zinc-700 disabled:hover:text-zinc-700 disabled:hover:dark:text-zinc-300 disabled:hover:shadow-md ${
                    nextButtonAnimating ? 'arrow-click-animation' : ''
                  }`}
                  aria-label="Next project"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                  <FaArrowDown className="text-lg relative z-10 transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;

