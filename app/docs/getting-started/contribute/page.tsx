import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeSnippet } from "@/components/website/code-snippet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ui/beats | Contribute",
};

const Contribute = () => {
  return (
    <div className="md:container mx-auto pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/docs/getting-started"}>Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contribute</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-2 mt-5">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Contribute
        </h1>
        <p className="text-base text-muted-foreground">
          How to contribute to ui/beats.
        </p>
      </div>
      <div className="pb-12 pt-8">
        <div className="mb-6">
          <h2 className="font-semibold mb-2">1. Fork the Repository</h2>
          <p>Fork the UI Beats repository to your GitHub account.</p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">2. Clone Your Fork</h2>
          <p className="mb-2">
            Clone your forked repository to your local machine.
          </p>
          <CodeSnippet
            language="bash"
            code="git clone https://github.com/nikhils4/ui-beats"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">3. Create a New Branch</h2>
          <p className="mb-2">
            Create a new branch for your feature or bug fix.
          </p>
          <CodeSnippet
            language="bash"
            code="git checkout -b feature/your-feature-name"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">4. Make Your Changes</h2>
          <p>
            Make the necessary changes to the codebase. Ensure your code follows
            the project&apos;s style and the standard guidelines.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">5. Commit Your Changes</h2>
          <p className="mb-2">
            Commit your changes with a clear and concise commit message.
          </p>
          <CodeSnippet
            language="bash"
            code='git commit -m "Add feature: your feature description"'
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">6. Push to Your Fork</h2>
          <p className="mb-2">Push your changes to your forked repository.</p>
          <CodeSnippet
            language="bash"
            code="git push origin feature/your-feature-name"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">7. Create a Pull Request</h2>
          <p>
            Go to the original repository on GitHub and create a pull request.
            Provide a clear description of your changes and any relevant
            information.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Guidelines</h2>
          <p className="mb-2">
            <ul className="list-disc list-inside">
              <li>Follow the code style and the standard guidelines.</li>
              <li>Ensure your changes are well-documented in the PR.</li>
              <li>
                Be respectful and collaborative in your interactions with other
                contributors.
              </li>
            </ul>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">Thank You for Contributing!</h2>
          <p>
            Your contributions help make ui/beats better for everyone. Whether
            you&apos;re fixing bugs, adding new features, or improving
            documentation, your efforts are appreciated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
