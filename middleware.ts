import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from './utils/amplifyServerUtils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log('Authentication check error:', error);
        return false;
      }
    }
  });

  // Handle authentication based on route type
  const isAuthRoute = request.nextUrl.pathname === '/login' || 
                     request.nextUrl.pathname === '/signup' ||
                     request.nextUrl.pathname === '/verify-email' || 
                     request.nextUrl.pathname === '/reset-password' ||
                     request.nextUrl.pathname.startsWith('/login/reset-password');

  if (authenticated) {
    // User is authenticated
    if (isAuthRoute) {
      // Redirect authenticated users away from auth pages
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Allow access to protected routes
    return response;
  } else {
    // User is not authenticated
    if (!isAuthRoute) {
      // Redirect unauthenticated users to login page with redirect parameter
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow access to auth routes
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
