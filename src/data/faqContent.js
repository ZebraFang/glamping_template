/**
 * FAQ + pack-light copy — edit here to update UI and JSON-LD together.
 */

export const FAQ_SECTION_META = {
  id: 'faq',
  title: 'The Practicalities',
  subtitle: 'A guide for the weary',
  packLightHeading: 'Pack light',
  packLightLead:
    'Guests often overpack for glamping. Here’s what we already set up — and what’s worth slipping into your bag.',
}

/** @typedef {{ id: string; question: string; answer: string }} FaqItem */

/** @type {FaqItem[]} */
export const FAQ_ITEMS = [
  {
    id: 'wifi-signal',
    question: 'Is there Wi-Fi or phone signal?',
    answer:
      'We encourage the slow-down, so phone signal is patchy out in the fields. However, every hut is fitted with high-speed Wi-Fi. You can stream a movie, or switch it off and listen to the owls. Your choice.',
  },
  {
    id: 'dogs',
    question: 'Are dogs welcome?',
    answer:
      'Absolutely. We love hosting well-behaved dogs (max 1 per hut, £15 supplement). Because Hollowfield is a working farm with free-roaming sheep, we just ask that dogs are kept on a lead when walking through the lower paddocks.',
  },
  {
    id: 'checkin',
    question: 'What are the check-in and check-out times?',
    answer:
      'Check-in is from 3:00 PM and check-out is by 10:30 AM. We operate a seamless self-check-in via a lockbox, so if you arrive late after a long drive, your hut will be unlocked, the lights on, and the fire laid ready to light.',
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'Life happens. You can cancel for a full refund up to 14 days before your stay. Within 14 days, we’re happy to help you reschedule your dates for later in the season.',
  },
  {
    id: 'winter-warmth',
    question: 'Is it warm enough in the winter?',
    answer:
      'Our huts are built for British weather. With sheep’s wool insulation, double glazing, and a roaring log burner, it’s actually coziest when it’s snowing outside.',
  },
]

export const PACK_LIGHT_LABELS = {
  provided: 'We’ve got it sorted',
  bring: 'Your canvas bag',
}

/**
 * Provided vs bring — desktop can render paired rows; counts may differ (sparse cells OK).
 */
export const PACK_LIGHT = {
  provided: [
    'Egyptian cotton towels & robes',
    'Logs, kindling, and firelighters',
    'Coffee, tea, and local milk',
    'Luxury shower gel & shampoo',
    'Ingredients for the pizza oven',
  ],
  bring: [
    'Sturdy walking boots or wellies',
    'A good book and a warm jumper',
    'A waterproof jacket (just in case)',
  ],
}
