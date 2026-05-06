import { SEASONS, getSeasonIdForMonth } from '../../data/localArea.js'
import styles from './SeasonalCalendar.module.css'

/**
 * Highlights the current season from the device date (UK-oriented month buckets in data).
 */
export function SeasonalCalendar() {
  const month = new Date().getMonth() + 1
  const currentId = getSeasonIdForMonth(month)

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>Seasonal tracker</h3>
      <p className={styles.lead}>What the farm is doing right now — and what&apos;s coming next.</p>
      <ul className={styles.grid}>
        {SEASONS.map((s) => {
          const isCurrent = s.id === currentId
          return (
            <li
              key={s.id}
              className={`${styles.tile} ${isCurrent ? styles.tileCurrent : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <p className={styles.label}>{s.label}</p>
              <p className={styles.tileHeadline}>{s.headline}</p>
              <p className={styles.tileBody}>{s.body}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
