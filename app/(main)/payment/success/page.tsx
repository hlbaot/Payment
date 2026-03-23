'use client';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-6 font-sans bg-[#F9FAFB]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="bg-white border border-gray-100 rounded-[40px] w-full max-w-[540px] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative z-10">
        
        {/* Icon & Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-[84px] h-[84px] bg-primary rounded-[28px] flex items-center justify-center text-white mb-8 shadow-[0_16px_32px_rgba(255,102,0,0.25)] transform rotate-3 transition-transform hover:rotate-6 duration-300">
             <div className="-rotate-3">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
          </div>
          <h1 className="text-[28px] md:text-[30px] font-bold text-[#111827] mb-3 tracking-tight">Request Submitted Successfully!</h1>
          <p className="text-[#64748B] text-[15px] font-medium max-w-[400px]">Our team is processing your payment via Wallet. Track progress below or contact support.</p>
        </div>

        {/* Total Amount */}
        <div className="text-center mb-10">
           <h3 className="text-[11px] font-extrabold text-gray-400/90 uppercase tracking-[0.25em] mb-3">Total Amount</h3>
           <p className="text-[48px] font-black text-[#111827] leading-none tracking-tight">$4,250.00</p>
        </div>

        {/* Details Box */}
        <div className="bg-[#F8F9FA] border border-gray-100/80 rounded-[28px] p-8 mb-10 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200/50 pb-5">
             <span className="text-[11.5px] font-bold text-[#111827] uppercase tracking-widest">Transaction Details</span>
             <span className="bg-orange-50 text-primary text-[9.5px] font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-widest leading-none pt-[7px]">Submitted</span>
          </div>

          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recipient</p>
                <p className="text-[14.5px] font-bold text-gray-900 leading-tight mb-1">Alex Thompson</p>
                <p className="text-[13px] text-gray-500 font-medium">Global Equity Fund</p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Reference ID</p>
                <p className="text-[14.5px] font-bold text-gray-900 leading-tight mb-1">#PG-99281-XC</p>
                <p className="text-[13px] text-gray-500 font-medium">Wealth Allocation</p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">Date</p>
                <p className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                   <svg className="text-gray-400/80" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                   Oct 24, 2023
                </p>
             </div>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">Time</p>
                <p className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                   <svg className="text-gray-400/80" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                   14:32 UTC
                </p>
             </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
           <Link href="/counter-market" className="w-full h-[58px] bg-primary hover:bg-[#E65C00] text-white rounded-2xl font-bold text-[14.5px] flex justify-center items-center transition-all shadow-[0_8px_20px_rgba(255,102,0,0.25)]">
             New Transfer
           </Link>
           <Link href="/order-status/1" className="w-full h-[58px] bg-white border border-gray-200 hover:bg-gray-50 text-[#111827] rounded-2xl font-bold text-[14.5px] flex justify-center items-center gap-2 transition-all shadow-sm">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
             Track Order Status
           </Link>
        </div>

        {/* Download Link */}
        <div className="mt-10 text-center">
           <button className="inline-flex items-center text-primary hover:text-[#E65C00] font-bold text-[13px] tracking-wide transition-colors">
              <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Receipt
           </button>
        </div>

      </div>
    </div>
  );
}
