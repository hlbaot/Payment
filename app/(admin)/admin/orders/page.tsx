'use client';

import { useMemo, useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';

type AdminOrder = {
  id: string;
  time: string;
  user: string;
  email: string;
  type: 'Transfer' | 'Payment';
  amount: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const initialOrders: AdminOrder[] = [
  {
    id: '#TXN-94021',
    time: 'Oct 19, 14:22',
    user: 'Alex Rivera',
    email: 'arivera@example.com',
    type: 'Transfer',
    amount: '$12,400.00',
    status: 'Pending',
  },
  {
    id: '#TXN-93992',
    time: 'Oct 19, 09:44',
    user: 'Marcus Thorne',
    email: 'm.thorne@vortex.io',
    type: 'Transfer',
    amount: '$50,000.00',
    status: 'Pending',
  },
  {
    id: '#TXN-93850',
    time: 'Oct 18, 16:10',
    user: 'Sarah Jenkins',
    email: 's.jenkins@corp.com',
    type: 'Payment',
    amount: '$3,100.00',
    status: 'Pending',
  },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState<string[]>(['#TXN-94021']);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return orders;

    return orders.filter((order) =>
      [order.id, order.user, order.email, order.type].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [orders, search]);

  const pendingOrders = orders.filter((order) => order.status === 'Pending');
  const pendingAmount = pendingOrders.reduce((total, order) => {
    return total + Number(order.amount.replace(/[$,]/g, ''));
  }, 0);

  const toggleSelection = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const updateStatus = (ids: string[], status: 'Approved' | 'Rejected') => {
    setOrders((current) =>
      current.map((order) =>
        ids.includes(order.id) ? { ...order, status } : order
      )
    );
    setSelected((current) => current.filter((id) => !ids.includes(id)));
  };

  return (
    <AdminScaffold
      searchPlaceholder="Search admin records..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1120px] space-y-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="text-[44px] font-black tracking-tight text-gray-900">Confirm Pending Orders</h2>
            <p className="mt-3 max-w-3xl text-[16px] font-medium leading-8 text-[#6B7A95]">
              Review and approve transactions requiring administrative verification.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-[15px] font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
            <button
              type="button"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-[15px] font-bold text-white shadow-[0_16px_30px_rgba(255,102,0,0.28)] transition-colors hover:bg-[#E65C00]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              New Transaction
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#FFD3B4] bg-[#FFF5EC] px-6 py-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-black uppercase tracking-[0.16em] text-[#B45309]">Admin Confirmation Note</p>
              <p className="mt-2 text-[15px] font-medium leading-7 text-[#C26A2B]">
                Confirming an order will automatically update user commission balances and trigger an instant system notification to the account holder.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_1fr_1.3fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#8EA0BC]">Pending Requests</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[42px] font-black tracking-tight text-primary">{pendingOrders.length}</span>
              <span className="text-[15px] font-medium text-[#8EA0BC]">Requiring Action</span>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#8EA0BC]">Awaiting Approval</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[42px] font-black tracking-tight text-gray-900">
                ${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[15px] font-medium text-primary">In Queue</span>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#8EA0BC]">Filters</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="inline-flex min-h-[40px] items-center rounded-xl border border-[#FFD6BB] bg-[#FFF1E7] px-4 text-[14px] font-bold text-primary">
                    Status: Pending
                  </span>
                  <span className="inline-flex min-h-[40px] items-center rounded-xl bg-[#F3F5F8] px-4 text-[14px] font-semibold text-gray-700">
                    Transaction Type
                  </span>
                  <span className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#F3F5F8] px-4 text-[14px] font-semibold text-gray-700">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Oct 12 - Oct 19, 2023
                  </span>
                </div>
              </div>
              <button type="button" className="text-[14px] font-bold text-primary">
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[15px] font-semibold text-[#63748C]">Selected ({selected.length})</span>
              <button
                type="button"
                onClick={() => updateStatus(selected, 'Approved')}
                disabled={selected.length === 0}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-primary px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="16 9 11 14 8 11" />
                </svg>
                Bulk Confirm & Approve
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selected, 'Rejected')}
                disabled={selected.length === 0}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#FFF1F2] px-4 text-[14px] font-bold text-[#E11D48] transition-colors hover:bg-[#FFE4E8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Reject
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
                  <th className="px-6 py-5"></th>
                  <th className="px-6 py-5">Order ID</th>
                  <th className="px-6 py-5">User Details</th>
                  <th className="px-6 py-5">Type</th>
                  <th className="px-6 py-5">Amount (USD)</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Approval Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100">
                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => toggleSelection(order.id)}
                        aria-label={`Select ${order.id}`}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                          selected.includes(order.id)
                            ? 'border-[#B45309] bg-[#B45309] text-white'
                            : 'border-[#D7DFEA] bg-white text-transparent hover:border-[#B45309]'
                        }`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-[16px] font-bold text-gray-900">{order.id}</p>
                      <p className="mt-1 text-[12px] font-medium text-[#9AA7BD]">{order.time}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-[16px] font-bold text-gray-900">{order.user}</p>
                      <p className="mt-1 text-[13px] font-medium text-[#9AA7BD]">{order.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#607086]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 7h10" />
                          <path d="M7 17h10" />
                          <path d="m10 4-3 3 3 3" />
                          <path d="m14 20 3-3-3-3" />
                        </svg>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[16px] font-black text-gray-900">{order.amount}</td>
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
                      <button
                        type="button"
                        onClick={() => updateStatus([order.id], 'Approved')}
                        disabled={order.status !== 'Pending'}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-[14px] font-bold text-white transition-colors hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#94A3B8]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="16 9 11 14 8 11" />
                        </svg>
                        {order.status === 'Pending' ? 'Confirm & Approve' : order.status}
                      </button>
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
      </div>
    </AdminScaffold>
  );
}
