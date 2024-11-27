import { Book, LayoutGrid, Sparkles, LucideIcon, ArrowUpDown } from "lucide-react";

export const sideNav: {
  subItems: { path: string; title: string; isNew?: boolean }[];
  title: string;
  icon?: LucideIcon;
}[] = [
  {
    title: "Getting Started",
    icon: Book,
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
    icon: LayoutGrid,
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
      {
        title: "Text Shine",
        path: "/docs/components/text-shine",
        isNew: true,
      },
    ],
  },
  {
    title: "Modern Animation",
    icon: Sparkles,
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
    icon: ArrowUpDown,
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
