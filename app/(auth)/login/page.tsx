'use client';

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('demo@kinetic.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/counter-market');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col justify-center items-center p-6 py-20">
      <div className="card w-full max-w-lg p-10 md:p-16">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-orange-100/50 rounded flex items-center justify-center">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2"><path d="M3 21h18M3 10h18M5 10V7a7 7 0 1 1 14 0v3M4 21V10m16 11V10"/></svg>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
          <p className="text-muted">Please enter your details to access your account.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9 6 9-6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-1.64A2 2 0 0 1 6.56 7h10.88a2 2 0 0 1 1.11.36L21 9"/></svg>
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com" 
                className="w-full pl-12 py-3 bg-gray-50 border-gray-100" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
              <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-12 py-3 bg-gray-50 border-gray-100" 
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`btn btn-primary w-full py-4 !rounded-xl text-lg mt-2 flex justify-center items-center gap-2 ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </>
            ) : 'Login'}
          </button>
        </form>
        
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold">Or continue with</span></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="btn btn-secondary !rounded-xl py-3 flex items-center justify-center gap-3">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
             <span className="font-bold text-sm">Google</span>
          </button>
          <button className="btn btn-secondary !rounded-xl py-3 flex items-center justify-center gap-3">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.96 0-2.04-.6-3.23-.6-1.2 0-2.14.56-3.05.56-1.8 0-4.66-3-4.66-7.39 0-4.24 2.76-6.49 5.38-6.49 1.45 0 2.5.94 3.48.94s1.86-.94 3.28-.94c1.17 0 2.13.56 2.88 1.48-2.3 1.34-1.93 4.28.32 5.51-1.04 1.58-2.42 3.86-4.4 6.94zM16.14 3.12c-1.33 1.63-3.07 1.48-4.23.47.16-1.57 1.61-3.26 3.17-3.59.2.19.46.46.6.7.74.83.94 1.68.46 2.42z"/></svg>
             <span className="font-bold text-sm">Apple</span>
          </button>
        </div>
        
        <div className="mt-12 text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link href="/register" className="text-primary font-bold hover:underline">Register</Link>
        </div>
      </div>
      
      <div className="mt-12 flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        <Link href="#" className="hover:text-primary">Security</Link>
        <Link href="#" className="hover:text-primary">Privacy Policy</Link>
        <Link href="#" className="hover:text-primary">Terms of Service</Link>
        <Link href="#" className="hover:text-primary">Cookie Settings</Link>
      </div>
    </div>
  );
}
