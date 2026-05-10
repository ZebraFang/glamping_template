import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import farmWalksMapImage from '../images/the-lead-gen-map.png'
import styles from './LeadDemoToast.module.css'

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Demo lead-capture modal (“Farm walks” magnet). Portaled + scroll-locked; wiring to email APIs is future work.
 *
 * @param {{ onDismiss: () => void }} props
 */
export function LeadDemoToast({ onDismiss }) {
  const closeBtnRef = useRef(null)
  const titleId = useId()
  const emailFieldId = useId()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDismiss])

  useEffect(() => {
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 60)
    return () => window.clearTimeout(t)
  }, [])

  const handleBackdropPointerDown = (e) => {
    if (e.target === e.currentTarget) onDismiss()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  const modal = (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={handleBackdropPointerDown}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.closeBtn}
          onClick={onDismiss}
          aria-label="Close"
        >
          <IconClose />
        </button>

        <div className={styles.layout}>
          <div className={styles.media}>
            <img
              className={styles.mediaImg}
              src={farmWalksMapImage}
              alt="Hand-drawn illustrated map of footpaths and farm walks around Hollowfield"
              width={800}
              height={500}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className={styles.copy}>
            <h2 id={titleId} className={styles.headline}>
              Hidden Farm Walks{' '}
              <span className={styles.headlineAccent}>+ 10% off.</span>
            </h2>
            <p className={styles.body}>
              Six walks the locals actually use — drop them on your phone before you arrive.
              We&apos;ll throw in 10% off your first stay.
            </p>

            {submitted ? (
              <p className={styles.thanks} role="status">
                Thanks — you&apos;re on the list. (Demo: no email was sent.)
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <label htmlFor={emailFieldId} className={styles.visuallyHidden}>
                    Email address
                  </label>
                  <input
                    id={emailFieldId}
                    className={styles.input}
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className={styles.submitBtn}>
                    SEND →
                  </button>
                </div>
              </form>
            )}

            <p className={styles.disclaimer}>NO SPAM. UNSUBSCRIBE ANYTIME.</p>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
