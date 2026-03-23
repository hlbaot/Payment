'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function WalletPage() {
  const [search, setSearch] = useState('');

  const stats = [
    { label: 'Total Deposits', value: '$284,900', icon: '📥', color: 'bg-emerald-50 text-emerald-500' },
    { label: 'Total Commission', value: '$12,420', icon: '%', color: 'bg-orange-50 text-orange-500' },
    { label: 'Total Spending', value: '$142,050', icon: '🛒', color: 'bg-amber-50 text-amber-500' },
  ];

  const transactions = [
    { type: 'External Deposit', date: 'Oct 24, 2023', amount: '+$2,500.00', status: 'Completed', color: 'text-emerald-500', icon: '📥' },
    { type: 'Service Payment', date: 'Oct 22, 2023', amount: '-$420.50', status: 'Processing', color: 'text-blue-500', icon: '🛍️' },
    { type: 'Bank Withdrawal', date: 'Oct 18, 2023', amount: '-$1,200.00', status: 'Completed', color: 'text-gray-900', icon: '🏧' },
    { type: 'Inter-Wallet Transfer', date: 'Oct 15, 2023', amount: '-$85.00', status: 'Failed', color: 'text-rose-500', icon: '🔀' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      <div className="container max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main Content */}
        <main className="pt-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Kinetic Wallet</h1>
           
           <div className="flex items-center gap-6">
              <div className="relative w-[320px]">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search transactions..." 
                   className="w-full h-[46px] pl-10 pr-4 bg-gray-100/80 border-none rounded-xl text-[14px] font-medium outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                 />
              </div>
           </div>
        </div>

        {/* Balance Card Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
           
           {/* Primary Wallet Balance */}
           <div className="lg:col-span-12">
              <div className="bg-primary rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden shadow-[0_25px_60px_rgba(255,102,0,0.3)] flex flex-col md:flex-row md:items-center justify-between transition-all hover:scale-[1.01] group">
                 {/* Decorative Pattern */}
                 <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_right,_white_10%,transparent_70%)]"></div>
                 <div className="absolute right-12 top-10 w-[240px] h-[240px] bg-white/10 rounded-[48px] border-4 border-white/5 group-hover:rotate-12 transition-transform duration-700"></div>
                 
                 <div className="relative z-10 space-y-8 flex-1">
                    <div>
                       <p className="text-white/70 text-[13px] font-bold uppercase tracking-[0.2em] mb-3">Available Balance</p>
                       <h2 className="text-[64px] font-black leading-none tracking-tight">$142,850.42</h2>
                       <p className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 bg-black/10 rounded-lg text-[11px] font-bold tracking-widest text-white/60">
                         <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                         Hold Balance: $1,250.00
                       </p>
                    </div>

                    <div className="flex gap-4">
                       <button className="h-[58px] px-10 bg-white text-primary rounded-2xl font-bold text-[15px] shadow-xl flex items-center gap-3 transition-all active:scale-95 group/btn">
                          <svg className="group-hover/btn:rotate-90 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                          Deposit Funds
                       </button>
                       <button className="h-[58px] px-10 bg-orange-600 text-white rounded-2xl font-bold text-[15px] shadow-lg border border-orange-400 flex items-center gap-3 transition-all active:scale-95">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7"/><polyline points="10 7 17 7 17 14"/></svg>
                          Withdraw
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           {stats.map((stat) => (
             <div key={stat.label} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex items-center gap-6">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                   {stat.icon}
                </div>
                <div>
                   <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">{stat.label}</p>
                   <p className="text-[24px] font-black text-gray-900 tracking-tight leading-none">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Transactions Table Section */}
        <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden">
           <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
              <h3 className="text-[20px] font-bold text-gray-900 tracking-tight">Recent Transactions</h3>
              <div className="flex flex-wrap gap-4">
                 <div className="h-[44px] px-4 bg-gray-50 rounded-xl flex items-center gap-2 text-[13px] font-bold text-gray-500 cursor-pointer border border-gray-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    Last 30 Days
                 </div>
                 <div className="h-[44px] px-4 bg-gray-50 rounded-xl flex items-center gap-2 text-[13px] font-bold text-gray-500 cursor-pointer border border-gray-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 10v6M2 10v6M12 2l10 8-10 8-10-8 10-8z"/></svg>
                    All Types
                 </div>
                 <button className="h-[44px] px-5 bg-[#111827] text-white rounded-xl text-[12px] font-bold flex items-center gap-2 shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                       <th className="px-4 py-6">Transaction Type</th>
                       <th className="px-4 py-6">Date</th>
                       <th className="px-4 py-6">Amount</th>
                       <th className="px-4 py-6">Status</th>
                       <th className="px-4 py-6 text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {transactions.map((tx, i) => (
                      <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                         <td className="px-4 py-8">
                            <div className="flex items-center gap-5">
                               <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all">
                                  {tx.icon}
                               </div>
                               <span className="text-[14.5px] font-bold text-gray-900">{tx.type}</span>
                            </div>
                         </td>
                         <td className="px-4 py-8">
                            <span className="text-[14px] text-gray-500 font-medium">{tx.date}</span>
                         </td>
                         <td className="px-4 py-8">
                            <span className={`text-[15px] font-bold ${tx.color}`}>{tx.amount}</span>
                         </td>
                         <td className="px-4 py-8">
                            <span className={`inline-flex px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                              tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                              tx.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 
                              'bg-rose-50 text-rose-600'
                            }`}>
                               {tx.status}
                            </span>
                         </td>
                         <td className="px-4 py-8 text-right">
                            <button className="text-gray-300 hover:text-gray-600 transition-colors">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[13px] text-gray-400 font-medium tracking-tight">Showing 4 of 128 results</p>
              <div className="flex items-center gap-3">
                 <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
                 <button className="w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg font-bold text-[14px] shadow-md shadow-orange-100">1</button>
                 <button className="w-9 h-9 flex items-center justify-center text-gray-500 font-bold text-[14px] hover:bg-gray-50 rounded-lg">2</button>
                 <button className="w-9 h-9 flex items-center justify-center text-gray-500 font-bold text-[14px] hover:bg-gray-50 rounded-lg">3</button>
                 <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>
              </div>
           </div>
        </div>

      </main>
      </div>
    </div>
  );
}
