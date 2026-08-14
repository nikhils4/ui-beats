import type { ComponentConfig } from "@/types/component-config.type";

const OrbitingElementsContent: ComponentConfig = {
  name: "orbiting-elements",
  category: "background",
  title: "Orbiting Elements",
  description:
    "The OrbitingElements component places children evenly around a circle and rotates them around a centre point, keeping each one upright.",
  addedAt: "2026-08-12",
  whenToUse:
    "For showing that several things revolve around one: integrations around a product, tools around a workflow. It reads best with a fixed centrepiece inside the orbit. Two rings at different radii and speeds give you depth, and three or four items per ring keeps them from colliding.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Elements to place around the orbit (required)",
    },
    {
      prop: "radius",
      type: "number",
      defaultValue: "100",
      description: "Orbit radius in pixels",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "20",
      description: "Seconds for one full revolution",
    },
    {
      prop: "reverse",
      type: "boolean",
      defaultValue: "false",
      description: "Orbit anticlockwise",
    },
    {
      prop: "showPath",
      type: "boolean",
      defaultValue: "true",
      description: "Draw the dashed orbit path",
    },
    {
      prop: "startAngle",
      type: "number",
      defaultValue: "0",
      description: "Degrees to offset the first item by",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for the container",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
  playground: {
    childrenSource: `  {[Atom, Cpu, Boxes].map((Icon, index) => (
    <Orbit key={index}>
      <Icon className="size-4 text-muted-foreground" />
    </Orbit>
  ))}`,
  },
};

export default OrbitingElementsContent;
