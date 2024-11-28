import FadeInConfig from "@/content/docs/animation/fade-in.content";
import RotateInConfig from "@/content/docs/animation/rotate-in.content";
import GradientFlowConfig from "@/content/docs/background/gradient-flow.content";
import BounceConfig from "@/content/docs/animation/bounce.content";
import GravityTextSwapConfig from "@/content/docs/text/gravity-text-swap.content";
import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/text/text-writer.content";
import ScaleInConfig from "@/content/docs/animation/scale-in.content";
import ShimmerEffectConfig from "@/content/docs/component/shimmer-effect.content";
import FlipCardConfig from "@/content/docs/card/flip-card.content";
import MorphingCardConfig from "@/content/docs/card/morphing-card.content";
import GlowingCardConfig from "./card/glowing-card.content";
import SparklingGridConfig from "@/content/docs/background/sparkling-grid.content";
import SubscribeButtonConfig from "@/content/docs/button/subscribe-button.content";
import { DocsConfigType } from "@/types/docs-config.type";
import FadeInUnblurContent from "./animation/fade-in-unblur.content";
import TextShineConfig from "./text/text-shine.content";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "fade-in": FadeInConfig,
    "rotate-in": RotateInConfig,
    bounce: BounceConfig,
    "scale-in": ScaleInConfig,
    "smooth-reveal": SmoothRevealConfig,
    "fade-in-unblur": FadeInUnblurContent,
  },
  text: {
    "gravity-text-swap": GravityTextSwapConfig,
    "text-writer": TextWriterConfig,
    "text-shine": TextShineConfig,
  },
  card: {
    "flip-card": FlipCardConfig,
    "morphing-card": MorphingCardConfig,
    "glowing-card": GlowingCardConfig,
  },
  background: {
    "sparkling-grid": SparklingGridConfig,
    "gradient-flow": GradientFlowConfig,
  },
  button: {
    "subscribe-button": SubscribeButtonConfig,
  },
  component: {
    "shimmer-effect": ShimmerEffectConfig,
  },
};

export default DocsContentConfig;
