"use client";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect, usePathname } from "next/navigation";
import COMPONENT_CONFIG from "@/content/docs/index";
import { ComponentConfigType } from "@/types/component-config.type";
import { CodeSnippet } from "@/components/website/code-snippet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAnimationPreview } from "@/lib/animation-preview";
import { sanitizeHtml } from "@/lib/utils";

const AnimationDocumentation = () => {
  // TODO - Dont forget to put default routing
  const [componentConfig, setComponentConfig] = useState<ComponentConfigType>({
    title: "Sample Animation",
    description: "Animate your components using pre-written components",
    breadcrumbs: [{ label: "Docs", href: "/docs" }, { label: "Animation" }],
    usageCode: "",
    installation: [],
    props: [],
    credits: "",
  });
  const [fileContent, setFileContent] = useState("");
  const pathName = usePathname();
  const componentName = pathName.split("/")?.pop();

  const fetchFileContent = async (file: string) => {
    try {
      const response = await fetch(`/api/file-content?file=${file}`);
      const data = await response.json();
      setFileContent(data.content);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  useEffect(() => {
    fetchFileContent(`${componentName}.tsx`);
  }, [componentName]);

  useEffect(() => {
    if (COMPONENT_CONFIG["animation"]?.[componentName]) {
      setComponentConfig(COMPONENT_CONFIG["animation"][componentName]);
    } else {
      redirect("/");
    }
  }, []);

  return (
    <div className="container mx-auto pb-10">
      <Breadcrumb>
        <BreadcrumbList>
          {componentConfig.breadcrumbs?.map(({ label, href }, index) => {
            return (
              <>
                {href ? (
                  <BreadcrumbItem key={label}>
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
                {index !== componentConfig.breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mt-6 mb-2">{componentConfig.title}</h1>
      <p className="text-gray-500 mb-6">{componentConfig.description}</p>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="border rounded flex h-72 items-center justify-center align-middle">
            {getAnimationPreview(componentName)}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeSnippet code={componentConfig.usageCode} />
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Installation</h2>
      <ol className="list-decimal list-inside space-y-2">
        {componentConfig.installation?.map(
          ({ description, code, isFullCode }, index) => {
            return (
              <div
                className={
                  index !== componentConfig.installation.length - 1
                    ? "mb-8"
                    : ""
                }
              >
                <li className="mb-5">{description}</li>
                {isFullCode ? <CodeSnippet code={fileContent || ""} /> : <></>}
              </div>
            );
          },
        )}
      </ol>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Usage</h2>
      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <CodeSnippet code={componentConfig?.usageCode} />
        </TabsContent>
        <TabsContent value="props">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentConfig?.props?.map(
                ({ prop, type, defaultValue, description }, index) => {
                  return (
                    <TableRow key={prop}>
                      <TableCell>{prop}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>{defaultValue}</TableCell>
                      <TableCell>{description}</TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
      {componentConfig.credits && (
        <>
          <h2 className="text-2xl font-semibold">Credits</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(componentConfig.credits),
            }}
          >
            This component was inspired by [source name]. Special thanks to
            [contributor name] for their contributions.
          </p>
        </>
      )}
    </div>
  );
};

export default AnimationDocumentation;
