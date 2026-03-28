'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/components/I18nProvider';

type LanguageSwitcherProps = {
  className?: string;
  align?: 'left' | 'right';
};

export default function LanguageSwitcher({
  className = '',
  align = 'left',
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const currentLabel =
    locale === 'vi' ? t('nav.language.vietnamese') : t('nav.language.english');

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[48px] min-w-[156px] items-center justify-between rounded-[24px] border border-[#E5EAF2] bg-[linear-gradient(180deg,#FFFFFF_0%,#F6F8FB_100%)] px-4 text-[15px] font-bold text-[#1F2937] shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all hover:border-[#FFD8BF] hover:shadow-[0_14px_34px_rgba(249,115,22,0.12)]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF3EA] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21a9 9 0 1 0-9-9" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h16.8" />
              <path d="M12 3a15 15 0 0 1 0 18" />
              <path d="M12 3a15 15 0 0 0 0 18" />
            </svg>
          </span>
          <span>{currentLabel}</span>
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 15 6-6 6 6" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className={`absolute top-[calc(100%+10px)] z-50 w-[190px] rounded-[24px] border border-[#E2E8F0] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBFCFE_100%)] p-3 shadow-[0_22px_48px_rgba(15,23,42,0.14)] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {(['en', 'vi'] as const).map((language) => {
            const isActive = locale === language;
            const label =
              language === 'vi'
                ? t('nav.language.vietnamese')
                : t('nav.language.english');

            return (
              <button
                key={language}
                type="button"
                onClick={() => {
                  setLocale(language);
                  setIsOpen(false);
                }}
                className={`flex min-h-[56px] w-full items-center justify-between rounded-[18px] px-4 text-left text-[14px] font-bold transition-all ${
                  isActive
                    ? 'bg-[#F3F5F8] text-gray-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                    : 'text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${language === 'vi' ? 'bg-[#22C55E]' : 'bg-[#3B82F6]'}`}></span>
                  {label}
                </span>
                {isActive ? (
                  <span className="text-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
