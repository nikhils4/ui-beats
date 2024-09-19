"use client";
import React from "react";
import { SubscribeButton } from "@/components/demo/components/subscribe-button";
import { useTheme } from "next-themes";

const SubscribeButtonUsage = () => {
  const { theme } = useTheme();
  
  return <SubscribeButton theme={theme as "light" | "dark"} />;
};

SubscribeButtonUsage.stringVersion = `<SubscribeButton theme={theme as "light" | "dark"} />`;

export default SubscribeButtonUsage;
