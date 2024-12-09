/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import hero from "@/public/hero_setup.jpg"
import { Welcome } from "./Welcome";

export const Hero = () => {
    return (
        <div className="bg-[#0a001b] -mb-1 min-h-[88vh] flex justify-center items-center">
            <div className="flex justify-between items-center mx-auto max-w-page p-4 gap-8">
                <div>
                    <Welcome />
                    <div className="animate-fadeinup">
                        <p className="text-white">
                            My name is Ian Dunkerley, a front-end developer based in Torquay, Devon, UK. I have worked on a wide range of front-end projects,
                            from DJ applications to eCommerce booking platforms, with a focus on creating clean, well-crafted interfaces that not only look great but also provide a seamless user experience.
                        </p>
                    </div>
                </div>
                <div className="w-full h-full animate-fadeinup">
                    <Image width={500} height={500} src={hero} alt="image" style={{
                        maskImage: 'radial-gradient(circle, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 66%)',
                    }} />
                </div>
            </div>
        </div>
    );
}