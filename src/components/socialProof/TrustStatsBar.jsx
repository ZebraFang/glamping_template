import { useId } from 'react'
import { PlatformLogo } from './PlatformLogo.jsx'
import { StarRating } from './StarRating.jsx'
import styles from './TrustStatsBar.module.css'

/**
 * Aggregate ratings strip — Google + TripAdvisor with logos (not text-only).
 *
 * @param {{
 *   stats: import('../../data/reviews.js').ReviewStats;
 *   className?: string;
 * }} props
 */
export function TrustStatsBar({ stats, className }) {
  const googleTitleId = useId()
  const tripTitleId = useId()

  return (
    <div className={`${styles.strip} ${className ?? ''}`} role="group" aria-label="Guest ratings summary">
      <div className={styles.stat}>
        <div className={styles.statHead}>
          <PlatformLogo platform="google" size={22} titleId={googleTitleId} />
          <span className={styles.statLabel}>Google</span>
        </div>
        <StarRating rating={stats.google.rating} size={14} className={styles.stars} />
        <p className={styles.statMeta}>
          <span className={styles.ratingNum}>{stats.google.rating.toFixed(1)}</span>
          <span className={styles.sep}>·</span>
          <span>{stats.google.count} reviews</span>
        </p>
      </div>

      <div className={styles.divider} aria-hidden />

      <div className={styles.stat}>
        <div className={styles.statHead}>
          <PlatformLogo platform="tripadvisor" size={22} titleId={tripTitleId} />
          <span className={styles.statLabel}>Tripadvisor</span>
        </div>
        <StarRating rating={stats.tripadvisor.rating} size={14} className={styles.stars} />
        <p className={styles.statMeta}>
          <span className={styles.ratingNum}>{stats.tripadvisor.rating.toFixed(1)}</span>
          <span className={styles.sep}>·</span>
          <span>{stats.tripadvisor.count} reviews</span>
        </p>
      </div>

      <p className={styles.total}>
        <span className={styles.totalBadge}>{stats.totalReviews}</span> verified guest voices across platforms
      </p>
    </div>
  )
}
