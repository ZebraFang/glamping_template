import { useEffect, useMemo, useState } from 'react'
import { bookingGateway } from '../services/bookingGateway.js'
import { HERO_STAYS } from '../data/heroStays.js'

const STORAGE_KEY = 'hollowfield.bookingDraft.v1'

function toIsoDate(date) {
  return date.toISOString().slice(0, 10)
}

function fromIsoDate(iso) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function getCurrentMonthStart() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function clampMonthToCurrent(monthDate) {
  const currentMonthStart = getCurrentMonthStart()
  if (!monthDate || monthDate < currentMonthStart) return currentMonthStart
  return new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
}

function diffNights(start, end) {
  if (!start || !end) return 0
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.max(0, Math.round((end - start) / msPerDay))
}

/** ISO timestamp from persisted draft; invalid values become null */
function parseConfirmedAt(raw) {
  if (raw == null || raw === '') return null
  if (typeof raw !== 'string') return null
  const t = Date.parse(raw)
  if (Number.isNaN(t)) return null
  return raw
}

function getInitialState() {
  return {
    selectedStayId: HERO_STAYS[0]?.id ?? '',
    checkIn: null,
    checkOut: null,
    guests: {
      adults: 2,
      children: 0,
      dogs: 0,
    },
    monthCursor: getCurrentMonthStart(),
    confirmedAt: null,
  }
}

function sanitizeDraft(draft) {
  if (!draft || typeof draft !== 'object') return getInitialState()
  const safeStay = HERO_STAYS.some((s) => s.id === draft.selectedStayId)
    ? draft.selectedStayId
    : HERO_STAYS[0]?.id ?? ''
  const safeAdults = Math.max(1, Number(draft?.guests?.adults) || 2)
  const safeChildren = Math.max(0, Number(draft?.guests?.children) || 0)
  const safeDogs = Math.max(0, Number(draft?.guests?.dogs) || 0)
  const checkIn = fromIsoDate(draft.checkIn)
  const checkOut = fromIsoDate(draft.checkOut)
  return {
    selectedStayId: safeStay,
    checkIn,
    checkOut: checkIn && checkOut && checkOut > checkIn ? checkOut : null,
    guests: {
      adults: safeAdults,
      children: safeChildren,
      dogs: safeDogs,
    },
    monthCursor: clampMonthToCurrent((draft.monthCursor && fromIsoDate(draft.monthCursor)) || getCurrentMonthStart()),
    confirmedAt: parseConfirmedAt(draft.confirmedAt),
  }
}

function formatGuestSummary(guests) {
  const total = guests.adults + guests.children
  const guestWord = total === 1 ? 'guest' : 'guests'
  return `${total} ${guestWord}`
}

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function useBookingDemoState() {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return getInitialState()
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      return raw ? sanitizeDraft(JSON.parse(raw)) : getInitialState()
    } catch {
      return getInitialState()
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const payload = {
      selectedStayId: state.selectedStayId,
      checkIn: state.checkIn ? toIsoDate(state.checkIn) : null,
      checkOut: state.checkOut ? toIsoDate(state.checkOut) : null,
      guests: state.guests,
      monthCursor: toIsoDate(new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth(), 1)),
      confirmedAt: state.confirmedAt,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [state])

  const nights = diffNights(state.checkIn, state.checkOut)
  const totalGuests = state.guests.adults + state.guests.children

  const selectedStay = useMemo(
    () => HERO_STAYS.find((stay) => stay.id === state.selectedStayId) ?? HERO_STAYS[0],
    [state.selectedStayId],
  )

  const summary = {
    stayName: selectedStay?.name ?? 'Choose your stay',
    datesLabel: state.checkIn && state.checkOut ? `${formatDate(state.checkIn)} - ${formatDate(state.checkOut)}` : 'Add dates',
    guestsLabel: formatGuestSummary(state.guests),
    nightsLabel: nights > 0 ? `${nights} night${nights === 1 ? '' : 's'} · ${formatGuestSummary(state.guests)}` : `0 nights · ${formatGuestSummary(state.guests)}`,
    rateLabel: selectedStay?.priceLabel ?? 'From £0 / night',
  }

  const firstIncompleteStep = (() => {
    if (!state.selectedStayId) return 'stay'
    if (!state.checkIn || !state.checkOut || state.checkOut <= state.checkIn) return 'dates'
    if (state.guests.adults < 1) return 'guests'
    return null
  })()

  const actions = {
    setStay(stayId) {
      setState((prev) => ({ ...prev, selectedStayId: stayId, confirmedAt: null }))
    },

    confirmSelection() {
      setState((prev) => ({ ...prev, confirmedAt: new Date().toISOString() }))
    },

    setMonthCursor(nextMonth) {
      setState((prev) => ({
        ...prev,
        monthCursor: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1),
      }))
    },

    moveMonth(delta) {
      setState((prev) => ({
        ...prev,
        monthCursor: clampMonthToCurrent(new Date(prev.monthCursor.getFullYear(), prev.monthCursor.getMonth() + delta, 1)),
      }))
    },

    selectDate(date) {
      if (!bookingGateway.isDateSelectable(date)) return
      setState((prev) => {
        const checkIn = prev.checkIn
        const checkOut = prev.checkOut
        if (!checkIn || checkOut) {
          return { ...prev, checkIn: date, checkOut: null, confirmedAt: null }
        }
        if (date <= checkIn) {
          return { ...prev, checkIn: date, checkOut: null, confirmedAt: null }
        }
        return { ...prev, checkOut: date, confirmedAt: null }
      })
    },

    nudgeGuests(key, delta) {
      setState((prev) => {
        const next = { ...prev.guests }
        if (key === 'adults') next.adults = Math.max(1, next.adults + delta)
        if (key === 'children') next.children = Math.max(0, next.children + delta)
        if (key === 'dogs') next.dogs = Math.max(0, Math.min(bookingGateway.maxDogs, next.dogs + delta))
        const people = next.adults + next.children
        if (people > bookingGateway.maxGuests) return prev
        return { ...prev, guests: next, confirmedAt: null }
      })
    },

    clearDraft() {
      if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
      setState(getInitialState())
    },
  }

  return {
    state,
    selectedStay,
    nights,
    totalGuests,
    summary,
    canConfirm: bookingGateway.canConfirm({
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
    }),
    firstIncompleteStep,
    isDateSelectable: bookingGateway.isDateSelectable.bind(bookingGateway),
    actions,
    addDays,
  }
}
