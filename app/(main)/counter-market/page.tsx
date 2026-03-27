'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fakeCounters } from '@/data/fake/counters';
import { fakeUsers } from '@/data/fake/users';

export default function CounterMarketPage() {
  const defaultUserBalance = fakeUsers.find((user) => user.role === 'user')?.walletBalance ?? 0;
  const [walletBalance, setWalletBalance] = useState(defaultUserBalance);

  useEffect(() => {
    const storedBalance = Number(sessionStorage.getItem('walletBalance') ?? defaultUserBalance.toString());
    setWalletBalance(Number.isFinite(storedBalance) && storedBalance > 0 ? storedBalance : defaultUserBalance);
  }, [defaultUserBalance]);

  const featuredCounter = fakeCounters[0];
  const shouldShowFeaturedCounter = walletBalance >= featuredCounter.minAmountValue;

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <div className="container max-w-[1140px] mx-auto px-6 pt-12">
        
        {/* Header Section */}
        <div className="border-l-[3px] border-primary pl-5 mb-14">
          <h1 className="text-[34px] font-bold text-gray-900 leading-tight mb-3">Counter Marketplace</h1>
          <p className="text-gray-500 text-[15px] max-w-2xl leading-relaxed">
            Connect with international trading counters quickly, transparently, and with absolute security through the SwiftGuard system.
          </p>
          <p className="mt-3 text-[13px] font-semibold text-gray-500">
            Wallet balance: <span className="text-primary">${walletBalance.toLocaleString('en-US')} USD</span>
          </p>
        </div>

        {/* Card Grid */}
        {shouldShowFeaturedCounter ? (
          <div className="mb-16 flex justify-center">
            <div
              key={featuredCounter.id}
              className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl p-6 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-4 items-start mb-6">
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${featuredCounter.iconBg}`}>
                  {featuredCounter.icon}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-[15px] leading-snug text-gray-900">{featuredCounter.title}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest mt-1 text-primary">{featuredCounter.subtitle}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest ${featuredCounter.badgeClass}`}>
                  {featuredCounter.badge}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center py-[14px] border-t border-gray-100">
                  <span className="text-[13px] text-gray-500">Min amount</span>
                  <span className="font-bold text-[15px] text-gray-900">{featuredCounter.minAmount}</span>
                </div>
                <div className="flex justify-between items-center py-[14px] border-t border-gray-100">
                  <span className="text-[13px] text-gray-500">Commission %</span>
                  <span className="font-bold text-[15px] text-primary">{featuredCounter.commission}</span>
                </div>
                <div className="flex justify-between items-center py-[14px] border-t border-gray-100 mb-2">
                  <span className="text-[13px] text-gray-500">Order types</span>
                  <span className="font-bold text-[15px] text-gray-900">{featuredCounter.orderTypes}</span>
                </div>
              </div>

              <div>
                <Link
                  href={`/counter-market/${featuredCounter.id}`}
                  className="w-full py-[14px] bg-[#F4F5F7] hover:bg-[#EBECEF] text-gray-800 font-bold text-[13px] rounded-xl flex justify-center items-center gap-2 transition-colors"
                >
                  VIEW DETAILS
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {!shouldShowFeaturedCounter ? (
          <div className="max-w-[560px] rounded-[28px] border border-dashed border-gray-200 bg-[#FAFAFA] px-8 py-10 text-center">
            <h2 className="text-[22px] font-bold text-gray-900">No counters available</h2>
            <p className="mt-3 text-[14px] text-gray-500">
              Current wallet balance is not enough to unlock this package.
            </p>
          </div>
        ) : null}

      </div>
    </div>
  );
}
