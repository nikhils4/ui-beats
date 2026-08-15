import React from "react";
import MorphingCard from "@/components/demo/card/morphing-card";

const MorphingCardUsage = () => {
  return (
    <MorphingCard
      width="250px"
      height="250px"
      contents={[
        {
          shape: "rectangle",
          title: "Discover",
          description:
            "Explore our innovative features that redefine user experience.",
        },
        {
          shape: "circle",
          title: "Connect",
          description:
            "Join a community of forward-thinking individuals and ideas.",
        },
        {
          shape: "hexagon",
          title: "Transform",
          description:
            "Witness the evolution of design and functionality in real-time.",
        },
      ]}
      colorScheme={{ from: "var(--brand)", to: "var(--accent-pink)" }}
      autoPlay={true}
      interval={4000}
    />
  );
};

export default MorphingCardUsage;
