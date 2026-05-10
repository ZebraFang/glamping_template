/**
 * Footer & pre-footer copy — centralised for easy updates.
 * Replace `#` hrefs when real pages exist.
 */
import igCoupleHappy from '../images/insta-couple-happy.jpg'
import igDeckHappy from '../images/insta-deck-happy.jpg'
import igDogHay from '../images/insta-dog-hay.jpg'
import igHappyGoat from '../images/insta-happy-goat.jpg'
import igWine from '../images/insta-wine.jpg'
import igYurt from '../images/insta-yurt.jpg'
import { FARM_DIRECTIONS } from './farmMap.js'

/** Point every tile at your real Instagram profile (or remove `INSTAGRAM_PROFILE_URL` usage below). */
export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/'

export const PRE_FOOTER = {
  titleLine1: 'The stars are waiting.',
  titleLine2: 'Your Yorkshire escape starts here.',
  ctaLabel: 'Check dates & availability',
}

export const FOOTER_BRAND = {
  name: 'Hollowfield',
  slogan: 'Twelve acres of quiet, kept ready for you.',
  sloganAccent: 'quiet',
  tagline: 'A working farm and luxury retreat in the North York Moors.',
  /** Future: brand mark image src */
  logoSrc: '',
}

export const FOOTER_CONTACT = {
  addressLines: [
    'Hollowfield Farm',
    'North Yorkshire',
    'YO62 4XX',
    'United Kingdom',
  ],
  email: 'hello@hollowfield.co.uk',
  /** E.164-friendly for tel: links */
  phoneDisplay: '+44 (0)1751 000 000',
  phoneTel: '+441751000000',
}

/** VISIT / FIND US — replace `#` when pages ship (vouchers, train guide, press). */
export const FOOTER_LINK_COLUMNS = [
  {
    heading: 'Visit',
    links: [
      { label: 'Our Stays', href: '#stays' },
      { label: 'The Farm', href: '#farm' },
      { label: 'Gift vouchers', href: '#' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Find us',
    links: [
      { label: 'Driving directions', href: FARM_DIRECTIONS.googleMapsUrl, external: true },
      { label: 'By train', href: '#' },
      {
        label: 'Contact',
        href: `mailto:${FOOTER_CONTACT.email}?subject=Enquiry%20about%20staying%20at%20Hollowfield`,
      },
      { label: 'Press', href: '#' },
    ],
  },
]

/** Legal row — replace `#` with real policy URLs for Stripe/compliance. */
export const FOOTER_LEGAL = [
  { label: 'Terms & conditions', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Accessibility', href: '#' },
  { label: 'FAQ', href: '#faq' },
]

export const FARM_CLUB = {
  heading: 'Farm Club',
  description: 'Join for seasonal updates and late-availability drops.',
  placeholder: 'Your email',
  submitLabel: 'Subscribe',
  successTitle: 'Welcome to the Farm Club.',
  successBody: 'Check your inbox.',
}

/**
 * Instagram strip — static tiles until you wire Meta Graph API or an embed.
 *
 * How to change photos: import from `src/images/` (Vite resolves hashed URLs) and set `imageSrc`.
 * Or put files in `/public` and use `imageSrc: '/your-file.jpg'` (no import).
 *
 * How to change links: edit {@link INSTAGRAM_PROFILE_URL} or set per-tile `href` (e.g. deep-link a post).
 */
export const INSTAGRAM_PLACEHOLDERS = [
  {
    id: 'ig-1',
    imageSrc: igHappyGoat,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Goat on the farm at Hollowfield',
  },
  {
    id: 'ig-2',
    imageSrc: igWine,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Relaxing with a drink after a day in the Yorkshire countryside',
  },
  {
    id: 'ig-3',
    imageSrc: igYurt,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Glamping accommodation nestled in the landscape',
  },
  {
    id: 'ig-4',
    imageSrc: igDeckHappy,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Guests enjoying morning coffee on the deck',
  },
  {
    id: 'ig-5',
    imageSrc: igCoupleHappy,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Guests smiling outside their stay',
  },
  {
    id: 'ig-6',
    imageSrc: igDogHay,
    href: INSTAGRAM_PROFILE_URL,
    alt: 'Dog beside hay bales on the farm',
  },
]
