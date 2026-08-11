import type { ComponentConfig } from "@/types/component-config.type";

const TiltCardContent: ComponentConfig = {
  name: "tilt-card",
  category: "card",
  title: "Tilt Card",
  description:
    "The TiltCard component tilts toward the pointer in 3D and tracks it with a specular highlight, giving flat cards a tactile, physical feel.",
  isNew: true,
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content rendered inside the card (required)",
    },
    {
      prop: "maxTilt",
      type: "number",
      defaultValue: "12",
      description: "Maximum rotation in degrees at the edges of the card",
    },
    {
      prop: "hoverScale",
      type: "number",
      defaultValue: "1.03",
      description: "Scale applied while the pointer is over the card",
    },
    {
      prop: "glareOpacity",
      type: "number",
      defaultValue: "0.25",
      description: "Strength of the specular highlight, between 0 and 1",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the outer perspective wrapper",
    },
  ],
};

export default TiltCardContent;
