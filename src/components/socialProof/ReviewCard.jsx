import { useId, useMemo, useState } from 'react'
import { PlatformLogo } from './PlatformLogo.jsx'
import { StarRating } from './StarRating.jsx'
import styles from './ReviewCard.module.css'

/** @param {string} str */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * @param {string} isoDate YYYY-MM-DD
 */
function formatVerifiedDate(isoDate) {
  const d = new Date(`${isoDate}T12:00:00`)
  return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(d)
}

function sourceLabel(source) {
  if (source === 'google') return 'Google'
  if (source === 'tripadvisor') return 'Tripadvisor'
  return 'Airbnb'
}

const READ_MORE_AT = 200

/**
 * Single guest review — verified source chip, copper highlight, expandable body.
 *
 * @param {{ review: import('../../data/reviews.js').ReviewEntry }} props
 */
export function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)
  const headingId = useId()
  const logoTitleId = useId()
  const needsReadMore = review.body.length > READ_MORE_AT

  const highlighted = useMemo(() => {
    const h = review.highlight.trim()
    if (!h) {
      return <span>{review.body}</span>
    }
    const re = new RegExp(`(${escapeRegExp(h)})`, 'gi')
    const parts = review.body.split(re)
    return parts.map((part, i) => {
      if (part === '') return null
      const isHit = part.toLowerCase() === h.toLowerCase()
      return isHit ? (
        <mark key={i} className={styles.spark}>
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    })
  }, [review.body, review.highlight])

  const verifiedDate = formatVerifiedDate(review.date)

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <div className={styles.top}>
        <StarRating rating={review.rating} size={15} className={styles.starRow} />
        <h3 id={headingId} className={styles.author}>
          {review.author}
          {review.location ? (
            <span className={styles.location}> · {review.location}</span>
          ) : null}
        </h3>
      </div>

      <p className={styles.verify}>
        <PlatformLogo platform={review.source} size={16} titleId={logoTitleId} className={styles.verifyIcon} />
        <span className={styles.verifyText}>
          Verified on {sourceLabel(review.source)} ·{' '}
          <time dateTime={review.date}>{verifiedDate}</time>
        </span>
      </p>

      <blockquote className={styles.quote}>
        <p
          className={`${styles.body} ${needsReadMore && !expanded ? styles.bodyClamped : ''}`}
          id={`${headingId}-quote`}
        >
          {highlighted}
        </p>
      </blockquote>

      {needsReadMore ? (
        <div className={styles.readMoreWrap}>
          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`${headingId}-quote`}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        </div>
      ) : null}
    </article>
  )
}
