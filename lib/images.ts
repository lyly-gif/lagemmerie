export const featured = {
  "hero-piscine-jour": "/images/featured/hero-piscine-jour.jpg",
  "piscine-oliviers": "/images/featured/piscine-oliviers.jpg",
  "piscine-detail": "/images/featured/piscine-detail.jpg",
  "pool-house-facade": "/images/featured/pool-house-facade.jpg",
  "pool-house-dejeuner": "/images/featured/pool-house-dejeuner.jpg",
  "sejour-cuisine": "/images/featured/sejour-cuisine.jpg",
  salon: "/images/featured/salon.jpg",
  "chambre-parentale": "/images/featured/chambre-parentale.jpg",
  "chambre-secondaire": "/images/featured/chambre-secondaire.jpg",
  "dortoir-enfants": "/images/featured/dortoir-enfants.jpg",
  "salle-de-bain": "/images/featured/salle-de-bain.jpg",
  "detail-cuisine": "/images/featured/detail-cuisine.jpg",
  "rituel-accueil": "/images/featured/rituel-accueil.jpg",
} as const;

export type FeaturedKey = keyof typeof featured;

// 25 is the welcome-ritual flat-lay (kraft bag, "Bienvenue" card, Landes
// towel) — pulled out of the generic grid and featured on /tarifs instead
// (brief §5: differentiator worth surfacing, not burying in the gallery).
const GALLERY_EXCLUDE = new Set([25]);

// Real pixel dimensions (sips), needed for the masonry layout: <Image>
// without `fill` sizes itself from width/height, which is what lets each
// tile keep its true aspect ratio instead of being force-cropped into a
// uniform grid cell (audit-ux-design-la-gemmerie.md §2, gallery row gaps).
const GALLERY_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "01": { width: 2048, height: 1365 },
  "02": { width: 1365, height: 2048 },
  "03": { width: 1365, height: 2048 },
  "04": { width: 1365, height: 2048 },
  "05": { width: 1365, height: 2048 },
  "06": { width: 1365, height: 2048 },
  "07": { width: 1365, height: 2048 },
  "08": { width: 1365, height: 2048 },
  "09": { width: 2048, height: 1365 },
  "10": { width: 2048, height: 1365 },
  "11": { width: 2048, height: 1365 },
  "12": { width: 2048, height: 1365 },
  "13": { width: 2047, height: 1365 },
  "14": { width: 2048, height: 1365 },
  "15": { width: 2048, height: 1365 },
  "16": { width: 2048, height: 1365 },
  "17": { width: 2048, height: 1365 },
  "18": { width: 2048, height: 1365 },
  "19": { width: 2047, height: 1365 },
  "20": { width: 2048, height: 1365 },
  "21": { width: 2047, height: 1365 },
  "22": { width: 2047, height: 1365 },
  "23": { width: 2047, height: 1365 },
  "24": { width: 1365, height: 2047 },
  "26": { width: 1365, height: 2048 },
  "27": { width: 1365, height: 2048 },
  "28": { width: 1820, height: 1365 },
  "29": { width: 1820, height: 1365 },
  "30": { width: 1820, height: 1365 },
  "31": { width: 1820, height: 1365 },
};

export const galleryImages = Array.from({ length: 31 }, (_, i) => i + 1)
  .filter((n) => !GALLERY_EXCLUDE.has(n))
  .map((n) => {
    const num = String(n).padStart(2, "0");
    return {
      src: `/images/gallery/${num}.jpg`,
      alt: `La Gemmerie — maison landaise de Labenne-Océan, photo ${num}`,
      ...GALLERY_DIMENSIONS[num],
    };
  });
