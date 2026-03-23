'use client';

import Link from 'next/link';

export default function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 pb-24">
      <div className="container max-w-[1140px] mx-auto px-6 pt-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h3 className="text-[11px] font-bold text-[#D95D1A] uppercase tracking-widest mb-3">Transaction Tracker</h3>
            <h1 className="text-[38px] md:text-[42px] font-bold text-[#111827] leading-[1.1] mb-3 tracking-tight">Order #SW-284910</h1>
            <p className="text-gray-500 text-[15.5px] font-medium leading-relaxed">Detailed status for your kinetic asset acquisition.</p>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0 shadow-sm rounded-xl">
            <button className="h-[48px] px-6 bg-white border border-gray-200 text-gray-700 font-bold text-[13.5px] rounded-[14px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Invoice
            </button>
            <button className="h-[48px] px-6 bg-[#E65C00] hover:bg-[#CC5200] text-white font-bold text-[13.5px] rounded-[14px] flex items-center justify-center gap-2 transition-colors shadow-[0_4px_14px_rgba(230,92,0,0.3)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l-4 4l6 6l4-16l-18 7l4 2l2 6l3-4"></path></svg>
              Contact Support
            </button>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="bg-white border border-gray-100 rounded-[32px] py-14 px-6 md:px-14 mb-8 shadow-sm relative">
          <div className="hidden md:block absolute left-[10%] right-[10%] top-[45%] h-1.5 bg-[#F3F4F6] z-0 rounded-full"></div>
          <div className="hidden md:block absolute left-[10%] right-[33%] xl:right-[30%] top-[45%] h-1.5 bg-[#E65C00] z-0 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-white px-4">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#E65C00] text-white flex items-center justify-center mb-5 shadow-[0_6px_16px_rgba(230,92,0,0.3)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Pending</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center bg-white px-4">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#E65C00] text-white flex items-center justify-center mb-5 shadow-[0_6px_16px_rgba(230,92,0,0.3)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Processing</span>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center bg-white px-4">
              <div className="w-[60px] h-[60px] rounded-[20px] bg-white border-[4px] border-[#E65C00] text-[#E65C00] flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(230,92,0,0.2)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              </div>
              <span className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">Sent</span>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center bg-white px-4 opacity-50 grayscale">
              <div className="w-[52px] h-[52px] rounded-[16px] bg-[#F3F4F6] text-gray-400 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              </div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Completed</span>
            </div>

          </div>
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Transaction Details Card */}
              <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden h-full">
                <svg className="absolute -right-6 -top-6 w-[160px] h-[160px] text-gray-50 pointer-events-none stroke-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                
                <h4 className="text-[11.5px] font-bold text-gray-400 uppercase tracking-widest mb-10 relative z-10">Transaction Details</h4>
                
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex justify-between items-end border-b border-gray-100/60 pb-5">
                    <span className="text-[14px] text-gray-500 font-medium pb-1">Amount</span>
                    <span className="text-[26px] font-bold text-gray-900 leading-none">$1,250.00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100/60 pb-5">
                    <span className="text-[14px] text-gray-500 font-medium">Recipient</span>
                    <span className="text-[15px] font-bold text-gray-900">SwiftGuard Kinetic LP.</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[14px] text-gray-500 font-medium">Date Initiated</span>
                    <span className="text-[15px] font-bold text-gray-900">Oct 24, 2023</span>
                  </div>
                </div>
              </div>

              {/* Kinetic Protection Card */}
              <div className="bg-[#F8F9FA] border border-gray-100/80 rounded-[32px] p-8 md:p-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-[42px] h-[42px] rounded-[12px] bg-white border border-[#FFE8D6] text-primary flex items-center justify-center shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <span className="bg-[#E65C00]/10 text-[#CC5200] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-md">Verified</span>
                </div>
                
                <h3 className="text-[18px] font-bold text-gray-900 mb-3 tracking-tight">Kinetic Protection</h3>
                <p className="text-[#64748B] text-[14px] leading-[1.8] font-medium">
                  This order is encrypted using SwiftGuard's 256-bit kinetic architecture. Your assets are insured during transit.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-2">
               <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-gray-700 font-bold text-[14px] transition-colors">
                  <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Back to Dashboard
               </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col relative overflow-hidden">
              <h3 className="text-[18px] font-bold text-gray-900 mb-10 flex items-center gap-3">
                <svg className="text-[#E65C00]" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Real-time Updates
              </h3>

              <div className="relative pl-6 border-l-[2px] border-gray-100 pb-10 flex-1 ml-2">
                
                {/* Item 1 */}
                <div className="mb-10 relative">
                  <div className="absolute w-[12px] h-[12px] bg-[#E65C00] rounded-full -left-[31px] top-1 outline outline-[4px] outline-white shadow-sm"></div>
                  <p className="text-[10px] font-bold text-[#E65C00] uppercase tracking-widest mb-1.5">14:45 UTC</p>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Security Check Completed</h4>
                  <p className="text-[12.5px] text-gray-400 font-medium">Multi-factor validation successful.</p>
                </div>

                {/* Item 2 */}
                <div className="mb-10 relative">
                  <div className="absolute w-[12px] h-[12px] bg-[#E65C00] rounded-full -left-[31px] top-1 outline outline-[4px] outline-white shadow-sm"></div>
                  <p className="text-[10px] font-bold text-[#E65C00] uppercase tracking-widest mb-1.5">14:22 UTC</p>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1">Payment Received</h4>
                  <p className="text-[12.5px] text-gray-400 font-medium">Funds cleared via instant bridge.</p>
                </div>

                {/* Item 3 */}
                <div className="mb-12 relative">
                  <div className="absolute w-[10px] h-[10px] bg-gray-300 rounded-full -left-[30px] top-1.5 outline outline-[4px] outline-white"></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">14:10 UTC</p>
                  <h4 className="text-[15px] font-bold text-gray-600 mb-1">Order Created</h4>
                  <p className="text-[12.5px] text-gray-400 font-medium">Reference ID registered in ledger.</p>
                </div>

                {/* Item 4 */}
                <div className="relative opacity-40">
                  <div className="absolute w-[10px] h-[10px] bg-gray-200 rounded-full -left-[30px] top-1.5 outline outline-[4px] outline-white"></div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Estimated 16:00 UTC</p>
                  <h4 className="text-[15px] font-bold text-gray-500 mb-1">Final Completion</h4>
                </div>
              </div>

              <div className="mt-8 bg-[#FFF6F0] rounded-[16px] p-5 flex items-start gap-4 border border-[#FFE8D6]/60">
                <div className="w-6 h-6 rounded-full bg-white border border-[#E65C00]/30 text-[#E65C00] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <p className="text-[#CC5200] text-[12.5px] font-medium leading-[1.6]">
                  Updates may have a 2-3 minute latency depending on blockchain node propagation.
                </p>
              </div>

            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
