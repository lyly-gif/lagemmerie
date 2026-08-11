import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";
import { galleryCategories } from "@/lib/images";

const BASE_URL = "https://lagemmerie.com";
const routes = ["/", "/espaces", "/labenne-ocean", "/galerie", "/tarifs", "/contact"] as const;

const galleryImages = galleryCategories.flatMap((category) => [
  ...category.images,
  ...(category.subsections?.flatMap((section) => section.images) ?? []),
]);

function absolute(path: string) {
  return `${BASE_URL}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, absolute(localizedPath(locale, route))]),
    );
    languages["x-default"] = absolute(localizedPath("fr", route));

    return locales.map((locale) => ({
      url: absolute(localizedPath(locale, route)),
      alternates: { languages },
      images:
        route === "/galerie"
          ? galleryImages.map((image) => absolute(image.src))
          : route === "/"
            ? [absolute("/images/featured/hero-piscine-jour.jpg")]
            : undefined,
    }));
  });
}
