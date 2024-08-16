import React from "react";
import usageComponents from "@/components/usage";
import { ComponentMap, ComponentName } from "@/types/component-map.type";

const componentMap: ComponentMap = {
  "fade-in": usageComponents.animation.FadeInUsage,
  "rotate-in": usageComponents.animation.RotateInUsage,
  "gradient-flow": usageComponents.components.GradientFlowUsage,
  bounce: usageComponents.animation.BounceUsage,
  "gravity-text-swap": usageComponents["modern-animation"].GravityTextSwapUsage,
  "smooth-reveal": usageComponents.animation.SmoothRevealUsage,
  "text-writer": usageComponents["modern-animation"].TextWriterUsage,
  "scale-in": usageComponents.animation.ScaleInUsage,
  "shimmer-effect": usageComponents.components.ShimmerEffectUsage,
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
