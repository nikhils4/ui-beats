import { NextRequest, NextResponse } from 'next/server';

const BLOG_URL = "https://ui-beats-blogs.vercel.app/";
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const blogUrl = new URL(request.nextUrl.origin);
  blogUrl.pathname = `/blogs/${path}`;
  blogUrl.search = request.nextUrl.search;

  // Ensure BLOG_URL is set and is a valid URL
  if (!BLOG_URL || !BLOG_URL.startsWith('http')) {
    console.error('Invalid or missing BLOG_URL environment variable');
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const targetUrl = new URL(blogUrl.pathname + blogUrl.search, BLOG_URL);

  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'X-Forwarded-Host': request.headers.get('host') || '',
        'X-Forwarded-Proto': request.headers.get('x-forwarded-proto') || 'https',
      },
    });

    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-Frame-Options', 'SAMEORIGIN');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    console.error('Error fetching from blog:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}