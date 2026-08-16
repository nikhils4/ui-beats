# UI Beats component reference

Generated from `public/r/registry.json`. 55 entries.

Install any entry with the shadcn CLI. The source is written into your
project; there is no package to pin.

```bash
npx shadcn@latest add https://uibeats.com/r/<slug>.json
```

Every component ships a props table, an interactive playground and a
`prefers-reduced-motion` path. Full docs: https://uibeats.com/docs

## Blocks

| Component    | Slug           | What it is                                                                                                                                 |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Feature Grid | `feature-grid` | The FeatureGrid block arranges a set of features into a bento layout, letting each one declare how many columns it spans so the arrangeme… |
| Hero         | `hero`         | The Hero block is a complete landing page opening: eyebrow, headline, description, two calls to action and a row of faces for social proo… |
| Pricing      | `pricing`      | The Pricing block lays out a row of plans and traces the recommended one with a travelling Border Beam, so the tier you want chosen is th… |

## Animation primitives

| Component      | Slug             | What it is                                                                                                                                 |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Animated List  | `animated-list`  | The AnimatedList component streams its children in one at a time, springing each new entry into place and pushing the older ones down unt… |
| Bounce         | `bounce`         | The Bounce component adds a playful, elastic animation to its children when they enter the viewport.                                       |
| Fade In        | `fade-in`        | The FadeIn component creates a smooth fade-in animation for its children when they enter the viewport.                                     |
| Fade In Unblur | `fade-in-unblur` | The FadeInUnblur component creates a smooth fade-in while unblurring animation for its children when they enter the viewport.              |
| Rotate In      | `rotate-in`      | The RotateIn component creates a smooth rotation animation for its children when they enter the viewport.                                  |
| Scale In       | `scale-in`       | The ScaleIn component creates a smooth scale-in animation for its children when they enter the viewport.                                   |
| Smooth Reveal  | `smooth-reveal`  | The SmoothReveal component creates a smooth reveal animation for its children when they enter the viewport.                                |
| Stagger List   | `stagger-list`   | The StaggerList component animates its children into view one after another when the list enters the viewport, without requiring any chan… |

## Backgrounds

| Component         | Slug                | What it is                                                                                                                                 |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Animated Beam     | `animated-beam`     | The AnimatedBeam component draws a curved line between any two elements and sends a gradient pulse along it, remeasuring whenever the lay… |
| Aurora            | `aurora`            | The Aurora component drifts three soft bands of colour behind your content on different periods, so the layer keeps rearranging itself in… |
| Dot Pattern       | `dot-pattern`       | The DotPattern component tiles a grid of dots behind your content and lights the ones nearest the pointer, using a masked second copy of…  |
| Gradient Flow     | `gradient-flow`     | The GradientFlow component creates a flowing gradient animation effect for its children, adding visual interest to backgrounds or UI elem… |
| Meteors           | `meteors`           | The Meteors component drops a field of glowing streaks across its container, each one falling at its own pace so the shower never settles… |
| Orbiting Elements | `orbiting-elements` | The OrbitingElements component places children evenly around a circle and rotates them around a centre point, keeping each one upright.    |
| Particles         | `particles`         | The Particles component draws a drifting field of specks on a canvas and scatters them away from the pointer, holding positions as fracti… |
| Retro Grid        | `retro-grid`        | The RetroGrid component lays an infinite grid back in 3D and scrolls it toward the viewer, fading out into a horizon. A synthwave backdro… |
| Sparkling Grid    | `sparkling-grid`    | The SparklingGrid component creates an animated grid of dots that ripples outward on mount and sparkles at random, ideal for dynamic, atm… |

## Buttons

| Component        | Slug               | What it is                                                                                                                                 |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Confetti Button  | `confetti-button`  | The ConfettiButton component throws a burst of confetti from its own centre when pressed, measuring the button's position at click time s… |
| Loading Button   | `loading-button`   | The LoadingButton component runs one async action and reports on it in place: it swaps to a spinner while the request is open, confirms w… |
| Magnetic Button  | `magnetic-button`  | The MagneticButton component drifts toward the pointer as it approaches and springs back when the pointer leaves, making calls to action…  |
| Rainbow Button   | `rainbow-button`   | The RainbowButton component rings a call to action with a band of colour that travels around it, drawn from the project's own chart token… |
| Ripple Button    | `ripple-button`    | The RippleButton component sends a ripple out from the exact point it was pressed, sized to reach the button's farthest corner so the who… |
| Shimmer Button   | `shimmer-button`   | The ShimmerButton component sweeps a band of light across its face on a loop, giving a call to action a slow pulse of movement without as… |
| Subscribe Button | `subscribe-button` | The SubscribeButton component is an interactive button for subscription actions, modelled on the YouTube subscribe animation, with custom… |

## Cards

| Component       | Slug              | What it is                                                                                                                                 |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Card Stack      | `card-stack`      | The CardStack component deals your content as a deck: drag the top card aside to throw it away, the cards behind rise a step, and the dis… |
| Expandable Card | `expandable-card` | The ExpandableCard component grows any row of a list into a detail panel in place, sharing a layout id between the two so the card the re… |
| Flip Card       | `flip-card`       | The FlipCard component creates an elegant, Apple-inspired interactive card that flips to reveal additional content. It features smooth an… |
| Glowing Card    | `glowing-card`    | The GlowingCard component tracks the cursor across the card and paints a soft glow wherever it goes, so the surface reacts as the pointer… |
| Morphing Card   | `morphing-card`   | The MorphingCard component creates an engaging, interactive card that smoothly transitions between different shapes and content. It featu… |
| Tilt Card       | `tilt-card`       | The TiltCard component tilts toward the pointer in 3D and tracks it with a specular highlight, giving flat cards a tactile, physical feel. |

## Text

| Component         | Slug                | What it is                                                                                                                                 |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Flip Words        | `flip-words`        | The FlipWords component cycles one slot in a sentence through a list of words, blurring each out as the next rises into its place and ani… |
| Gradient Text     | `gradient-text`     | The GradientText component paints a line of text with a colour ramp that travels across it on a loop, so a headline word carries the acce… |
| Gravity Text Swap | `gravity-text-swap` | The GravityTextSwap component drops characters into place under a gravity-like fall, so one word gives way to the next instead of simply…  |
| Number Ticker     | `number-ticker`     | The NumberTicker component counts a number up when it scrolls into view, with locale-aware formatting.                                     |
| Scroll Reveal     | `scroll-reveal`     | The ScrollReveal component lights up text word by word as the reader scrolls past it, tied to scroll position rather than a timer.         |
| Split Flap        | `split-flap`        | The SplitFlap component turns text into a mechanical departure board, each column riffling through the alphabet until it reaches its lett… |
| Text Scramble     | `text-scramble`     | The TextScramble component decodes text one character at a time, cycling through random glyphs before each letter settles into place.      |
| Text Shine        | `text-shine`        | The TextShine component sweeps a coloured highlight across your text on a loop, drawing the eye without demanding a click.                 |
| Text Writer       | `text-writer`       | The TextWriter component creates a typing animation effect for text, where characters appear one by one to mimic real-time typing.         |

## Components

| Component         | Slug                | What it is                                                                                                                                 |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Avatar Stack      | `avatar-stack`      | The AvatarStack component overlaps a row of avatars into a single group, collapses everyone past a limit into a +N chip, and lifts an ava… |
| Bento Grid        | `bento-grid`        | The BentoGrid component arranges cards of different sizes into the asymmetric layout known as a bento box, with each cell declaring how m… |
| Border Beam       | `border-beam`       | The BorderBeam component wraps any content in a border traced by a travelling beam of light. It follows the container's rounded corners e… |
| Comparison Slider | `comparison-slider` | The ComparisonSlider component stacks two layers and reveals one against the other with a divider the reader drags, clipping the top laye… |
| Dock              | `dock`              | The Dock component recreates the macOS dock: items swell as the pointer approaches, and each one names itself in a tooltip on hover or fo… |
| Liquid Tabs       | `liquid-tabs`       | The LiquidTabs component is a tab switcher whose selection pill flows between tabs, stretching in proportion to how fast it is travelling… |
| Marquee           | `marquee`           | The Marquee component scrolls its children in a seamless, infinite loop, with pause-on-hover and faded edges.                              |
| Progress Ring     | `progress-ring`     | The ProgressRing component sweeps an arc round to a value and counts a label up alongside it, driving both from one animation so the numb… |
| Scratch to Reveal | `scratch-to-reveal` | The ScratchToReveal component covers your content in a foil the user rubs away with a pointer, firing onComplete and dropping the rest of… |
| Scroll Progress   | `scroll-progress`   | The ScrollProgress component fills a thin bar as the reader moves through a page or a panel, scaling a single transform rather than resiz… |
| Shimmer Effect    | `shimmer-effect`    | The ShimmerEffect component creates a shimmering animation, ideal for loading placeholders or skeleton screens.                            |
| Terminal          | `terminal`          | The Terminal component replays a shell session, typing the commands character by character and printing everything else whole, with the p… |
| Timeline          | `timeline`          | The Timeline component lays events down a vertical rail that fills as the reader scrolls through them, scaling a single element rather th… |
