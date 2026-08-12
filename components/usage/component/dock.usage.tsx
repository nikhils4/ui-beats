"use client";
import { Dock, DockItem } from "@/components/demo/component/dock";
import { Home, Layers, Mail, Search, Settings } from "lucide-react";

const ITEMS = [
  { label: "Home", icon: Home },
  { label: "Search", icon: Search },
  { label: "Projects", icon: Layers },
  { label: "Mail", icon: Mail },
  { label: "Settings", icon: Settings },
];

const DockUsage = () => {
  return (
    <Dock size={44} magnification={76} reach={130}>
      {ITEMS.map(({ label, icon: Icon }) => (
        <DockItem key={label} label={label} onClick={() => {}}>
          <Icon className="size-1/2 text-muted-foreground" />
        </DockItem>
      ))}
    </Dock>
  );
};

export default DockUsage;
