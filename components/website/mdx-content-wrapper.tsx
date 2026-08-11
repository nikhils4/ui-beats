import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/mdx-components";

/**
 * Renders a post body on the server.
 *
 * Replaces contentlayer's `useMDXComponent`, which shipped a compiled MDX
 * runtime to the browser for content that never changes. Highlighting runs
 * through Shiki at build time via `rehype-pretty-code`.
 */
export default function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: { light: "github-light", dark: "github-dark" },
                defaultLang: "tsx",
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
