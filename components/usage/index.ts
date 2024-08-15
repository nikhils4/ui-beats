export default {
    animation: {
        BounceUsage: require("./animation/bounce.usage").default,
        FadeInUsage: require("./animation/fade-in.usage").default,
        RotateInUsage: require("./animation/rotate-in.usage").default,
        ScaleInUsage: require("./animation/scale-in.usage").default,
        SmoothRevealUsage: require("./animation/smooth-reveal.usage").default,
    },
    ["modern-animation"]: {
        GradientFlowUsage: require("./modern-animation/gradient-flow.usage").default,
        GravityTextSwapUsage: require("./modern-animation/gravity-text-swap.usage").default,
        ShimmerEffectUsage: require("./modern-animation/shimmer-effect.usage").default,
        TextWriterUsage: require("./modern-animation/text-writer.usage").default,
    }
}