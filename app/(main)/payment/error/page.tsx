'use client';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-20 px-6 font-sans bg-[#F9FAFB]">
      {/* Very faint peach radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFF0E6]/60 via-transparent to-transparent pointer-events-none"></div>

      <div className="bg-white border border-gray-100 rounded-[40px] px-10 py-16 md:px-14 md:py-20 w-full max-w-[540px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] relative z-10 mb-8 flex flex-col items-center">
        
        {/* Error Icon */}
        <div className="w-[84px] h-[84px] bg-[#FFF0E6] rounded-[24px] flex items-center justify-center text-[#CC5200] mb-12 shadow-sm">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V9h2v5z"/></svg>
        </div>
        
        {/* Title */}
        <h1 className="text-[34px] md:text-[38px] font-bold text-[#111827] mb-7 tracking-tight text-center leading-[1.1]">
          Oops! Something <br className="hidden sm:block" />went wrong.
        </h1>
        
        {/* Error Badge */}
        <div className="bg-[#F8F9FA] text-[#4B5563] text-[13.5px] font-medium px-4 py-2.5 rounded-xl flex items-center gap-2.5 mb-10 border border-gray-100 shadow-sm">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
           Insufficient funds
        </div>

        {/* Message */}
        <p className="text-[#64748B] text-[15.5px] font-medium text-center leading-[1.7] max-w-[380px] mb-14">
          The transaction could not be completed at this time. Please ensure your wallet has sufficient liquidity or try again with a different account.
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
           <Link href="/create-order" className="h-[64px] bg-[#E65C00] hover:bg-[#CC5200] text-white rounded-[20px] font-bold text-[14.5px] flex flex-col justify-center items-center gap-1.5 transition-all shadow-[0_8px_24px_rgba(230,92,0,0.25)] hover:-translate-y-0.5">
              <svg className="opacity-90" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 3.8-11.45L2 8"></path></svg>
              Retry Payment
           </Link>
           <button className="h-[64px] bg-[#F8F9FA] border border-gray-200/80 hover:bg-gray-100 text-[#B24606] rounded-[20px] font-bold text-[14.5px] flex flex-col justify-center items-center gap-1.5 transition-all shadow-sm hover:-translate-y-0.5">
              Check Balance
           </button>
        </div>

        {/* Support Link */}
        <Link href="/support" className="inline-flex items-center text-[#94A3B8] hover:text-[#475569] font-bold text-[13.5px] transition-colors mt-2">
          Contact Support
          <svg className="ml-1.5 opacity-80" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Link>
      </div>

      {/* System Intelligence Box */}
      <div className="w-full max-w-[540px] bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm flex items-start gap-4">
         <div className="w-[34px] h-[34px] rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
         </div>
         <div className="pt-1">
           <h4 className="text-[14px] font-bold text-gray-900 mb-2 tracking-tight">System Intelligence</h4>
           <p className="text-[13.5px] text-gray-500 font-medium leading-[1.6]">
             Our real-time liquidity monitor suggests checking your "Wealth Reserve" account which currently holds $4,200.50.
           </p>
         </div>
      </div>

    </div>
  );
}
