/**
 * Interactive farm map — coordinates are SVG user units matching viewBox width 100 / height 110.
 * Marker DOM position: left = svgX%, top = (svgY/110)*100%.
 */

export const FARM_MAP_META = {
  sectionId: 'map',
  eyebrow: 'The land',
  titleBefore: 'A 12-acre',
  titleAccent: 'welcome.',
  lead:
    'Each stay sits in its own corner of the farm. Tap a marker to see how far you’ll roam.',
  mapAriaLabel:
    'Illustrated map of Hollowfield farm with selectable locations for the farmhouse and each stay.',
}

/** @typedef {{ id: string; name: string; shortLabel: string; svgX: number; svgY: number; accommodationType: string; sleeps: number; walkNote: string; description: string }} FarmMapLocation */

/** @type {FarmMapLocation[]} — order: farmhouse first (recommended tab order), then stays west→east */
export const FARM_MAP_LOCATIONS = [
  {
    id: 'farm',
    name: 'The Farmhouse',
    shortLabel: 'The Farmhouse',
    svgX: 50,
    svgY: 18,
    accommodationType: 'Welcome',
    sleeps: 0,
    walkNote: 'On arrival',
    description:
      'Where you’ll meet us, collect your hamper, and the kettle is always on.',
  },
  {
    id: 'peacock',
    name: 'The Peacock',
    shortLabel: 'The Peacock',
    svgX: 28,
    svgY: 32,
    accommodationType: 'Shepherd’s Hut',
    sleeps: 2,
    walkNote: '8 min from gate',
    description: 'Perched on the south slope with views toward Pendle Hill.',
  },
  {
    id: 'fox',
    name: 'The Fox',
    shortLabel: 'The Fox',
    svgX: 62,
    svgY: 48,
    accommodationType: 'Safari Tent',
    sleeps: 2,
    walkNote: '12 min from gate',
    description:
      'Tucked into the beech wood — your closest neighbour is a barn owl.',
  },
  {
    id: 'hare',
    name: 'The Hare',
    shortLabel: 'The Hare',
    svgX: 42,
    svgY: 70,
    accommodationType: 'Shepherd’s Hut',
    sleeps: 2,
    walkNote: '6 min from gate',
    description:
      'Cozy stone nook beside the millpond. Wood-fired hot tub on the deck.',
  },
]

/** Swap googleMapsUrl for your Place link or /dir/?api=1&destination=lat,lng when ready. */
export const FARM_DIRECTIONS = {
  label: 'Open in Google Maps',
  googleMapsUrl: 'https://www.google.com/maps',
}
