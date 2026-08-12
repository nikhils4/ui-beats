import type { ComponentConfig } from "@/types/component-config.type";

import Bounce from "./animation/bounce.content";
import FadeIn from "./animation/fade-in.content";
import FadeInUnblur from "./animation/fade-in-unblur.content";
import RotateIn from "./animation/rotate-in.content";
import ScaleIn from "./animation/scale-in.content";
import SmoothReveal from "./animation/smooth-reveal.content";
import StaggerList from "./animation/stagger-list.content";
import AnimatedBeam from "./background/animated-beam.content";
import OrbitingElements from "./background/orbiting-elements.content";
import GradientFlow from "./background/gradient-flow.content";
import SparklingGrid from "./background/sparkling-grid.content";
import MagneticButton from "./button/magnetic-button.content";
import SubscribeButton from "./button/subscribe-button.content";
import FlipCard from "./card/flip-card.content";
import GlowingCard from "./card/glowing-card.content";
import MorphingCard from "./card/morphing-card.content";
import TiltCard from "./card/tilt-card.content";
import Dock from "./component/dock.content";
import Marquee from "./component/marquee.content";
import ShimmerEffect from "./component/shimmer-effect.content";
import NumberTicker from "./text/number-ticker.content";
import ScrollReveal from "./text/scroll-reveal.content";
import GravityTextSwap from "./text/gravity-text-swap.content";
import TextScramble from "./text/text-scramble.content";
import TextShine from "./text/text-shine.content";
import TextWriter from "./text/text-writer.content";

/**
 * Every documented component, in one flat list.
 *
 * The sidebar, the sitemap, the command menu, the shadcn registry and the
 * static params for `/docs/[category]/[component]` are all derived from this
 * array — adding a component means adding one import here, not editing five
 * parallel maps.
 */
export const componentConfigs: ComponentConfig[] = [
  Bounce,
  FadeIn,
  FadeInUnblur,
  RotateIn,
  ScaleIn,
  SmoothReveal,
  StaggerList,
  AnimatedBeam,
  OrbitingElements,
  GradientFlow,
  SparklingGrid,
  MagneticButton,
  SubscribeButton,
  FlipCard,
  GlowingCard,
  MorphingCard,
  TiltCard,
  Dock,
  Marquee,
  ShimmerEffect,
  NumberTicker,
  ScrollReveal,
  GravityTextSwap,
  TextScramble,
  TextShine,
  TextWriter,
];

export default componentConfigs;
