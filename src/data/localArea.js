/**
 * Farm & local area content — pillars, activities, and seasonal calendar copy.
 */

/** @typedef {'hiking' | 'dining' | 'farmLife'} PillarId */

/**
 * @typedef {{
 *   id: string;
 *   pillar: PillarId;
 *   headline: string;
 *   sentence: string;
 *   story?: string;
 *   breadcrumb?: string;
 *   meta?: string[];
 *   related?: { label: string; href: string; external?: boolean };
 *   distanceLabel: string;
 *   action: { label: string; href: string; external?: boolean };
 *   featured?: boolean;
 *   mediaCue: string;
 *   imageUrl: string;
 * }} LocalActivity
 */

/**
 * @typedef {{
 *   id: 'spring' | 'summer' | 'autumn' | 'winter';
 *   label: string;
 *   months: number[];
 *   headline: string;
 *   body: string;
 *   imageUrl: string;
 * }} SeasonEntry
 */

/** @type {{ id: PillarId; label: string; eyebrow: string }[]} */
export const PILLARS = [
  { id: 'hiking', label: 'Hiking', eyebrow: 'The Land' },
  { id: 'dining', label: 'Dining', eyebrow: 'The Flavor' },
  { id: 'farmLife', label: 'Farm life', eyebrow: 'The Season' },
]

/** @type {LocalActivity[]} */
export const ACTIVITIES = [
  {
    id: 'ridge-walk',
    pillar: 'hiking',
    headline: 'Ridge walk · Yorkshire Vales',
    sentence:
      'Footsteps from your door — hedgerow paths open onto a long view of the Vales, with only skylarks for company.',
    story:
      'Leave the gate and take the old ridge line north where dry-stone walls frame the valley. In clear light, the route opens to layered views across the Vales and a long quiet return through hedgerow shade.',
    breadcrumb: 'Beyond the hut / Hiking / Ridge trails',
    meta: ['0.2 km from hut', '45 min loop', 'Moderate underfoot', 'Best at dusk'],
    related: { label: 'Pair with: Durham Ox lunch', href: '#farm', external: false },
    distanceLabel: '0.2 KM FROM HUT',
    action: { label: 'VIEW TRAIL MAP →', href: '#map', external: false },
    featured: true,
    mediaCue: 'IMG · Drone · Farm trails & dry-stone walls',
    imageUrl: 'src/images/golden-hour-yorkshire.jpg',
  },
  {
    id: 'durham-ox',
    pillar: 'dining',
    headline: 'The Durham Ox',
    sentence:
      'An award-winning gastro pub with roaring fires and a welcome as warm as the hearth.',
    story:
      'A classic post-walk stop with seasonal plates, local ales, and a dining room that feels settled and unhurried. Book early for weekend evenings, then stroll back under dark-sky lanes to the farm.',
    breadcrumb: 'Beyond the hut / Dining / Village table',
    meta: ['3.4 km from hut', '20 min walk', 'Booking advised', 'Family friendly'],
    related: { label: 'Read full village food guide', href: '#stories', external: false },
    distanceLabel: '3.4 KM FROM HUT',
    action: { label: 'VIEW WALK TO PUB →', href: 'https://www.google.com/maps', external: true },
    featured: true,
    mediaCue: 'IMG · Pub interior · Pie & hearth',
    imageUrl: 'src/images/durham-ox-pub.png',
  },
  {
    id: 'lambing-spring',
    pillar: 'farmLife',
    headline: 'Lambing mornings',
    sentence:
      'Spring brings lambs in the next field — quiet viewing from the fence line, no circus, just real farm rhythm.',
    story:
      'During lambing season, mornings begin with soft calls from the lower pasture and slow farm rounds before breakfast. Guests can watch from marked fence lines, guided by timings that keep the flock calm.',
    breadcrumb: 'Beyond the hut / Farm life / Spring season',
    meta: ['On site', 'Spring mornings', 'Quiet viewing only', 'Weather dependent'],
    related: { label: 'Read the farm seasons journal', href: '#farm', external: false },
    distanceLabel: 'ON SITE',
    action: { label: 'READ FARM SEASONS →', href: '#farm', external: false },
    featured: true,
    mediaCue: 'IMG · Lamb close-up · Morning mist',
    imageUrl: 'src/images/lambs.png',
  },
  {
    id: 'bluebell-wood',
    pillar: 'hiking',
    headline: 'Bluebell wood loop',
    sentence: 'A shaded mile through oak and bluebells when May is kind — muddy boots welcome back at the hut.',
    distanceLabel: '1.1 KM FROM HUT',
    action: { label: 'OPEN ROUTE PDF →', href: '#map', external: false },
    featured: false,
    mediaCue: 'IMG · Bluebell carpet · Oak trunks',
    imageUrl: 'src/images/bluebells.png',
  },
  {
    id: 'breakfast-hamper',
    pillar: 'dining',
    headline: 'Farm breakfast hamper',
    sentence: 'Eggs from our hens, sourdough, and whatever the hedgerow is offering — left on your deck by arrangement.',
    distanceLabel: 'DELIVERED TO STAY',
    action: { label: "SEE WHAT'S INSIDE →", href: '#stays', external: false },
    featured: false,
    mediaCue: 'IMG · Hamper · Linen & preserves',
    imageUrl: 'src/images/breakfast-hamper.png',
  },
  {
    id: 'wildflower-meadow',
    pillar: 'farmLife',
    headline: 'Wildflower meadow',
    sentence: 'Summer evenings when the meadow hums — bring a blanket; we’ll point you to the quietest corner.',
    distanceLabel: '0.4 KM FROM HUT',
    action: { label: 'VIEW MEADOW MAP →', href: '#map', external: false },
    featured: false,
    mediaCue: 'IMG · Meadow · Golden hour',
    imageUrl: 'src/images/wildflower-meadow.png',
  },
  {
    id: 'dusk-footpath',
    pillar: 'hiking',
    headline: 'Dusk footpath',
    sentence: 'Twenty minutes out and back before supper — barn owls and the first stars over the ridge.',
    distanceLabel: '0.5 KM FROM HUT',
    action: { label: 'VIEW EVENING LOOP →', href: '#map', external: false },
    featured: false,
    mediaCue: 'IMG · Footpath · Dusk silhouette',
    imageUrl: 'src/images/dusty-footpath.avif',
  },
  {
    id: 'village-shop',
    pillar: 'dining',
    headline: 'Village honesty table',
    sentence: 'Seasonal veg and jars from neighbours — cash in the tin, trust on the honor system.',
    distanceLabel: '2.0 KM FROM HUT',
    action: { label: 'DIRECTIONS →', href: 'https://www.google.com/maps', external: true },
    featured: false,
    mediaCue: 'IMG · Honesty stall · Jars & greens',
    imageUrl: 'src/images/veg-table.png',
  },
  {
    id: 'winter-stargaze',
    pillar: 'farmLife',
    headline: 'Wood-smoke Sundays',
    sentence: 'Winter strips the leaves back — darker skies, stove ticking, and the smell of woodsmoke on the wind.',
    distanceLabel: 'ON SITE',
    action: { label: 'DARK-SKY TIPS →', href: '#faq', external: false },
    featured: false,
    mediaCue: 'IMG · Frosty field · Chimney smoke',
    imageUrl: 'src/images/Yorkshire-vales.png',
  },
]

/** @type {SeasonEntry[]} */
export const SEASONS = [
  {
    id: 'spring',
    label: 'Spring',
    months: [3, 4, 5],
    headline: 'Lambing & bluebell woods',
    body: 'Lambs on the grass, carpets of bluebells, and mornings that smell like rain and soil.',
  },
  {
    id: 'summer',
    label: 'Summer',
    months: [6, 7, 8],
    headline: 'Wildflower meadows & pizza nights',
    body: 'Long light, hay in the barn, and the occasional wood-fired pizza when the weather plays fair.',
  },
  {
    id: 'autumn',
    label: 'Autumn',
    months: [9, 10, 11],
    headline: 'Harvest moon & golden trails',
    body: 'Bronze bracken, hedgerow fruit, and walks that crunch underfoot all the way to the pub.',
  },
  {
    id: 'winter',
    label: 'Winter',
    months: [12, 1, 2],
    headline: 'Star-gazing & wood-smoke Sundays',
    body: 'Quiet fields, early dark, and the stove doing the heavy lifting while you watch for Orion.',
  },
]

/**
 * Northern-hemisphere month → season id (UK guest context).
 * @param {number} monthIndex 1–12
 * @returns {SeasonEntry['id']}
 */
export function getSeasonIdForMonth(monthIndex) {
  const m = monthIndex
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  if (m >= 9 && m <= 11) return 'autumn'
  return 'winter'
}
