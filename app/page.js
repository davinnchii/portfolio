import { Curve } from "@/components/Curve";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Curve />
      <ProjectList />
    </>
  );
}
