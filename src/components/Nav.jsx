import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Nav.module.css'
import { NAV_DESKTOP_MIN_PX } from '../constants/breakpoints.js'

/** Inline SVG for menu close control (stroke scales cleanly). */
function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  )
}

const DEFAULT_LINKS = [
  { href: '#stays', label: 'Our Stays' },
  { href: '#farm', label: 'The Farm' },
  { href: '#stories', label: 'Stories' },
  { href: '#map', label: 'Map' },
  { href: '#book', label: 'Book', cta: true },
]

function DemoChipRow({ onDemoLead }) {
  return (
    <div className={styles.demoRow}>
      <button type="button" className={styles.demoChip} onClick={onDemoLead}>
        Demo · Show lead popup
      </button>
    </div>
  )
}

/**
 * Responsive site header + navigation.
 *
 * - Sits over the hero (absolute). On viewports ≥ 900px, primary links show in the bar;
 *   below that, a hamburger opens a full-screen menu (portaled to `document.body`).
 * - Locks document scroll while the mobile menu is open.
 * - Optional demo chip when `onDemoLead` is set.
 */
export function Nav({
  brandName = 'Hollowfield',
  links = DEFAULT_LINKS,
  menuFooter = 'North Yorkshire Dales · Est. 1842',
  onDemoLead,
}) {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const hadOpenedRef = useRef(false)
  const menuId = useId()
  const dialogLabelId = useId()

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${NAV_DESKTOP_MIN_PX}px)`)
    const closeIfDesktop = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener('change', closeIfDesktop)
    closeIfDesktop()
    return () => mq.removeEventListener('change', closeIfDesktop)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      hadOpenedRef.current = true
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 80)
      return () => window.clearTimeout(t)
    }
    if (hadOpenedRef.current) {
      menuButtonRef.current?.focus()
    }
    return undefined
  }, [open])

  useEffect(() => {
    const prev = document.body.style.overflow
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prev || ''
    }
    return () => {
      document.body.style.overflow = prev || ''
    }
  }, [open])

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  const showDemo = typeof onDemoLead === 'function'

  const overlay = createPortal(
    <div
      id={menuId}
      className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogLabelId}
      aria-hidden={!open}
    >
      <div className={styles.overlayPanel}>
        <div className={styles.overlayInner}>
          {showDemo ? <DemoChipRow onDemoLead={onDemoLead} /> : null}
          <div className={styles.overlayHead}>
            <p id={dialogLabelId} className={styles.menuBrand}>
              {brandName}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeBtn}
              onClick={close}
              aria-label="Close menu"
            >
              <IconClose />
            </button>
          </div>
          <nav aria-label="Primary">
            <ul className={styles.navList}>
              {links.map(({ href, label, cta }) => (
                <li key={href} className={cta ? styles.navListCtaItem : undefined}>
                  <a href={href} className={cta ? styles.navCta : undefined} onClick={close}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <footer className={styles.menuFoot}>{menuFooter}</footer>
        </div>
      </div>
    </div>,
    document.body,
  )

  return (
    <>
      <header className={styles.siteHeader}>
        {showDemo ? <DemoChipRow onDemoLead={onDemoLead} /> : null}
        <div className={styles.topBar}>
          <div className={styles.topBarRow}>
            <div className={styles.brand}>
              <span className={styles.brandDot} aria-hidden />
              {brandName}
            </div>
            <nav className={styles.desktopNav} aria-label="Primary">
              <ul className={styles.desktopList}>
                {links.map(({ href, label, cta }) => (
                  <li key={href}>
                    <a href={href} className={cta ? styles.navCta : undefined}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuToggle}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={toggle}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {overlay}
    </>
  )
}
