import FadeInConfig from "@/content/docs/animation/fade-in.content";
import RotateInConfig from "@/content/docs/animation/rotate-in.content";
import GradientFlowConfig from "@/content/docs/animation/gradient-flow.content";
import BounceConfig from "@/content/docs/animation/bounce.content";
import GravityTextSwapConfig from "@/content/docs/animation/gravity-text-swap.content";
import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/animation/text-writer.content";
import ScaleInConfig from "@/content/docs/animation/scale-in.content";
import ShimmerEffectConfig from "@/content/docs/animation/shimmer-effect.content";
import {DocsConfigType} from "@/types/docs-config.type";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "fade-in": FadeInConfig,
    "rotate-in": RotateInConfig,
    "gradient-flow": GradientFlowConfig,
    "bounce": BounceConfig,
    "gravity-text-swap": GravityTextSwapConfig,
    "text-writer": TextWriterConfig,
    "scale-in": ScaleInConfig,
    "smooth-reveal": SmoothRevealConfig,
    "shimmer-effect": ShimmerEffectConfig,
  },
};

export default DocsContentConfig;
