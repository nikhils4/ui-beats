import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { ComponentProps } from "react";

const components: MDXComponents = {
  wrapper: ({ children }) => <div className="mdx-content">{children}</div>,
  img: (props: ComponentProps<'img'>) => (
    <Image
      src={props.src || ''}
      alt={props.alt || "Blog post image"}
      width={720}
      height={400}
      className="rounded-lg my-8 mx-auto"
      sizes="(max-width: 720px) 100vw, 720px"
      priority={true}
    />
  ),
  a: (props: ComponentProps<'a'>) => (
    <Link
      href={props.href || ''}
      className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline"
    >
      {props.children}
    </Link>
  ),
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100"
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className="text-2xl font-bold mt-10 mb-5 text-gray-900 dark:text-gray-100"
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100"
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      {...props}
      className="text-lg font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-6" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-outside mb-6 pl-6 space-y-2" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className="list-decimal list-outside mb-6 pl-6 space-y-2"
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="mb-2" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6 text-gray-700 dark:text-gray-300"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto my-6 text-sm"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="bg-gray-100 dark:bg-gray-900 rounded-md px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:text-black"
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table {...props} className="w-full border-collapse" />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      {...props}
      className="border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-900 font-bold"
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      {...props}
      className="border border-gray-300 dark:border-gray-700 px-4 py-2"
    />
  ),
  inlineCode: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="bg-gray-100 dark:bg-gray-900 rounded-md px-1.5 py-0.5 font-mono text-sm text-gray-800 dark:text-black"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
