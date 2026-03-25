export type OrderStatus = 'Pending' | 'Completed' | 'Processing' | 'Cancelled';

export type Order = {
  id: string;
  orderNumber: string;
  recipient: string;
  counter: string;
  type: string;
  date: string;
  dateValue: string;
  amount: string;
  amountValue: number;
  status: OrderStatus;
  initials: string;
  accentClass: string;
};

export const orders: Order[] = [
  {
    id: '88219',
    orderNumber: '#KNT-88219',
    recipient: 'Goldman Sachs',
    counter: 'Int.',
    type: 'Security Purchase',
    date: 'Oct 24, 2023',
    dateValue: '2023-10-24',
    amount: '$42,500.00',
    amountValue: 42500,
    status: 'Pending',
    initials: 'GS',
    accentClass: 'bg-[#D8E7FF] text-[#2563EB]',
  },
  {
    id: '88210',
    orderNumber: '#KNT-88210',
    recipient: 'Tesla Inc.',
    counter: 'Treasury',
    type: 'Equity Dividend',
    date: 'Oct 23, 2023',
    dateValue: '2023-10-23',
    amount: '$1,240.50',
    amountValue: 1240.5,
    status: 'Completed',
    initials: 'TS',
    accentClass: 'bg-[#DDF8E7] text-[#059669]',
  },
  {
    id: '88195',
    orderNumber: '#KNT-88195',
    recipient: 'Vanguard Total',
    counter: 'Bond',
    type: 'Automated Trade',
    date: 'Oct 22, 2023',
    dateValue: '2023-10-22',
    amount: '$15,000.00',
    amountValue: 15000,
    status: 'Processing',
    initials: 'VB',
    accentClass: 'bg-[#F3F4F6] text-[#4B5563]',
  },
  {
    id: '88182',
    orderNumber: '#KNT-88182',
    recipient: 'Binance US',
    counter: 'Prime',
    type: 'Crypto Exit',
    date: 'Oct 20, 2023',
    dateValue: '2023-10-20',
    amount: '$8,900.00',
    amountValue: 8900,
    status: 'Cancelled',
    initials: 'BN',
    accentClass: 'bg-[#FFE1E1] text-[#DC2626]',
  },
  {
    id: '88155',
    orderNumber: '#KNT-88155',
    recipient: 'Morgan Stanley',
    counter: 'Capital',
    type: 'Portfolio Rebalance',
    date: 'Oct 19, 2023',
    dateValue: '2023-10-19',
    amount: '$120,000.00',
    amountValue: 120000,
    status: 'Completed',
    initials: 'MS',
    accentClass: 'bg-[#D8E7FF] text-[#2563EB]',
  },
];

export const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-[#FFF0E3] text-[#D97706]',
  Completed: 'bg-[#DCFCE7] text-[#16A34A]',
  Processing: 'bg-[#F3F4F6] text-[#525252]',
  Cancelled: 'bg-[#FEE2E2] text-[#DC2626]',
};
