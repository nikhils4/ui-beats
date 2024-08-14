import React from "react";
import GravityTextSwap from "@/components/demo/gravity-text-swap";
import GradientFlow from "@/components/demo/gradient-flow";
import Bounce from "@/components/demo/bounce";
import SmoothReveal from "@/components/demo/smooth-reveal";
import FadeIn from "@/components/demo/fade-in";
import ScaleIn from "@/components/demo/scale-in";
import RotateIn from "@/components/demo/rotate-in";
import TextWriter from "@/components/demo/text-writer";
import ShimmerEffect from "@/components/demo/shimmer-effect";

export const getAnimationPreview = (
  componentName: string,
  key: number = 0,
  isString: boolean = false,
) => {
  switch (componentName) {
    case "fade-in":
      if (isString) {
        return `<FadeIn><p className="text-md mb-4">This content will fade in when it enters the viewport</p></FadeIn>`;
      }
      return (
        <FadeIn key={key}>
          <p className="text-xl">
            This content will fade in when it enters the viewport
          </p>
        </FadeIn>
      );
    case "rotate-in":
      if (isString) {
        return `<RotateIn><div className="text-md mb-4">This content will rotate in when visible</div></RotateIn>`;
      }
      return (
        <RotateIn key={key}>
          <div className="text-md mb-4">
            This content will rotate in when visible
          </div>
        </RotateIn>
      );
    case "gradient-flow":
      if (isString) {
        return `<GradientFlow
  duration={20} 
  colors={['#6366f1', '#2563eb', '#7c3aed', '#db2777']} 
  fullWidth={true}
  radialOverlay={true}
  blurAmount="10px"
>
  <div className="text-white text-md mb-4 font-medium">
    Flowing Gradient Background
  </div>
</GradientFlow>`;
              }
      return (
        <GradientFlow
          key={key}
          duration={20}
          colors={["#6366f1", "#2563eb", "#7c3aed", "#db2777"]}
          fullWidth={true}
          radialOverlay={true}
          blurAmount="10px"
        >
          <div className="text-white text-md mb-4">
            Flowing Gradient Background
          </div>
        </GradientFlow>
      );
    case "bounce":
      if (isString) {
        return `<Bounce><div className="text-md mb-4">This content will bounce when visible</div></Bounce>`;
      }
      return (
        <Bounce key={key}>
          <div className="text-md mb-4">
            This content will bounce when visible
          </div>
        </Bounce>
      );
    case "gravity-text-swap":
      if (isString) {
        return `<GravityTextSwap
  textArray={["Code", "Build", "Sleep", "Repeat"]}
  duration={0.5}
  pauseDuration={1}
  className="text-md mb-4"
/>`;
      }
      return (
        <GravityTextSwap
          key={key}
          textArray={["Code", "Build", "Sleep", "Repeat"]}
          duration={0.5}
          pauseDuration={1}
          className="text-md mb-4"
        />
      );
    case "smooth-reveal":
      if (isString) {
        return `<SmoothReveal><p className="text-md mb-4">This content will smoothly reveal on scroll</p></SmoothReveal>`;
      }
      return (
        <SmoothReveal key={key}>
          <p className="text-md mb-4">
            This content will smoothly reveal on scroll
          </p>
        </SmoothReveal>
      );
    case "scale-in":
      if (isString) {
        return `<ScaleIn><div className="text-md mb-4">This content will scale in when visible</div></ScaleIn>`;
      }
      return (
        <ScaleIn key={key}>
          <div className="text-md mb-4">
            This content will scale in when visible
          </div>
        </ScaleIn>
      );
    case "text-writer":
      if (isString) {
        return `<TextWriter text="Welcome to ui/beats" className="text-md mb-4" delay={0.1} />`;
      }
      return (
        <TextWriter
          key={key}
          text="Welcome to ui/beats"
          className="text-md mb-4"
          delay={0.1}
        />
      );
    case "shimmer-effect":
      if (isString) {
        return `<ShimmerEffect width="200px" height="20px" duration={2} />`;
      }
      return (
        <ShimmerEffect key={key} width="200px" height="20px" duration={2} />
      );
    default:
      return "";
  }
};
