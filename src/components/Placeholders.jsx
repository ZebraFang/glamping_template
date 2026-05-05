import styles from './Placeholders.module.css'
import { OurStaysSection } from './ourStays/OurStaysSection.jsx'
import { SocialProofSection } from './socialProof/SocialProofSection.jsx'

/** Stub anchors for nav smoke-testing; replace with real sections as you build the template. */
export function PlaceholderSections({ bookingShell }) {
  return (
    <main className={styles.main}>
      <OurStaysSection bookingShell={bookingShell} />
      <SocialProofSection />
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
