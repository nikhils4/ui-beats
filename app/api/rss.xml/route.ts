import { generateRssFeed } from '@/lib/rss'
import { NextResponse } from 'next/server'

export async function GET() {
  const feed = await generateRssFeed()
  return new NextResponse(feed.rss2(), {
    headers: { 'Content-Type': 'application/xml' },
  })
}