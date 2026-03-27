'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type AdminScaffoldProps = {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  children: ReactNode;
};

export default function AdminScaffold({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  children,
}: AdminScaffoldProps) {
  const pathname = usePathname();
  const router = useRouter();

  const topTabs = [
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/deposits', label: 'Deposit Requests' },
  ];

  const sidebarLinks = [
    {
      href: '/admin/orders',
      label: 'User',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-[#1F2937]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white lg:min-h-screen lg:w-[260px] lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-[0_10px_24px_rgba(255,102,0,0.28)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="6" r="3" />
                <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M9 11h6" />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-black text-gray-900">Financial Admin</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">Enterprise Control</p>
            </div>
          </div>

          <nav className="px-4 py-4">
            <div className="grid gap-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FFF2E8] text-primary shadow-sm'
                        : 'text-[#52637A] hover:bg-gray-50'
                    }`}
                  >
                    <span className={isActive ? 'text-primary' : 'text-[#7C8AA5]'}>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="px-4 pb-6 pt-3">
            <div className="grid gap-2">
              <Link
                href="/support"
                className="flex min-h-[44px] items-center gap-3 rounded-2xl px-4 text-[14px] font-semibold text-[#52637A] transition-colors hover:bg-gray-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                Support
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-[44px] items-center gap-3 rounded-2xl px-4 text-left text-[14px] font-semibold text-[#52637A] transition-colors hover:bg-gray-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-gray-200 bg-white">
            <div className="flex flex-col gap-4 px-6 py-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
                <h1 className="text-[18px] font-black tracking-tight text-primary">Kinetic Finance Admin</h1>
                <nav className="flex flex-wrap items-center gap-5">
                  {topTabs.map((tab) => {
                    const isActive = pathname === tab.href;

                    return (
                      <Link
                        key={tab.href}
                        href={tab.href}
                        className={`border-b-2 pb-2 text-[15px] font-semibold transition-colors ${
                          isActive
                            ? 'border-primary text-primary'
                            : 'border-transparent text-[#64748B] hover:text-gray-900'
                        }`}
                      >
                        {tab.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block sm:w-[320px]">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  <input
                    aria-label={searchPlaceholder}
                    type="text"
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-[48px] w-full rounded-2xl border border-[#E8EDF4] bg-[#F8FAFD] pl-12 pr-4 text-[14px] font-medium text-gray-800 outline-none transition-colors focus:border-primary"
                  />
                </label>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    aria-label="Notifications"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-[#74839B] transition-colors hover:bg-gray-50"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Admin profile"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0E6] text-primary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21a7 7 0 0 1 14 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
