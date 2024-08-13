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
    title: "Animation",
    subItems: [
      { title: "Scale In", path: "/docs/animation/scale-in" },
      { title: "Smooth Reveal", path: "/docs/animation/smooth-reveal" },
      { title: "Text Writer", path: "/docs/animation/text-writer" },
    ],
  },
];
