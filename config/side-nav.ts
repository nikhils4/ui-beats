import {
  ArrowUpDown,
  Book,
  Component,
  CreditCard,
  LucideIcon,
  MousePointer,
  Palette,
  Sparkles,
} from "lucide-react";

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
    title: "Animation",
    icon: ArrowUpDown,
    subItems: [
      { title: "Bounce", path: "/docs/animation/bounce" },
      { title: "Fade In", path: "/docs/animation/fade-in" },
      { title: "Fade In Unblur", path: "/docs/animation/fade-in-unblur" },
      { title: "Rotate In", path: "/docs/animation/rotate-in" },
      { title: "Scale In", path: "/docs/animation/scale-in" },
      { title: "Smooth Reveal", path: "/docs/animation/smooth-reveal" },
    ],
  },
  {
    title: "Background",
    icon: Palette,
    subItems: [
      { title: "Gradient Flow", path: "/docs/background/gradient-flow" },
      {
        title: "Sparkling Grid",
        path: "/docs/background/sparkling-grid",
        isNew: true,
      },
    ],
  },
  {
    title: "Button",
    icon: MousePointer,
    subItems: [
      {
        title: "Subscribe Button",
        path: "/docs/button/subscribe-button",
        isNew: true,
      },
    ],
  },
  {
    title: "Card",
    icon: CreditCard,
    subItems: [
      { title: "Flip Card", path: "/docs/card/flip-card" },
      {
        title: "Glowing Card",
        path: "/docs/card/glowing-card",
        isNew: true,
      },
      { title: "Morphing Card", path: "/docs/card/morphing-card" },
    ],
  },
  {
    title: "Component",
    icon: Component,
    subItems: [
      { title: "Shimmer Effect", path: "/docs/component/shimmer-effect" },
    ],
  },
  {
    title: "Text",
    icon: Sparkles,
    subItems: [
      {
        title: "Gravity Text Swap",
        path: "/docs/text/gravity-text-swap",
      },
      {
        title: "Text Shine",
        path: "/docs/text/text-shine",
        isNew: true,
      },
      { title: "Text Writer", path: "/docs/text/text-writer" },
    ],
  },
];
