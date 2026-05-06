import styles from './Placeholders.module.css'
import { OurStaysSection } from './ourStays/OurStaysSection.jsx'
import { SocialProofSection } from './socialProof/SocialProofSection.jsx'
import { FarmSection } from './farm/FarmSection.jsx'
import { FaqSection } from './faq/FaqSection.jsx'

/** Stub anchors for nav smoke-testing; replace with real sections as you build the template. */
export function PlaceholderSections({ bookingShell }) {
  return (
    <main className={styles.main}>
      <OurStaysSection bookingShell={bookingShell} />
      <SocialProofSection />
      <FarmSection />
      <FaqSection />
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
