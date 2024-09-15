import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    image: { type: 'string', required: true },
    imageAlt: { type: 'string', required: true },
    author: { type: 'string', required: true },
    authorTwitter: { type: 'string', required: true },
    categories: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    featured: { type: 'boolean', default: false },
    authorBio: { type: 'string', required: true },
  },
  computedFields: {
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath },
    readTime: {
      type: 'string',
      resolve: (doc) => calculateReadTime(doc.body.raw),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/blogs',
  documentTypes: [Post],
})

function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}