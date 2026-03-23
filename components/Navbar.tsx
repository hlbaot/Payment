'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const primaryLinks = [
    { href: '/', label: 'Home', isActive: pathname === '/' },
    {
      href: '/counter-market',
      label: 'Counter Market',
      isActive:
        pathname.includes('/counter-market') ||
        pathname === '/create-order' ||
        pathname === '/review',
    },
  ];

  useEffect(() => {
    setMounted(true);
    // Refresh auth state on pathname change
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
    setShowDropdown(false); // Close dropdown on navigation
    setShowMobileMenu(false); // Close mobile menu on navigation
  }, [pathname]);

  useEffect(() => {
    if (!showMobileMenu) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showMobileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setShowMobileMenu(false);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container max-w-[1280px] mx-auto px-8 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SwiftGuard <span className="text-primary">Kinetic</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center h-full">
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[14.5px] font-bold h-full flex items-center border-b-[3px] transition-colors ${link.isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {mounted && isLoggedIn ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <button
              type="button"
              onClick={() => setShowMobileMenu((current) => !current)}
              className="md:hidden w-11 h-11 rounded-2xl border border-gray-200 text-gray-700 flex items-center justify-center transition-colors hover:bg-gray-50"
              aria-label={showMobileMenu ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-navigation"
            >
              {showMobileMenu ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors relative mr-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute 1 top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full outline outline-2 outline-white"></span>
            </button>

            <div className="h-6 w-px bg-gray-200 mx-1"></div>

            <div className="relative">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="flex flex-col items-end">
                  <span className="text-[13px] font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">John Doe</span>
                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">PREMIUM</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-50 border-2 border-white shadow-sm overflow-hidden transform group-hover:scale-110 transition-transform">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="/orders"
                    className="flex items-center gap-3 px-5 py-3 text-[14px] font-bold text-gray-600 hover:bg-orange-50 hover:text-primary transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h8M8 18h5" /></svg>
                    Orders
                  </a>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-5 py-3 text-[14px] font-bold text-gray-600 hover:bg-orange-50 hover:text-primary transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82v.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    Settings
                  </Link>
                  <Link
                    href="/wallet"
                    className="flex items-center gap-3 px-5 py-3 text-[14px] font-bold text-gray-600 hover:bg-orange-50 hover:text-primary transition-all"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2" ry="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                    Wallet
                  </Link>
                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-[14px] font-bold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all text-left"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-4 items-center opacity-0 transition-opacity duration-300" style={{ opacity: mounted ? 1 : 0 }}>
            <button
              type="button"
              onClick={() => setShowMobileMenu((current) => !current)}
              className="md:hidden w-11 h-11 rounded-2xl border border-gray-200 text-gray-700 flex items-center justify-center transition-colors hover:bg-gray-50"
              aria-label={showMobileMenu ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-navigation"
            >
              {showMobileMenu ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
            <Link href="/login" className="hidden md:inline text-sm font-bold text-gray-600 hover:text-gray-900">Sign In</Link>
            <Link href="/register" className="hidden md:inline-flex btn bg-primary text-white hover:bg-[#E65C00] px-6 py-2.5 rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(255,102,0,0.3)] transition-all">Sign Up</Link>
          </div>
        )}
      </div>

      <div
        className={`md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-[0_18px_50px_rgba(17,24,39,0.08)] transition-all duration-200 overflow-hidden ${showMobileMenu ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'
          }`}
        id="mobile-navigation"
      >
        <nav className="container max-w-[1280px] mx-auto px-8 py-6 flex flex-col gap-2">
          {primaryLinks.map((link) => (
            <Link
              key={`mobile-${link.label}`}
              href={link.href}
              className={`min-h-[48px] px-4 rounded-2xl flex items-center justify-between text-[15px] font-bold transition-colors ${link.isActive
                ? 'bg-orange-50 text-primary'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <span>{link.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className="container max-w-[1280px] mx-auto px-8 pb-6">
          {mounted && isLoggedIn ? (
            <div className="rounded-[28px] border border-gray-100 bg-[#F9FAFB] p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[15px] font-bold text-gray-900">John Doe</p>
                  <p className="text-[11px] font-extrabold text-primary uppercase tracking-[0.24em] mt-1">Premium</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-50 border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <Link href="/orders" className="min-h-[48px] px-4 rounded-2xl bg-white border border-gray-100 text-[14px] font-bold text-gray-700 flex items-center justify-between hover:bg-orange-50 hover:text-primary transition-colors">
                  <span>Orders</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <Link href="/settings" className="min-h-[48px] px-4 rounded-2xl bg-white border border-gray-100 text-[14px] font-bold text-gray-700 flex items-center justify-between hover:bg-orange-50 hover:text-primary transition-colors">
                  <span>Settings</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
                <Link href="/wallet" className="min-h-[48px] px-4 rounded-2xl bg-white border border-gray-100 text-[14px] font-bold text-gray-700 flex items-center justify-between hover:bg-orange-50 hover:text-primary transition-colors">
                  <span>Wallet</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full min-h-[48px] rounded-2xl bg-red-50 text-red-500 text-[14px] font-bold flex items-center justify-center"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="rounded-[28px] border border-gray-100 bg-[#F9FAFB] p-5 flex flex-col gap-3">
              <Link href="/login" className="min-h-[48px] rounded-2xl border border-gray-200 bg-white text-[14px] font-bold text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="min-h-[48px] rounded-2xl bg-primary text-white text-[14px] font-bold flex items-center justify-center hover:bg-[#E65C00] transition-colors shadow-[0_4px_14px_rgba(255,102,0,0.3)]">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
