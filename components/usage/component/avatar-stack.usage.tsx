"use client";
import { AvatarStack } from "@/components/demo/component/avatar-stack";

const TEAM = [
  { name: "Ava Chen" },
  { name: "Marcus Hale" },
  { name: "Priya Nair" },
  { name: "Diego Ramos" },
  { name: "Yuki Tanaka" },
  { name: "Noor Haddad" },
  { name: "Sam Okafor" },
];

const AvatarStackUsage = () => {
  return (
    <div className="flex items-center gap-3">
      <AvatarStack avatars={TEAM} max={5} />
      <p className="text-sm text-muted-foreground">
        Joined by 2,400 teams this month
      </p>
    </div>
  );
};

export default AvatarStackUsage;
