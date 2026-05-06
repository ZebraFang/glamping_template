import { FARM_DIRECTIONS } from '../../data/farmMap.js'
import styles from './FarmMapInfoCard.module.css'

/**
 * @param {{ location: import('../../data/farmMap.js').FarmMapLocation }} props
 */
export function FarmMapInfoCard({ location }) {
  return (
    <div className={styles.card} aria-live="polite">
      <h3 className={styles.title}>{location.name}</h3>
      <div className={styles.meta}>
        <span>{location.accommodationType}</span>
        {location.sleeps > 0 ? <span>Sleeps {location.sleeps}</span> : null}
        <span>{location.walkNote}</span>
      </div>
      <p className={styles.desc}>{location.description}</p>

      <div className={styles.note}>
        <a
          className={styles.directionsLink}
          href={FARM_DIRECTIONS.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {FARM_DIRECTIONS.label}
        </a>
        <p className={styles.directionsHint}>Opens Google Maps in a new tab.</p>
      </div>
    </div>
  )
}
