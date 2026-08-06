import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/content";
import { LOCALE_COOKIE } from "@/lib/locale-shared";

export { LOCALE_COOKIE };

export async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}
