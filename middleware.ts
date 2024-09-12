import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/blogs')) {
    const remoteUrl = new URL(pathname, 'https://ui-beats-blogs.vercel.app');

    if (pathname.endsWith('.css') || pathname.endsWith('.js')) {
      return NextResponse.rewrite(remoteUrl);
    }

    return NextResponse.rewrite(new URL(pathname, `${remoteUrl}/blogs`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blogs/:path*'],
};
