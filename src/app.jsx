import { useState } from 'react'
import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { useBookingShell } from './hooks/useBookingShell.js'
import { Footer } from './components/Footer.jsx'
import { PlaceholderSections } from './components/Placeholders.jsx'
import { LeadDemoToast } from './components/LeadDemoToast.jsx'
import styles from './app.module.css'

/**
 * Root layout: full-width shell; sections stack vertically.
 * Nav overlays the hero — desktop shows inline links; narrow viewports use the overlay menu.
 */
export default function App() {
  const [leadDemoOpen, setLeadDemoOpen] = useState(false)
  const bookingShell = useBookingShell()

  return (
    <div className="shell">
      <div className={styles.heroSlot}>
        <Nav onDemoLead={() => setLeadDemoOpen(true)} />
        <Hero bookingShell={bookingShell} />
      </div>

      <PlaceholderSections bookingShell={bookingShell} />
      <Footer />

      {leadDemoOpen ? <LeadDemoToast onDismiss={() => setLeadDemoOpen(false)} /> : null}
    </div>
  )
}
