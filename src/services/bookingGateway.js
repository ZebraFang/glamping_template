/**
 * Integration boundary for booking behaviour.
 * Swap these methods for PMS/channel-manager/API calls later.
 */
export const bookingGateway = {
  minNights: 1,
  maxGuests: 8,
  maxDogs: 3,

  isDateSelectable(date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  },

  canConfirm({ checkIn, checkOut, guests }) {
    if (!checkIn || !checkOut) return false
    if (!guests || guests.adults < 1) return false
    const totalGuests = guests.adults + guests.children
    return totalGuests >= 1 && totalGuests <= this.maxGuests && guests.dogs <= this.maxDogs
  },
}
