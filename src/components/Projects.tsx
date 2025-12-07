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
      className="min-h-screen flex flex-col justify-center scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] mx-auto w-full px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="h2 mb-3 sm:mb-4 text-text-primary">
            <span className="text-text-muted font-mono body-sm">03.</span>{' '}
            {t('title')}
          </h2>
          <p className="body-text text-text-tertiary">
            {t('subtitle')}
          </p>
        </div>

        {/* Mobile Layout - Simple Card Stack */}
        <div className="md:hidden space-y-6">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="bg-accent-light border border-border-accent rounded-xl p-6 shadow-lg hover:border-accent-primary hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent-light flex items-center justify-center rounded-lg">
                      <span className="text-text-muted text-sm">
                        No preview available
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="h3 text-text-primary mb-3 break-words leading-tight">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="body-text text-text-tertiary mb-4 leading-relaxed break-words">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => {
                    const TechIcon = techIcons[tech] || HiCode;
                    return (
                      <div
                        key={techIndex}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-bg-accent-light rounded-lg text-text-secondary border border-border-accent"
                      >
                        <TechIcon className="text-sm flex-shrink-0" />
                        <span className="body-sm font-medium">{tech}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-4 pt-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-sm font-medium text-accent-primary hover:text-accent-hover transition-colors duration-200"
                    >
                      {t('viewProject')} →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="body-sm font-medium text-accent-primary hover:text-accent-hover transition-colors duration-200"
                    >
                      {t('github')} →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet Layout - Horizontal Cards */}
        <div className="hidden md:block lg:hidden space-y-6">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="bg-accent-light border border-border-accent rounded-xl p-6 md:p-8 shadow-lg hover:border-accent-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Project Image */}
                  <div className="relative w-full md:w-1/2 h-64 md:h-80 flex-shrink-0 rounded-lg overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent-light flex items-center justify-center rounded-lg">
                        <span className="text-text-muted text-sm">
                          No preview available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                {/* Project Title */}
                <h3 className="h3 text-text-primary mb-3 break-words leading-tight">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="body-text text-text-tertiary mb-4 leading-relaxed flex-1 break-words">
                  {project.description}
                </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => {
                        const TechIcon = techIcons[tech] || HiCode;
                        return (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1.5 px-3 py-2 bg-bg-primary rounded-lg text-text-secondary border border-border-accent"
                          >
                            <TechIcon className="text-base flex-shrink-0" />
                            <span className="body-sm font-medium">{tech}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Project Links */}
                    <div className="flex items-center gap-4 pt-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="body-sm font-medium text-accent-primary hover:text-accent-hover transition-colors duration-200"
                        >
                          {t('viewProject')} →
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="body-sm font-medium text-accent-primary hover:text-accent-hover transition-colors duration-200"
                        >
                          {t('github')} →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout - Swiper with Side Info */}
        <div className="hidden lg:flex flex-row items-center justify-center gap-12 lg:gap-20 xl:gap-24 2xl:gap-28">
          {/* Vertical Swiper Section */}
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-[650px] xl:h-[750px] 2xl:h-[850px] animate-slide-in-left pb-20">
            <Swiper
              direction="vertical"
              slidesPerView={3}
              centeredSlides
              spaceBetween={-80}
              speed={600}
              keyboard={{
                enabled: false, // Disabled - we handle keyboard navigation in PortfolioClient
              }}
              modules={[Navigation, Pagination, Keyboard]}
              pagination={{ 
                clickable: true,
                el: '.swiper-pagination-projects'
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsAtBeginning(swiper.isBeginning);
                setIsAtEnd(swiper.isEnd);
              }}
              onSlideChange={handleSlideChange}
              className="h-full projects-vertical-swiper"
              watchOverflow={true}
              resistance={true}
              resistanceRatio={0.85}
            >
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <SwiperSlide key={project.id}>
                    <div
                      className={`
                        relative w-full h-[280px] xl:h-[320px] 2xl:h-[360px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 border-2
                        ${
                          isActive
                            ? 'scale-100 z-20 border-accent-primary'
                            : 'scale-80 opacity-60 grayscale border-border-primary'
                        }
                      `}
                      style={{ willChange: isActive ? 'transform' : 'auto' }}
                    >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 1280px) 600px, (max-width: 1536px) 700px, 800px"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent-light flex items-center justify-center rounded-2xl">
                        <span className="text-text-muted text-sm">
                          No preview available
                        </span>
                      </div>
                    )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            
            {/* Pagination - Positioned below swiper */}
            <div className="swiper-pagination-projects absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center gap-2 z-10"></div>
            
            {/* Custom Navigation Buttons - Positioned on the side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 xl:translate-x-12 2xl:translate-x-16 flex flex-col gap-3 z-30">
              <button
                onClick={handlePrev}
                disabled={isAtBeginning}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light border-2 border-border-accent text-text-secondary shadow-md hover:bg-gradient-to-br hover:from-accent-primary hover:to-accent-secondary hover:border-accent-primary hover:text-text-inverse hover:shadow-xl active:bg-gradient-to-br active:from-accent-hover active:to-accent-active active:border-accent-hover active:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent-light disabled:hover:border-border-accent disabled:hover:text-text-secondary disabled:hover:shadow-md ${
                  prevButtonAnimating ? 'arrow-click-animation' : ''
                }`}
                aria-label="Previous project"
              >
                <div className="absolute inset-0 rounded-xl bg-bg-overlay opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                <FaArrowUp className="text-lg relative z-10 transition-colors duration-300" />
              </button>

              <button
                onClick={handleNext}
                disabled={isAtEnd}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-xl bg-accent-light border-2 border-border-accent text-text-secondary shadow-md hover:bg-gradient-to-br hover:from-accent-primary hover:to-accent-secondary hover:border-accent-primary hover:text-text-inverse hover:shadow-xl active:bg-gradient-to-br active:from-accent-hover active:to-accent-active active:border-accent-hover active:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-accent-light disabled:hover:border-border-accent disabled:hover:text-text-secondary disabled:hover:shadow-md ${
                  nextButtonAnimating ? 'arrow-click-animation' : ''
                }`}
                aria-label="Next project"
              >
                <div className="absolute inset-0 rounded-xl bg-bg-overlay opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
                <FaArrowDown className="text-lg relative z-10 transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col items-start flex-1 max-w-lg xl:max-w-xl 2xl:max-w-2xl h-[650px] xl:h-[750px] 2xl:h-[850px] justify-center animate-slide-in-right">
            <div className="text-left transition-all duration-500 w-full flex flex-col h-full justify-between py-4">
              {/* Title Section - Flexible Height */}
              <div className="flex flex-col justify-center flex-shrink-0 min-h-[60px] max-h-[120px] mb-4">
                <h3 className="h3 text-text-primary mb-3 break-words leading-tight">
                  {projects[activeIndex].title}
                </h3>
                <span className="block w-16 h-[2px] bg-accent-primary mt-2"></span>
              </div>
              
              {/* Description Section - Flexible but with min-height */}
              <div className="flex-1 min-h-[180px] xl:min-h-[200px] max-h-[300px] xl:max-h-[320px] overflow-y-auto scrollbar-hide my-4">
                <p className="text-text-tertiary body-text break-words leading-relaxed">
                  {projects[activeIndex].description}
                </p>
              </div>

              {/* Tech Stack - Fixed Height to accommodate max 5 items */}
              <div className="h-[100px] overflow-y-auto scrollbar-hide flex-shrink-0 my-4">
                <div className="flex flex-wrap gap-3 justify-start">
                  {projects[activeIndex].tech.map((tech, techIndex) => {
                    const Icon = techIcons[tech] || HiCode;
                    return (
                      <div
                        key={techIndex}
                        className="flex items-center gap-2 px-3 py-2 bg-accent-light rounded-lg text-text-secondary border border-border-accent hover:bg-accent-light transition-colors duration-200"
                      >
                        <Icon className="text-lg flex-shrink-0" />
                        <span className="body-sm font-medium">{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Links - Fixed Height */}
              <div className="h-[28px] flex items-center gap-4 justify-start flex-shrink-0 my-4">
                {projects[activeIndex].link && (
                  <a
                    href={projects[activeIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm font-medium text-text-primary hover:text-accent-primary transition-colors duration-200"
                  >
                    {t('viewProject')}
                  </a>
                )}
                {projects[activeIndex].github && (
                  <a
                    href={projects[activeIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-sm font-medium text-text-primary hover:text-accent-primary transition-colors duration-200"
                  >
                    {t('github')}
                  </a>
                )}
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

