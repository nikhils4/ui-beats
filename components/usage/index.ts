const usageComponents = {
  animation: {
    BounceUsage: require("./animation/bounce.usage").default,
    FadeInUsage: require("./animation/fade-in.usage").default,
    RotateInUsage: require("./animation/rotate-in.usage").default,
    ScaleInUsage: require("./animation/scale-in.usage").default,
    SmoothRevealUsage: require("./animation/smooth-reveal.usage").default,
    FadeInUnblurUsage: require("./animation/fade-in-unblur.usage").default,
  },
  text: {
    TextShineUsage: require("./text/text-shine.usage").default,
    GravityTextSwapUsage: require("./text/gravity-text-swap.usage").default,
    TextWriterUsage: require("./text/text-writer.usage").default,
  },
  button: {
    SubscribeButtonUsage: require("./button/subscribe-button.usage").default,
  },
  background: {
    GradientFlowUsage: require("./background/gradient-flow.usage").default,
    SparklingGridUsage: require("./background/sparkling-grid.usage").default,
  },
  card: {
    MorphingCardUsage: require("./card/morphing-card.usage").default,
    GlowingCardUsage: require("./card/glowing-card.usage").default,
    FlipCardUsage: require("./card/flip-card.usage").default,
  },
  component: {
    ShimmerEffectUsage: require("./component/shimmer-effect.usage").default,
  },
};

export default usageComponents;
