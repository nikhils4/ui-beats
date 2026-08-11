import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

/**
 * Element overrides for blog MDX.
 *
 * Most of the old per-element `className` props duplicated what
 * `.mdx-content` already styles in `globals.css`; only the elements that need
 * real behaviour (images, links) are overridden here now.
 */
export const mdxComponents: MDXComponents = {
  wrapper: ({ children }) => <div className="mdx-content">{children}</div>,

  img: ({ src, alt }: ComponentProps<"img">) => (
    <Image
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      width={720}
      height={400}
      className="mx-auto my-8 rounded-lg"
      sizes="(max-width: 720px) 100vw, 720px"
    />
  ),

  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");

    if (isInternal) {
      return (
        <Link href={href ?? "#"} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border bg-muted px-4 py-2 text-left font-bold" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border px-4 py-2" {...props} />
  ),
};

/** Next.js MDX convention hook, kept for `@next/mdx` interop. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
