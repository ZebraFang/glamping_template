import { useEffect, useId, useState } from 'react'
import { desktopNavMediaQuery } from '../constants/breakpoints.js'
import { useReviews } from '../hooks/useReviews.js'
import { PlatformLogo } from './socialProof/PlatformLogo.jsx'
import { StarRating } from './socialProof/StarRating.jsx'
import styles from './HeroTrustStrip.module.css'

function useTrustDisplaySizes() {
  const [sizes, setSizes] = useState({ logo: 20, stars: 14 })

  useEffect(() => {
    const mq = window.matchMedia(desktopNavMediaQuery)
    const sync = () => {
      setSizes(mq.matches ? { logo: 22, stars: 15 } : { logo: 20, stars: 14 })
    }
    mq.addEventListener('change', sync)
    sync()
    return () => mq.removeEventListener('change', sync)
  }, [])

  return sizes
}

/**
 * Compact Google + TripAdvisor ratings for the hero scrim — links to {@link SocialProofSection} `#trust`.
 */
export function HeroTrustStrip() {
  const { stats } = useReviews()
  const googleTitleId = useId()
  const tripTitleId = useId()
  const { logo, stars } = useTrustDisplaySizes()

  if (!stats) return null

  const googleLabel = `Google, ${stats.google.rating.toFixed(1)} out of 5 stars, ${stats.google.count} reviews`
  const tripLabel = `Tripadvisor, ${stats.tripadvisor.rating.toFixed(1)} out of 5 stars, ${stats.tripadvisor.count} reviews`

  return (
    <a href="#trust" className={styles.root} aria-label="Guest ratings — view reviews">
      <div className={styles.stat} aria-label={googleLabel}>
        <div className={styles.statRow}>
          <PlatformLogo platform="google" size={logo} titleId={googleTitleId} />
          <StarRating rating={stats.google.rating} size={stars} className={styles.stars} />
          <span className={styles.ratingNum}>{stats.google.rating.toFixed(1)}</span>
        </div>
        <p className={styles.count}>{stats.google.count}</p>
      </div>

      <div className={styles.divider} aria-hidden />

      <div className={styles.stat} aria-label={tripLabel}>
        <div className={styles.statRow}>
          <PlatformLogo platform="tripadvisor" size={logo} titleId={tripTitleId} />
          <StarRating rating={stats.tripadvisor.rating} size={stars} className={styles.stars} />
          <span className={styles.ratingNum}>{stats.tripadvisor.rating.toFixed(1)}</span>
        </div>
        <p className={styles.count}>{stats.tripadvisor.count}</p>
      </div>
    </a>
  )
}
