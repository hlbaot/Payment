import Link from 'next/link';

type Action = {
  href: string;
  label: string;
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  primaryAction: Action;
  secondaryAction?: Action;
};

export default function InfoPage({
  eyebrow,
  title,
  description,
  highlights,
  primaryAction,
  secondaryAction,
}: InfoPageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] py-16">
      <div className="container max-w-[960px] mx-auto px-6">
        <div className="mb-8">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
          <h1 className="text-[38px] font-black tracking-tight text-gray-900 md:text-[48px]">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] font-medium leading-8 text-gray-500">
            {description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-[0_18px_50px_rgba(17,24,39,0.06)] md:p-10">
            <h2 className="text-[18px] font-bold text-gray-900">
              What You Can Do Here
            </h2>
            <div className="mt-6 grid gap-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-4 rounded-2xl border border-[#F3E7DE] bg-[#FFF8F3] px-5 py-4"
                >
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-medium leading-7 text-gray-700">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-[#111827] p-8 text-white shadow-[0_24px_50px_rgba(17,24,39,0.2)] md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4Z" />
              </svg>
            </div>
            <h2 className="mt-8 text-[22px] font-bold tracking-tight">
              Next Step
            </h2>
            <p className="mt-3 text-[14px] font-medium leading-7 text-white/70">
              Use the primary action below to continue the flow without getting
              stuck in a placeholder route.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={primaryAction.href}
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-primary px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(255,102,0,0.28)] transition-colors hover:bg-[#E65C00]"
              >
                {primaryAction.label}
              </Link>
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 text-[14px] font-bold text-white transition-colors hover:bg-white/10"
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
