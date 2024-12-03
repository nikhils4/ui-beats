"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useMDXComponents } from "@/mdx-components";

const MDXContent = ({ code }: { code: string }) => {
  const Component = useMDXComponent(code);
  const components = useMDXComponents();

  return <Component components={components} />;
};

export default MDXContent;
