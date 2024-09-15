import { Feed, FeedOptions, Item } from 'feed'
import { allPosts, Post } from 'contentlayer/generated'

const site_url = 'https://uibeats.com'

const feedOptions: FeedOptions = {
  title: 'UI Beats Blog',
  description: 'Discover in-depth tutorials and guides on frontend development, UI/UX design, and web animations. Learn the latest techniques and best practices for creating stunning, interactive web experiences.',
  id: site_url,
  link: site_url,
  image: `${site_url}/uibeats-social-media.png`,
  favicon: `${site_url}/icon.png`,
  copyright: `All rights reserved ${new Date().getFullYear()}, UI Beats`,
  generator: 'Feed for Next.js',
  feedLinks: {
    rss2: `${site_url}/api/rss.xml`,
  },
}

export async function generateRssFeed(): Promise<Feed> {
  const feed = new Feed(feedOptions)

  allPosts.forEach((post: Post) => {
    const item: Item = {
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.description,
      content: post.body.raw,
      author: [
        {
          name: 'Nikhil Singh',
          email: 'hello@nikhils.ca',
          link: 'https://nikhils.ca',
        },
      ],
      date: new Date(post.date),
    }
    feed.addItem(item)
  })

  return feed
}