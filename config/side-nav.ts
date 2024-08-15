export const sideNav: {
  subItems: { path: string; title: string }[];
  title: string;
}[] = [
  {
    title: "Getting Started",
    subItems: [
      {
        title: "Introduction",
        path: "/docs/getting-started/introduction",
      },
      {
        title: "Installation",
        path: "/docs/getting-started/installation",
      },
      {
        title: "Contribute",
        path: "/docs/getting-started/contribute",
      },
    ],
  },
  {
    title: "Modern Animation",
    subItems: [
      { title: "Gradient Flow", path: "/docs/modern-animation/gradient-flow" },
      { title: "Gravity Text Swap", path: "/docs/modern-animation/gravity-text-swap" },
      { title: "Shimmer Effect", path: "/docs/modern-animation/shimmer-effect" },
      { title: "Text Writer", path: "/docs/modern-animation/text-writer" },
    ],
  },
  {
    title: "Animation",
    subItems: [
      { title: "Bounce", path: "/docs/animation/bounce" },
      { title: "Fade In", path: "/docs/animation/fade-in" },
      { title: "Rotate In", path: "/docs/animation/rotate-in" },
      { title: "Scale In", path: "/docs/animation/scale-in" },
      { title: "Smooth Reveal", path: "/docs/animation/smooth-reveal" },
    ],
  },
];
