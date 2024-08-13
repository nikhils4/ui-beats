import FadeInConfig from "@/content/docs/animation/fade-in.content";
import ScaleInConfig from "@/content/docs/animation/scale-in.content";
import RotateInConfig from "@/content/docs/animation/rotate-in.content";
import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/animation/text-writer.content";
import {DocsConfigType} from "@/types/docs-config.type";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "fade-in": FadeInConfig,
    "rotate-in": RotateInConfig,
    "text-writer": TextWriterConfig,
    "scale-in": ScaleInConfig,
    "smooth-reveal": SmoothRevealConfig,
  },
};

export default DocsContentConfig;
