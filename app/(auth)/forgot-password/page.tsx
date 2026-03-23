'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FB] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[520px] rounded-[32px] border border-gray-100 bg-white p-8 shadow-[0_20px_60px_rgba(17,24,39,0.06)] md:p-10">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
          Account Recovery
        </p>
        <h1 className="text-[34px] font-black tracking-tight text-gray-900">
          Reset Your Password
        </h1>
        <p className="mt-4 text-[15px] font-medium leading-7 text-gray-500">
          Enter the email linked to your SwiftGuard Kinetic account and we&apos;ll
          prepare the next recovery step.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="forgot-password-email" className="text-[12px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Email Address
            </label>
            <input
              id="forgot-password-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full h-[56px] rounded-2xl border border-gray-200 bg-gray-50 px-4 text-[15px] font-medium text-gray-900 outline-none transition-colors focus:border-primary"
              placeholder="name@company.com"
              required
            />
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[#FFE8D6] bg-[#FFF8F3] px-5 py-4 text-[14px] font-medium leading-7 text-gray-700">
              Recovery instructions have been prepared for <span className="font-bold">{email}</span>.
              Continue to support if you need urgent account access help.
            </div>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-primary px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(255,102,0,0.28)] transition-colors hover:bg-[#E65C00]"
          >
            Send Recovery Instructions
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-[14px] font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back to Login
          </Link>
          <Link
            href="/support"
            className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-[#F3E7DE] bg-[#FFF8F3] px-5 text-[14px] font-bold text-primary transition-colors hover:bg-[#FFF0E6]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
