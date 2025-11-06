'use client';

import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
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
}

export interface ProjectsRef {
  goToProject: (projectId: number) => void;
}

const Projects = forwardRef<ProjectsRef, ProjectsProps>(({ sectionRef, projects }, ref) => {
  const t = useTranslations('projects');
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useImperativeHandle(ref, () => ({
    goToProject: (projectId: number) => {
      const projectIndex = projects.findIndex((p) => p.id === projectId);
      if (projectIndex !== -1 && swiperRef.current) {
        swiperRef.current.slideToLoop(projectIndex);
        setActiveIndex(projectIndex);
      }
    },
  }));

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] mx-auto w-full px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
            <span className="text-zinc-400 dark:text-zinc-600 font-mono text-lg">03.</span>{' '}
            {t('title')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
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
              loop
              spaceBetween={-80}
              mousewheel
              keyboard={{
                enabled: true,
              }}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-center lg:items-start flex-1 max-w-lg xl:max-w-xl 2xl:max-w-2xl h-[500px] lg:h-[650px] xl:h-[750px] 2xl:h-[850px] justify-center animate-slide-in-right">
            <div className="text-center lg:text-left transition-all duration-500 w-full flex flex-col h-full justify-between py-4">
              {/* Title Section - Fixed Height */}
              <div className="h-[70px] sm:h-[80px] lg:h-[90px] flex flex-col justify-center flex-shrink-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 relative inline-block">
                  {projects[activeIndex].title}
                  <span className="block w-16 h-[2px] bg-indigo-500 dark:bg-indigo-400 mx-auto lg:mx-0 mt-2"></span>
                </h3>
              </div>
              
              {/* Description Section - Flexible but with min-height */}
              <div className="flex-1 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] xl:min-h-[200px] max-h-[200px] sm:max-h-[220px] md:max-h-[240px] lg:max-h-[260px] xl:max-h-[280px] overflow-y-auto scrollbar-hide my-2 sm:my-3 lg:my-4">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base sm:text-lg">
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
                        <span className="text-xs sm:text-sm font-medium">{tech}</span>
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
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {t('viewProject')}
                  </a>
                )}
                {projects[activeIndex].github && (
                  <a
                    href={projects[activeIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {t('github')}
                  </a>
                )}
              </div>

              {/* Custom Navigation Buttons - Fixed Height */}
              <div className="flex items-center gap-4 h-[52px] justify-center lg:justify-start flex-shrink-0">
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-500 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-[#0a0a0a] hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 shadow-lg"
                  aria-label="Previous project"
                >
                  <FaChevronUp className="text-sm" />
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-500 dark:hover:bg-indigo-400 hover:text-white dark:hover:text-[#0a0a0a] hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 shadow-lg"
                  aria-label="Next project"
                >
                  <FaChevronDown className="text-sm" />
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

