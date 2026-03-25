'use client';

import Link from 'next/link';

export default function PortfolioPage() {
  const assets = [
    { name: 'USD Wallet', balance: '$142,550.00', change: '+2.4%', icon: '💵', color: 'bg-emerald-500' },
    { name: 'Kinetic Liquid', balance: '$8,200.00', change: '+12.5%', icon: '⚡', color: 'bg-orange-500' },
    { name: 'Global Escrow', balance: '$25,000.00', change: '0.0%', icon: '🛡️', color: 'bg-blue-500' },
  ];

  const recentTransactions = [
    { id: '#SW-284910', type: 'Transfer', amount: '-$1,250.00', status: 'Sent', date: 'Today, 14:45' },
    { id: '#SW-284892', type: 'Deposit', amount: '+$50,000.00', status: 'Completed', date: 'Yesterday' },
    { id: '#SW-284711', type: 'Payment', amount: '-$450.00', status: 'Completed', date: 'Oct 22, 2023' },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 pb-20">
      <div className="container max-w-[1200px] mx-auto px-6 pt-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-[36px] font-bold text-gray-900 tracking-tight mb-2">Portfolio Overview</h1>
            <p className="text-gray-500 font-medium">Manage your global assets and liquidity across the Kinetic network.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/create-order" className="btn bg-primary text-white hover:bg-[#E65C00] px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                New Transaction
             </Link>
             <button className="h-[52px] px-6 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                Generate Report
             </button>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {assets.map((asset) => (
            <div key={asset.name} className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-6">
                 <div className={`w-12 h-12 ${asset.color} rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                   {asset.icon}
                 </div>
                 <span className={`text-[12px] font-bold ${asset.change.includes('+') ? 'text-emerald-500' : 'text-gray-400'} bg-gray-50 px-2 py-1 rounded-md`}>
                   {asset.change}
                 </span>
              </div>
              <h4 className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">{asset.name}</h4>
              <p className="text-[28px] font-black text-gray-900 tracking-tight">{asset.balance}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
           
           {/* Chart / Analytics Placeholder */}
           <div className="lg:col-span-8">
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 h-full flex flex-col">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-[18px] font-bold text-gray-900">Wealth Growth</h3>
                    <div className="flex gap-2">
                       {['1D', '1W', '1M', '1Y'].map(t => (
                         <button key={t} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${t === '1M' ? 'bg-primary text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                           {t}
                         </button>
                       ))}
                    </div>
                 </div>
                 
                 {/* CSS Chart Mockup */}
                 <div className="flex-1 w-full flex items-end justify-between gap-3 min-h-[300px] pt-10">
                    {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-50 rounded-t-xl relative group cursor-pointer hover:bg-orange-50 transition-colors" style={{ height: `${h}%` }}>
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ${(h * 1234).toLocaleString()}
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-6 px-2">
                    {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map(m => (
                      <span key={m} className="text-[10px] font-bold text-gray-300">{m}</span>
                    ))}
                 </div>
              </div>
           </div>

           {/* Recent Activity Sidebar */}
           <div className="lg:col-span-4">
              <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 h-full">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[18px] font-bold text-gray-900">Recent Activity</h3>
                    <Link href="/order-status/1" className="text-[12px] font-bold text-primary hover:underline">View All</Link>
                 </div>
                 
                 <div className="space-y-6">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-start gap-4 group cursor-pointer">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.amount.includes('+') ? 'bg-emerald-50 text-emerald-500' : 'bg-orange-50 text-orange-500'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                               {tx.amount.includes('+') ? <path d="M12 5v14m-7-7 7-7 7 7"/> : <path d="M12 19V5m-7 7 7 7 7-7"/>}
                            </svg>
                         </div>
                         <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-none">
                            <div className="flex justify-between mb-1">
                               <span className="text-[14px] font-bold text-gray-900">{tx.type}</span>
                               <span className="text-[14px] font-bold text-gray-900">{tx.amount}</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-[12px] text-gray-400 font-medium">{tx.date}</span>
                               <span className={`text-[11px] font-bold uppercase tracking-wider ${tx.status === 'Sent' ? 'text-primary' : 'text-emerald-500'}`}>{tx.status}</span>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button className="w-full mt-10 py-4 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl font-bold text-[13px] border border-gray-100 transition-all">
                    Sync Ledger Data
                 </button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
