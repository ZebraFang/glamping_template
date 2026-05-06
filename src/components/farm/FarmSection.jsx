import { LocalAreaExplorer } from './LocalAreaExplorer.jsx'
import { SeasonalCalendar } from './SeasonalCalendar.jsx'
import styles from './FarmSection.module.css'

/**
 * Farm life & local area — mosaic explorer + seasonal tracker. Anchor `id="farm"` for nav + WorkingFarmBadge.
 */
export function FarmSection() {
  return (
    <section className={styles.section} id="farm" aria-labelledby="farm-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="farm-heading" className={styles.title}>
            Beyond the hut
          </h2>
          <p className={styles.subtitle}>
            The land, the table, and the rhythm of the year — everything that makes Hollowfield more than a
            night away.
          </p>
        </header>

        <LocalAreaExplorer />
        <SeasonalCalendar />
      </div>
    </section>
  )
}
