/**
 * Footer & pre-footer copy — centralised for easy updates.
 * Replace `#` hrefs when real pages exist.
 */
import { FARM_DIRECTIONS } from './farmMap.js'

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

/** Instagram strip — swap imageSrc when connecting Graph API or static assets */
export const INSTAGRAM_PLACEHOLDERS = [
  { id: 'ig-1', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 1' },
  { id: 'ig-2', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 2' },
  { id: 'ig-3', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 3' },
  { id: 'ig-4', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 4' },
  { id: 'ig-5', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 5' },
  { id: 'ig-6', imageSrc: '', href: 'https://www.instagram.com/', alt: 'Recent farm photo 6' },
]
