import SmoothRevealConfig from "@/content/docs/animation/smooth-reveal.content";
import TextWriterConfig from "@/content/docs/animation/text-writer.content";
import FadeInConfig from "@/content/docs/animation/fade-in.content";
import { DocsConfigType } from "@/types/docs-config.type";

const DocsContentConfig: DocsConfigType = {
  animation: {
    "text-writer": TextWriterConfig,
    "smooth-reveal": SmoothRevealConfig,
    "fade-in": FadeInConfig,
  },
};

export default DocsContentConfig;
