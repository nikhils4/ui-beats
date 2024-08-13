import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/animation/text-writer.content";
import ScaleInConfig from "@/content/docs/animation/scale-in.content";
import { DocsConfigType } from "@/types/docs-config.type";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "text-writer": TextWriterConfig,
    "smooth-reveal": SmoothRevealConfig,
    "scale-in": ScaleInConfig,
  },
};

export default DocsContentConfig;
