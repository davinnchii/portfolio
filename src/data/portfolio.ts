import type { Education } from '@/components/Education';
import type { TechSkill } from '@/components/Skills';
import type { Project } from '@/components/Projects';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Metaversus Landing',
    description: 'Landing page about Metaversus using Next.js, Tailwind and framer motion lib.',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    image: '/metaversus.jpg', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub link
  },
  {
    id: 2,
    title: 'APPLE gadgets Store',
    description: 'An online phone store with full-stack capabilities, offering a user-friendly interface for effortless browsing and purchasing of a diverse selection of phones and accessories.',
    tech: ['React', 'Sass', 'MaterialUI', 'Node.js', 'TypeScript'],
    image: '/apple-store.jpg', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub Frontend link
  },
  {
    id: 3,
    title: 'Quizz with Next.js API',
    description: 'Mini-quizz page with simple UI and storing data using Next.js backend routes.',
    tech: ['Next.js', 'TailwindCSS', 'TypeScript'],
    image: '/quizz.jpg', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub link
  },
  {
    id: 4,
    title: 'Checklist Application with React',
    description: 'Simple task-management app, which uses API to store tasks and allows users to add, delete, and edit tasks.',
    tech: ['React', 'TypeScript'],
    image: '/checklist.jpg', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub link
  },
];

export const education: Education[] = [
  {
    period: '2022 - 2026',
    institution: 'Nizhyn Gogol State University',
    degree: 'Bachelor\'s Degree in Computer Science',
    description: 'Currently pursuing a degree in Computer Science with focus on modern software development practices.',
  },
  {
    period: '2022 - 2023',
    institution: 'Lublin University of Technology',
    degree: 'Bachelor\'s Degree in Engineering and Data Analysis (Incomplete)',
    description: 'Studied Engineering and Data Analysis, gaining knowledge in data processing and analytical methods.',
  },
  {
    period: '2021',
    institution: 'Mate Academy',
    degree: 'Full-time Fullstack Course',
    description: 'Completed an intensive full-time Full-Stack Development course covering HTML/CSS, JavaScript, React/Redux, Node.js, SQL, databases, algorithms, and web development. The program emphasized practical, hands-on experience with real-world projects and included career support with interview preparation and job placement assistance.',
  },
];

export const techSkills: TechSkill[] = [
  {
    category: 'Frontend',
    skills: ['TypeScript', 'JavaScript (ES2015-2019)', 'React', 'Redux Toolkit', 'Redux Thunk', 'Vue3', 'Vuex', 'Next.js', 'HTML5', 'CSS3', 'Sass (SCSS)', 'BEM'],
  },
  {
    category: 'UI Libraries & Frameworks',
    skills: ['Bootstrap', 'Bulma', 'Material UI', 'Next UI', 'Swiper', 'TailwindCSS', 'TailwindUI'],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'PostgreSQL', 'REST API', 'axios.js'],
  },
  {
    category: 'Testing & Tools',
    skills: ['Cypress', 'Jest', 'Git', 'Chrome DevTools', 'NPM', 'Webpack', 'Figma'],
  },
  {
    category: 'Methodologies & Languages',
    skills: ['Agile', 'Scrum', 'English (Upper-Intermediate)', 'Polish (B1+)', 'Norsk (B1+)'],
  },
];

