'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function CounterDetailPage() {
  const { locale, t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);

  const transferTypes = [
    {
      id: 1,
      badge: 'USD',
      title: locale === 'vi' ? t('user.counter.detail.transfer1TitleVi') : t('user.counter.detail.transfer1TitleEn'),
      minLimit: '$5,000',
      fee: '2.2%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
      )
    },
    {
      id: 2,
      badge: 'GBP',
      title: locale === 'vi' ? t('user.counter.detail.transfer2TitleVi') : t('user.counter.detail.transfer2TitleEn'),
      minLimit: '$1,000',
      fee: '1.5%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
      )
    },
    {
      id: 3,
      badge: locale === 'vi' ? t('user.counter.detail.globalBadgeVi') : t('user.counter.detail.globalBadgeEn'),
      title: locale === 'vi' ? t('user.counter.detail.transfer3TitleVi') : t('user.counter.detail.transfer3TitleEn'),
      minLimit: '$10,000',
      fee: '2.5%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
      )
    }
  ];

  useEffect(() => {
    const navigationFlag = sessionStorage.getItem('counterDetailAdvancePending');
    const storedStep = Number(sessionStorage.getItem('counterDetailCurrentStep') ?? '0');
    const previousStep = Number(sessionStorage.getItem('counterDetailPreviousStep') ?? '0');

    if (navigationFlag !== 'true') {
      sessionStorage.removeItem('counterDetailCurrentStep');
      sessionStorage.removeItem('counterDetailPreviousStep');
      setCurrentStep(0);
      setDisplayStep(0);
      return;
    }

    const safeStep = Number.isFinite(storedStep) ? storedStep : 0;
    const safePreviousStep = Number.isFinite(previousStep) ? previousStep : 0;
    const normalizedCurrentStep = Math.min(Math.max(safeStep, 0), transferTypes.length - 1);
    const normalizedPreviousStep = Math.min(Math.max(safePreviousStep, 0), transferTypes.length - 1);

    setCurrentStep(normalizedCurrentStep);
    setDisplayStep(normalizedPreviousStep);

    const frame = window.requestAnimationFrame(() => {
      setDisplayStep(normalizedCurrentStep);
      sessionStorage.removeItem('counterDetailPreviousStep');
      sessionStorage.removeItem('counterDetailAdvancePending');
    });

    return () => window.cancelAnimationFrame(frame);
  }, [transferTypes.length]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      {/* Transaction Types Section */}
      <div className="w-full bg-[#FAFAFA] py-24 pb-32">
        <div className="container max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-transparent pb-2">
            <div>
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 uppercase tracking-tight">{t('user.counter.detail.title')}</h2>
              <p className="text-gray-500 text-[15px]">
                {t('user.counter.detail.desc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {transferTypes.map((type, index) => {
              const isActive = index === displayStep;

              return (
                <div
                  key={`transfer-${type.id}`}
                  className={`bg-white rounded-3xl pt-8 pb-8 px-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'invisible opacity-0 pointer-events-none'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${type.bg} ${type.textClass}`}>
                    {type.icon}
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">{type.badge}</span>
                    <h3 className="text-[20px] font-bold text-gray-900 uppercase tracking-tight leading-snug">
                      {type.title}
                    </h3>
                  </div>

                  <div className="flex-1 flex flex-col mb-10 mt-auto px-1">
                    <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                      <span className="text-[11px] font-medium text-gray-500">{t('user.counter.detail.minVolume')}</span>
                      <span className="font-bold text-[14px] text-gray-900">{type.minLimit}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                      <span className="text-[11px] font-medium text-gray-500">{t('user.counter.detail.fixedFee')}</span>
                      <span className="font-bold text-[14px] text-gray-900">{type.fee}</span>
                    </div>
                  </div>

                  <Link
                    href={`/create-order?counterId=1&serviceStep=${index}`}
                    className="w-full bg-primary hover:bg-[#E65C00] text-white font-bold text-[14px] tracking-wide rounded-2xl h-[56px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(255,102,0,0.2)]"
                  >
                    {t('user.counter.detail.createOrder')} <span className="text-lg leading-none -mt-0.5">&rarr;</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
