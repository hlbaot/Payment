'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CounterDetailPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayStep, setDisplayStep] = useState(0);

  const transferTypes = [
    {
      id: 1,
      badge: 'USD',
      title: 'US FAST TRANSFER',
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
      title: 'UK BILL PAYMENT',
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
      badge: 'GLOBAL',
      title: 'SWIFT PAYMENT',
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
      {/* Hero Section */}
      <div
        className="relative w-full h-[520px] bg-slate-900 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container max-w-[1140px] mx-auto px-6 relative h-full flex items-center">
          <div className="bg-white p-10 md:p-12 max-w-[580px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative -mt-4">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                Priority Global
              </span>
              <span className="text-primary text-[11px] font-bold flex items-center gap-[6px] uppercase tracking-widest">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Verified Counter
              </span>
            </div>
            <h1 className="text-[36px] md:text-[38px] font-bold text-gray-900 leading-[1.2] mb-5 tracking-tight">
              VIP Counter 01 - Kinetic Priority
            </h1>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10">
              Specializing in high-volume international transactions with priority processing in 5 minutes. Support for multi-currency and kinetic security standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                5-Min Processing
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                Multi-Currency (USD, GBP, EUR)
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                SwiftGuard Security
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Types Section */}
      <div className="w-full bg-[#FAFAFA] py-24 pb-32">
        <div className="container max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-transparent pb-2">
            <div>
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 uppercase tracking-tight">Transaction Types</h2>
              <p className="text-gray-500 text-[15px]">
                Complete each step in order. After you submit one order, the next package will unlock automatically.
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
                      <span className="text-[11px] font-medium text-gray-500">Min. Volume</span>
                      <span className="font-bold text-[14px] text-gray-900">{type.minLimit}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                      <span className="text-[11px] font-medium text-gray-500">Fixed Fee</span>
                      <span className="font-bold text-[14px] text-gray-900">{type.fee}</span>
                    </div>
                  </div>

                  <Link
                    href={`/create-order?counterId=1&serviceStep=${index}`}
                    className="w-full bg-primary hover:bg-[#E65C00] text-white font-bold text-[14px] tracking-wide rounded-2xl h-[56px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(255,102,0,0.2)]"
                  >
                    CREATE ORDER <span className="text-lg leading-none -mt-0.5">&rarr;</span>
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
