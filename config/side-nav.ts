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
    title: "Components",
    subItems: [
      { title: "Gradient Flow", path: "/docs/components/gradient-flow" },
      { title: "Shimmer Effect", path: "/docs/components/shimmer-effect" },
    ],
  },
  {
    title: "Modern Animation",
    subItems: [
      { title: "Glowing Card", path: "/docs/modern-animation/glowing-card" },
      { title: "Gravity Text Swap", path: "/docs/modern-animation/gravity-text-swap" },
      { title: "Text Writer", path: "/docs/modern-animation/text-writer" },
      { title: "Morphing Card", path: "/docs/modern-animation/morphing-card" },
    ],
  },
  {
    title: "Animation",
    subItems: [
      { title: "Bounce", path: "/docs/animation/bounce" },
      { title: "Fade In", path: "/docs/animation/fade-in" },
      { title: "Flip Card", path: "/docs/animation/flip-card" },
      { title: "Rotate In", path: "/docs/animation/rotate-in" },
      { title: "Scale In", path: "/docs/animation/scale-in" },
      { title: "Smooth Reveal", path: "/docs/animation/smooth-reveal" },
    ],
  },
];
