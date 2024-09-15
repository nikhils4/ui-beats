import { generateRssFeed } from '@/lib/rss'
import { NextResponse } from 'next/server'

export async function GET() {
  const feed = await generateRssFeed()
  console.log(feed)
  return new NextResponse(feed.rss2(), {
    headers: { 'Content-Type': 'application/xml' },
  })
}