import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/content";
import { LOCALE_COOKIE, LOCALE_HEADER } from "@/lib/i18n-routing";

const translatedPrefixes = locales.filter((locale) => locale !== defaultLocale);
const isPreview = process.env.VERCEL_ENV === "preview";

function protectPreview(response: NextResponse) {
  if (isPreview) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (firstSegment === defaultLocale) {
    const destination = request.nextUrl.clone();
    destination.pathname = pathname.replace(/^\/fr(?=\/|$)/, "") || "/";
    return protectPreview(NextResponse.redirect(destination, 308));
  }

  if ((translatedPrefixes as readonly string[]).includes(firstSegment)) {
    const locale = firstSegment as Locale;
    const destination = request.nextUrl.clone();
    destination.pathname = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "") || "/";
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, locale);
    request.cookies.set(LOCALE_COOKIE, locale);
    requestHeaders.set("cookie", request.cookies.toString());
    return protectPreview(NextResponse.rewrite(destination, {
      request: { headers: requestHeaders },
    }));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, defaultLocale);
  request.cookies.set(LOCALE_COOKIE, defaultLocale);
  requestHeaders.set("cookie", request.cookies.toString());
  return protectPreview(NextResponse.next({ request: { headers: requestHeaders } }));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)"],
};
