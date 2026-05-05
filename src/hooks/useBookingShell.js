import { useCallback, useEffect, useState } from 'react'
import { desktopNavMediaQuery } from '../constants/breakpoints.js'
import { useBookingDemoState } from './useBookingDemoState.js'

/**
 * @typedef {'stay' | 'dates' | 'guests'} BookingShellStep
 */

/**
 * Booking draft + hero bar UI (mobile sheet + desktop step popovers).
 * Lifted so marketing sections can sync stay selection and open the flow.
 *
 * @typedef {Object} BookingShellApi
 * @property {ReturnType<typeof useBookingDemoState>} booking
 * @property {boolean} mobileOpen
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setMobileOpen
 * @property {BookingShellStep | null} activeDesktopStep
 * @property {React.Dispatch<React.SetStateAction<BookingShellStep | null>>} setActiveDesktopStep
 * @property {string} desktopValidationMessage
 * @property {React.Dispatch<React.SetStateAction<string>>} setDesktopValidationMessage
 * @property {(opts?: { stayId?: string; step?: BookingShellStep }) => void} openBookingFlow
 * @property {() => void} openMobileBooking
 * @property {() => void} closeBookingPanels
 */

/**
 * @returns {BookingShellApi}
 */
export function useBookingShell() {
  const booking = useBookingDemoState()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDesktopStep, setActiveDesktopStep] = useState(null)
  const [desktopValidationMessage, setDesktopValidationMessage] = useState('')

  const closeBookingPanels = useCallback(() => {
    setMobileOpen(false)
    setActiveDesktopStep(null)
    setDesktopValidationMessage('')
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(desktopNavMediaQuery)
    const onChange = () => {
      setMobileOpen(false)
      setActiveDesktopStep(null)
      setDesktopValidationMessage('')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const open = Boolean(mobileOpen || activeDesktopStep)
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeBookingPanels()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen, activeDesktopStep, closeBookingPanels])

  const openBookingFlow = useCallback(
    ({ stayId, step = 'stay' } = {}) => {
      if (stayId) booking.actions.setStay(stayId)
      setDesktopValidationMessage('')
      const isDesktop =
        typeof window !== 'undefined' && window.matchMedia(desktopNavMediaQuery).matches
      if (isDesktop) {
        setActiveDesktopStep(step)
      } else {
        setMobileOpen(true)
      }
    },
    [booking],
  )

  const openMobileBooking = useCallback(() => {
    setDesktopValidationMessage('')
    setMobileOpen(true)
  }, [])

  return {
    booking,
    mobileOpen,
    setMobileOpen,
    activeDesktopStep,
    setActiveDesktopStep,
    desktopValidationMessage,
    setDesktopValidationMessage,
    openBookingFlow,
    openMobileBooking,
    closeBookingPanels,
  }
}
