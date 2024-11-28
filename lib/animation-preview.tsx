import React from "react";
import usageComponents from "@/components/usage";
import { ComponentMap, ComponentName } from "@/types/component-map.type";

const componentMap: ComponentMap = {
  "fade-in": usageComponents.animation.FadeInUsage,
  "rotate-in": usageComponents.animation.RotateInUsage,
  "gradient-flow": usageComponents.background.GradientFlowUsage,
  bounce: usageComponents.animation.BounceUsage,
  "gravity-text-swap": usageComponents.text.GravityTextSwapUsage,
  "smooth-reveal": usageComponents.animation.SmoothRevealUsage,
  "text-writer": usageComponents.text.TextWriterUsage,
  "scale-in": usageComponents.animation.ScaleInUsage,
  "shimmer-effect": usageComponents.component.ShimmerEffectUsage,
  "flip-card": usageComponents.card.FlipCardUsage,
  "morphing-card": usageComponents.card.MorphingCardUsage,
  "glowing-card": usageComponents.card.GlowingCardUsage,
  "sparkling-grid": usageComponents.background.SparklingGridUsage,
  "subscribe-button": usageComponents.button.SubscribeButtonUsage,
  "fade-in-unblur": usageComponents.animation.FadeInUnblurUsage,
  "text-shine": usageComponents.text.TextShineUsage,
};

export const getAnimationPreview = (
  componentName: ComponentName,
  key: number = 0,
  isString: boolean = false
) => {
  const Component = componentMap[componentName];
  if (!Component) return "";

  if (isString) {
    return (Component as any).stringVersion;
  }

  return <Component key={key} />;
};
