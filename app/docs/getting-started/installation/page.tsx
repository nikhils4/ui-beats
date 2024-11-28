import BreadcrumbGettingStarted from "@/components/website/breadcrumb-getting-started";
import { CodeSnippet } from "@/components/website/code-snippet";

const Installation = () => {
  return (
    <div className="md:container mx-auto pb-10">
      <BreadcrumbGettingStarted page="Installation" />
      <div className="space-y-2 mt-5">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-base text-muted-foreground">
          How to get started with UI Beats.
        </p>
      </div>
      <div className="pb-12 pt-8">
        <div className="mb-6">
          <h2 className="font-semibold mb-2">1. Browse the Components</h2>
          <p>
            Visit the UI Beats component library and explore the various
            components available.
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">2. Add the utility function</h2>
          <p className="mb-4">
            This step is optional and only needed if your component from UI
            Beats uses the `cn` utility function.
          </p>
          <CodeSnippet language="bash" code={"npm i clsx tailwind-merge"} />
          <div className="h-4 w-full"></div>
          <CodeSnippet
            language="typescript"
            code={
              'import {type ClassValue, clsx} from "clsx";\n' +
              'import {twMerge} from "tailwind-merge";\n \n' +
              "export function cn(...inputs: ClassValue[]) {\n" +
              "  return twMerge(clsx(inputs));\n" +
              "}"
            }
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">3. Copy the Code</h2>
        <p>
          Once you find a component you need, simply copy the code provided.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">4. Paste into Your Project</h2>
        <p>
          Paste the copied code into your project files. Ensure that you have
          the necessary dependencies installed (React, TypeScript, Tailwind CSS,
          and Framer Motion).
        </p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">5. Customize</h2>
        <p>
          Customize the component to fit your project&apos;s design and
          functionality requirements. The code is now yours to modify as needed.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Dependencies Installation</h2>
        <p className="mb-4">
          If you&apos;re using a React project with TypeScript and Tailwind CSS,
          you can easily integrate UI Beats components. Make sure you have the
          following dependencies installed:
        </p>
        <CodeSnippet
          language="bash"
          code={
            "npm install react react-dom typescript tailwindcss framer-motion"
          }
        />

        <p className="mt-4">
          Add Tailwind CSS to your project by following the{" "}
          <a
            rel="noopener noreferrer"
            href="https://tailwindcss.com/docs/installation"
            className="text-blue-500 underline"
          >
            official installation guide
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Installation;
