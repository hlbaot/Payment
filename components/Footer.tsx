'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

const RIA_LOGO_SRC =
  'https://www.riamoneytransfer.com/_next/static/media/ria-logo.94de361a.svg';

const companyLinks = [
  'footer.about',
  'footer.blog',
  'footer.becomeAgent',
  'footer.becomeDigitalPartner',
  'footer.becomeStrategicPartner',
  'footer.promotions',
  'footer.security',
  'footer.internationalTransfer',
];

const supportLinks = [
  'footer.privacyPolicy',
  'footer.terms',
  'footer.errorResolution',
  'footer.fileComplaint',
  'footer.fraudAwareness',
  'footer.helpCenter',
  'footer.sitemap',
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Facebook', href: 'https://www.facebook.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
];

export default function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={RIA_LOGO_SRC} alt="Ria" className="site-footer__logo" />
        </div>

        <div className="site-footer__columns">
          <div className="site-footer__column">
            <h4>{t('footer.company')}</h4>
            <ul>
              {companyLinks.map((item) => (
                <li key={item}>
                  <Link href="/about">{t(item)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <h4>{t('footer.support')}</h4>
            <ul>
              {supportLinks.map((item) => (
                <li key={item}>
                  <Link href="/support">{t(item)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column site-footer__column--social">
            <h4>{t('footer.followUs')}</h4>
            <div className="site-footer__socials">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="site-footer__social"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon kind={item.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__meta">
        <p>
          Ria Money Transfer. NMLS ID#920968. © {currentYear} Dandelion Payments, Inc.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  if (kind === 'Instagram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'Facebook') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.6.4-1 1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (kind === 'X') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18.2 3H21l-6.1 7 7.1 11H16l-4.8-7.2L5.6 21H3l6.6-7.6L2.7 3h6.1l4.4 6.4L18.2 3Zm-1.1 16h1.6L7.8 5H6.1l11 14Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (kind === 'YouTube') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21.6 7.3c.2.8.4 2.1.4 4.7s-.2 3.9-.4 4.7a2.8 2.8 0 0 1-2 2c-.9.3-4 .3-7.6.3s-6.7 0-7.6-.3a2.8 2.8 0 0 1-2-2C2.2 15.9 2 14.6 2 12s.2-3.9.4-4.7a2.8 2.8 0 0 1 2-2C5.3 5 8.4 5 12 5s6.7 0 7.6.3a2.8 2.8 0 0 1 2 2Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path d="M10 9.4v5.2L15 12l-5-2.6Z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 10.2V21H3.4V10.2h3.1ZM5 3.3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM21 21h-3.1v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H11V10.2h3v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5.1V21Z"
        fill="currentColor"
      />
    </svg>
  );
}
