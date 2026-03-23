'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="w-full h-24 px-8 flex justify-between items-center bg-white sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          SwiftGuard<br />Kinetic
        </Link>
        
        <div className="flex-1 max-w-[480px] mx-12 hidden md:block">
           <div className="relative flex justify-between items-center w-full mt-4">
              {/* Background line */}
              <div className="absolute top-[5px] left-0 w-full h-[1px] bg-[#F5E6DA] -z-10" />
              {/* Active line */}
              <div className="absolute top-[5px] left-0 h-[1px] bg-primary -z-10 transition-all duration-500" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
              
              {['Country', 'Phone', 'Password', 'Info'].map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-2 cursor-pointer pt-0" onClick={() => step > i && setStep(i + 1)}>
                   {/* Dot */}
                   <div className="bg-white p-1 rounded-full"><div className={`w-[10px] h-[10px] rounded-full transition-colors duration-500 ${step >= i + 1 ? 'bg-primary' : 'bg-[#E5D5C5]'}`} /></div>
                   {/* Text */}
                   <span className={`text-[13px] font-semibold transition-colors duration-500 ${step >= i + 1 ? 'text-primary' : 'text-gray-400'}`}>
                     {label}
                   </span>
                </div>
              ))}
           </div>
        </div>
        
        <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[580px] bg-white border border-gray-100 rounded-3xl p-10 md:p-14 shadow-[0_8px_40px_rgb(0,0,0,0.02)] relative min-h-[480px] flex flex-col justify-center">
          
          {step === 1 && (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full max-w-[420px] mx-auto">
              <h1 className="text-[32px] font-bold tracking-tight mb-2">Welcome to SwiftGuard Kinetic <span className="text-2xl inline-block -translate-y-1">👋</span></h1>
              <p className="text-gray-600 mb-10 text-[15px]">Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
              
              <div className="text-left space-y-2 mb-10">
                <label className="text-sm font-bold text-gray-900">Country of residence</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-[22px] leading-none">🇺🇸</span>
                    <span className="font-semibold text-gray-900 border-l border-gray-200 pl-3 ml-1 h-5 flex items-center">United States</span>
                  </div>
                  <select className="w-full h-[56px] pl-[140px] pr-10 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm">
                    <option value="us"></option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="btn bg-primary text-white hover:bg-[#E65C00] w-[200px] h-[52px] rounded-xl font-bold text-[16px] shadow-[0_6px_20px_rgba(255,102,0,0.3)] transition-all mx-auto block"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full max-w-[420px] mx-auto">
              <h1 className="text-[32px] font-bold tracking-tight mb-2">Verify your phone</h1>
              <p className="text-gray-600 mb-10 text-[15px]">We'll send a code to secure your account</p>
              
              <div className="text-left space-y-2 mb-8">
                <label className="text-sm font-bold text-gray-900">Mobile number</label>
                <div className="flex gap-3">
                  <div className="relative w-[130px]">
                     <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                       <span className="text-xl leading-none">🇺🇸</span>
                       <span className="font-semibold text-gray-900 text-[15px]">+1</span>
                       <span className="font-semibold text-gray-900 text-[15px] ml-1">US</span>
                     </div>
                     <select className="w-full h-[56px] pl-[84px] pr-8 bg-white border border-gray-200 rounded-xl appearance-none cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm">
                       <option></option>
                     </select>
                     <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                     </div>
                  </div>
                  <input type="tel" placeholder="(555) 000-0000" className="flex-1 h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                </div>
              </div>
              
              <p className="text-[11px] text-gray-500 mb-8 text-left leading-[1.6]">
                By continuing, you agree to receive an SMS for verification. Message and data rates may apply.
              </p>
              
              <button 
                onClick={nextStep}
                className="btn bg-primary text-white hover:bg-[#E65C00] w-[200px] h-[52px] rounded-xl font-bold text-[16px] shadow-[0_6px_20px_rgba(255,102,0,0.3)] transition-all mx-auto block"
              >
                Continue
              </button>
              
              <button className="flex items-center justify-center gap-2 mx-auto mt-6 text-primary font-bold text-[15px] hover:underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                Having trouble with verification?
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 text-center w-full max-w-[420px] mx-auto">
              <h1 className="text-[32px] font-bold tracking-tight mb-2">Create a password</h1>
              <p className="text-gray-600 mb-10 text-[15px]">Make sure it's strong to protect your funds</p>
              
              <div className="text-left space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">New Password</label>
                  <div className="relative">
                    <input type="password" placeholder="Enter your password" className="w-full h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  {/* Strength bar */}
                  <div className="h-[6px] w-full bg-[#F5E6DA] rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full transition-all duration-500"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 pt-3 pl-1">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-primary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      8+ characters
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-primary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      One number
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium font-sans">
                      <div className="w-[14px] flex justify-center"><div className="w-[6px] h-[6px] rounded-full border border-gray-400"></div></div>
                      One symbol
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-primary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Capital letter
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-bold text-gray-900">Confirm Password</label>
                  <input type="password" placeholder="Repeat your password" className="w-full h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="btn bg-primary text-white hover:bg-[#E65C00] w-full h-[52px] rounded-xl font-bold text-[16px] shadow-[0_6px_20px_rgba(255,102,0,0.3)] transition-all block"
              >
                Continue
              </button>
              
              <button className="flex items-center justify-center gap-2 mx-auto mt-6 text-primary font-bold text-[15px] hover:underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                Having trouble? Contact support
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 text-center w-full max-w-[420px] mx-auto">
              <h1 className="text-[32px] font-bold tracking-tight mb-2">Personal Information</h1>
              <p className="text-gray-600 mb-10 text-[15px]">Help us verify your identity and secure your account</p>
              
              <div className="text-left space-y-5 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">First Name</label>
                    <input type="text" placeholder="John" className="w-full h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Date of Birth</label>
                  <input type="text" placeholder="mm/dd/yyyy" className="w-full h-[56px] px-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Residential Address</label>
                  <textarea placeholder="Enter your full home address" className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 font-medium text-[16px] shadow-sm resize-none h-[110px]"></textarea>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-[6px] text-[11px] font-bold text-primary uppercase tracking-widest mb-6 border border-[#FFF0E6] bg-[#FFF8F3] py-2 px-4 rounded-full w-max mx-auto shadow-sm">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M12 15v3"/><path d="M10 16.5h4"/></svg>
                 AES-256 Encrypted
              </div>
              
              <button 
                className="btn bg-primary text-white hover:bg-[#E65C00] w-full h-[52px] rounded-xl font-bold text-[16px] shadow-[0_6px_20px_rgba(255,102,0,0.3)] transition-all block"
              >
                Complete Registration
              </button>
              
              <button className="flex items-center justify-center gap-2 mx-auto mt-6 text-primary font-bold text-[15px] hover:underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                Having trouble? Contact support
              </button>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-[11px] font-semibold text-gray-500 absolute bottom-6 text-center w-full">
           © 2024 SwiftGuard Inc. <span className="mx-1 text-gray-300">|</span> Secure Global Transfers
        </p>
      </main>
    </div>
  );
}

