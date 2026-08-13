"use client";

import { CardStack } from "@/components/demo/card/card-stack";

const quotes = [
  {
    quote: "Dropped it in on a Friday and shipped the redesign on Monday.",
    name: "Ava Chen",
    role: "Design engineer",
  },
  {
    quote: "The only component library where I did not delete half the props.",
    name: "Marcus Hale",
    role: "Staff frontend",
  },
  {
    quote: "It reads like something a person wrote, because it is.",
    name: "Priya Nair",
    role: "Founder",
  },
];

const CardStackUsage = () => {
  return (
    <CardStack autoplay={3200} className="h-48 w-80">
      {quotes.map(({ quote, name, role }) => (
        <div key={name} className="flex h-full flex-col justify-between">
          <p className="text-sm leading-relaxed text-balance">“{quote}”</p>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      ))}
    </CardStack>
  );
};

export default CardStackUsage;
