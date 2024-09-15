"use client";
import { Fragment, useEffect, useState } from "react";
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
import TextWriterContent from "@/content/docs/modern-animation/text-writer.content";
import { ComponentName } from "@/types/component-map.type";
import { motion } from "framer-motion";

const AnimationDocumentation = () => {
  const [componentConfig, setComponentConfig] =
    useState<ComponentConfigType>(TextWriterContent);
  const [fileContent, setFileContent] = useState("");
  const pathName = usePathname();
  const componentName = (pathName.split("/")?.pop() ||
    "smooth-reveal") as ComponentName;

  useEffect(() => {
    const getFileContent = async () => {
      try {
        const content = await fetchFileContent(
          `animation/${componentName}.tsx`
        );
        setFileContent(content);
      } catch (error) {
        console.log("Error fetching file content:", error);
      }
    };

    getFileContent();
  }, [componentName]);

  useEffect(() => {
    if (COMPONENT_CONFIG["animation"]?.[componentName] as ComponentConfigType) {
      setComponentConfig(COMPONENT_CONFIG["animation"]?.[componentName]);
    } else {
      redirect("/");
    }
  }, []);

  useEffect(() => {
    document.title = `UI Beats | ${componentConfig.title}`;
  }, [componentConfig.title]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="md:container mx-auto pb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Breadcrumb>
          <BreadcrumbList>
            {componentConfig.breadcrumbs?.map(({ label, href }, index) => {
              return (
                <Fragment key={`${label}-${index}`}>
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
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </motion.div>
      <motion.h1
        className="text-3xl font-bold mt-6 mb-2"
        variants={itemVariants}
      >
        {componentConfig.title}
      </motion.h1>
      <motion.p className="text-gray-500 mb-6" variants={itemVariants}>
        {componentConfig.description}
      </motion.p>

      <motion.div variants={itemVariants}>
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
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mt-10 mb-4"
        variants={itemVariants}
      >
        Installation
      </motion.h2>
      <motion.ol
        className="list-decimal list-inside space-y-2"
        variants={itemVariants}
      >
        {componentConfig.installation?.map(
          ({ description, code, isFullCode }, index) => {
            return (
              <motion.div
                key={index}
                className={
                  index !== componentConfig.installation.length - 1
                    ? "mb-8"
                    : ""
                }
                variants={itemVariants}
              >
                <li className="mb-5">{description}</li>
                {isFullCode ? (
                  <CodeSnippet code={fileContent || ""} />
                ) : code ? (
                  <CodeSnippet code={code} />
                ) : null}
              </motion.div>
            );
          }
        )}
      </motion.ol>

      <motion.h2
        className="text-2xl font-semibold mt-10 mb-4"
        variants={itemVariants}
      >
        Usage
      </motion.h2>
      <motion.div variants={itemVariants}>
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
                  }
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="code">
            <CodeSnippet code={componentConfig?.usageCode} />
          </TabsContent>
        </Tabs>
      </motion.div>
      {componentConfig.credits && (
        <>
          <motion.h2
            className="text-2xl font-semibold mt-10 mb-4"
            variants={itemVariants}
          >
            Credits
          </motion.h2>
          <motion.p
            variants={itemVariants}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(componentConfig.credits),
            }}
          ></motion.p>
        </>
      )}
    </motion.div>
  );
};

export default AnimationDocumentation;
