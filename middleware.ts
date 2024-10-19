import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGGED_IN_REDIRECT,
  DEFAULT_LOGGED_OUT_REDIRECT,
} from '@/constants/routes';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const { pathname } = req.nextUrl;

  const isUserLoggedIn = !!token;
  const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isUserLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGGED_IN_REDIRECT, req.url),
      );
    }

    return NextResponse.next();
  }

  if (!isPublicRoute && !isUserLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGGED_OUT_REDIRECT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
