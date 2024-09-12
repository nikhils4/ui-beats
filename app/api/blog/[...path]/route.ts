import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const blogUrl = new URL(path, process.env.BLOG_URL);
  blogUrl.search = request.nextUrl.search;

  const response = await fetch(blogUrl.toString(), {
    headers: {
      'X-Forwarded-Host': request.headers.get('host') || '',
      'X-Forwarded-Proto': 'https',
    },
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Frame-Options', 'SAMEORIGIN');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}