'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CounterDetailPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TRANSFER' | 'PAYMENT'>('ALL');

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

  const paymentTypes = [
    {
      id: 1,
      title: 'Global Utility Bill',
      desc: 'Settle international energy, water, and connectivity invoices instantly.',
      currency: 'USD',
      minLimit: '$50.00',
      fee: '1.5%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
      )
    },
    {
      id: 2,
      title: 'Corporate Invoice',
      desc: 'High-limit settlement for B2B procurement and verified vendor contracts.',
      currency: 'USD',
      minLimit: '$500.00',
      fee: '2.0%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>
      )
    },
    {
      id: 3,
      title: 'Subscription Payment',
      desc: 'Automated recurring billing for software licenses and digital services.',
      currency: 'USD',
      minLimit: '$10.00',
      fee: '0.5%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>
      )
    }
  ];

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
              <p className="text-gray-500 text-[15px]">Choose the right service to start your priority transaction.</p>
            </div>

            <div className="relative flex mt-8 md:mt-0 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm w-max">
              {/* Sliding Pill Background */}
              <div
                className="pointer-events-none absolute left-[6px] top-[6px] bottom-[6px] w-[120px] bg-primary rounded-full shadow-[0_2px_8px_rgba(255,102,0,0.3)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-0"
                style={{
                  transform: `translateX(${activeTab === 'ALL' ? '0' :
                    activeTab === 'TRANSFER' ? '120px' : '240px'
                    })`
                }}
              />

              {['ALL', 'TRANSFER', 'PAYMENT'].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`cursor-pointer relative z-10 w-[120px] text-[11px] font-bold py-2.5 rounded-full uppercase tracking-widest transition-colors duration-300 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(activeTab === 'TRANSFER' || activeTab === 'ALL') && transferTypes.map((type) => (
              <div key={`transfer-${type.id}`} className="bg-white rounded-3xl pt-8 pb-8 px-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col group border border-gray-50">
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

                <Link href="/create-order" className="w-full bg-primary hover:bg-[#E65C00] text-white font-bold text-[14px] tracking-wide rounded-2xl h-[56px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(255,102,0,0.2)] group-hover:shadow-[0_8px_24px_rgba(255,102,0,0.35)]">
                  CREATE ORDER <span className="text-lg leading-none -mt-0.5">&rarr;</span>
                </Link>
              </div>
            ))}

            {(activeTab === 'PAYMENT' || activeTab === 'ALL') && paymentTypes.map((type) => (
              <div key={`payment-${type.id}`} className="bg-white rounded-3xl pt-8 pb-8 px-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col group border border-gray-50">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 ${type.bg} ${type.textClass}`}>
                  {type.icon}
                </div>

                <div className="mb-6">
                  <h3 className="text-[20px] font-bold text-gray-900 tracking-tight leading-snug mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    {type.desc}
                  </p>
                </div>

                <div className="flex-1 flex flex-col mb-10 mt-auto px-1">
                  <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                    <span className="text-[12px] text-gray-500">Currency</span>
                    <span className="font-bold text-[14px] text-gray-900">{type.currency}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                    <span className="text-[12px] text-gray-500">Minimum</span>
                    <span className="font-bold text-[14px] text-gray-900">{type.minLimit}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100/60">
                    <span className="text-[12px] text-gray-500">Fee</span>
                    <span className="font-bold text-[14px] text-primary">{type.fee}</span>
                  </div>
                </div>

                <Link href="/create-order" className="w-full bg-primary hover:bg-[#E65C00] text-white font-bold text-[15px] rounded-2xl h-[56px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(255,102,0,0.2)] group-hover:shadow-[0_8px_24px_rgba(255,102,0,0.35)]">
                  Pay Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Commitment Section */}
      <div className="w-full bg-[#FAFAFA] pb-32">
        <div className="container max-w-[1140px] mx-auto px-6">
          <div className="bg-[#1C1C1C] rounded-[32px] overflow-hidden relative border-t-[5px] border-primary shadow-2xl p-10 md:p-14">
            <div className="max-w-[700px] relative z-10">
              <h2 className="text-[28px] md:text-[32px] font-bold text-white mb-6 uppercase tracking-tight">
                SwiftGuard Security Commitment
              </h2>
              <p className="text-gray-300 text-[15px] leading-[1.8] mb-10">
                Our system applies military-grade data encryption standards, ensuring every cross-border transaction is protected 24/7. You can have full peace of mind with SwiftGuard Kinetic services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-[#E65C00] text-white px-8 h-[52px] rounded-xl font-bold text-[13px] tracking-widest transition-all shadow-[0_6px_20px_rgba(255,102,0,0.3)] whitespace-nowrap">
                  VIEW CERTIFICATES
                </button>
                <button className="bg-transparent border border-gray-500 text-white hover:border-white hover:bg-white/5 px-8 h-[52px] rounded-xl font-bold text-[13px] tracking-widest transition-all whitespace-nowrap">
                  CONTACT SUPPORT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
