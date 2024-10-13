import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGGED_IN_REDIRECT,
  DEFAULT_LOGGED_OUT_REDIRECT,
} from '@/constants/routes';

export default auth((req) => {
  const { nextUrl, auth } = req;

  const isUserLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isUserLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGGED_IN_REDIRECT, nextUrl),
      );
    }

    return NextResponse.next();
  }

  if (!isPublicRoute && !isUserLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGGED_OUT_REDIRECT, nextUrl));
  }

  return NextResponse.next();
});

// From Clerk docs - https://clerk.com/docs/quickstarts/nextjs#add-middleware-to-your-application
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
