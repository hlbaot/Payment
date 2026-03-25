'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type SupporterScaffoldProps = {
  children: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
};

export default function SupporterScaffold({
  children,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search knowledge base...',
}: SupporterScaffoldProps) {
  const pathname = usePathname();
  const router = useRouter();

  const topTabs = [
    { href: '/supporter/dashboard', label: 'Dashboard' },
    { href: '/supporter/analytics', label: 'Analytics' },
    { href: '/supporter/reports', label: 'Reports' },
  ];

  const sidebarLinks = [
    {
      href: '/supporter/order-management',
      label: 'Order Management',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6h15" />
          <path d="M6 12h15" />
          <path d="M6 18h15" />
          <path d="M3 6h.01" />
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
        </svg>
      ),
    },
    {
      href: '/supporter/deposit-requests',
      label: 'Deposit Requests',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      ),
    },
    {
      href: '/supporter/support',
      label: 'Support',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      href: '/supporter/messages',
      label: 'Messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#1F2937]">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white xl:min-h-screen xl:w-[256px] xl:border-b-0 xl:border-r">
          <div className="px-6 py-5">
            <Link href="/supporter/messages" className="inline-flex items-center gap-3">
              <span className="text-[24px] font-black tracking-tight text-gray-900">
                Kinetic<span className="text-primary">Support</span>
              </span>
            </Link>
          </div>

          <div className="px-4">
            <div className="rounded-[24px] bg-[#F8FAFD] p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-[20px] font-black text-white shadow-[0_12px_24px_rgba(255,102,0,0.22)]">
                  SL
                </div>
                <div>
                  <p className="text-[20px] font-black text-gray-900">Support Lead</p>
                  <p className="mt-1 text-[12px] font-black uppercase tracking-[0.18em] text-[#16A34A]">
                    Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-[#B45309] px-5 text-[14px] font-black uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_rgba(180,83,9,0.22)] transition-colors hover:bg-[#9A4307]"
              >
                + New Ticket
              </button>
            </div>
          </div>

          <nav className="px-4 py-6">
            <div className="grid gap-2">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-4 text-[15px] font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-primary shadow-sm ring-1 ring-[#F3E7DE]'
                        : 'text-[#52637A] hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <span className={isActive ? 'text-primary' : 'text-[#7C8AA5]'}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-gray-100 px-4 py-5 xl:mt-auto">
            <div className="grid gap-2">
              <Link
                href="/supporter/dashboard"
                className="flex min-h-[44px] items-center gap-3 rounded-2xl px-4 text-[14px] font-semibold text-[#52637A] transition-colors hover:bg-white hover:shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
                Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-[44px] items-center gap-3 rounded-2xl px-4 text-left text-[14px] font-semibold text-[#52637A] transition-colors hover:bg-white hover:shadow-sm"
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
            <div className="flex flex-col gap-4 px-6 py-4 xl:flex-row xl:items-center xl:justify-between">
              <nav className="flex flex-wrap items-center gap-6">
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
                    aria-label="Settings"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-[#74839B] transition-colors hover:bg-gray-50"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82 2 2 0 1 1-2.83 2.83 1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51 2 2 0 1 1-4 0 1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33 2 2 0 1 1-2.83-2.83 1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1 2 2 0 1 1 0-4 1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82 2 2 0 1 1 2.83-2.83 1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51 2 2 0 1 1 4 0 1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33 2 2 0 1 1 2.83 2.83 1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1 2 2 0 1 1 0 4 1.65 1.65 0 0 0-1.51 1Z" />
                    </svg>
                  </button>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0E6] text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21a7 7 0 0 1 14 0" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="px-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
