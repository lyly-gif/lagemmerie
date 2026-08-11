import { cookies, headers } from "next/headers";
import { defaultLocale, isTranslatedLocale, type Locale } from "@/lib/content";
import { LOCALE_COOKIE, LOCALE_HEADER } from "@/lib/i18n-routing";

export async function getCurrentLocale(): Promise<Locale> {
  const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
  const value = headerStore.get(LOCALE_HEADER) ?? cookieStore.get(LOCALE_COOKIE)?.value;
  return isTranslatedLocale(value) ? value : defaultLocale;
}
