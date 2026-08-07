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

// Photo 25 (welcome-ritual flat-lay: kraft bag, "Bienvenue" card, Landes
// towel) is deliberately absent from every group below — it's pulled out of
// the generic grid and featured on /tarifs instead (brief §5: differentiator
// worth surfacing, not burying in the gallery).

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

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function buildImages(numbers: number[]): GalleryImage[] {
  return numbers.map((n) => {
    const num = String(n).padStart(2, "0");
    return {
      src: `/images/gallery/${num}.jpg`,
      alt: `La Gemmerie — maison landaise de Labenne-Océan, photo ${num}`,
      ...GALLERY_DIMENSIONS[num],
    };
  });
}

// Grouped by space rather than shown as one flat grid, so visitors read the
// gallery as "these are the distinct rooms" instead of a generic photo dump.
const GALLERY_GROUPS: { key: string; numbers: number[] }[] = [
  { key: "poolHouse", numbers: [2, 3, 5, 7, 8, 9, 28] },
  { key: "poolGarden", numbers: [1, 4, 6, 29, 30, 31] },
  { key: "livingKitchen", numbers: [10, 14, 18, 19, 20, 26, 27] },
  { key: "lounge", numbers: [12, 13, 24] },
  { key: "bedrooms", numbers: [11, 15, 16, 17, 21, 22, 23] },
];

export const galleryCategories = GALLERY_GROUPS.map((group) => ({
  key: group.key,
  images: buildImages(group.numbers),
}));
