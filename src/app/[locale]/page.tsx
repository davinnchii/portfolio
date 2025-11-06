import { getTranslations } from 'next-intl/server';
import PortfolioClient from '@/components/PortfolioClient';
import type { Education } from '@/components/Education';
import type { Project } from '@/components/Projects';

export default async function Home() {
  const t = await getTranslations();
  
  const projects: Project[] = t.raw('projects.items') as Project[];
  const education: Education[] = t.raw('education.items') as Education[];
  
  return <PortfolioClient projects={projects} education={education} />;
}

