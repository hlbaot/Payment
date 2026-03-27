'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';

type AdminOrder = {
  id: string;
  time: string;
  user: string;
  email: string;
  wallet: string;
  orderName: string;
  commission: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

type CounterDetailItem = {
  id: string;
  orderLabel: string;
  commission: string;
};

type OrderDetailModalData = {
  counterName: string;
  items: CounterDetailItem[];
};

const initialOrders: AdminOrder[] = [
  {
    id: '#TXN-94021',
    time: 'Oct 19, 14:22',
    user: 'Alex Rivera',
    email: 'arivera@example.com',
    wallet: '$18,500.00',
    orderName: 'US Fast Transfer',
    commission: '$272.80',
    status: 'Pending',
  },
  {
    id: '#TXN-93992',
    time: 'Oct 19, 09:44',
    user: 'Marcus Thorne',
    email: 'm.thorne@vortex.io',
    wallet: '$62,000.00',
    orderName: 'Swift Payment',
    commission: '$1,250.00',
    status: 'Pending',
  },
  {
    id: '#TXN-93850',
    time: 'Oct 18, 16:10',
    user: 'Sarah Jenkins',
    email: 's.jenkins@corp.com',
    wallet: '$9,400.00',
    orderName: 'UK Bill Payment',
    commission: '$46.50',
    status: 'Pending',
  },
];

const orderDetailsById: Record<string, OrderDetailModalData[]> = {
  '#TXN-94021': [
    {
      counterName: 'Counter 1',
      items: [
        { id: 'A1', orderLabel: 'US Fast Transfer', commission: '$120.00' },
        { id: 'A2', orderLabel: 'Express Wallet Topup', commission: '$152.80' },
      ],
    },
    {
      counterName: 'Counter 2',
      items: [
        { id: 'A3', orderLabel: 'Swift Payment', commission: '$84.00' },
      ],
    },
    {
      counterName: 'Counter 3',
      items: [
        { id: 'A4', orderLabel: 'Global Payout', commission: '$68.50' },
      ],
    },
  ],
  '#TXN-93992': [
    {
      counterName: 'Counter 1',
      items: [
        { id: 'B1', orderLabel: 'Swift Payment', commission: '$650.00' },
      ],
    },
    {
      counterName: 'Counter 2',
      items: [
        { id: 'B2', orderLabel: 'High Value Transfer', commission: '$400.00' },
        { id: 'B3', orderLabel: 'Priority Settlement', commission: '$200.00' },
      ],
    },
    {
      counterName: 'Counter 3',
      items: [
        { id: 'B4', orderLabel: 'FX Adjustment', commission: '$35.00' },
      ],
    },
  ],
  '#TXN-93850': [
    {
      counterName: 'Counter 1',
      items: [
        { id: 'C1', orderLabel: 'UK Bill Payment', commission: '$20.00' },
      ],
    },
    {
      counterName: 'Counter 2',
      items: [
        { id: 'C2', orderLabel: 'Invoice Settlement', commission: '$16.50' },
      ],
    },
    {
      counterName: 'Counter 3',
      items: [
        { id: 'C3', orderLabel: 'Utility Checkout', commission: '$10.00' },
      ],
    },
  ],
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Approved' | 'Rejected'>('ALL');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [detailData, setDetailData] = useState(orderDetailsById);
  const [highlightedWalletId, setHighlightedWalletId] = useState<string | null>(null);

  const parseCurrency = (value: string) => Number(value.replace(/[^0-9.]+/g, '')) || 0;
  const formatCurrency = (value: number) =>
    `$${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    if (!highlightedWalletId) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHighlightedWalletId(null);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [highlightedWalletId]);

  const updateOrderWallet = (orderId: string, amount: number) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, wallet: formatCurrency(parseCurrency(order.wallet) + amount) }
          : order
      )
    );
  };

  const getOrderCommissionTotal = (orderId: string) =>
    (detailData[orderId] ?? []).reduce(
      (total, counter) =>
        total +
        counter.items.reduce((counterTotal, item) => counterTotal + parseCurrency(item.commission), 0),
      0
    );

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch = !query
        ? true
        : [order.id, order.user, order.email, order.orderName].some((value) =>
            value.toLowerCase().includes(query)
          );
      const matchesStatus = statusFilter === 'ALL' ? true : order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const updateStatus = (ids: string[], status: 'Approved' | 'Rejected') => {
    setOrders((current) =>
      current.map((order) =>
        ids.includes(order.id) ? { ...order, status } : order
      )
    );
  };

  const removeDetailItem = (orderId: string, itemId: string) => {
    setDetailData((current) => ({
      ...current,
      [orderId]: (current[orderId] ?? []).map((counter) => ({
        ...counter,
        items: counter.items.filter((item) => item.id !== itemId),
      })),
    }));
  };

  const handleRejectDetail = (orderId: string, itemId: string) => {
    removeDetailItem(orderId, itemId);
  };

  const handleAcceptOrder = (orderId: string) => {
    const commissionTotal = getOrderCommissionTotal(orderId);
    if (commissionTotal <= 0) {
      return;
    }

    updateOrderWallet(orderId, commissionTotal);
    setHighlightedWalletId(orderId);
    updateStatus([orderId], 'Approved');
  };

  const handleRejectOrder = (orderId: string) => {
    updateStatus([orderId], 'Rejected');
  };

  const activeOrderDetails = activeOrderId
    ? (detailData[activeOrderId] ?? []).filter((counter) => counter.items.length > 0)
    : [];
  const activeOrderCommissionTotal = activeOrderId ? getOrderCommissionTotal(activeOrderId) : 0;
  const getDisplayedCommissionTotal = (order: AdminOrder) =>
    order.status === 'Approved' ? 0 : getOrderCommissionTotal(order.id);
  const activeOrderStatus = activeOrderId
    ? orders.find((order) => order.id === activeOrderId)?.status ?? 'Pending'
    : 'Pending';

  return (
    <AdminScaffold
      searchPlaceholder="Search admin records..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1280px] space-y-8">
        <div>
          <h2 className="text-[44px] font-black tracking-tight text-gray-900">Confirm Pending Orders</h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStatusFilter('ALL')}
                className={`inline-flex min-h-[40px] items-center rounded-xl px-4 text-[14px] font-bold transition-colors ${
                  statusFilter === 'ALL'
                    ? 'bg-[#F3F5F8] text-[#63748C]'
                    : 'bg-white text-[#94A3B8] hover:bg-[#F8FAFC]'
                }`}
              >
                Waitting
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Rejected')}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-xl px-4 text-[14px] font-bold transition-colors ${
                  statusFilter === 'Rejected'
                    ? 'bg-[#FFF1F2] text-[#E11D48]'
                    : 'bg-white text-[#E11D48] hover:bg-[#FFF5F6]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Reject
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('Approved')}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-xl px-4 text-[14px] font-bold transition-colors ${
                  statusFilter === 'Approved'
                    ? 'bg-[#DCFCE7] text-[#16A34A]'
                    : 'bg-white text-[#16A34A] hover:bg-[#F0FDF4]'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="16 9 11 14 8 11" />
                </svg>
                Accept
              </button>
            </div>

            <p className="text-[14px] font-medium text-[#8EA0BC]">
              Confirmed orders update commission automatically
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#FBFCFE] text-left">
                <tr className="text-[12px] font-black uppercase tracking-[0.16em] text-[#8EA0BC]">
                  <th className="px-6 py-5">Email</th>
                  <th className="px-6 py-5">Wallet</th>
                  <th className="px-6 py-5">Order Name</th>
                  <th className="px-6 py-5">Hoa Hong Cua Don</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100">
                    <td className="px-6 py-5">
                      <p className="text-[16px] font-bold text-gray-900">{order.email}</p>
                      <p className="mt-1 text-[12px] font-medium text-[#9AA7BD]">{order.user}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-xl px-3 py-2 text-[16px] font-black transition-all duration-300 ${
                          highlightedWalletId === order.id
                            ? 'bg-[#DCFCE7] text-[#16A34A] shadow-[0_0_0_6px_rgba(34,197,94,0.12)]'
                            : 'text-gray-900'
                        }`}
                      >
                        {order.wallet}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveOrderId(order.id)}
                          className="inline-flex min-h-[36px] items-center justify-center rounded-xl bg-[#F4F5F7] px-4 text-[12px] font-bold uppercase tracking-[0.12em] text-gray-700 transition-colors hover:bg-[#EBECEF]"
                        >
                          View Detail
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[16px] font-black text-primary">
                      {formatCurrency(getDisplayedCommissionTotal(order))}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-[12px] font-black uppercase tracking-[0.18em] ${
                          order.status === 'Approved'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : order.status === 'Rejected'
                              ? 'bg-[#FEE2E2] text-[#DC2626]'
                              : 'bg-[#FFF4DB] text-[#D97706]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleRejectOrder(order.id)}
                          disabled={order.status !== 'Pending'}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#FFF1F2] px-4 text-[14px] font-bold text-[#E11D48] transition-colors hover:bg-[#FFE4E8] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#94A3B8]"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAcceptOrder(order.id)}
                          disabled={order.status !== 'Pending' || getDisplayedCommissionTotal(order) <= 0}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#94A3B8]"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="16 9 11 14 8 11" />
                          </svg>
                          Accept
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium text-[#63748C]">Rows per page:</span>
              <span className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg bg-[#F3F5F8] px-3 text-[14px] font-bold text-gray-700">25</span>
            </div>
            <div className="flex items-center gap-3 text-[15px] font-semibold text-[#52637A]">
              <button type="button" aria-label="Previous page" className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">1</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl">2</span>
              <button type="button" aria-label="Next page" className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {activeOrderId ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/40 px-6 py-10">
            <div className="w-full max-w-[1280px] rounded-[32px] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.2)]">
              <div className="flex flex-col gap-4 border-b border-gray-100 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-[28px] font-black tracking-tight text-gray-900">Order Detail</h3>
                  <p className="mt-1 text-[14px] font-medium text-[#8EA0BC]">{activeOrderId}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-[#FFF7ED] px-5 py-3 text-right">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#F97316]">
                      Tong Tien Hoa Hong
                    </p>
                    <p className="mt-1 text-[24px] font-black tracking-tight text-primary">
                      {formatCurrency(activeOrderCommissionTotal)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveOrderId(null)}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-[#74839B] transition-colors hover:bg-gray-50"
                    aria-label="Close detail modal"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid gap-6 px-8 py-8 md:grid-cols-3">
                {activeOrderDetails.length > 0 ? activeOrderDetails.map((counter) => {
                  const counterCommissionTotal = counter.items.reduce(
                    (total, item) => total + parseCurrency(item.commission),
                    0
                  );

                  return (
                    <div key={counter.counterName} className="rounded-[28px] border border-gray-100 bg-[#FBFCFE] p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-[20px] font-black tracking-tight text-gray-900">{counter.counterName}</h4>
                        <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#94A3B8]">
                            Tong HH
                          </p>
                          <p className="mt-1 text-[15px] font-black text-primary">
                            {formatCurrency(counterCommissionTotal)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 space-y-4">
                        {counter.items.length > 0 ? (
                          counter.items.map((item) => (
                            <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                              <p className="text-[15px] font-bold text-gray-900">{item.orderLabel}</p>
                              <p className="mt-2 text-[13px] font-semibold text-primary">Hoa hồng: {item.commission}</p>
                              <div className="mt-4 flex flex-wrap gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleRejectDetail(activeOrderId, item.id)}
                                  disabled={activeOrderStatus === 'Approved'}
                                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-[#FFF1F2] px-4 text-[13px] font-bold text-[#E11D48] transition-colors hover:bg-[#FFE4E8] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#94A3B8]"
                                >
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </div>
                  );
                }) : (
                  <div className="md:col-span-3 rounded-[28px] border border-dashed border-gray-200 bg-[#FBFCFE] px-6 py-12 text-center">
                    <p className="text-[18px] font-black text-gray-900">No pending items left</p>
                    <p className="mt-2 text-[14px] font-medium text-[#94A3B8]">
                      Tat ca don trong order nay da duoc xu ly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </AdminScaffold>
  );
}
