'use client';

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I18nProvider } from "@/components/I18nProvider";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const normalizedEmail = email.trim().toLowerCase();
      const isAdminLogin =
        normalizedEmail === 'admin@kinetic.com' &&
        password === 'admin123';
      const isSupporterLogin =
        normalizedEmail === 'support@kinetic.com' &&
        password === 'support123';

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem(
        'userRole',
        isAdminLogin ? 'admin' : isSupporterLogin ? 'supporter' : 'user'
      );
      localStorage.setItem(
        'userName',
        isAdminLogin ? 'Morgan Lee' : isSupporterLogin ? 'Support Lead' : 'John Doe'
      );
      router.push(
        isAdminLogin
          ? '/admin/orders'
          : isSupporterLogin
            ? '/supporter/messages'
            : '/counter-market'
      );
    }, 1200);
  };

  const handleDemoLogin = (role: 'admin' | 'supporter') => {
    const isAdminDemo = role === 'admin';

    setEmail(isAdminDemo ? 'admin@kinetic.com' : 'support@kinetic.com');
    setPassword(isAdminDemo ? 'admin123' : 'support123');

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', isAdminDemo ? 'admin' : 'supporter');
    localStorage.setItem('userName', isAdminDemo ? 'Morgan Lee' : 'Support Lead');

    router.push(isAdminDemo ? '/admin/orders' : '/supporter/messages');
  };

  return (
    <I18nProvider>
      <>
        <Navbar />
        <div className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8">
          <div className="mx-auto flex w-full items-center justify-center">
            <section className="mx-auto w-full max-w-[470px] rounded-[24px] border border-[#D7DCE5] bg-white px-6 py-7 shadow-[0_8px_22px_rgba(15,23,42,0.02)] sm:px-7 sm:py-8">
              <form onSubmit={handleLogin} className="mx-auto flex w-full max-w-[360px] flex-col">
                <h1 className="text-center text-[24px] font-bold tracking-[-0.04em] text-[#1C1C1C] sm:text-[28px]">
                  Welcome
                </h1>

                <p className="mt-7 text-[15px] leading-none tracking-[-0.03em] text-[#6A7690] sm:mt-8 sm:text-[17px]">
                  New to Ria?{' '}
                  <Link href="/register" className="font-bold text-primary">
                    Register
                  </Link>
                </p>

                <div className="mt-7 sm:mt-8">
                  <label
                    htmlFor="login-email"
                    className="block text-[15px] font-bold tracking-[-0.03em] text-[#1F1F1F] sm:text-[16px]"
                  >
                    Phone or email
                  </label>
                  <input
                    id="login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 h-[50px] w-full rounded-[10px] border border-[#D5DAE3] bg-white px-4 text-[15px] text-[#1F2937] outline-none transition-colors focus:border-[#B8C2D1] sm:h-[52px] sm:text-[16px]"
                    required
                  />
                </div>

                <div className="mt-6 sm:mt-7">
                  <label
                    htmlFor="login-password"
                    className="block text-[15px] font-bold tracking-[-0.03em] text-[#1F1F1F] sm:text-[16px]"
                  >
                    Password
                  </label>
                  <div className="relative mt-3">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[50px] w-full rounded-[10px] border border-[#D5DAE3] bg-white px-4 pr-14 text-[15px] text-[#1F2937] outline-none transition-colors focus:border-[#B8C2D1] sm:h-[52px] sm:text-[16px]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 text-[#6E7A92]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <EyeIcon />
                    </button>
                  </div>
                </div>

                <Link
                  href="/forgot-password"
                  className="mt-7 text-center text-[15px] font-bold tracking-[-0.03em] text-primary sm:mt-8 sm:text-[16px]"
                >
                  Forgot your password?
                </Link>

                <p className="mx-auto mt-8 max-w-[360px] text-center text-[11px] leading-[1.7] tracking-[-0.02em] text-[#6A7690] sm:mt-10 sm:text-[12px]">
                  By continuing you agree to our{' '}
                  <Link href="/terms" className="font-bold text-primary">
                    Terms and conditions
                  </Link>
                  ,{' '}
                  <Link href="/privacy" className="font-bold text-primary">
                    Privacy policy
                  </Link>
                  , and{' '}
                  <Link href="/cookie-settings" className="font-bold text-primary">
                    Cookie Notice.
                  </Link>
                </p>

                <div className="mt-6 grid gap-3 sm:mt-7">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    className="flex w-full items-center justify-between rounded-[14px] border border-[#D7DCE5] bg-[#F8FAFC] px-4 py-3 text-left transition-colors hover:border-[#BFC7D6] hover:bg-[#F3F6FB]"
                  >
                    <span>
                      <span className="block text-[14px] font-bold text-[#1F1F1F] sm:text-[15px]">
                        Admin demo
                      </span>
                      <span className="mt-1 block text-[12px] text-[#6A7690] sm:text-[13px]">
                        admin@kinetic.com
                      </span>
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-primary">
                      Demo
                    </span>
                  </button>
                </div>

                <div className="mt-8 flex justify-end sm:mt-10">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex h-[48px] min-w-[112px] items-center justify-center rounded-full bg-[#D8DCE6] px-7 text-[15px] font-bold tracking-[-0.03em] text-[#8C96A9] transition-colors hover:bg-[#CFD4DF] disabled:cursor-wait sm:h-[50px] sm:min-w-[120px] sm:px-8 sm:text-[16px]"
                  >
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </>
    </I18nProvider>
  );
}

function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
