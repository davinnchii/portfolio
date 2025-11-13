"use client";

import React from "react";
import { useTranslations } from 'next-intl';

interface SidebarNavProps {
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
    activeSection,
    scrollToSection,
}) => {
    const t = useTranslations('nav');
    
    const sections = [
        { id: "about", label: t('about'), short: "01" },
        { id: "education", label: t('education'), short: "02" },
        { id: "projects", label: t('projects'), short: "03" },
        { id: "contact", label: t('contact'), short: "04" },
    ];
    
    return (
        <aside className="fixed left-0 top-0 bottom-0 w-20 md:w-24 z-50 hidden md:flex flex-col items-center justify-center">
            {/* Background with gradient and blur */}
            <div className="absolute inset-0 bg-bg-sidebar backdrop-blur-md border-r border-border-accent" />
            
            {/* Connecting line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3/4 bg-gradient-to-b from-transparent via-border-primary to-transparent opacity-30" />
            
            <nav className="relative flex flex-col gap-8">
                {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative flex flex-col items-center transition-all duration-500 ease-out"
                        >
                            {/* Active indicator - animated dot */}
                            <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ${
                                isActive 
                                    ? "opacity-100 scale-100" 
                                    : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100"
                            }`} />
                            
                            {/* Active indicator - connecting line */}
                            <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary transition-all duration-500 ${
                                isActive 
                                    ? "opacity-100 scale-y-100" 
                                    : "opacity-0 scale-y-0"
                            }`} />
                            
                            {/* Number badge */}
                            <div className={`relative mb-2 transition-all duration-500 ${
                                isActive 
                                    ? "scale-110" 
                                    : "scale-100 group-hover:scale-105"
                            }`}>
                                <span className={`body-sm font-semibold transition-all duration-500 ${
                                    isActive
                                        ? "text-accent-primary"
                                        : "text-text-muted group-hover:text-text-tertiary"
                                }`}>
                                    {section.short}
                                </span>
                                
                                {/* Glow effect on active */}
                                {isActive && (
                                    <div className="absolute inset-0 blur-sm bg-accent-medium -z-10 animate-pulse" />
                                )}
                            </div>
                            
                            {/* Label */}
                            <span className={`body-sm uppercase tracking-wider font-medium transition-all duration-500 ${
                                isActive
                                    ? "text-text-primary"
                                    : "text-text-muted group-hover:text-text-tertiary"
                            }`}>
                                {section.label}
                            </span>
                            
                            {/* Hover effect - subtle glow */}
                            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-accent-primary/0 via-accent-light to-accent-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};
