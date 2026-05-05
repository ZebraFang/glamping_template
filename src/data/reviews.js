/**
 * Marketing reviews + aggregate stats for social proof.
 * Replace with API fetch in {@link ../hooks/useReviews.js} when integrating Elfsight / Trustindex / Google.
 */

/** @typedef {'google' | 'tripadvisor' | 'airbnb'} ReviewSource */

/**
 * @typedef {{
 *   id: string;
 *   author: string;
 *   location?: string;
 *   date: string;
 *   rating: number;
 *   source: ReviewSource;
 *   body: string;
 *   highlight: string;
 * }} ReviewEntry
 */

/**
 * @typedef {{
 *   google: { rating: number; count: number };
 *   tripadvisor: { rating: number; count: number };
 *   totalReviews: number;
 * }} ReviewStats
 */

/** @type {ReviewStats} */
export const REVIEW_STATS = {
  google: { rating: 4.9, count: 187 },
  tripadvisor: { rating: 5.0, count: 94 },
  totalReviews: 281,
}

/** @type {ReviewEntry[]} */
export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    location: 'Leeds',
    date: '2026-03-14',
    rating: 5,
    source: 'google',
    highlight: 'hot tub under the stars',
    body:
      'We booked The Peacock for our anniversary and the hot tub under the stars sealed it. Quiet fields, proper dark skies, and the breakfast hamper was unreal — still talking about the sourdough.',
  },
  {
    id: 'rev-2',
    author: 'James & Priya',
    location: 'Edinburgh',
    date: '2026-02-02',
    rating: 5,
    source: 'tripadvisor',
    highlight: 'lambs in the next field',
    body:
      'Authentic working farm without the tourist trap feel. We watched lambs in the next field most mornings, then retreated to the deck with coffee. Fox tent felt private even though we could see the valley.',
  },
  {
    id: 'rev-3',
    author: 'Helen R.',
    location: 'York',
    date: '2025-12-18',
    rating: 5,
    source: 'google',
    highlight: 'Reading nook was my sanctuary',
    body:
      'The Hare is smaller but every inch is considered. The reading nook was my sanctuary after muddy walks; ensuite shower pressure ten out of ten. Will return in spring for lambing.',
  },
  {
    id: 'rev-4',
    author: 'Tom W.',
    location: 'Manchester',
    date: '2025-11-08',
    rating: 4.5,
    source: 'tripadvisor',
    highlight: 'Farm breakfast alone',
    body:
      'Wood-fired tub took a little tending but worth it — steam rising while the sun dropped behind the hill. Farm breakfast alone would bring us back; the bacon tasted like it had a story.',
  },
  {
    id: 'rev-5',
    author: 'Elena K.',
    location: 'London',
    date: '2025-09-22',
    rating: 5,
    source: 'google',
    highlight: 'Nothing staged',
    body:
      'Finally a glamping spot that feels grown-up. Linen, copper details, and nothing staged. Hosts were helpful without hovering. We left calmer than we arrived — rare for a city couple.',
  },
  {
    id: 'rev-6',
    author: 'Chris D.',
    location: 'Sheffield',
    date: '2025-08-30',
    rating: 5,
    source: 'tripadvisor',
    highlight: 'Kids loved the honesty shop',
    body:
      'Peacock hut was romantic but practical — stove easy to run, hot tub water crystal clear. Kids (teens) loved the honesty shop walk and the sheep chatter at dusk. Booking again for mum’s birthday.',
  },
  {
    id: 'rev-7',
    author: 'Amelia F.',
    location: 'Bristol',
    date: '2025-07-12',
    rating: 5,
    source: 'google',
    highlight: 'Safari tent without roughing it',
    body:
      'Fox safari tent without roughing it — king bed, proper ensuite, deck for sunrise yoga. A fox actually crossed the meadow at dawn; we nearly missed checkout staring at the mist.',
  },
]
