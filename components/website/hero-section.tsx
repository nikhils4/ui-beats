export const HeroSection = () => {
  let libraryName = "ui/beats";

  return (
    <div className="mt-10 grid grid-cols-1 md:mt-20">
      <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
        <a href="/docs/components/pulsating-button">
          <div className="group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40">
            {/* Light mode gradient */}
            <div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ff7a40]/50 via-[#ff4040]/50 to-[#ff7a40]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] dark:hidden"></div>
            {/* Dark mode gradient */}
            <div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#4050ff]/50 via-[#40ff7a]/50 to-[#4050ff]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] dark:block"></div>
            <div className="absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#ff7a40]/50 via-[#ff4040]/50 to-[#ff7a40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-px ![mask-composite:subtract] dark:hidden"></div>
            <div className="absolute inset-0 block size-full animate-gradient bg-gradient-to-r from-[#4050ff]/50 via-[#40ff7a]/50 to-[#4050ff]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-px ![mask-composite:subtract] dark:block"></div>
            🚀{" "}
            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-border w-px mx-2 h-4"
            ></div>
            <span className="animate-gradient bg-gradient-to-r from-[#ff7a40] via-[#ff4040] to-[#ff7a40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent inline dark:hidden">
              Introducing {libraryName}
            </span>
            <span className="animate-gradient bg-gradient-to-r from-[#4050ff] via-[#40ff7a] to-[#4050ff] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent inline hidden dark:inline">
              Introducing {libraryName}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-right ml-1 size-4 text-gray-500"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </a>

        <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
          <h1 className="text-black dark:text-white relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2 text-left tracking-tighter text-balance md:text-center font-semibold md:text-7xl lg:text-7xl sm:text-7xl text-5xl">
            Supercharge your UI
          </h1>
        </div>
        <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg ">
          Level up your UI development with reusable components from UI Beats,
          crafted with <b>React</b>, <b>Typescript</b>, <b>Tailwind CSS</b>, and
          <b> Framer Motion</b>.
        </p>
      </div>
    </div>
  );
};
