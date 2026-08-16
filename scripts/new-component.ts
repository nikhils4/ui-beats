/**
 * Scaffolds a new component across every file that has to know about it.
 *
 *     yarn new:component --name flip-clock --category component
 *
 * Adding a component by hand means four new files and three separate registries
 * to edit (`content/docs/index.ts`, the preview map and the harness map) and
 * missing any one of them fails somewhere other than where the mistake was.
 * That is a fine amount of ceremony for someone who has done it forty times and
 * a wall for a first-time contributor, which is the population this needs to
 * serve if components are ever to arrive from outside.
 *
 * Everything written here is a stub that compiles, renders and passes the
 * suite. It is meant to be replaced, not kept.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const CATEGORIES = [
  "animation",
  "background",
  "button",
  "card",
  "component",
  "text",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Args {
  name: string;
  category: Category;
  title: string;
}

function fail(message: string): never {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

/** `flip-clock` -> `FlipClock`. */
function pascal(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** `flip-clock` -> `Flip Clock`. */
function titleCase(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseArgs(argv: string[]): Args {
  const values = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg?.startsWith("--")) continue;
    const [flag, inline] = arg.slice(2).split("=");
    values.set(flag!, inline ?? argv[++i] ?? "");
  }

  const name = values.get("name")?.trim();
  const category = values.get("category")?.trim() as Category | undefined;

  if (!name || !category) {
    fail(
      "Usage: yarn new:component --name <kebab-case> --category <" +
        CATEGORIES.join("|") +
        ">",
    );
  }

  // The name is a URL segment, a filename and part of an identifier all at
  // once, so anything but kebab-case breaks at least one of the three.
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
    fail(
      `"${name}" is not kebab-case. Try "${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}".`,
    );
  }

  if (!CATEGORIES.includes(category)) {
    fail(`Unknown category "${category}". One of: ${CATEGORIES.join(", ")}`);
  }

  return {
    name,
    category,
    title: values.get("title")?.trim() || titleCase(name),
  };
}

function write(relativePath: string, contents: string) {
  const target = path.join(ROOT, relativePath);
  if (fs.existsSync(target)) fail(`${relativePath} already exists.`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
  console.log(`  created  ${relativePath}`);
}

/**
 * Inserts a line into a file after the last line matching `anchor`.
 *
 * Falls back to `beforeLast` when the category has no entries yet, which is
 * the only case where there is nothing to sit after.
 */
function insertLine(
  relativePath: string,
  line: string,
  anchor: RegExp,
  beforeLast: RegExp,
) {
  const target = path.join(ROOT, relativePath);
  const lines = fs.readFileSync(target, "utf8").split("\n");

  let at = -1;
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (anchor.test(lines[i]!)) {
      at = i + 1;
      break;
    }
  }

  if (at === -1) {
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      if (beforeLast.test(lines[i]!)) {
        at = i;
        break;
      }
    }
  }

  if (at === -1) fail(`Could not find an insertion point in ${relativePath}.`);

  lines.splice(at, 0, line);
  fs.writeFileSync(target, lines.join("\n"));
  console.log(`  updated  ${relativePath}`);
}

/**
 * Inserts a multi-line entry into a lazy-import map.
 *
 * The maps hold four-line entries, so anchoring on the `import(...)` line and
 * inserting straight after it would land in the middle of the previous entry.
 * This finds the last entry for the category, walks to the end of it, and
 * appends there.
 */
function insertMapEntry(
  relativePath: string,
  entry: string,
  importAnchor: RegExp,
) {
  const target = path.join(ROOT, relativePath);
  const lines = fs.readFileSync(target, "utf8").split("\n");

  let at = -1;
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (importAnchor.test(lines[i]!)) {
      // Walk to the `),` that closes this entry.
      let end = i;
      while (end < lines.length && lines[end] !== "  ),") end += 1;
      at = end + 1;
      break;
    }
  }

  // No entry for this category yet: sit just before the closing brace.
  if (at === -1) at = lines.findIndex((line) => line === "};");
  if (at <= 0) fail(`Could not find an insertion point in ${relativePath}.`);

  lines.splice(at, 0, entry);
  fs.writeFileSync(target, lines.join("\n"));
  console.log(`  updated  ${relativePath}`);
}

function main() {
  const { name, category, title } = parseArgs(process.argv.slice(2));
  const Pascal = pascal(name);
  const key = `${category}/${name}`;

  const indexPath = path.join(ROOT, "content", "docs", "index.ts");
  if (fs.readFileSync(indexPath, "utf8").includes(`./${key}.content`)) {
    fail(`"${name}" is already registered in content/docs/index.ts.`);
  }

  console.log(`\n  ${title} (${key})\n`);

  write(
    `components/demo/${key}.tsx`,
    `"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ${Pascal}Props {
  children: React.ReactNode;
  /** Length of the animation, in seconds. */
  duration?: number;
  className?: string;
}

/**
 * TODO: describe what this does and why it is built this way.
 */
export function ${Pascal}({
  children,
  duration = 0.5,
  className = "",
}: ${Pascal}Props) {
  const prefersReducedMotion = useReducedMotion();

  // Every component in the library honours this; tests/reduced-motion.test.ts
  // fails the build if a new one does not.
  const initial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : duration }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default ${Pascal};
`,
  );

  write(
    `components/usage/${key}.usage.tsx`,
    `"use client";
import { ${Pascal} } from "@/components/demo/${key}";

const ${Pascal}Usage = () => {
  return (
    <${Pascal} duration={0.5}>
      <p className="text-sm">TODO: show ${title} doing something worth seeing.</p>
    </${Pascal}>
  );
};

export default ${Pascal}Usage;
`,
  );

  write(
    `components/playground/${key}.playground.tsx`,
    `"use client";

import { ${Pascal} } from "@/components/demo/${key}";
import { asProps } from "@/lib/playground";
import type { PlaygroundHarnessProps } from "@/types/playground.type";

/**
 * Playground harness for ${Pascal}.
 *
 * Mirrors \`components/usage/${key}.usage.tsx\` so the studio and the docs page
 * show the same demo.
 */
export default function ${Pascal}Playground({
  values,
}: PlaygroundHarnessProps) {
  const props = asProps(${Pascal}, values);

  return (
    <${Pascal} {...props}>
      <p className="text-sm">TODO: show ${title} doing something worth seeing.</p>
    </${Pascal}>
  );
}
`,
  );

  const today = new Date().toISOString().slice(0, 10);

  write(
    `content/docs/${key}.content.ts`,
    `import type { ComponentConfig } from "@/types/component-config.type";

const ${Pascal}Content: ComponentConfig = {
  name: "${name}",
  category: "${category}",
  title: "${title}",
  // TODO: one paragraph, leading with what the component does. This is the
  // meta description and the MCP catalogue entry, not just page copy.
  description:
    "The ${Pascal} component TODO.",
  addedAt: "${today}",
  // TODO: where this fits and where it does not. tests/seo.test.ts requires
  // more than 80 characters and rejects a copy of the description.
  whenToUse:
    "TODO: describe the situation this is right for, and the one it is not. Two or three sentences of real guidance, not a restatement of what it does.",
  props: [
    {
      prop: "children",
      type: "React.ReactNode",
      defaultValue: "-",
      description: "Content to animate (required)",
    },
    {
      prop: "duration",
      type: "number",
      defaultValue: "0.5",
      description: "Length of the animation, in seconds",
    },
    {
      prop: "className",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes for styling",
    },
  ],
  // Required: tests/registry.test.ts fails on any component added after the
  // grandfathered set without attribution. Use \`kind: "tool"\` if a model wrote
  // it: crediting one as a person is a lie to anything reading the schema.
  credits: {
    name: "TODO your name",
    url: "https://github.com/TODO",
  },
  playground: {
    childrenSource: \`  <p className="text-sm">TODO</p>\`,
    ranges: {
      duration: { min: 0.1, max: 3, step: 0.1, unit: "s" },
    },
  },
};

export default ${Pascal}Content;
`,
  );

  insertLine(
    "content/docs/index.ts",
    `import ${Pascal} from "./${key}.content";`,
    new RegExp(`^import \\w+ from "\\./${category}/[\\w-]+\\.content";$`),
    /^import type \{ ComponentConfig \}/,
  );

  /*
   * The array is ordered by category, and the sidebar, sitemap and registry all
   * read it in order, so a new entry goes at the end of its own category
   * rather than the end of the file.
   */
  const categoryImports = fs
    .readFileSync(indexPath, "utf8")
    .split("\n")
    .filter((line) =>
      new RegExp(`from "\\./${category}/[\\w-]+\\.content";$`).test(line),
    )
    .map((line) => /^import (\w+)/.exec(line)?.[1])
    .filter((identifier): identifier is string => Boolean(identifier));

  insertLine(
    "content/docs/index.ts",
    `  ${Pascal},`,
    new RegExp(`^  (${categoryImports.join("|")}),$`),
    /^\];$/,
  );

  insertMapEntry(
    "components/website/component-preview.tsx",
    `  "${key}": dynamic(
    () => import("@/components/usage/${key}.usage"),
    { loading },
  ),`,
    new RegExp(`^\\s+\\(\\) => import\\("@/components/usage/${category}/`),
  );

  insertMapEntry(
    "components/website/playground-harnesses.tsx",
    `  "${key}": dynamic(
    () => import("@/components/playground/${key}.playground"),
    { loading },
  ),`,
    new RegExp(`^\\s+\\(\\) => import\\("@/components/playground/${category}/`),
  );

  console.log(`
  Next:
    1. Write the component in components/demo/${key}.tsx
    2. Replace every TODO in content/docs/${key}.content.ts
    3. yarn format && yarn lint && yarn test
    4. yarn dev, then open /docs/${key}
`);
}

main();
