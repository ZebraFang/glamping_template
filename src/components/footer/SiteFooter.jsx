import {
  FOOTER_BRAND,
  FOOTER_CONTACT,
  FOOTER_LEGAL,
  FOOTER_LINK_COLUMNS,
} from '../../data/footerContent.js'
import { FarmClubForm } from './FarmClubForm.jsx'
import styles from './SiteFooter.module.css'

function SloganWithAccent() {
  const { slogan, sloganAccent } = FOOTER_BRAND
  const i = slogan.indexOf(sloganAccent)
  if (i === -1) {
    return <p className={styles.slogan}>{slogan}</p>
  }
  return (
    <p className={styles.slogan}>
      {slogan.slice(0, i)}
      <em className={styles.sloganAccent}>{sloganAccent}</em>
      {slogan.slice(i + sloganAccent.length)}
    </p>
  )
}

function FooterLink({ link }) {
  const external = Boolean(link.external)
  return (
    <a
      className={styles.link}
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {link.label}
    </a>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => {
      document.getElementById('site-top')?.focus({ preventScroll: true })
    }, 350)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <hr className={styles.rule} aria-hidden />

        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <div>
              <span className={styles.brandDot} aria-hidden />
              <span className={styles.brandName}>{FOOTER_BRAND.name}</span>
            </div>
            <SloganWithAccent />
            <p className={styles.tagline}>{FOOTER_BRAND.tagline}</p>
          </div>

          <div>
            <h3 className={styles.contactHeading}>Contact & location</h3>
            <address className={styles.address}>
              {FOOTER_CONTACT.addressLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </address>
            <a className={styles.contactLink} href={`mailto:${FOOTER_CONTACT.email}`}>
              {FOOTER_CONTACT.email}
            </a>
            <a className={styles.contactLink} href={`tel:${FOOTER_CONTACT.phoneTel}`}>
              {FOOTER_CONTACT.phoneDisplay}
            </a>
          </div>

          <div className={styles.linksPair}>
            {FOOTER_LINK_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className={styles.linkColHeading}>{col.heading}</h3>
                <ul className={styles.linkList}>
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.label}`}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <FarmClubForm />
          </div>

          <div className={styles.legalBlock}>
            <ul className={styles.legalList}>
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <a className={styles.legalLink} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.bottom}>
            <p className={styles.copy}>© {year} {FOOTER_BRAND.name}</p>
            <button type="button" className={styles.backTop} onClick={backToTop}>
              ↑ Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
