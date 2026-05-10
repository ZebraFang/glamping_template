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
  const relatedRel = activity.related?.external ? 'noopener noreferrer' : undefined
  const relatedTarget = activity.related?.external ? '_blank' : undefined

  if (isFeatured) {
    return (
      <article className={`${styles.card} ${styles.cardFeatured}`} aria-labelledby={headingId}>
        <div className={styles.featuredShell}>
          <MediaSlot variant="featured" fill mediaCue={activity.mediaCue} imageSrc={activity.imageUrl} imageAlt={activity.mediaCue}/>
          <div className={styles.featuredOverlay} aria-hidden />
          <div className={styles.featuredCopy}>
            <div className={styles.featuredMain}>
              <p className={styles.distance}>{activity.distanceLabel}</p>
              <p className={styles.breadcrumb}>{activity.breadcrumb || 'Beyond the hut / Feature guide'}</p>
              <h3 id={headingId} className={styles.headlineFeatured}>
                {activity.headline}
              </h3>
              <p className={styles.storyFeatured}>{activity.story || activity.sentence}</p>
              <a className={styles.action} href={activity.action.href} target={target} rel={rel}>
                Read full guide
              </a>
            </div>
            <aside className={styles.featuredMeta} aria-label="Activity highlights">
              <ul className={styles.metaList}>
                {(activity.meta?.length ? activity.meta : [activity.distanceLabel, 'Seasonal highlight']).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {activity.related ? (
                <a
                  className={styles.relatedLink}
                  href={activity.related.href}
                  target={relatedTarget}
                  rel={relatedRel}
                >
                  {activity.related.label}
                </a>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={`${styles.card} ${styles.cardStandard}`} aria-labelledby={headingId}>
      <MediaSlot variant="standard" mediaCue={activity.mediaCue} imageSrc={activity.imageUrl} imageAlt={activity.mediaCue} />
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
