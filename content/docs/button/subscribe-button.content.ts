import type { ComponentConfig } from "@/types/component-config.type";

const SubscribeButtonContent: ComponentConfig = {
  name: "subscribe-button",
  category: "button",
  title: "Subscribe Button",
  description:
    "The SubscribeButton component is an interactive button for subscription actions, modelled on the YouTube subscribe animation, with customisable styles and timings.",
  addedAt: "2024-09-18",
  whenToUse:
    "A high-feedback confirmation button, modelled on YouTube's subscribe interaction. Use it where the state change is the point: following, subscribing, joining. On an ordinary form submit the celebration is out of proportion to what happened.",
  props: [
    {
      prop: "onClick",
      type: "() => void",
      defaultValue: "undefined",
      description: "Function to be called when the button is clicked",
    },
    {
      prop: "text",
      type: "string",
      defaultValue: "'Subscribe'",
      description: "Text to be displayed on the button",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes to be applied to the button",
    },
  ],
};

export default SubscribeButtonContent;
