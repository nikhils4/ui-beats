export const sideNav: {
  subItems: { path: string; title: string; isNew?: boolean }[];
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
      {
        title: "Subscribe Button",
        path: "/docs/components/subscribe-button",
        isNew: true,
      },
      {
        title: "Sparkling Grid",
        path: "/docs/components/sparkling-grid",
        isNew: true,
      },
    ],
  },
  {
    title: "Modern Animation",
    subItems: [
      {
        title: "Glowing Card",
        path: "/docs/modern-animation/glowing-card",
        isNew: true,
      },
      {
        title: "Gravity Text Swap",
        path: "/docs/modern-animation/gravity-text-swap",
      },
      { title: "Text Writer", path: "/docs/modern-animation/text-writer" },
      { title: "Morphing Card", path: "/docs/modern-animation/morphing-card" },
    ],
  },
  {
    title: "Animation",
    subItems: [
      { title: "Bounce", path: "/docs/animation/bounce" },
      { title: "Fade In", path: "/docs/animation/fade-in" },
      { title: "Fade In Unblur", path: "/docs/animation/fade-in-unblur" },
      { title: "Flip Card", path: "/docs/animation/flip-card" },
      { title: "Rotate In", path: "/docs/animation/rotate-in" },
      { title: "Scale In", path: "/docs/animation/scale-in" },
      { title: "Smooth Reveal", path: "/docs/animation/smooth-reveal" },
    ],
  },
];
