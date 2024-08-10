import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  let libraryName = "ui/beats";

  return (
    <div className="mt-16 flex flex-col md:mt-20 h-full">
      <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
        <Link href="/docs/getting-started">
          <div className="group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40">
            <div className="absolute inset-0 block h-full w-full bg-gradient-to-r from-[#ff7a40]/50 via-[#ff4040]/50 to-[#ff7a40]/50 bg-[length:400%_100%] animate-gradient-x p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] dark:hidden"></div>
            <div className="absolute inset-0 block h-full w-full bg-gradient-to-r from-[#4050ff]/50 via-[#40ff7a]/50 to-[#4050ff]/50 bg-[length:400%_100%] animate-gradient-x p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] dark:block"></div>
            <div className="absolute inset-0 block size-full bg-gradient-to-r from-[#ff7a40]/50 via-[#ff4040]/50 to-[#ff7a40]/50 bg-[length:400%_100%] animate-gradient-x [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-px ![mask-composite:subtract] dark:hidden"></div>
            <div className="absolute inset-0 block size-full bg-gradient-to-r from-[#4050ff]/50 via-[#40ff7a]/50 to-[#4050ff]/50 bg-[length:400%_100%] animate-gradient-x [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-px ![mask-composite:subtract] dark:block"></div>
            🚀{" "}
            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-border w-px mx-2 h-4"
            ></div>
            <span className="bg-gradient-to-r from-[#ff7a40] via-[#ff4040] to-[#ff7a40] bg-[length:400%_100%] animate-gradient-x bg-clip-text text-transparent inline dark:hidden">
              Introducing {libraryName}
            </span>
            <span className="bg-gradient-to-r from-[#4050ff] via-[#40ff7a] to-[#4050ff] bg-[length:400%_100%] animate-gradient-x bg-clip-text text-transparent hidden dark:inline">
              Introducing {libraryName}
            </span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </div>
        </Link>
        <div className="relative flex flex-col gap-10 md:items-center lg:flex-row mt-6">
          <h1 className="text-black dark:text-white relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2 text-left tracking-tighter text-balance md:text-center font-semibold md:text-7xl lg:text-7xl sm:text-7xl text-5xl">
            Supercharge your UI
          </h1>
        </div>
        <p className="max-w-xl mt-6 mb-6 text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg ">
          Level up your UI development with reusable components from ui/beats,
          crafted with <b>React</b>, <b>Typescript</b>, <b>Tailwind CSS</b>, and
          <b> Framer Motion</b>.
        </p>
        <div className="flex flex-col md:flex-row">
          <Link
            rel="noopener noreferrer"
            href="/docs/getting-started"
            target="_blank"
          >
            <Button className="w-full">
              Browse Components <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a
            href="https://github.com/nikhils4/ui-beats"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="outline" className="mt-7 md:mt-0 md:ml-5 w-full">
              Contribute <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
