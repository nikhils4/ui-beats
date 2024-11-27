import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Beats | Introduction",
};

const Introduction = () => {
  return (
    <div className="md:container mx-auto pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          <SidebarTrigger />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/docs/getting-started"}>Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Introduction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-2 mt-5">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-base text-muted-foreground">
          Create stunning user interfaces with components you can copy and paste
          directly into your applications.
        </p>
      </div>
      <div className="pb-12 pt-8">
        <div>
          <p className="leading-7 [&amp;:not(:first-child)]:mt-6 mb-5">
            Create stunning user interfaces with components you can copy and
            paste directly into your applications. Accessible, customizable, and
            open source. UI Beats is a collection of reusable components crafted
            with React, TypeScript, Tailwind CSS, and Framer Motion.
            <br />
            <br />
            This is <strong>NOT</strong> a traditional component library that
            you install as a dependency. Instead, it&apos;s a resource for
            beautifully designed components ready to be integrated into your
            projects with ease.
          </p>
          <p className="leading-7 [&amp;:not(:first-child)]:mt-6">
            UI Beats is inspired by{" "}
            <em>
              <a
                rel="noopener noreferrer"
                className="underline"
                href="https://ui.shadcn.com/"
                target="_blank"
              >
                shadcn/ui
              </a>{" "}
            </em>
            , and we extend our gratitude building a beautiful UI library that
            has inspired us to create UI Beats.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
