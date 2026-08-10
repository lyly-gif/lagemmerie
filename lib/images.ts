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
  "32": { width: 2047, height: 1365 },
  "33": { width: 2048, height: 1365 },
  "34": { width: 2048, height: 1365 },
  "35": { width: 1365, height: 2048 },
  "36": { width: 2048, height: 1365 },
  "37": { width: 2048, height: 1365 },
  "38": { width: 2047, height: 1365 },
  "39": { width: 2048, height: 1365 },
  "40": { width: 1365, height: 2048 },
  "41": { width: 1365, height: 2048 },
  "42": { width: 2048, height: 1365 },
  "43": { width: 2048, height: 1365 },
  "44": { width: 2047, height: 1365 },
  "45": { width: 1365, height: 2048 },
  "46": { width: 2048, height: 1365 },
  "47": { width: 1365, height: 2048 },
  "48": { width: 2048, height: 1365 },
  "49": { width: 2048, height: 1365 },
  "50": { width: 2048, height: 1365 },
  "51": { width: 1365, height: 2048 },
  "52": { width: 1365, height: 2048 },
  "53": { width: 2048, height: 1365 },
  "54": { width: 2048, height: 1365 },
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
//
// Cross-checked against the owner's own renamed source files (dossier
// "photos Labenne") plus a direct owner review of the live tabs:
// - Pool house: 8 (bar/apéro, vue piscine) and 9 (canapé + BBQ) lead the
//   tab — the two photos the owner wants featured first, also used as the
//   home carousel's hover image (SpacesCarousel uses galleryNumbers[0]).
// - Cuisine loses 14 (l'escalier n'a rien à y faire) — direction Mezzanine.
// - Mezzanine & salle TV gains 14 (l'escalier qui y mène).
// - Chambre 1 / Chambre 2 swapped: 22 (tête de lit grise + TV + commode)
//   is actually Chambre 1, and 21 (portes-fenêtres + tablette à magazines)
//   is a second view of Chambre 2 alongside 15 — confirmed by the owner
//   against the live /galerie tabs, correcting an earlier mix-up.
// - Salle de bain 17 (baignoire + douche) is not private to a bedroom —
//   it's the shared/common bathroom, so it gets its own top-level tab
//   instead of being nested under Chambre 2.
// - 26 and 27 were swapped: 26 is the espresso-machine counter detail
//   (Cuisine), 27 is the hallway/crédence shot (Le salon) — verified by
//   reading the numbered files directly, not the renamed source folder.
// Round 2 additions (23 new photos, numbered 32-54 following the existing
// sequence) — mapped by the owner from the renamed source files, visually
// re-verified against each numbered file before wiring in (dossier "photos
// maison Labenne"). exterieur_DSC9553a.jpg from that batch was already on
// the site as 02.jpg (identical byte size + dimensions) — not re-added.
const GALLERY_GROUPS: {
  key: string;
  numbers: number[];
  subsections?: { key: string; numbers: number[] }[];
}[] = [
  { key: "poolHouse", numbers: [8, 9, 5, 7, 10, 32] },
  { key: "poolGarden", numbers: [1, 2, 4, 6, 29, 30, 31, 33, 34, 35] },
  { key: "livingKitchen", numbers: [19, 20, 26, 36] },
  { key: "lounge", numbers: [18, 24, 27, 37] },
  { key: "mezzanine", numbers: [12, 13, 14, 38, 39, 40, 41] },
  {
    key: "chambre1",
    numbers: [22],
    subsections: [{ key: "chambre1Bathroom", numbers: [23, 42] }],
  },
  { key: "chambre2", numbers: [15, 21, 43, 44, 45] },
  { key: "enfants", numbers: [16, 46, 47] },
  { key: "dortoir", numbers: [11, 48, 49, 50, 51, 52] },
  { key: "sharedBathroom", numbers: [17, 53, 54] },
];

export const galleryCategories = GALLERY_GROUPS.map((group) => ({
  key: group.key,
  images: buildImages(group.numbers),
  subsections: group.subsections?.map((sub) => ({
    key: sub.key,
    images: buildImages(sub.numbers),
  })),
}));

// Lets /espaces pull a curated 3-4 photo mini-gallery per space straight
// from the same numbered set used on /galerie, instead of maintaining a
// second copy of image metadata.
export function galleryImagesByNumbers(numbers: number[]): GalleryImage[] {
  return buildImages(numbers);
}
