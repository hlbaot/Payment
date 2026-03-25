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

  return (
    <I18nProvider>
      <>
        <Navbar />
        <div className="relative min-h-[calc(100vh-var(--header-height))] bg-white">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 sm:px-8">
            <section className="mx-auto w-full max-w-[470px] rounded-[24px] border border-[#D7DCE5] bg-white px-7 py-8 shadow-[0_8px_22px_rgba(15,23,42,0.02)] sm:px-8 sm:py-9">
              <form onSubmit={handleLogin} className="mx-auto flex w-full max-w-[360px] flex-col">
                <h1 className="text-center text-[28px] font-bold tracking-[-0.04em] text-[#1C1C1C]">
                  Welcome
                </h1>

                <p className="mt-8 text-[17px] leading-none tracking-[-0.03em] text-[#6A7690]">
                  New to Ria?{' '}
                  <Link href="/register" className="font-bold text-primary">
                    Register
                  </Link>
                </p>

                <div className="mt-8">
                  <label
                    htmlFor="login-email"
                    className="block text-[16px] font-bold tracking-[-0.03em] text-[#1F1F1F]"
                  >
                    Phone or email
                  </label>
                  <input
                    id="login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-3 h-[52px] w-full rounded-[10px] border border-[#D5DAE3] bg-white px-4 text-[16px] text-[#1F2937] outline-none transition-colors focus:border-[#B8C2D1]"
                    required
                  />
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="login-password"
                    className="block text-[16px] font-bold tracking-[-0.03em] text-[#1F1F1F]"
                  >
                    Password
                  </label>
                  <div className="relative mt-3">
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[52px] w-full rounded-[10px] border border-[#D5DAE3] bg-white px-4 pr-14 text-[16px] text-[#1F2937] outline-none transition-colors focus:border-[#B8C2D1]"
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
                  className="mt-8 text-center text-[16px] font-bold tracking-[-0.03em] text-primary"
                >
                  Forgot your password?
                </Link>

                <p className="mx-auto mt-10 max-w-[360px] text-center text-[12px] leading-[1.7] tracking-[-0.02em] text-[#6A7690]">
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

                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex h-[50px] min-w-[120px] items-center justify-center rounded-full bg-[#D8DCE6] px-8 text-[16px] font-bold tracking-[-0.03em] text-[#8C96A9] transition-colors hover:bg-[#CFD4DF] disabled:cursor-wait"
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
