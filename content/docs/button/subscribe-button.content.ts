import type { ComponentConfig } from "@/types/component-config.type";

const SubscribeButtonContent: ComponentConfig = {
  name: "subscribe-button",
  category: "button",
  title: "Subscribe Button",
  description:
    "The SubscribeButton component is an interactive button designed for subscription actions (more like Youtube Subscribe Button Animation), featuring customizable styles and animations.",
  isNew: true,
  whenToUse:
    "A high-feedback confirmation button modelled on YouTube's subscribe interaction. Use it where the state change is the point — following, subscribing, joining — rather than for ordinary form submits, where the celebration is out of proportion.",
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
