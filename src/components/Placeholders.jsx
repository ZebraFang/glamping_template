import styles from './Placeholders.module.css'
import { OurStaysSection } from './ourStays/OurStaysSection.jsx'
import { SocialProofSection } from './socialProof/SocialProofSection.jsx'
import { FarmSection } from './farm/FarmSection.jsx'
import { FaqSection } from './faq/FaqSection.jsx'
import { FarmMapSection } from './farmMap/FarmMapSection.jsx'

/** Stub anchors for nav smoke-testing; replace with real sections as you build the template. */
export function PlaceholderSections({ bookingShell }) {
  return (
    <main className={styles.main}>
      <OurStaysSection bookingShell={bookingShell} />
      <SocialProofSection />
      <FarmSection />
      <FaqSection />
      <FarmMapSection />
    </main>
  )
}
