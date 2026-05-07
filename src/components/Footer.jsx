import { PreFooterCta } from './footer/PreFooterCta.jsx'
import { InstagramStrip } from './footer/InstagramStrip.jsx'
import { SiteFooter } from './footer/SiteFooter.jsx'

/**
 * Pre-footer CTA, Instagram strip, and core site footer.
 *
 * @param {{ bookingShell: import('../hooks/useBookingShell.js').BookingShellApi }} props
 */
export function Footer({ bookingShell }) {
  return (
    <>
      <PreFooterCta bookingShell={bookingShell} />
      <InstagramStrip />
      <SiteFooter />
    </>
  )
}
