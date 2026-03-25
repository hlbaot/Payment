'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '@/i18n/locales/en.json';
import vi from '@/i18n/locales/vi.json';

type Locale = 'en' | 'vi';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const MESSAGES: Record<Locale, Record<string, string>> = { en, vi };
const STORAGE_KEY = 'site-locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'vi' ? 'vi' : 'en';
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string) => MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
    return {
      locale,
      setLocale: setLocaleState,
      t,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}

