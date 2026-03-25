'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const [email, setEmail] = useState('john.doe@swiftguard.global');
  const [phone, setPhone] = useState('+1 (555) 0123-4567');
  const [address, setAddress] = useState('725 5th Ave, New York, NY 10022, USA');

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      <div className="container max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main Content */}
        <main className="pt-12">
        
        {/* Sub Header */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
           <div className="flex items-center gap-10">
              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Settings</h1>
              <nav className="hidden md:flex gap-8">
                 <Link href="/commission-table" className="text-[13px] font-bold text-gray-400 hover:text-gray-600">Market Rates</Link>
                 <Link href="/support" className="text-[13px] font-bold text-gray-400 hover:text-gray-600">Help Center</Link>
              </nav>
           </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           
           {/* Profile Section */}
           <div className="lg:col-span-8">
              <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 mb-10">
                 
                 {/* Large User Info */}
                 <div className="flex items-center gap-8 mb-12">
                    <div className="relative">
                       <div className="w-24 h-24 rounded-[32px] bg-orange-50 overflow-hidden shadow-inner flex items-center justify-center p-2 border-4 border-white shadow-orange-100/50">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Large Avatar" className="w-full h-full object-cover" />
                       </div>
                       <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                       </div>
                    </div>
                    <div>
                       <h2 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">John Doe</h2>
                       <p className="text-gray-400 text-[14px] font-medium mb-4">Joined January 2024 • Verified Custodian</p>
                       <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg uppercase tracking-wider">Level 3 Security</span>
                          <span className="text-[10px] font-bold text-primary bg-[#FFF0E6] px-3 py-1.5 rounded-lg uppercase tracking-wider">Global Tier</span>
                       </div>
                    </div>
                 </div>

                 {/* Form Fields */}
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label htmlFor="settings-email" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                          <div className="relative">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                             </div>
                             <input 
                                id="settings-email"
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[56px] pl-12 pr-4 bg-gray-50 border-none rounded-xl font-bold text-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" 
                             />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label htmlFor="settings-phone" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                          <div className="relative">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                             </div>
                             <input 
                                id="settings-phone"
                                type="tel" 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full h-[56px] pl-12 pr-4 bg-gray-50 border-none rounded-xl font-bold text-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" 
                             />
                          </div>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="settings-address" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Physical Address</label>
                       <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          </div>
                          <input 
                             id="settings-address"
                             type="text" 
                             value={address} 
                             onChange={(e) => setAddress(e.target.value)}
                             className="w-full h-[56px] pl-12 pr-4 bg-gray-50 border-none rounded-xl font-bold text-gray-800 focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" 
                          />
                       </div>
                    </div>
                    <div className="flex justify-end pt-4">
                       <button className="bg-primary hover:bg-[#E65C00] text-white px-10 py-4 rounded-xl font-bold text-[15px] shadow-[0_8px_25px_rgba(255,102,0,0.3)] transition-all">
                          Save Changes
                       </button>
                    </div>
                 </div>
              </div>

              {/* Lower Rows: Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="bg-white rounded-[40px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-50">
                    <div className="flex justify-between items-center mb-10">
                       <h3 className="text-[16px] font-bold text-gray-900 leading-none">Recent Activity</h3>
                       <Link href="/order-status/1" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-primary transition-colors">View All</Link>
                    </div>
                    <div className="space-y-8">
                       {[
                         { title: 'Inbound Wire Transfer', desc: 'CHASE BANK • TODAY', amount: '+$12,400.00', status: 'Completed', color: 'text-emerald-500' },
                         { title: 'Invoice #SG-9921', desc: 'APPLE INC. • YESTERDAY', amount: '-$1,299.00', status: 'Completed', color: 'text-gray-900' },
                         { title: 'Currency Swap (USD/EUR)', desc: 'SELF TRANSFER • 2 DAYS AGO', amount: '$5,000.00', status: 'Settled', color: 'text-gray-900' },
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between items-start gap-4">
                            <div className="flex gap-4 items-center">
                               <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
                                  {item.amount.includes('+') ? '📈' : '📉'}
                               </div>
                               <div>
                                  <p className="text-[13.5px] font-bold text-gray-900 mb-0.5">{item.title}</p>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.desc}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className={`text-[14px] font-bold ${item.color} mb-0.5`}>{item.amount}</p>
                               <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{item.status}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-white rounded-[40px] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-10">Security</h3>
                    <div className="space-y-6 flex-1">
                       <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                          <div className="flex gap-4 items-center">
                             <span className="text-xl">📱</span>
                             <div>
                                <p className="text-[13px] font-bold text-gray-900">Two-Factor Auth</p>
                                <p className="text-[10px] text-gray-400 font-medium">Active via Google Authenticator</p>
                             </div>
                          </div>
                          <button className="text-[10px] font-bold text-primary uppercase tracking-widest bg-white h-8 px-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">Manage</button>
                       </div>
                       <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                          <div className="flex gap-4 items-center">
                             <span className="text-xl">🔑</span>
                             <div>
                                <p className="text-[13px] font-bold text-gray-900">Security Password</p>
                                <p className="text-[10px] text-gray-400 font-medium">Last updated 42 days ago</p>
                             </div>
                          </div>
                          <button className="text-[10px] font-bold text-white uppercase tracking-widest bg-primary h-8 px-4 rounded-lg shadow-sm shadow-orange-200">Update</button>
                       </div>
                    </div>
                    <div className="pt-6 mt-6 border-t border-gray-50">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                             Active Sessions
                          </span>
                          <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">3 Active</span>
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center group">
                             <span className="text-[12px] font-bold text-gray-800">MacBook Pro 16" • NYC</span>
                             <span className="text-[10px] font-bold text-orange-500 uppercase">Current</span>
                          </div>
                          <div className="flex justify-between items-center group">
                             <span className="text-[12px] font-medium text-gray-500">iPhone 15 Pro • London</span>
                             <span className="text-[10px] font-bold text-gray-300 uppercase">4h ago</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Balance Sidebar Card (Right Side in Lg) */}
           <div className="lg:col-span-4">
              <div className="bg-primary rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden shadow-[0_25px_60px_rgba(255,102,0,0.3)] sticky top-28 group">
                 {/* Decorative Wallet Icon Background */}
                 <div className="absolute -right-10 -top-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                 </div>
                 
                 <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                       <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest text-white/60 bg-black/10 px-3 py-1.5 rounded-lg border border-white/10">SwiftCard • 8821</span>
                    </div>

                    <div className="mb-12">
                       <p className="text-white/60 text-[12px] font-bold uppercase tracking-widest mb-1.5">Total Balance</p>
                       <p className="text-[44px] font-black leading-none tracking-tight">$142,850.00</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                       <button className="h-[52px] bg-white text-primary rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 hover:bg-orange-50 transition-all active:scale-95">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                          Deposit
                       </button>
                       <button className="h-[52px] bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 hover:bg-white/20 transition-all active:scale-95">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7"/><polyline points="10 7 17 7 17 14"/></svg>
                          Withdraw
                       </button>
                    </div>
                 </div>
              </div>

              {/* Promo Card Placeholder */}
              <div className="mt-8 bg-[#111827] rounded-[40px] p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
                 <h4 className="text-[16px] font-bold mb-3 relative z-10">Vault Protection</h4>
                 <p className="text-gray-400 text-[13px] leading-relaxed mb-6 relative z-10">Up to $250,000 coverage on your digital vault deposits through Kinetic Insure.</p>
                 <Link href="/security" className="text-[12px] font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
                    Learn about Kinetic Security
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                 </Link>
              </div>
           </div>

        </div>

      </main>
      </div>
    </div>
  );
}
