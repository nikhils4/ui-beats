"use client";
import React from "react";
import { TextShine } from "@/components/demo/text/text-shine";

const TextShineUsage = () => {
  return <TextShine text="I am Shiny" shineColor="#FFD700" duration={5} />;
};

TextShineUsage.stringVersion = `<TextShine text="I am Shiny" shineColor="#FFD700" duration={5}/>`;

export default TextShineUsage;
