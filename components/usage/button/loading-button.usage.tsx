"use client";
import { LoadingButton } from "@/components/demo/button/loading-button";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const LoadingButtonUsage = () => {
  return (
    <LoadingButton
      onAction={() => wait(1400)}
      loadingText="Publishing"
      successText="Published"
    >
      Publish changes
    </LoadingButton>
  );
};

export default LoadingButtonUsage;
