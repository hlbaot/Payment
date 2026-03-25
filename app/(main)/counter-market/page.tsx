'use client';

import Link from 'next/link';

export default function CounterMarketPage() {
  const counters = [
    {
      id: 1,
      title: 'VIP COUNTER 01',
      subtitle: 'PRIORITY SERVICE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      iconBg: 'bg-[#FFF0E6]',
      badge: 'OPEN',
      badgeClass: 'bg-[#E8F5EE] text-[#008A4E]',
      minAmount: '$5,000 USD',
      commission: '2.2%',
      orderTypes: '5 types',
      status: 'active'
    },
    {
      id: 2,
      title: 'STANDARD COUNTER 05',
      subtitle: 'GENERAL USAGE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
           <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3"/>
        </svg>
      ),
      iconBg: 'bg-[#F3F4F6]',
      badge: 'FULL',
      badgeClass: 'bg-[#111827] text-white',
      minAmount: '$500 USD',
      commission: '1.5%',
      orderTypes: '3 types',
      status: 'active'
    },
    {
      id: 3,
      title: 'ELITE COUNTER 02',
      subtitle: 'INSTITUTIONAL',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
           <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
        </svg>
      ),
      iconBg: 'bg-[#FFF0E6]',
      badge: 'BUSY',
      badgeClass: 'bg-[#FFF4E5] text-primary',
      minAmount: '$10,000 USD',
      commission: '2.5%',
      orderTypes: '8 types',
      status: 'active'
    },
    {
      id: 4,
      title: 'GLOBAL COUNTER 12',
      subtitle: 'WORLDWIDE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2">
           <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      iconBg: 'bg-[#F3F4F6]',
      badge: 'OPEN',
      badgeClass: 'bg-[#E8F5EE] text-[#008A4E]',
      minAmount: '$2,500 USD',
      commission: '1.8%',
      orderTypes: '4 types',
      status: 'active'
    },
    {
      id: 5,
      title: 'STANDARD COUNTER 08',
      subtitle: 'MAINTENANCE',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
           <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      iconBg: 'bg-[#F3F4F6]',
      badge: 'OFFLINE',
      badgeClass: 'bg-[#E5E7EB] text-gray-500',
      minAmount: '$800 USD',
      commission: '1.4%',
      orderTypes: '2 types',
      status: 'offline',
      grayText: true
    },
    {
      id: 6,
      title: 'VIP COUNTER 02',
      subtitle: 'PREMIUM PLUS',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
           <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
        </svg>
      ),
      iconBg: 'bg-[#FFF0E6]',
      badge: 'OPEN',
      badgeClass: 'bg-[#E8F5EE] text-[#008A4E]',
      minAmount: '$7,500 USD',
      commission: '2.1%',
      orderTypes: '6 types',
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <div className="container max-w-[1140px] mx-auto px-6 pt-12">
        
        {/* Header Section */}
        <div className="border-l-[3px] border-primary pl-5 mb-14">
          <h1 className="text-[34px] font-bold text-gray-900 leading-tight mb-3">Counter Marketplace</h1>
          <p className="text-gray-500 text-[15px] max-w-2xl leading-relaxed">
            Connect with international trading counters quickly, transparently, and with absolute security through the SwiftGuard system.
          </p>
        </div>

        {/* Filters Box */}
        <div className="border border-gray-200 rounded-xl p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 mb-12 bg-white shadow-sm">
          
          <div className="flex-1 w-full flex flex-col justify-center px-4 md:border-r border-gray-200 h-full py-2">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 pl-1 block">Transaction Amount</label>
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              </div>
              <select className="w-full h-[36px] pl-[32px] pr-8 bg-transparent appearance-none cursor-pointer focus:outline-none transition-all text-[15px] font-semibold text-gray-900 leading-tight">
                <option>All amounts</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col justify-center px-4 md:border-r border-gray-200 h-full py-2">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 pl-1 block">Commission Rate</label>
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M5 5l14 14"/></svg>
              </div>
              <select className="w-full h-[36px] pl-[28px] pr-8 bg-transparent appearance-none cursor-pointer focus:outline-none transition-all text-[15px] font-semibold text-gray-900 leading-tight">
                <option>All rates</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col justify-center px-4 h-full py-2">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5 pl-1 block">Counter Status</label>
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
              </div>
              <select className="w-full h-[36px] pl-[28px] pr-8 bg-transparent appearance-none cursor-pointer focus:outline-none transition-all text-[15px] font-semibold text-gray-900 leading-tight">
                <option>All statuses</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto px-1 md:pl-2">
             <button className="w-full md:w-auto h-[56px] bg-[#2D3136] hover:bg-[#1f2225] text-white px-8 rounded-xl font-bold text-[13px] tracking-widest flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/></svg>
                FILTER RESULTS
             </button>
          </div>
          
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {counters.map((c) => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col">
               
               {/* Card Header */}
               <div className="flex gap-4 items-start mb-6">
                 <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${c.iconBg}`}>
                    {c.icon}
                 </div>
                 <div className="flex-1 pt-1">
                    <h3 className={`font-bold text-[15px] leading-snug ${c.grayText ? 'text-gray-500' : 'text-gray-900'}`}>{c.title}</h3>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${c.grayText ? 'text-gray-400' : 'text-primary'}`}>{c.subtitle}</p>
                 </div>
                 <div className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest ${c.badgeClass}`}>
                    {c.badge}
                 </div>
               </div>

               {/* Card Stats */}
               <div className="flex-1 flex flex-col">
                 <div className="flex justify-between items-center py-[14px] border-t border-gray-100">
                    <span className="text-[13px] text-gray-500">Min amount</span>
                    <span className={`font-bold text-[15px] ${c.grayText ? 'text-gray-500' : 'text-gray-900'}`}>{c.minAmount}</span>
                 </div>
                 <div className="flex justify-between items-center py-[14px] border-t border-gray-100">
                    <span className="text-[13px] text-gray-500">Commission %</span>
                    <span className={`font-bold text-[15px] ${c.grayText ? 'text-gray-500' : 'text-primary'}`}>{c.commission}</span>
                 </div>
                 <div className="flex justify-between items-center py-[14px] border-t border-gray-100 mb-2">
                    <span className="text-[13px] text-gray-500">Order types</span>
                    <span className={`font-bold text-[15px] ${c.grayText ? 'text-gray-500' : 'text-gray-900'}`}>{c.orderTypes}</span>
                 </div>
               </div>

               {/* Card Button */}
               <div>
                 {c.status === 'active' ? (
                   <Link href={`/counter-market/${c.id}`} className="w-full py-[14px] bg-[#F4F5F7] hover:bg-[#EBECEF] text-gray-800 font-bold text-[13px] rounded-xl flex justify-center items-center gap-2 transition-colors">
                     VIEW DETAILS
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                   </Link>
                 ) : (
                   <button disabled className="w-full py-[14px] bg-[#F4F5F7]/60 text-gray-400 font-bold text-[13px] rounded-xl flex justify-center items-center transition-colors cursor-not-allowed">
                     NOT AVAILABLE
                   </button>
                 )}
               </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-semibold shadow-sm shadow-orange-200">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold">
            3
          </button>
          <span className="px-2 text-gray-400">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-semibold">
            12
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
