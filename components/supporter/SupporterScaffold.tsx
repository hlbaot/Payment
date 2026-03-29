'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

type SupporterScaffoldProps = {
  children: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
};

export default function SupporterScaffold({
  children,
  searchValue: _searchValue,
  onSearchChange: _onSearchChange,
  searchPlaceholder: _searchPlaceholder,
}: SupporterScaffoldProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setLocale, t } = useI18n();
  const [supporterName, setSupporterName] = useState('Support Lead');
  const [supporterEmail, setSupporterEmail] = useState('support@kinetic.com');

  useEffect(() => {
    setLocale('vi');
  }, [setLocale]);

  useEffect(() => {
    const nextName = sessionStorage.getItem('userName') ?? 'Support Lead';
    const nextEmail = sessionStorage.getItem('userEmail') ?? 'support@kinetic.com';
    setSupporterName(nextName);
    setSupporterEmail(nextEmail);
  }, []);

  const sidebarLinks = [
    {
      href: '/supporter/support',
      label: t('supporter.support'),
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
      label: t('supporter.messages'),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#1F2937]">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white xl:min-h-screen xl:w-[256px] xl:border-b-0 xl:border-r">
          <div className="px-6 py-5">
            <Link href="/supporter/messages" className="inline-flex items-center gap-3">
              <span className="text-[24px] font-black tracking-tight text-gray-900">
                Kinetic<span className="text-primary">{t('supporter.support')}</span>
              </span>
            </Link>
          </div>

          <div className="px-4 pb-2">
            <div className="rounded-[22px] border border-[#F3E7DE] bg-[#FFF9F4] px-4 py-4 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                Supporter
              </p>
              <p className="mt-2 text-[16px] font-bold tracking-tight text-gray-900">
                {supporterName}
              </p>
              <p className="mt-1 text-[13px] font-medium break-all text-[#64748B]">
                {supporterEmail}
              </p>
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
                {t('supporter.logout')}
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <main className="px-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
