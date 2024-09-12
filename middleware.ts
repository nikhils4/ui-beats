import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/blogs')) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/blog${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: '/blogs/:path*',
};