import React from "react";

export interface ComponentProps {
  key?: number;
}

export type ComponentMap = {
    "fade-in": React.ComponentType<ComponentProps>;
    "rotate-in": React.ComponentType<ComponentProps>;
    "gradient-flow": React.ComponentType<ComponentProps>;
    "bounce": React.ComponentType<ComponentProps>;
    "gravity-text-swap": React.ComponentType<ComponentProps>;
    "smooth-reveal": React.ComponentType<ComponentProps>;
    "text-writer": React.ComponentType<ComponentProps>;
    "scale-in": React.ComponentType<ComponentProps>;
    "shimmer-effect": React.ComponentType<ComponentProps>;
    "flip-card": React.ComponentType<ComponentProps>;
    "morphing-card": React.ComponentType<ComponentProps>;
  "glowing-card": React.ComponentType<ComponentProps>;
  "sparkling-grid": React.ComponentType<ComponentProps>;
};

export type ComponentName = keyof ComponentMap;