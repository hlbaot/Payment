'use client';

import Link from 'next/link';

export default function CounterDetailPage() {
  const transactionTypes = [
    {
      id: 1,
      title: 'US FAST TRANSFER (USD)',
      minLimit: '$5,000 USD',
      fee: '2.2%',
      bg: 'bg-[#FFF0E6]',
      textClass: 'text-primary',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
      )
    },
    {
      id: 2,
      title: 'UK BILL PAYMENT (GBP)',
      minLimit: '$1,000 USD',
      fee: '1.5%',
      bg: 'bg-[#F3F4F6]',
      textClass: 'text-gray-700',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
      )
    },
    {
      id: 3,
      title: 'SWIFT PAYMENT (GLOBAL)',
      minLimit: '$10,000 USD',
      fee: '2.5%',
      bg: 'bg-[#F3F4F6]',
      textClass: 'text-gray-700',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Hero Section */}
      <div 
        className="relative w-full h-[520px] bg-slate-900 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container max-w-[1140px] mx-auto px-6 relative h-full flex items-center">
          <div className="bg-white p-10 md:p-14 max-w-[580px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative">
             <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                  Priority Global
                </span>
                <span className="text-primary text-[11px] font-bold flex items-center gap-[6px] uppercase tracking-widest mt-1 sm:mt-0">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 
                   Verified Counter
                </span>
             </div>
             <h1 className="text-[36px] md:text-[40px] font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight">
               VIP Counter 01 - Kinetic Priority
             </h1>
             <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
               Specializing in high-volume international transactions with priority processing in 5 minutes. Support for multi-currency and kinetic security standards.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
               <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                 5-Min Processing
               </div>
               <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                 Multi-Currency (USD, GBP, EUR)
               </div>
               <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                 SwiftGuard Security
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Transaction Types Section */}
      <div className="w-full bg-white py-24">
        <div className="container max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-transparent pb-2">
            <div>
              <h2 className="text-[28px] font-bold text-gray-900 mb-2 uppercase tracking-tight">Transaction Types</h2>
              <p className="text-gray-500 text-[15px]">Choose the right service to start your priority transaction.</p>
            </div>
            
            <div className="flex mt-8 md:mt-0 bg-white border border-gray-200 rounded-full p-1 shadow-sm w-max">
              <button className="bg-primary text-white text-[11px] font-bold px-8 py-2.5 rounded-full uppercase tracking-widest shadow-[0_2px_8px_rgba(255,102,0,0.3)] transition-all">All</button>
              <button className="text-gray-500 hover:text-gray-900 text-[11px] font-bold px-8 py-2.5 rounded-full uppercase tracking-widest transition-colors">Transfer</button>
              <button className="text-gray-500 hover:text-gray-900 text-[11px] font-bold px-8 py-2.5 rounded-full uppercase tracking-widest transition-colors">Payment</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transactionTypes.map((type) => (
              <div key={type.id} className="bg-white border border-gray-200 rounded-3xl pt-8 pb-6 px-8 hover:border-orange-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col group">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shrink-0 ${type.bg} ${type.textClass}`}>
                    {type.icon}
                 </div>
                 
                 <h3 className="text-[17px] font-bold text-gray-900 mb-8 uppercase tracking-wide leading-snug pr-4">
                    {type.title}
                 </h3>
                 
                 <div className="flex-1 flex flex-col mb-8 mt-auto">
                   <div className="flex justify-between items-center py-5 border-t border-gray-100/80">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Minimum Limit</span>
                      <span className="font-bold text-[15px] text-gray-900">{type.minLimit}</span>
                   </div>
                   <div className="flex justify-between items-center py-5 border-t border-gray-100/80">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Commission Fee</span>
                      <span className="font-bold text-[15px] text-primary">{type.fee}</span>
                   </div>
                   <div className="border-t border-gray-100/80"></div>
                 </div>
                 
                 <button className="w-full bg-primary hover:bg-[#E65C00] text-white font-bold text-[13px] tracking-widest rounded-xl h-[52px] flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgba(255,102,0,0.25)] group-hover:shadow-[0_8px_24px_rgba(255,102,0,0.35)]">
                   CREATE ORDER 
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Commitment Section */}
      <div className="w-full bg-[#FAFAFA] pt-16 pb-32">
        <div className="container max-w-[1140px] mx-auto px-6">
          <div className="bg-[#1C1C1C] rounded-[32px] overflow-hidden relative border-t-[5px] border-primary shadow-2xl p-10 md:p-16">
            <div className="max-w-3xl relative z-10">
              <h2 className="text-[28px] md:text-[34px] font-bold text-white mb-6 uppercase tracking-tight">
                SwiftGuard Security Commitment
              </h2>
              <p className="text-gray-400 text-[16px] leading-[1.7] mb-12 max-w-2xl">
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
            {/* Subtle background element to add depth if needed, currently plain dark */}
          </div>
        </div>
      </div>
      
    </div>
  );
}
