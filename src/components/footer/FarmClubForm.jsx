import { useId, useState } from 'react'
import { FARM_CLUB } from '../../data/footerContent.js'
import styles from './FarmClubForm.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function FarmClubForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const formId = useId()

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Enter your email address.')
      return
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError('Please enter a valid email address.')
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className={styles.wrap} role="status" aria-live="polite">
        <p className={`${styles.success} ${styles.successTitle}`}>{FARM_CLUB.successTitle}</p>
        <p className={`${styles.success} ${styles.successBody}`}>{FARM_CLUB.successBody}</p>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.heading}>{FARM_CLUB.heading}</h3>
      <p className={styles.description}>{FARM_CLUB.description}</p>
      <form className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby={`${formId}-legend`}>
        <span id={`${formId}-legend`} className="visually-hidden">
          Farm Club newsletter signup
        </span>
        <label htmlFor={`${formId}-email`} className="visually-hidden">
          Email address
        </label>
        <input
          id={`${formId}-email`}
          className={styles.input}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={FARM_CLUB.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${formId}-err` : undefined}
        />
        <button type="submit" className={styles.submit}>
          {FARM_CLUB.submitLabel}
        </button>
      </form>
      {error ? (
        <p id={`${formId}-err`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
