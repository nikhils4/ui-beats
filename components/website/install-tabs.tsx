import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/website/code-block";
import { absoluteUrl } from "@/lib/site";
import type { RegistryEntry } from "@/lib/registry";

/**
 * Installation instructions, CLI first.
 *
 * The CLI tab is the whole point of the registry work: `shadcn add` resolves
 * the component's npm dependencies and drops the file in the right place,
 * instead of asking the reader to hand-copy a code block and then figure out
 * which packages it needs.
 */
export function InstallTabs({ entry }: { entry: RegistryEntry }) {
  const registryUrl = absoluteUrl(`/r/${entry.name}.json`);
  const installCommand = `npx shadcn@latest add ${registryUrl}`;

  const deps = entry.dependencies;
  const manualDepsCommand = deps.length
    ? `npm install ${deps.join(" ")}`
    : null;

  return (
    <Tabs defaultValue="cli">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli" className="mt-4">
        <p className="mb-2 text-sm text-muted-foreground">
          Adds the component and installs its dependencies for you.
        </p>
        <CodeBlock code={installCommand} language="bash" />
      </TabsContent>

      <TabsContent value="manual" className="mt-4">
        <ol className="list-inside list-decimal space-y-6 text-sm">
          {manualDepsCommand ? (
            <li>
              <span className="font-medium">Install the dependencies.</span>
              <div className="mt-2 ml-[-1.25rem]">
                <CodeBlock code={manualDepsCommand} language="bash" />
              </div>
            </li>
          ) : null}

          <li>
            <span className="font-medium">
              Copy the component into your project.
            </span>
            <div className="mt-2 ml-[-1.25rem]">
              <CodeBlock
                code={entry.source}
                title={`components/ui/${entry.name}.tsx`}
              />
            </div>
          </li>

          {entry.registryDependencies.includes("utils") ? (
            <li>
              <span className="font-medium">
                Add the <code className="font-mono">cn</code> helper
              </span>{" "}
              if your project does not already have it.
              <div className="mt-2 ml-[-1.25rem]">
                <CodeBlock
                  title="lib/utils.ts"
                  code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                />
              </div>
            </li>
          ) : null}

          <li>
            <span className="font-medium">Update the import paths</span> to
            match your project structure.
          </li>

          {entry.extraInstallation?.map((step) => (
            <li key={step.description}>
              <span className="font-medium">{step.description}</span>
              {step.code ? (
                <div className="mt-2 ml-[-1.25rem]">
                  <CodeBlock
                    code={step.code}
                    language={step.language ?? "tsx"}
                  />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </TabsContent>
    </Tabs>
  );
}
