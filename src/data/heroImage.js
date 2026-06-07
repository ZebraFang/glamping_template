/**
 * Hero LCP image — single source of truth for srcset and {@link MediaSlot}.
 * Variants live in `public/images/` (see `scripts/generate-hero-images.mjs`).
 */

/** @type {readonly { url: string; width: number }[]} */
export const HERO_IMAGE_VARIANTS = [
  { url: '/images/golden-hour-yorkshire-two-640.avif', width: 640 },
  { url: '/images/golden-hour-yorkshire-two-960.avif', width: 960 },
  { url: '/images/golden-hour-yorkshire-two-1280.avif', width: 1280 },
  { url: '/images/golden-hour-yorkshire-two.avif', width: 1920 },
]

export const HERO_IMAGE = {
  alt: 'Golden-hour view across the Yorkshire Vales at Hollowfield',
  /** Intrinsic dimensions of the master asset (matches generate script output). */
  width: 1920,
  height: 2088,
  /** Fallback `src` — master file (always deployed); srcset picks smaller variants on capable browsers. */
  src: '/images/golden-hour-yorkshire-two.avif',
  variants: HERO_IMAGE_VARIANTS,
  /** Full-bleed hero background. */
  sizes: '100vw',
}

/** @returns {string} */
export function buildHeroSrcSet() {
  return HERO_IMAGE_VARIANTS.map(({ url, width }) => `${url} ${width}w`).join(', ')
}
