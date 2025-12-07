'use client';

import { useTranslations } from 'next-intl';
import { FaQuoteLeft } from 'react-icons/fa';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  feedback: string;
}

interface TestimonialsProps {
  sectionRef: (el: HTMLElement | null) => void;
  testimonials: Testimonial[];
}

export default function Testimonials({ sectionRef, testimonials }: TestimonialsProps) {
  const t = useTranslations('testimonials');
  
  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="min-h-screen flex flex-col justify-center mb-32 scroll-mt-24 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="h2 mb-4 sm:mb-6 text-center text-text-primary">
          <span className="text-text-muted font-mono body-sm">04.</span>{' '}
          {t('title')}
        </h2>
        <p className="body-lg text-text-tertiary text-center mb-8 sm:mb-12">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative bg-accent-light border border-border-accent rounded-lg p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              <div className="flex-shrink-0 mb-4">
                <FaQuoteLeft className="text-3xl text-accent-primary opacity-50" />
              </div>
              <p className="text-text-tertiary body-text mb-6 flex-grow italic">
                "{testimonial.feedback}"
              </p>
              <div className="border-t border-border-accent pt-4">
                <p className="body-text font-semibold text-text-primary mb-1">
                  {testimonial.name}
                </p>
                <p className="body-sm text-text-secondary">
                  {testimonial.role}
                </p>
                <p className="body-sm text-accent-primary mt-1">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

