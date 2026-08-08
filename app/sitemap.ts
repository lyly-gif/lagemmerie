import type { MetadataRoute } from "next";

const BASE_URL = "https://lagemmerie.com";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/espaces", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/galerie", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/tarifs", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/boutique", priority: 0.4, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
