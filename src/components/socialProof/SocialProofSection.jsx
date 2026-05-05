import { Fragment } from 'react'
import { useReviews } from '../../hooks/useReviews.js'
import { BrandTile } from './BrandTile.jsx'
import { ReviewCard } from './ReviewCard.jsx'
import { TrustStatsBar } from './TrustStatsBar.jsx'
import { WorkingFarmBadge } from './WorkingFarmBadge.jsx'
import styles from './SocialProofSection.module.css'

/**
 * Social proof & trust — hybrid desktop layout: sticky authority column + 2-col masonry feed.
 */
export function SocialProofSection() {
  const { status, stats, reviews, error } = useReviews()

  if (status === 'loading') {
    return (
      <section
        className={styles.section}
        id="trust"
        aria-busy="true"
        aria-label="Loading guest reviews"
      >
        <div className={styles.inner}>
          <p className={styles.fallback}>Loading guest reviews…</p>
        </div>
      </section>
    )
  }

  if (status === 'error' || !stats) {
    return (
      <section className={styles.section} id="trust" aria-labelledby="trust-heading">
        <div className={styles.inner}>
          <p className={styles.fallback} role="alert">
            {error?.message ?? 'Guest reviews are temporarily unavailable.'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="trust" aria-labelledby="trust-heading">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.authority}>
            <header className={styles.intro}>
              <h2 id="trust-heading" className={styles.title}>
                A welcome you&rsquo;ll remember
              </h2>
              <p className={styles.lead}>
                Real voices from Google and Tripadvisor — plus the farm moments guests mention again and
                again.
              </p>
            </header>

            <TrustStatsBar stats={stats} />

            <WorkingFarmBadge />
          </div>

          <div className={styles.feed}>
            {reviews.map((review, index) => (
              <Fragment key={review.id}>
                <ReviewCard review={review} />
                {index === 1 ? <BrandTile /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
