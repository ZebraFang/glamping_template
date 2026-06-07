/**
 * Full stay catalogue — marketing cards, modal, and hero booking list share IDs & core labels.
 * Gallery `src` values are root-relative URLs under `public/images/` (stable across deploys).
 */

/** @typedef {{ src: string; alt: string; thumbSrc?: string }} StayGallerySlide */

/** @typedef {{ iconId: string; label: string }} StayFeature */

/**
 * @typedef {{
 *   id: string;
 *   name: string;
 *   priceLabel: string;
 *   detail: string;
 *   featureBadge: string;
 *   dreamShort: string;
 *   dreamLong: string;
 *   gallery: StayGallerySlide[];
 *   cardFeatures: StayFeature[];
 *   modalFeatures: StayFeature[];
 * }} StayCatalogEntry
 */

/** @type {StayCatalogEntry[]} */
export const STAYS_CATALOG = [
  {
    id: 'peacock',
    name: 'The Peacock',
    priceLabel: '£185 / night',
    detail: "Shepherd's Hut · Sleeps 2",
    featureBadge: 'Wood-fired tub',
    dreamShort:
      'Hand-built hut with a copper splashback, velvet cushions, and skylight showers of stars.',
    dreamLong:
      'Wake to birdsong and oak-panelled warmth. The Peacock was crafted for slow mornings: stove-lit corners, a deep soak under open sky, and nothing but pasture beyond your deck. This is the hut guests book twice.',
    gallery: [
      {
        src: '/images/the-peacock.avif',
        alt: "Interior view of The Peacock shepherd's hut at sunset with stove glow",
      },
      {
        src: '/images/Wooden-hot-tub.avif',
        alt: 'Wood-fired hot tub steam rising beside The Peacock hut at dusk',
      },
      {
        src: '/images/shepherd-hut.avif',
        alt: 'King bed with linen and skylight in The Peacock hut',
      },
    ],
    cardFeatures: [
      { iconId: 'hotTub', label: 'WOOD-FIRED TUB' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'ensuite', label: 'ENSUITE' },
      { iconId: 'breakfast', label: 'FARM BREAKFAST' },
    ],
    modalFeatures: [
      { iconId: 'hotTub', label: 'WOOD-FIRED HOT TUB' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'ensuite', label: 'LUXURY ENSUITE' },
      { iconId: 'firepit', label: 'PRIVATE FIREPIT' },
      { iconId: 'pets', label: 'PET FRIENDLY' },
      { iconId: 'breakfast', label: 'FARM-TO-TABLE BREAKFAST' },
      { iconId: 'views', label: 'MEADOW VIEWS' },
      { iconId: 'linen', label: 'CRISP LINEN' },
      { iconId: 'kitchenette', label: 'KITCHENETTE' },
      { iconId: 'parking', label: 'PRIVATE PARKING' },
      { iconId: 'wifi', label: 'QUIET WIFI' },
      { iconId: 'stargaze', label: 'DARK-SKY STARGAZING' },
    ],
  },
  {
    id: 'fox',
    name: 'The Fox',
    priceLabel: '£165 / night',
    detail: 'Safari Tent · Sleeps 2',
    featureBadge: 'Safari deck',
    dreamShort:
      'Canvas, cedar floors, and a wide deck for coffee at dawn — safari calm without leaving Yorkshire.',
    dreamLong:
      'The Fox trades walls for breeze. Zip open the canvas to hear the farm waking up, brew tea on your deck, then wander footpaths before anyone else is up. Romantic, airy, and unexpectedly plush.',
    gallery: [
      {
        src: '/images/safari-hut.avif',
        alt: 'The Fox safari tent deck at golden hour with countryside views',
      },
      { src: '/images/safari-hut-two.avif', alt: 'Interior lounge area of The Fox tent with layered textiles' },
      { src: '/images/safari-tent-internal.avif', alt: 'King bed inside The Fox safari tent with soft lantern light' },
    ],
    cardFeatures: [
      { iconId: 'deck', label: 'PRIVATE DECK' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'firepit', label: 'FIREPIT' },
      { iconId: 'breakfast', label: 'FARM BREAKFAST' },
    ],
    modalFeatures: [
      { iconId: 'deck', label: 'SUNRISE DECK' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'ensuite', label: 'LUXURY ENSUITE' },
      { iconId: 'firepit', label: 'PRIVATE FIREPIT' },
      { iconId: 'pets', label: 'PET FRIENDLY' },
      { iconId: 'breakfast', label: 'FARM-TO-TABLE BREAKFAST' },
      { iconId: 'canvas', label: 'CANVAS & CEDAR' },
      { iconId: 'linen', label: 'CRISP LINEN' },
      { iconId: 'kitchenette', label: 'KITCHENETTE' },
      { iconId: 'parking', label: 'PRIVATE PARKING' },
      { iconId: 'wifi', label: 'QUIET WIFI' },
      { iconId: 'views', label: 'VALLEY VIEWS' },
    ],
  },
  {
    id: 'hare',
    name: 'The Hare',
    priceLabel: '£155 / night',
    detail: "Shepherd's Hut · Sleeps 2",
    featureBadge: 'Reading nook',
    dreamShort:
      'Compact hut with a tucked-away reading nook — built for novels, naps, and nettle tea.',
    dreamLong:
      'The Hare is our quiet corner: smaller footprint, same handcrafted detail. Shelves of field guides, a stove that ticks through the evening, and windows that frame hedgerows. Ideal for solo travellers or couples who travel light.',
    gallery: [
      { src: '/images/Wooden-cottage.avif', alt: "Exterior of The Hare shepherd's hut nestled beside hedgerow" },
      { src: '/images/reading-nook.avif', alt: 'Reading nook with cushions and lamp inside The Hare hut' },
      { src: '/images/Wooden-cottage-internal.avif', alt: 'Compact ensuite shower detail in The Hare hut' },
    ],
    cardFeatures: [
      { iconId: 'nook', label: 'READING NOOK' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'ensuite', label: 'ENSUITE' },
      { iconId: 'pets', label: 'PET FRIENDLY' },
    ],
    modalFeatures: [
      { iconId: 'nook', label: 'READING NOOK' },
      { iconId: 'kingBed', label: 'KING BED' },
      { iconId: 'ensuite', label: 'LUXURY ENSUITE' },
      { iconId: 'firepit', label: 'PRIVATE FIREPIT' },
      { iconId: 'pets', label: 'PET FRIENDLY' },
      { iconId: 'breakfast', label: 'FARM-TO-TABLE BREAKFAST' },
      { iconId: 'compact', label: 'COSY FOOTPRINT' },
      { iconId: 'linen', label: 'CRISP LINEN' },
      { iconId: 'kitchenette', label: 'KITCHENETTE' },
      { iconId: 'parking', label: 'PRIVATE PARKING' },
      { iconId: 'wifi', label: 'QUIET WIFI' },
      { iconId: 'hedgerow', label: 'HEDGEROW OUTLOOK' },
    ],
  },
]

/**
 * Slim rows for booking UI — derived from catalogue so labels never drift.
 */
export const HERO_STAYS = STAYS_CATALOG.map(({ id, name, priceLabel, detail }) => ({
  id,
  name,
  priceLabel,
  detail,
}))
