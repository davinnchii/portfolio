import { projects, education, techSkills } from '@/data/portfolio';
import PortfolioClient from '@/components/PortfolioClient';

export default function Home() {
  return <PortfolioClient projects={projects} education={education} techSkills={techSkills} />;
}
