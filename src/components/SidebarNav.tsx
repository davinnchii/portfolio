"use client";

import React from "react";

interface SidebarNavProps {
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

const sections = [
    { id: "about", label: "About", short: "01" },
    { id: "education", label: "Edu", short: "02" },
    { id: "projects", label: "Work", short: "03" },
];

export const SidebarNav: React.FC<SidebarNavProps> = ({
    activeSection,
    scrollToSection,
}) => {
    return (
        <aside className="fixed left-0 top-0 bottom-0 w-16 md:w-20 z-50 hidden md:flex flex-col items-center justify-center">
            <nav className="flex flex-col gap-6">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`group relative flex flex-col items-center transition-all duration-300 ${activeSection === section.id
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400"
                            }`}
                    >
                        <span className="text-xs font-medium mb-1">{section.short}</span>
                        <span
                            className={`absolute -left-4 top-0 bottom-0 w-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 ${activeSection === section.id ? "opacity-100" : "opacity-0"
                                }`}
                        />
                        <span className="text-[10px] uppercase tracking-wider">
                            {section.label}
                        </span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};
