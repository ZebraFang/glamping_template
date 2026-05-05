import { useMemo } from 'react'
import { REVIEWS, REVIEW_STATS } from '../data/reviews.js'

/**
 * Swap-ready reviews hook. v1 reads static data synchronously.
 *
 * When integrating Elfsight, Trustindex, or Google Business Profile:
 * - Set status to `loading`, fetch in `useEffect`, then `ready` or `error`.
 * - Map API payloads into the same shape as {@link ../data/reviews.js}.
 *
 * @returns {{
 *   status: 'idle' | 'loading' | 'ready' | 'error';
 *   stats: import('../data/reviews.js').ReviewStats | null;
 *   reviews: import('../data/reviews.js').ReviewEntry[];
 *   error: Error | null;
 * }}
 */
export function useReviews() {
  return useMemo(() => {
    // TODO: replace with async fetch + caching when API keys / embed strategy are fixed.
    return {
      status: 'ready',
      stats: REVIEW_STATS,
      reviews: REVIEWS,
      error: null,
    }
  }, [])
}
