import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicPaths = [
    '/',
    '/showcase',
    '/pricing',
    '/api-docs',
    '/auth',
    '/api/auth',
    '/workspace',
  ];

  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};