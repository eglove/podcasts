import { getCookieValue } from '@ethang/toolbelt/http/cookie';
import { getAcceptLanguage } from '@ethang/toolbelt/http/headers';
import { isNil } from '@ethang/toolbelt/is/nil';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const searchParameterLang = url.searchParams.get('lang');

  if (!isNil(searchParameterLang)) {
    //
  }

  const langCookie = getCookieValue('lang', request.headers);

  const acceptLanguageHeader = request.headers.get('accept-language') ?? 'en';
  const acceptLanguage = getAcceptLanguage(acceptLanguageHeader);

  if (!isNil(acceptLanguage[0])) {
    //
  }
  console.log(acceptLanguage);

  return NextResponse.next();
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
