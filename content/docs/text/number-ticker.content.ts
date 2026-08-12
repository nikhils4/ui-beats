import type { ComponentConfig } from "@/types/component-config.type";

const NumberTickerContent: ComponentConfig = {
  name: "number-ticker",
  category: "text",
  title: "Number Ticker",
  description:
    "The NumberTicker component counts a number up when it scrolls into view, with locale-aware formatting.",
  isNew: true,
  whenToUse:
    "For statistics that are the point of a section \u2014 users, uptime, revenue, downloads. The count implies growth, so it flatters numbers that are meant to impress and is wasted on ordinary values. Give it room to be read: a ticker inside a dense table is just a distraction.",
  props: [
    {
      prop: "value",
      type: "number",
      defaultValue: "-",
      description: "The value to count to (required)",
    },
    {
      prop: "from",
      type: "number",
      defaultValue: "0",
      description: "Where the count starts",
    },
    {
      prop: "decimals",
      type: "number",
      defaultValue: "0",
      description: "Decimal places to display",
    },
    {
      prop: "prefix",
      type: "string",
      defaultValue: "''",
      description: "Text placed before the number, e.g. a currency symbol",
    },
    {
      prop: "suffix",
      type: "string",
      defaultValue: "''",
      description: "Text placed after the number, e.g. a percent sign",
    },
    {
      prop: "once",
      type: "boolean",
      defaultValue: "true",
      description: "Count only the first time it scrolls into view",
    },
    {
      prop: "locale",
      type: "string",
      defaultValue: "'en-US'",
      description: "BCP 47 locale used for grouping separators",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  credits: {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    kind: "tool",
  },
};

export default NumberTickerContent;
