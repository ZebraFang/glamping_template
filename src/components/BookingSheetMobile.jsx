import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BookingFlowBody, BookingFlowFooter } from './BookingFlowContent.jsx'
import styles from './BookingSheetMobile.module.css'

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Full-viewport booking surface for narrow viewports (portaled to `document.body`).
 * @param {{ open: boolean; onClose: () => void; booking: object; dialogId: string; onConfirm?: () => void }} props
 */
export function BookingSheetMobile({ open, onClose, booking, dialogId, onConfirm }) {
  const closeBtnRef = useRef(null)
  const titleId = useId()
  const hadOpenRef = useRef(false)

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      if (hadOpenRef.current) closeBtnRef.current?.blur()
      return undefined
    }
    hadOpenRef.current = true
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => window.clearTimeout(t)
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      id={dialogId}
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          Book your escape
        </h2>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close booking"
        >
          <IconClose />
        </button>
      </header>

      <div className={styles.scroll}>
        <BookingFlowBody booking={booking} variant="sheet" />
      </div>
      <div className={styles.sheetFooter}>
        <BookingFlowFooter booking={booking} onConfirm={onConfirm} />
      </div>
    </div>,
    document.body,
  )
}
