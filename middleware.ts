import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/blogs')) {
    return NextResponse.rewrite(
      new URL(pathname, `https://ui-beats-blogs.vercel.app/blogs`),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blogs/:path*'],
};
