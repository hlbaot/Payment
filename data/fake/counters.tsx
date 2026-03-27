import type { ReactNode } from 'react';

export type FakeCounter = {
  id: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
  badge: string;
  badgeClass: string;
  minAmount: string;
  minAmountValue: number;
  commission: string;
  orderTypes: string;
  status: 'active' | 'offline';
  grayText?: boolean;
};

export const fakeCounters: FakeCounter[] = [
  {
    id: 1,
    title: 'VIP COUNTER 01',
    subtitle: 'PRIORITY SERVICE',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    iconBg: 'bg-[#FFF0E6]',
    badge: 'OPEN',
    badgeClass: 'bg-[#E8F5EE] text-[#008A4E]',
    minAmount: '$5,000 USD',
    minAmountValue: 5000,
    commission: '2.2%',
    orderTypes: '5 types',
    status: 'active',
  },
];
