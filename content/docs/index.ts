import type { ComponentConfig } from "@/types/component-config.type";

import AnimatedList from "./animation/animated-list.content";
import Bounce from "./animation/bounce.content";
import FadeIn from "./animation/fade-in.content";
import FadeInUnblur from "./animation/fade-in-unblur.content";
import RotateIn from "./animation/rotate-in.content";
import ScaleIn from "./animation/scale-in.content";
import SmoothReveal from "./animation/smooth-reveal.content";
import StaggerList from "./animation/stagger-list.content";
import FeatureGrid from "./block/feature-grid.content";
import Hero from "./block/hero.content";
import Pricing from "./block/pricing.content";
import AnimatedBeam from "./background/animated-beam.content";
import OrbitingElements from "./background/orbiting-elements.content";
import GradientFlow from "./background/gradient-flow.content";
import Meteors from "./background/meteors.content";
import RetroGrid from "./background/retro-grid.content";
import SparklingGrid from "./background/sparkling-grid.content";
import LoadingButton from "./button/loading-button.content";
import MagneticButton from "./button/magnetic-button.content";
import RippleButton from "./button/ripple-button.content";
import ShimmerButton from "./button/shimmer-button.content";
import SubscribeButton from "./button/subscribe-button.content";
import CardStack from "./card/card-stack.content";
import FlipCard from "./card/flip-card.content";
import GlowingCard from "./card/glowing-card.content";
import MorphingCard from "./card/morphing-card.content";
import TiltCard from "./card/tilt-card.content";
import AvatarStack from "./component/avatar-stack.content";
import BentoGrid from "./component/bento-grid.content";
import BorderBeam from "./component/border-beam.content";
import Dock from "./component/dock.content";
import LiquidTabs from "./component/liquid-tabs.content";
import Marquee from "./component/marquee.content";
import ScratchToReveal from "./component/scratch-to-reveal.content";
import ScrollProgress from "./component/scroll-progress.content";
import ShimmerEffect from "./component/shimmer-effect.content";
import NumberTicker from "./text/number-ticker.content";
import ScrollReveal from "./text/scroll-reveal.content";
import GravityTextSwap from "./text/gravity-text-swap.content";
import SplitFlap from "./text/split-flap.content";
import TextScramble from "./text/text-scramble.content";
import TextShine from "./text/text-shine.content";
import TextWriter from "./text/text-writer.content";

/**
 * Every documented component, in one flat list.
 *
 * The sidebar, the sitemap, the command menu, the shadcn registry and the
 * static params for `/docs/[category]/[component]` are all derived from this
 * array. Adding a component means adding one import here, not editing five
 * parallel maps.
 */
export const componentConfigs: ComponentConfig[] = [
  FeatureGrid,
  Hero,
  Pricing,
  AnimatedList,
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
  Meteors,
  RetroGrid,
  SparklingGrid,
  LoadingButton,
  MagneticButton,
  RippleButton,
  ShimmerButton,
  SubscribeButton,
  CardStack,
  FlipCard,
  GlowingCard,
  MorphingCard,
  TiltCard,
  AvatarStack,
  BentoGrid,
  BorderBeam,
  Dock,
  LiquidTabs,
  Marquee,
  ScratchToReveal,
  ScrollProgress,
  ShimmerEffect,
  NumberTicker,
  ScrollReveal,
  GravityTextSwap,
  SplitFlap,
  TextScramble,
  TextShine,
  TextWriter,
];

export default componentConfigs;
