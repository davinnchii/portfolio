import type { Education } from '@/components/Education';
import type { Project } from '@/components/Projects';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Mushiii - Mushroom Coffee E-commerce',
    description: 'A fully functional Shopify store for Mushiii, a premium mushroom-powered coffee brand. Developed custom theme, product pages, subscription functionality, and integrated payment systems. Features include monthly subscription options, product variants, and a modern, responsive design that showcases the brand\'s unique identity.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'HTML'],
    image: '/mushiii.png', // Add your project images to /public folder
    link: 'https://mushiii.com/',
  },
  {
    id: 2,
    title: 'SleepSharm - Bedding & Home Textiles Store',
    description: 'E-commerce Shopify store for SleepSharm, a Ukrainian bedding and home textiles retailer. Built custom product collections, filtering system, and multi-language support. Implemented responsive design with advanced product filtering, size selection, and seamless checkout experience for the Ukrainian market.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'HTML'],
    image: '/sleepsharm.png', // Add your project images to /public folder
    link: 'https://sleepsharm.com.ua/',
  },
  {
    id: 3,
    title: 'Metaversus Landing',
    description: 'A modern, interactive landing page for Metaversus built with Next.js, TailwindCSS, and Framer Motion. The project features smooth animations, responsive design, and engaging user interactions. Implemented custom animations using Framer Motion for page transitions and scroll-triggered effects. The design emphasizes a futuristic aesthetic with carefully crafted UI components and seamless navigation. Optimized for performance with Next.js server-side rendering and image optimization.',
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    image: '/metaversus.png', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub link
  },
  {
    id: 4,
    title: 'APPLE gadgets Store',
    description: 'A full-stack e-commerce application for an online phone and accessories store. Built with React and TypeScript on the frontend, featuring a clean and intuitive user interface using MaterialUI and custom Sass styling. The backend is powered by Node.js with Express, handling product management, user authentication, and order processing. Includes features like product filtering, search functionality, shopping cart, and secure checkout process. The application provides a seamless shopping experience with responsive design across all devices.',
    tech: ['React', 'Sass', 'MaterialUI', 'Node.js', 'TypeScript'],
    image: '/apple-store.png', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub Frontend link
  },
  {
    id: 5,
    title: 'Checklist Application with React',
    description: 'A comprehensive task management application built with React and TypeScript. Features a clean, minimalist interface for creating, organizing, and tracking tasks. The app integrates with a RESTful API for persistent data storage, allowing users to add, edit, delete, and mark tasks as complete. Includes local state management for real-time updates and smooth user interactions. The application demonstrates modern React patterns including hooks, component composition, and TypeScript for type safety. Designed with a focus on usability and performance.',
    tech: ['React', 'TypeScript'],
    image: '/checklist.png', // Add your project images to /public folder
    link: '#', // Add your demo link
    github: '#', // Add your GitHub link
  },
  {
    id: 6,
    title: 'Tour Agency Management System',
    description: 'A full-stack web application for managing tour operations between tour operators and travel agents. Built as a university Software Engineering project with React, TypeScript, and Node.js. Features role-based access control, tour management, booking request system, and subscription functionality. Includes modern UI with dark mode support, internationalization (English/Ukrainian), and real-time data management. The backend uses Express.js with MongoDB, implementing JWT authentication and RESTful API design.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    image: '/tour-agency.png', // Add your project images to /public folder
    link: 'https://davinnchii.github.io/tour_agency/',
    github: 'https://github.com/davinnchii/tour_agency',
  },
];

export const education: Education[] = [
  {
    period: '2022 - 2026',
    institution: 'Nizhyn Gogol State University',
    degree: 'Bachelor\'s Degree in Computer Science',
    description: 'Currently pursuing a degree in Computer Science with focus on modern software development practices.',
    projectId: 6, // Tour Agency Management System
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

