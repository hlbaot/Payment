'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import qrImage from '@/images/QR.png';
import '@/scss/navbar.scss';
import { useI18n } from '@/components/I18nProvider';

const RIA_LOGO_SRC =
  'https://www.riamoneytransfer.com/_next/static/media/ria-logo.94de361a.svg';

type NavLink = {
  href: string;
  label?: string;
  labelKey?: string;
};

const marketingLinks: NavLink[] = [
  { href: '/', labelKey: 'nav.moneyTransfers' },
  { href: '/find-a-location', labelKey: 'nav.findLocation' },
  { href: '/orders', labelKey: 'nav.trackTransfer' },
  { href: '/documentation', labelKey: 'nav.resources' },
  { href: '/counter-market', label: 'Counter' },
];

const accountLinks: NavLink[] = [
  // { href: '/orders', label: 'Orders' },
  // { href: '/wallet', label: 'Wallet' },
  // { href: '/settings', label: 'Settings' },
];

const moneyTransfersMenu = {
  en: {
    title: 'Send and receive money worldwide',
    waysToSendTitle: 'Ways to send',
    sendToTitle: 'Send to',
    waysToReceiveTitle: 'Ways to receive',
    promoTitle: 'Send money on the go',
    waysToSend: [
      'Send money',
      'Send money online',
      'Send money with the app',
      'Send money in person',
      'Send money with WhatsApp',
    ],
    sendTo: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America', 'Oceania'],
    waysToReceive: [
      'Receive money',
      'Bank deposit',
      'Cash pickup',
      'Digital wallet',
      'Home delivery',
      'ATM withdrawal',
    ],
  },
  vi: {
    title: 'Gửi và nhận tiền trên toàn thế giới',
    waysToSendTitle: 'Cách gửi tiền',
    sendToTitle: 'Gửi đến',
    waysToReceiveTitle: 'Cách nhận tiền',
    promoTitle: 'Gửi tiền mọi lúc mọi nơi',
    waysToSend: [
      'Gửi tiền',
      'Gửi tiền trực tuyến',
      'Gửi tiền bằng ứng dụng',
      'Gửi tiền tại điểm giao dịch',
      'Gửi tiền qua WhatsApp',
    ],
    sendTo: ['Châu Phi', 'Châu Á', 'Châu Âu', 'Châu Mỹ Latinh', 'Bắc Mỹ', 'Châu Đại Dương'],
    waysToReceive: [
      'Nhận tiền',
      'Chuyển khoản ngân hàng',
      'Nhận tiền mặt',
      'Ví điện tử',
      'Giao tận nhà',
      'Rút tiền ATM',
    ],
  },
};

const countryOptions = [
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

const resourcesMenu = {
  en: {
    title: 'Fast and safe money transfers',
    toolsTitle: 'Tools',
    companyTitle: 'Company',
    partnershipsTitle: 'Partnerships',
    promoTitle: 'Send money on the go',
    tools: ['Currency converter', 'IBAN Calculator', 'Help center'],
    company: ['Blog', 'About us', 'Careers', 'Sponsorships', 'Leadership', 'Services'],
    partnerships: [
      'Become an agent',
      'Become a digital partner',
      'Become a strategic partner',
      'Become an affiliate',
    ],
  },
  vi: {
    title: 'Chuyển tiền nhanh và an toàn',
    toolsTitle: 'Công cụ',
    companyTitle: 'Công ty',
    partnershipsTitle: 'Đối tác',
    promoTitle: 'Gửi tiền mọi lúc mọi nơi',
    tools: ['Công cụ đổi tiền', 'Máy tính IBAN', 'Trung tâm trợ giúp'],
    company: ['Blog', 'Về chúng tôi', 'Tuyển dụng', 'Tài trợ', 'Lãnh đạo', 'Dịch vụ'],
    partnerships: [
      'Trở thành đại lý',
      'Trở thành đối tác số',
      'Trở thành đối tác chiến lược',
      'Trở thành đối tác liên kết',
    ],
  },
};

export default function Navbar() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTransfersMenu, setShowTransfersMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const countryMenuRef = useRef<HTMLDivElement | null>(null);
  const transfersCloseTimerRef = useRef<number | null>(null);
  const resourcesCloseTimerRef = useRef<number | null>(null);
  const showNavOverlay = showTransfersMenu || showResourcesMenu;
  const transferCopy = locale === 'vi' ? moneyTransfersMenu.vi : moneyTransfersMenu.en;
  const resourcesCopy = locale === 'vi' ? resourcesMenu.vi : resourcesMenu.en;
  const getNavLabel = (link: { label?: string; labelKey?: string }) =>
    link.labelKey ? t(link.labelKey) : link.label ?? '';

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    const nextIsLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setIsLoggedIn(nextIsLoggedIn);
      setShowMobileMenu(false);
      setShowProfileMenu(false);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!showMobileMenu) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  useEffect(() => {
    if (!showCountryMenu) return undefined;

    const onPointerDown = (event: MouseEvent) => {
      if (!countryMenuRef.current) return;
      if (!countryMenuRef.current.contains(event.target as Node)) {
        setShowCountryMenu(false);
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, [showCountryMenu]);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setShowMobileMenu(false);
    setShowProfileMenu(false);
    router.push('/login');
  };

  const closeMenus = () => {
    setShowMobileMenu(false);
    setShowProfileMenu(false);
    setShowTransfersMenu(false);
    setShowResourcesMenu(false);
    setShowCountryMenu(false);
  };

  const clearTransfersCloseTimer = () => {
    if (transfersCloseTimerRef.current !== null) {
      window.clearTimeout(transfersCloseTimerRef.current);
      transfersCloseTimerRef.current = null;
    }
  };

  const clearResourcesCloseTimer = () => {
    if (resourcesCloseTimerRef.current !== null) {
      window.clearTimeout(resourcesCloseTimerRef.current);
      resourcesCloseTimerRef.current = null;
    }
  };

  const openTransfersMenu = () => {
    clearTransfersCloseTimer();
    clearResourcesCloseTimer();
    setShowTransfersMenu(true);
    setShowResourcesMenu(false);
  };

  const openResourcesMenu = () => {
    clearTransfersCloseTimer();
    clearResourcesCloseTimer();
    setShowResourcesMenu(true);
    setShowTransfersMenu(false);
  };

  const scheduleCloseTransfersMenu = () => {
    clearTransfersCloseTimer();
    transfersCloseTimerRef.current = window.setTimeout(() => {
      setShowTransfersMenu(false);
    }, 120);
  };

  const scheduleCloseResourcesMenu = () => {
    clearResourcesCloseTimer();
    resourcesCloseTimerRef.current = window.setTimeout(() => {
      setShowResourcesMenu(false);
    }, 120);
  };

  const closeDropdownMenus = () => {
    clearTransfersCloseTimer();
    clearResourcesCloseTimer();
    setShowTransfersMenu(false);
    setShowResourcesMenu(false);
  };

  const renderGuestActions = (mobile = false) => (
    <div className={mobile ? 'site-mobile-menu__actions' : 'site-header__actions'}>
      {mobile ? (
        <button type="button" className="site-chip" aria-label={t('nav.countrySelector')}>
          <span className="site-chip__flag" aria-hidden="true">
            <span className="site-chip__flag-inner site-chip__flag-inner--us" />
          </span>
          <span className="site-chip__label">US</span>
          <ChevronIcon />
        </button>
      ) : (
        <div
          className="site-country-picker"
          ref={countryMenuRef}
          onMouseEnter={() => setShowCountryMenu(true)}
          onMouseLeave={() => setShowCountryMenu(false)}
        >
          <button
            type="button"
            className={`site-chip${showCountryMenu ? ' is-open' : ''}`}
            aria-label={t('nav.countrySelector')}
            aria-haspopup="true"
            aria-expanded={showCountryMenu}
            onClick={() => setShowCountryMenu((current) => !current)}
          >
            <span className="site-chip__emoji-flag" aria-hidden="true">
              {selectedCountry.flag}
            </span>
            <span className="site-chip__label">{selectedCountry.code}</span>
            <span className={`site-chip__chevron${showCountryMenu ? ' is-open' : ''}`}>
              <ChevronIcon />
            </span>
          </button>

          {showCountryMenu ? (
            <div className="site-country-menu" role="menu" aria-label={t('nav.chooseCountry')}>
              <div className="site-country-menu__grid">
                {countryOptions.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    className={`site-country-menu__item${selectedCountry.code === country.code ? ' is-active' : ''}`}
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountryMenu(false);
                    }}
                  >
                    <span className="site-country-menu__flag" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      <LanguageSwitcher className={mobile ? 'w-full' : ''} align="right" />

      <Link href="/login" className="site-login-link">
        {t('nav.login')}
      </Link>
    </div>
  );

  const renderMemberActions = (mobile = false) => (
    <div className={mobile ? 'site-mobile-menu__member' : 'site-member'}>
      <LanguageSwitcher className={mobile ? 'w-full' : ''} align="right" />

      <div className="site-member__links">
        {accountLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`site-member__link${isActive ? ' is-active' : ''}`}
              onClick={closeMenus}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="site-member__profile">
        <button
          type="button"
          className="site-profile-button"
          aria-expanded={showProfileMenu}
          onClick={() => setShowProfileMenu((current) => !current)}
        >
          <span className="site-profile-button__avatar">JD</span>
          <span className="site-profile-button__meta">
            <span className="site-profile-button__name">John Doe</span>
            <span className="site-profile-button__status">Premium</span>
          </span>
          <ChevronIcon />
        </button>

        {!mobile && showProfileMenu ? (
          <div className="site-profile-menu">
            <Link href="/orders" className="site-profile-menu__item">
              {t('nav.viewOrders')}
            </Link>
            <Link href="/settings" className="site-profile-menu__item">
              {t('nav.accountSettings')}
            </Link>
            <button
              type="button"
              className="site-profile-menu__item site-profile-menu__item--danger"
              onClick={handleLogout}
            >
              {t('admin.logout')}
            </button>
          </div>
        ) : null}

        {mobile ? (
          <button type="button" className="site-mobile-menu__logout" onClick={handleLogout}>
            {t('admin.logout')}
          </button>
        ) : null}
      </div>
    </div>
  );

  if (isLoginPage) {
    return (
      <header className="site-header site-header--auth">
        <div className="site-header__inner site-header__inner--auth">
          <Link href="/" className="site-brand" aria-label={t('nav.homeAria')}>
            <img
              src={RIA_LOGO_SRC}
              alt="Ria"
              className="site-brand__image"
            />
          </Link>

          <Link href="/" className="site-auth-close" aria-label={t('nav.closeLogin')}>
            <CloseIcon />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      {showNavOverlay ? (
        <button
          type="button"
          className="site-nav-overlay"
          aria-label={t('nav.closeNavigationOverlay')}
          onClick={closeMenus}
        />
      ) : null}

      <header
        className="site-header"
        onMouseLeave={closeDropdownMenus}
      >
        <div className="site-header__inner navbar-shell">
          <div className="site-header__left navbar-desktop-left">
            <Link
              href="/"
              className="site-brand"
              aria-label={t('nav.homeAria')}
              onMouseEnter={closeDropdownMenus}
            >
              <img
                src={RIA_LOGO_SRC}
                alt="Ria"
                className="site-brand__image"
              />
            </Link>

            <nav
              className="site-nav navbar-desktop-nav"
              aria-label={t('nav.primaryNavigation')}
            >
              {marketingLinks.map((link) => {
                const isResourcesLink = link.href === '/documentation';
                const isActive = isResourcesLink
                  ? false
                  : link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                const isTransfersLink = link.href === '/';

                if (isResourcesLink) {
                  return (
                    <button
                      key={link.href}
                      type="button"
                    className={`site-nav__link${showResourcesMenu ? ' is-open' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={showResourcesMenu}
                    onClick={() => {
                      setShowResourcesMenu((current) => !current);
                      setShowTransfersMenu(false);
                    }}
                    onMouseEnter={openResourcesMenu}
                    onMouseLeave={scheduleCloseResourcesMenu}
                  >
                    {getNavLabel(link)}
                  </button>
                  );
                }

                return (
                  <Link
                    key={link.href}
                  href={link.href}
                  className={`site-nav__link${isActive || (isTransfersLink && showTransfersMenu) ? ' is-active' : ''}`}
                  onClick={closeMenus}
                  onMouseEnter={() => {
                    if (isTransfersLink) {
                      openTransfersMenu();
                    } else {
                      closeDropdownMenus();
                    }
                  }}
                  onMouseLeave={isTransfersLink ? scheduleCloseTransfersMenu : undefined}
                >
                  {getNavLabel(link)}
                </Link>
                );
              })}
            </nav>
          </div>

          <div className="navbar-desktop-spacer" aria-hidden="true" />

        <div className="site-header__right navbar-desktop-right">
          <div
            className="site-header__desktop navbar-desktop-actions-wrap navbar-utilities"
            onMouseEnter={closeDropdownMenus}
          >
            {mounted && isLoggedIn ? renderMemberActions() : renderGuestActions()}
          </div>

            <Link
              href="/"
              className="site-mobile-app-link"
              onClick={closeMenus}
            >
              {t('nav.getApp')}
            </Link>

            <button
              type="button"
              className="site-menu-toggle"
              onClick={() => setShowMobileMenu((current) => !current)}
              aria-label={showMobileMenu ? t('nav.closeNavigationMenu') : t('nav.openNavigationMenu')}
              aria-expanded={showMobileMenu}
              aria-controls="site-mobile-menu"
            >
              {showMobileMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {showTransfersMenu ? (
          <section
            className="site-transfers-menu"
            aria-label={t('nav.moneyTransfersMenu')}
            onMouseEnter={clearTransfersCloseTimer}
            onMouseLeave={closeDropdownMenus}
          >
            <div className="site-transfers-menu__inner">
              <h2>{transferCopy.title}</h2>

              <div className="site-transfers-menu__grid">
                <div>
                  <h3>{transferCopy.waysToSendTitle}</h3>
                  <ul>
                    {transferCopy.waysToSend.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3>{transferCopy.sendToTitle}</h3>
                  <ul>
                    {transferCopy.sendTo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3>{transferCopy.waysToReceiveTitle}</h3>
                  <ul>
                    {transferCopy.waysToReceive.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="site-transfers-menu__qr">
                  <h3>{transferCopy.promoTitle}</h3>
                  <div className="site-transfers-menu__qr-box" aria-hidden="true">
                    <Image src={qrImage} alt="" className="site-transfers-menu__qr-image" sizes="104px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {showResourcesMenu ? (
          <section
            className="site-resources-menu"
            aria-label={t('nav.resourcesMenu')}
            onMouseEnter={clearResourcesCloseTimer}
            onMouseLeave={closeDropdownMenus}
          >
            <div className="site-resources-menu__inner">
              <h2>{resourcesCopy.title}</h2>

              <div className="site-resources-menu__grid">
                <div>
                  <h3>{resourcesCopy.toolsTitle}</h3>
                  <ul>
                    {resourcesCopy.tools.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3>{resourcesCopy.companyTitle}</h3>
                  <ul>
                    {resourcesCopy.company.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3>{resourcesCopy.partnershipsTitle}</h3>
                  <ul>
                    {resourcesCopy.partnerships.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="site-resources-menu__qr">
                  <h3>{resourcesCopy.promoTitle}</h3>
                  <div className="site-resources-menu__qr-box" aria-hidden="true">
                    <Image src={qrImage} alt="" className="site-resources-menu__qr-image" sizes="104px" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

      </header>

      <div
        id="site-mobile-menu"
        className={`site-mobile-menu${showMobileMenu ? ' is-open' : ''}`}
      >
        <div className="site-mobile-menu__panel">
          <nav className="site-mobile-menu__links" aria-label={t('nav.mobileNavigation')}>
            {marketingLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className={`site-mobile-menu__link${isActive ? ' is-active' : ''}`}
                  onClick={closeMenus}
                >
                  <span>{getNavLabel(link)}</span>
                  <span className="site-mobile-menu__link-chevron" aria-hidden="true">
                    <ChevronRightIcon />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="site-mobile-menu__language">
            <LanguageSwitcher className="w-full" />
          </div>

          {mounted && isLoggedIn ? (
            <div className="site-mobile-menu__member-panel">
              {renderMemberActions(true)}
            </div>
          ) : (
            <div className="site-mobile-menu__footer">
              <Link href="/login" className="site-mobile-menu__login" onClick={closeMenus}>
                {t('nav.login')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
