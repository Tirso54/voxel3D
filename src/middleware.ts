import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/403', req.url));
    }

    // Team routes
    if (path.startsWith('/team') && !token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // API routes protection
    if (path.startsWith('/api/') && !path.startsWith('/api/auth') && !token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Public paths
        const publicPaths = [
          '/',
          '/showcase',
          '/pricing',
          '/api-docs',
          '/auth',
          '/api/auth',
          '/_next',
          '/favicon.ico',
        ];

        if (publicPaths.some(p => path.startsWith(p))) {
          return true;
        }

        // Protected paths require auth
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};