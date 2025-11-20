import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip API routes, Next.js internals, and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request);
  }
  
  // Check if pathname starts with a valid locale
  const pathnameHasValidLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Check if pathname starts with what looks like a locale (2-3 letter code after /)
  const localeMatch = pathname.match(/^\/([a-z]{2,3})(\/|$)/);
  const hasLocalePrefix = localeMatch !== null;
  const detectedLocale = localeMatch ? localeMatch[1] : null;
  const isValidLocale = detectedLocale && routing.locales.includes(detectedLocale as typeof routing.locales[number]);
  
  // If pathname has an invalid locale prefix, redirect to /en with the rest of the path
  if (hasLocalePrefix && !isValidLocale) {
    const pathWithoutInvalidLocale = pathname.replace(/^\/[a-z]{2,3}/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathWithoutInvalidLocale || ''}`;
    return NextResponse.redirect(url);
  }
  
  // If pathname doesn't start with a valid locale and it's not the root
  if (!pathnameHasValidLocale && pathname !== '/') {
    // Redirect to /en with the same path
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }
  
  // Use the default next-intl middleware for valid routes
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(no|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

