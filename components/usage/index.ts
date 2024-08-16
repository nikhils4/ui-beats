export default {
    animation: {
        BounceUsage: require("./animation/bounce.usage").default,
        FadeInUsage: require("./animation/fade-in.usage").default,
        RotateInUsage: require("./animation/rotate-in.usage").default,
        ScaleInUsage: require("./animation/scale-in.usage").default,
        SmoothRevealUsage: require("./animation/smooth-reveal.usage").default,
    },
    ["modern-animation"]: {
        GravityTextSwapUsage: require("./modern-animation/gravity-text-swap.usage").default,
        TextWriterUsage: require("./modern-animation/text-writer.usage").default,
    },
    components: {
        GradientFlowUsage: require("./components/gradient-flow.usage").default,
        ShimmerEffectUsage: require("./components/shimmer-effect.usage").default,
    },
}