'use client';

import SupporterScaffold from '@/components/supporter/SupporterScaffold';

type SupporterPlaceholderProps = {
  title: string;
  description: string;
};

export default function SupporterPlaceholder({
  title,
  description,
}: SupporterPlaceholderProps) {
  return (
    <SupporterScaffold searchValue="" onSearchChange={() => undefined}>
      <div className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-[760px] rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FFF1E7] text-primary">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M8 10h8" />
              <path d="M8 14h8" />
            </svg>
          </div>
          <h1 className="mt-6 text-[34px] font-black tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="mt-4 text-[15px] font-medium leading-8 text-[#64748B]">
            {description}
          </p>
        </div>
      </div>
    </SupporterScaffold>
  );
}
