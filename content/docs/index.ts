import FadeInConfig from "@/content/docs/animation/fade-in.content";
import RotateInConfig from "@/content/docs/animation/rotate-in.content";
import GradientFlowConfig from "@/content/docs/components/gradient-flow.content";
import BounceConfig from "@/content/docs/animation/bounce.content";
import GravityTextSwapConfig from "@/content/docs/modern-animation/gravity-text-swap.content";
import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/modern-animation/text-writer.content";
import ScaleInConfig from "@/content/docs/animation/scale-in.content";
import ShimmerEffectConfig from "@/content/docs/components/shimmer-effect.content";
import FlipCardConfig from "@/content/docs/components/flip-card.content";
import { DocsConfigType } from "@/types/docs-config.type";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "fade-in": FadeInConfig,
    "rotate-in": RotateInConfig,
    bounce: BounceConfig,
    "scale-in": ScaleInConfig,
    "smooth-reveal": SmoothRevealConfig,
  },
  "modern-animation": {
    "gravity-text-swap": GravityTextSwapConfig,
    "text-writer": TextWriterConfig,
  },
  components: {
    "gradient-flow": GradientFlowConfig,
    "shimmer-effect": ShimmerEffectConfig,
    "flip-card": FlipCardConfig,
  },
};

export default DocsContentConfig;
