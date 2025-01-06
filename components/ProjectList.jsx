import { Project } from "./Project/Project";

const Projects = [
    {
        title: 'Metaversus Landing',
        description: 'Landing page about Metaversus with animations, Next.js and Tailwind',
        githubUrl: 'https://github.com/davinnchii/metaversus',
        demoUrl: 'https://metaversus-eight-eta.vercel.app/',
        image: '/metaversus_preview.jpg',
    }
];

export const ProjectList = () => {
    return (
        <section className="py-12 px-4 max-w-page mx-auto">
            <div className="text-center mb-12 gap-4 flex flex-col">
                <h2 className="text-5xl font-bold">My work</h2>
                <p>A collection of projects I&apos;ve worked on.</p>
            </div>
            <div className="flex gap-8">
                <Project project={Projects[0]} />
                <Project project={Projects[0]}/>
                <Project project={Projects[0]}/>
                <Project project={Projects[0]}/>
            </div>
        </section>
    )
}