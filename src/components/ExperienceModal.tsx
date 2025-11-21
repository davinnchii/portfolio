'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaTimes } from 'react-icons/fa';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({ isOpen, onClose }: ExperienceModalProps) {
  const t = useTranslations('about.experienceModal');

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      
      // Save current scroll position
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Prevent body scroll when modal is open - more robust approach
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent touch scrolling on mobile
      document.body.style.touchAction = 'none';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        
        // Restore scroll position and styles
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        document.documentElement.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-modal-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          // Close modal if clicking outside the content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-modal-title"
      >
        <div 
          className="bg-bg-card border border-border-primary rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide animate-modal-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-bg-card border-b border-border-primary px-6 py-4 flex items-center justify-between z-10">
            <h2
              id="experience-modal-title"
              className="h3 text-text-primary"
            >
              {t('title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent-light text-text-tertiary hover:text-text-primary transition-colors duration-200"
              aria-label={t('close')}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Timeline Section */}
            <section>
              <h3 className="h4 text-text-primary mb-6">
                {t('timeline.title')}
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary opacity-30"></div>
                
                {/* Timeline items */}
                <div className="space-y-6">
                  {[
                    'april2024',
                    'september2024',
                    'october2024',
                    'january2025',
                    'summer2025',
                    'september2025',
                    'now'
                  ].map((key, index) => {
                    const item = t.raw(`timeline.${key}`) as { date: string; event: string };
                    const isLast = key === 'now';
                    
                    return (
                      <div key={key} className="relative flex items-start gap-4 group">
                        {/* Timeline dot */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isLast 
                              ? 'bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg shadow-accent-primary/50 scale-110' 
                              : 'bg-accent-light border-2 border-accent-primary group-hover:scale-110 group-hover:shadow-lg'
                          }`}>
                            {isLast ? (
                              <span className="text-xl">✨</span>
                            ) : (
                              <div className={`w-3 h-3 rounded-full ${
                                isLast ? 'bg-text-inverse' : 'bg-accent-primary'
                              }`}></div>
                            )}
                          </div>
                        </div>
                        
                        {/* Content card */}
                        <div className={`flex-1 pt-1 transition-all duration-300 group-hover:translate-x-1 ${
                          isLast ? 'opacity-100' : ''
                        }`}>
                          <div className={`p-4 rounded-lg border transition-all duration-300 ${
                            isLast
                              ? 'bg-gradient-to-br from-accent-light to-accent-primary/10 border-accent-primary shadow-lg'
                              : 'bg-accent-light border-border-accent group-hover:border-accent-primary group-hover:shadow-md'
                          }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <p className={`font-semibold ${
                                isLast ? 'text-accent-primary text-lg' : 'text-accent-primary'
                              }`}>
                                {item.date}
                              </p>
                            </div>
                            <p className={`leading-relaxed ${
                              isLast ? 'text-text-primary font-medium' : 'text-text-secondary'
                            }`}>
                              {item.event}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section>
              <h3 className="h4 text-text-primary mb-4">
                {t('workExperience.title')}
              </h3>
              <p className="body-lg text-text-tertiary leading-relaxed">
                {t('workExperience.description')}
              </p>
            </section>

            {/* Adaptation Section */}
            <section>
              <h3 className="h4 text-text-primary mb-4">
                {t('adaptation.title')}
              </h3>
              <div className="space-y-3">
                {(t.raw('adaptation.achievements') as string[]).map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-accent-light border border-border-accent rounded-lg"
                  >
                    <p className="body-text text-text-secondary">
                      <span className="font-semibold text-accent-primary mr-2">•</span>
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-bg-card border-t border-border-primary px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-accent-primary text-text-inverse rounded-lg hover:bg-accent-hover transition-colors duration-200 body-sm font-medium"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

