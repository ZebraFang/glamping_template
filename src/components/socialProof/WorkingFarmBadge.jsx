import styles from './WorkingFarmBadge.module.css'

/**
 * USP seal — expands to educational copy + deep link to `#farm`.
 * Native `<details>` gives keyboard + SR disclosure without extra JS.
 */
export function WorkingFarmBadge() {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span className={styles.sealRing} aria-hidden />
        <span className={styles.sealText}>Working Farm</span>
      </summary>
      <div className={styles.panel}>
        <p className={styles.question}>What does &lsquo;Working Farm&rsquo; mean?</p>
        <p className={styles.answer}>
          Real livestock, seasonal rhythms, and honest countryside noise — not a theme park. We manage
          stocking and grazing so guests see farm life authentically.
        </p>
        <a className={styles.link} href="#farm">
          Learn about our livestock &amp; seasons
        </a>
      </div>
    </details>
  )
}
