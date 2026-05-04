import styles from './Placeholders.module.css'

/** Stub anchors for nav smoke-testing; replace with real sections as you build the template. */
export function PlaceholderSections() {
  return (
    <main className={styles.main}>
      <section id="stays" className={styles.sectionMuted} aria-labelledby="stays-heading">
        <div className={styles.inner}>
          <h2 id="stays-heading" className={styles.title}>
            Our stays
          </h2>
          <p className={styles.lead}>Section placeholder</p>
        </div>
      </section>
      <section id="farm" className={styles.section} aria-labelledby="farm-heading">
        <div className={styles.inner}>
          <h2 id="farm-heading" className={styles.title}>
            The farm
          </h2>
        </div>
      </section>
      <section id="stories" className={styles.sectionMuted} aria-labelledby="stories-heading">
        <div className={styles.inner}>
          <h2 id="stories-heading" className={styles.title}>
            Stories
          </h2>
        </div>
      </section>
      <section id="map" className={styles.section} aria-labelledby="map-heading">
        <div className={styles.inner}>
          <h2 id="map-heading" className={styles.title}>
            Map
          </h2>
        </div>
      </section>
    </main>
  )
}
