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

export const galleryImages = Array.from({ length: 31 }, (_, i) => i + 1)
  .filter((n) => !GALLERY_EXCLUDE.has(n))
  .map((n) => {
    const num = String(n).padStart(2, "0");
    return {
      src: `/images/gallery/${num}.jpg`,
      alt: `La Gemmerie — maison landaise de Labenne-Océan, photo ${num}`,
    };
  });
