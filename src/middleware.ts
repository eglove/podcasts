import { getCookieValue, setCookieValue } from '@ethang/toolbelt/http/cookie';
import { getAcceptLanguage } from '@ethang/toolbelt/http/headers';
import { isNil } from '@ethang/toolbelt/is/nil';
import { DateTime } from 'luxon';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const langCookieConfig = {
    Expires: DateTime.now().plus({ year: 1 }).toJSDate(),
    HttpOnly: true,
    SameSite: 'Strict',
    Secure: true,
  } satisfies Parameters<typeof setCookieValue>[0]['config'];

  const url = new URL(request.url);
  const langSearchParameter = url.searchParams.get('lang');
  const langCookie = getCookieValue('lang', request.headers);

  if (!isNil(langSearchParameter)) {
    setCookieValue({
      config: langCookieConfig,
      cookieName: 'lang',
      cookieValue: langSearchParameter,
      response,
    });
  } else if (!langCookie.isSuccess) {
    const acceptLanguageHeader = request.headers.get('accept-language') ?? 'en';
    const [acceptLanguage] = getAcceptLanguage(acceptLanguageHeader);

    if (!isNil(acceptLanguage)) {
      setCookieValue({
        config: langCookieConfig,
        cookieName: 'lang',
        cookieValue: acceptLanguage.language ?? 'en',
        response,
      });
    }
  }

  return response;
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
