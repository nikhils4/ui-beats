import React from "react";
import FlipCard from "@/components/demo/card/flip-card";

const FlipCardUsage = () => {
  return (
    <FlipCard
      frontContent={{
        title: "Discover",
        subtitle: "Hover to learn more",
      }}
      backContent={{
        title: "UI Beats",
        description:
          "A collection of modern and interactive UI components for React.",
      }}
      width="300px"
      height="200px"
      flipDirection="horizontal"
      triggerMode="hover"
    />
  );
};

FlipCardUsage.stringVersion = `<FlipCard
  frontContent={{
    title: "Discover",
    subtitle: "Hover to learn more"
  }}
  backContent={{
    title: "Innovation",
    description: "Explore cutting-edge features that redefine your experience."
  }}
  width="300px"
  height="200px"
  flipDirection="horizontal"
  triggerMode="hover"
/>`;

export default FlipCardUsage;
