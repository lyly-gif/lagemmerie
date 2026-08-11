import { defaultLocale, locales, type Locale } from "@/lib/content";

export const LOCALE_HEADER = "x-lagemmerie-locale";
export const LOCALE_COOKIE = "locale";

export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/");
  const candidate = segments[1];
  if ((locales as readonly string[]).includes(candidate) && candidate !== defaultLocale) {
    const stripped = `/${segments.slice(2).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }
  return pathname || "/";
}

export function localizedPath(locale: Locale, pathname: string): string {
  const base = stripLocalePrefix(pathname);
  return `${localePrefix(locale)}${base === "/" ? "" : base}` || "/";
}

export function localeFromPathname(pathname: string): Locale {
  const candidate = pathname.split("/")[1];
  return (locales as readonly string[]).includes(candidate)
    ? (candidate as Locale)
    : defaultLocale;
}
