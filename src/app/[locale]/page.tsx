import { getTranslations, getLocale } from 'next-intl/server';
import PortfolioClient from '@/components/PortfolioClient';
import type { Education } from '@/components/Education';
import type { Project } from '@/components/Projects';
import type { Testimonial } from '@/components/Testimonials';

export default async function Home() {
  const t = await getTranslations();
  const locale = await getLocale();
  
  const projects: Project[] = t.raw('projects.items') as Project[];
  const education: Education[] = t.raw('education.items') as Education[];
  
  // Only get testimonials for Norwegian locale
  const testimonials: Testimonial[] | undefined = locale === 'no' 
    ? (t.raw('testimonials.items') as Testimonial[])
    : undefined;
  
  return <PortfolioClient projects={projects} education={education} testimonials={testimonials} />;
}

