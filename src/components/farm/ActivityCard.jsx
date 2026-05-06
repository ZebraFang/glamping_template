import { useId } from 'react'
import { MediaSlot } from './MediaSlot.jsx'
import styles from './ActivityCard.module.css'

/**
 * @param {{ activity: import('../../data/localArea.js').LocalActivity }} props
 */
export function ActivityCard({ activity }) {
  const headingId = useId()
  const isFeatured = Boolean(activity.featured)
  const rel = activity.action.external ? 'noopener noreferrer' : undefined
  const target = activity.action.external ? '_blank' : undefined

  if (isFeatured) {
    return (
      <article className={`${styles.card} ${styles.cardFeatured}`} aria-labelledby={headingId}>
        <div className={styles.featuredShell}>
          <MediaSlot variant="featured" fill mediaCue={activity.mediaCue} />
          <div className={styles.featuredOverlay} aria-hidden />
          <div className={styles.featuredCopy}>
            <p className={styles.distance}>{activity.distanceLabel}</p>
            <h3 id={headingId} className={styles.headlineFeatured}>
              {activity.headline}
            </h3>
            <p className={styles.sentenceFeatured}>{activity.sentence}</p>
            <a className={styles.action} href={activity.action.href} target={target} rel={rel}>
              {activity.action.label}
            </a>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={`${styles.card} ${styles.cardStandard}`} aria-labelledby={headingId}>
      <MediaSlot variant="standard" mediaCue={activity.mediaCue} />
      <div className={styles.body}>
        <p className={styles.distance}>{activity.distanceLabel}</p>
        <h3 id={headingId} className={styles.headline}>
          {activity.headline}
        </h3>
        <p className={styles.sentence}>{activity.sentence}</p>
        <a className={styles.action} href={activity.action.href} target={target} rel={rel}>
          {activity.action.label}
        </a>
      </div>
    </article>
  )
}
