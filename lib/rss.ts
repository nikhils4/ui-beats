import { Feed, type FeedOptions, type Item } from "feed";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/site";

export async function generateRssFeed(): Promise<Feed> {
  const options: FeedOptions = {
    title: `${siteConfig.name} Blog`,
    description:
      "In-depth tutorials and guides on frontend development, UI/UX design, and web animation.",
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    /*
     * The square mark, not `siteConfig.ogImage`. A feed reader renders this as
     * the channel avatar next to every item, which is a logo slot, and the
     * 1200x630 social card it used to point at was letterboxed into a
     * thumbnail there.
     */
    image: absoluteUrl("/brand-mark.png"),
    favicon: absoluteUrl("/brand-mark.png"),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    feedLinks: {
      rss2: absoluteUrl("/api/rss.xml"),
    },
    /*
     * Name and link, no email. RSS 2.0 defines `<author>` as an address slot;
     * with no email the `feed` library writes the name on its own, which every
     * reader displays and no aggregator can scrape an address out of.
     */
    author: {
      name: siteConfig.author.name,
      link: siteConfig.author.url,
    },
  };

  const feed = new Feed(options);

  for (const post of getAllPosts()) {
    // The route is /blogs/<slug>. The old feed pointed at /blog/<slug>, so
    // every item in it 404'd.
    const url = absoluteUrl(`/blogs/${post.slug}`);

    const item: Item = {
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      author: [
        {
          name: post.author,
          link: siteConfig.author.url,
        },
      ],
      date: new Date(post.date),
      image: post.image ? absoluteUrl(post.image) : undefined,
      category: post.categories.map((name) => ({ name })),
    };

    feed.addItem(item);
  }

  return feed;
}
