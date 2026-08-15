"use client";
import { Pricing } from "@/components/demo/block/pricing";

const TIERS = [
  {
    name: "Hobby",
    price: "Free",
    description: "Everything you need to start.",
    features: ["All 40 components", "MIT licensed", "Community support"],
    action: { label: "Get started", href: "#" },
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For teams shipping regularly.",
    features: ["Everything in Hobby", "Private registry", "Priority support"],
    action: { label: "Start free trial", href: "#" },
    featured: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For a whole design system.",
    features: ["Everything in Pro", "Shared themes", "Onboarding call"],
    action: { label: "Contact sales", href: "#" },
  },
];

const PricingUsage = () => {
  return (
    <Pricing
      heading="Priced to start free"
      description="Every component is MIT licensed. Pay only when you want the extras."
      tiers={TIERS}
    />
  );
};

export default PricingUsage;
