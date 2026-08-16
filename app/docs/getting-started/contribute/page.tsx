import type { Metadata } from "next";
import { CodeBlock } from "@/components/website/code-block";
import { DocsBreadcrumb } from "@/components/website/docs-breadcrumb";
import { DocsPageHeader } from "@/components/website/docs-page-header";
import { DocsSection } from "@/components/website/docs-section";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to contribute a component to UI Beats: project setup, the scaffolder, the seven places a component lives, the fields the suite enforces, and the PR checklist.",
  alternates: { canonical: absoluteUrl("/docs/getting-started/contribute") },
};

const inlineCode =
  "rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]";

export default function ContributePage() {
  return (
    <div className="w-full min-w-0 pb-16">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs/getting-started/introduction" },
          { label: "Getting Started", href: "/docs/getting-started" },
          { label: "Contribute" },
        ]}
      />

      <DocsPageHeader
        title="Contribute"
        description="Add a component, fix a bug, improve the docs."
      />

      <DocsSection id="local-setup" title="Local setup">
        <CodeBlock
          language="bash"
          code={`git clone ${siteConfig.links.github}.git
cd ui-beats
corepack enable
yarn install
yarn dev`}
        />
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Requires Node 20.9 or newer and Yarn 4 via Corepack. Before opening a
          PR, run what CI runs: <code className={inlineCode}>yarn lint</code>,{" "}
          <code className={inlineCode}>yarn format:check</code>,{" "}
          <code className={inlineCode}>yarn typecheck</code>,{" "}
          <code className={inlineCode}>yarn test</code>,{" "}
          <code className={inlineCode}>yarn build</code> and{" "}
          <code className={inlineCode}>yarn test:e2e</code>. A fifth job diffs
          motion frames against pixel baselines; see below.
        </p>
      </DocsSection>

      <DocsSection
        id="scaffold"
        title="Start with the scaffolder"
        description="It writes four files, edits three registries and leaves a stub that compiles, renders and passes the suite, so your first test run tells you about your component rather than about a wiring mistake. Then replace the TODOs."
      >
        <CodeBlock
          language="bash"
          code={`yarn new:component --name flip-clock --category card`}
        />
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          <code className={inlineCode}>--category</code> is one of{" "}
          <code className={inlineCode}>animation</code>,{" "}
          <code className={inlineCode}>background</code>,{" "}
          <code className={inlineCode}>button</code>,{" "}
          <code className={inlineCode}>card</code>,{" "}
          <code className={inlineCode}>component</code> or{" "}
          <code className={inlineCode}>text</code>. Blocks are hand-authored.
        </p>
      </DocsSection>

      <DocsSection
        id="anatomy"
        title="Anatomy of a component"
        description="Seven places, three of them registries. The scaffolder edits all of them; this is what it did."
      >
        <CodeBlock
          language="bash"
          code={`components/demo/<category>/<name>.tsx             # the component people install
components/usage/<category>/<name>.usage.tsx      # a runnable example, no props
components/playground/<cat>/<name>.playground.tsx # optional studio harness
content/docs/<category>/<name>.content.ts         # title, description, props, credits
content/docs/index.ts                             # one import + one array entry
components/website/component-preview.tsx          # "<category>/<name>" preview entry
components/website/playground-harnesses.tsx       # the same, if you wrote a harness`}
        />
        <p className="mt-3 max-w-2xl leading-7">
          Everything else is generated from those: the sidebar, the command
          menu, the category pages, the docs page and its markdown twin, the
          sitemap, <code className={inlineCode}>llms.txt</code>, the OG card and
          the shadcn registry under{" "}
          <code className={inlineCode}>public/r/</code>. The MCP server reads
          the deployed catalogue at runtime, so a new component reaches it on
          deploy with no release. There is no central list to keep up to date,
          but miss the preview map and the test suite says so by name.
        </p>
      </DocsSection>

      <DocsSection
        id="content-file"
        title="What the content file has to say"
        description="Four of these fields are enforced by tests rather than by review."
      >
        <ul className="max-w-2xl list-outside list-disc space-y-2 pl-6 leading-7 marker:text-brand">
          <li>
            <code className={inlineCode}>name</code>,{" "}
            <code className={inlineCode}>category</code> and the filename all
            have to agree: the route, the sidebar and the registry key off the
            triple.
          </li>
          <li>
            <code className={inlineCode}>description</code> is the meta
            description, the registry entry and the MCP catalogue text, not just
            page copy. Lead with what the component does.
          </li>
          <li>
            <code className={inlineCode}>whenToUse</code> is where the component
            fits <em>and</em> where it does not: over 80 characters, unique
            across the library, and not a restatement of the description.
          </li>
          <li>
            <code className={inlineCode}>addedAt</code> is{" "}
            <code className={inlineCode}>YYYY-MM-DD</code>. The New badge is
            derived from it and ages out on its own.
          </li>
          <li>
            <code className={inlineCode}>credits</code> is required. Use{" "}
            <code className={inlineCode}>kind: &quot;tool&quot;</code> if a
            model wrote it; crediting one as a person makes the page copy and
            the structured data both wrong.
          </li>
          <li>
            <code className={inlineCode}>props</code> needs at least one row,
            and it is also where the Motion Studio gets its controls, so prop
            names decide control ranges.
          </li>
        </ul>
      </DocsSection>

      <DocsSection id="guidelines" title="Component guidelines">
        <ul className="max-w-2xl list-outside list-disc space-y-2 pl-6 leading-7 marker:text-brand">
          <li>
            Type every prop. No <code className={inlineCode}>any</code>, and no
            non-null assertions.
          </li>
          <li>
            Keep dependencies minimal.{" "}
            <code className={inlineCode}>motion</code> is fine, a new charting
            library is not. Whatever the component imports becomes a dependency
            for everyone who installs it, read straight off the imports.
          </li>
          <li>
            Use the design tokens (
            <code className={inlineCode}>bg-background</code>,{" "}
            <code className={inlineCode}>text-muted-foreground</code>) rather
            than hardcoded colours. A colour shadcn does not define has to be
            declared in <code className={inlineCode}>config/tokens.ts</code> so
            the registry ships it; otherwise it renders here and breaks on
            install.
          </li>
          <li>
            Never call <code className={inlineCode}>Math.random()</code> or{" "}
            <code className={inlineCode}>Date.now()</code> during render. Use{" "}
            <code className={inlineCode}>useId()</code> for stable variation.
          </li>
          <li>
            Honour <code className={inlineCode}>prefers-reduced-motion</code>{" "}
            for anything that moves, and use the value you read. The suite fails
            a component that ignores the preference, and a second one checks the
            component is actually visible with motion off.
          </li>
          <li>Give interactive elements accessible names and visible focus.</li>
        </ul>
      </DocsSection>

      <DocsSection
        id="motion-baselines"
        title="Motion baselines"
        description="Every component is screenshotted at 0 ms, 300 ms and 1200 ms against a frozen clock, so a regression mid-transition fails a PR instead of shipping."
      >
        <p className="max-w-2xl leading-7">
          Baselines are platform-specific and only the Linux set is committed.
          Locally, <code className={inlineCode}>yarn test:visual</code> writes
          your own on first run and gitignores them. On CI, a new component has
          no baseline yet, so the Motion frames job writes three PNGs and fails.
          Download the <code className={inlineCode}>visual-baselines</code>{" "}
          artifact from that run, commit them under{" "}
          <code className={inlineCode}>
            tests/visual/__screenshots__/linux/
          </code>
          , and push. Look at frame 0 before you do: a component already settled
          there has lost its entrance animation.
        </p>
      </DocsSection>

      <DocsSection id="pull-request" title="Opening a pull request">
        <CodeBlock
          language="bash"
          code={`git checkout -b feat/your-component
git commit -m "feat(card): add tilt card"
git push origin feat/your-component`}
        />
        <p className="mt-3 max-w-2xl leading-7">
          One component per PR. Include a screenshot or screen recording in the
          description, and explain why rather than what; the diff already says
          what. Contributors are credited on their component&apos;s docs page.
        </p>
      </DocsSection>
    </div>
  );
}
