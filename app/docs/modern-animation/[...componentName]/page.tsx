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
import { fetchFileContent, sanitizeHtml } from "@/lib/utils";
import { ComponentDemo } from "@/components/website/component-demo";
import GradientFlowContent from "@/content/docs/modern-animation/gradient-flow.content";
import { ComponentName } from "@/types/component-map.type";

const AnimationDocumentation = () => {
  const [componentConfig, setComponentConfig] =
    useState<ComponentConfigType>(GradientFlowContent);
  const [fileContent, setFileContent] = useState("");
  const pathName = usePathname();
  const componentName = (pathName.split("/")?.pop() ||
    "gradient-flow") as ComponentName;

  useEffect(() => {
    const getFileContent = async () => {
      try {
        const content = await fetchFileContent(
          `modern-animation/${componentName}.tsx`,
        );
        setFileContent(content);
      } catch (error) {
        console.log("Error fetching file content:", error);
      }
    };

    getFileContent();
  }, [componentName]);

  useEffect(() => {
    if (
      COMPONENT_CONFIG["modern-animation"]?.[
        componentName
      ] as ComponentConfigType
    ) {
      setComponentConfig(COMPONENT_CONFIG["modern-animation"]?.[componentName]);
    } else {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    document.title = `ui/beats | ${componentConfig.title}`;
  }, [componentConfig.title]);

  return (
    <div className="md:container mx-auto pb-10">
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
                  <BreadcrumbItem key={label}>
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
                {index !== componentConfig.breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator key={label} />
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
          <ComponentDemo componentName={componentName} />
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
                key={index}
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
      <Tabs defaultValue="props">
        <TabsList>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
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
        <TabsContent value="code">
          <CodeSnippet code={componentConfig?.usageCode} />
        </TabsContent>
      </Tabs>
      {componentConfig.credits && (
        <>
          <h2 className="text-2xl font-semibold mt-10 mb-4">Credits</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(componentConfig.credits),
            }}
          ></p>
        </>
      )}
    </div>
  );
};

export default AnimationDocumentation;
