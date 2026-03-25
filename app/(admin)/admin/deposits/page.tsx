'use client';

import { useMemo, useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';

type DepositRequest = {
  id: string;
  createdAt: string;
  user: string;
  initials: string;
  reference: string;
  amount: string;
  feeLabel: string;
  method: string;
  proof: string;
  status: 'Pending' | 'Processed';
};

const initialRequests: DepositRequest[] = [
  {
    id: '#DEP-8842-X',
    createdAt: '2 mins ago',
    user: 'Julianne Devis',
    initials: 'JD',
    reference: 'ID: KYV-992-00',
    amount: '$12,400.00',
    feeLabel: 'Zero Fee Tier',
    method: 'Bank Wire',
    proof: 'Proof_8842.pdf',
    status: 'Pending',
  },
  {
    id: '#DEP-8843-K',
    createdAt: '15 mins ago',
    user: 'Arjun Mehta',
    initials: 'AM',
    reference: 'ID: KYV-112-98',
    amount: '$2,100.00',
    feeLabel: 'Fee: $2.50',
    method: 'Debit Card',
    proof: 'Stripe_Tx_Ref.jpg',
    status: 'Pending',
  },
];

export default function AdminDepositsPage() {
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState(initialRequests);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return requests;

    return requests.filter((request) =>
      [request.id, request.user, request.reference, request.proof].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [requests, search]);

  const pendingRequests = requests.filter((request) => request.status === 'Pending');
  const pendingAmount = pendingRequests.reduce((total, request) => {
    return total + Number(request.amount.replace(/[$,]/g, ''));
  }, 0);
  const processedToday = requests.filter((request) => request.status === 'Processed').length + 156;

  const confirmDeposit = (id: string) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status: 'Processed' } : request
      )
    );
  };

  return (
    <AdminScaffold
      searchPlaceholder="Search admin records..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1120px] space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.7fr_0.7fr]">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#D45700] via-[#F36A00] to-[#FF7A00] px-6 py-7 text-white shadow-[0_20px_50px_rgba(243,106,0,0.3)]">
            <div className="absolute bottom-4 right-4 h-28 w-28 rounded-[28px] border-4 border-white/10"></div>
            <div className="absolute bottom-8 right-8 h-12 w-12 rounded-2xl border-4 border-white/12"></div>
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-white/80">Pending Volume</p>
            <h2 className="mt-3 text-[50px] font-black tracking-tight">
              ${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <p className="mt-3 text-[16px] font-medium text-white/90">+12% from yesterday</p>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#2563EB]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3" />
                <path d="M16 3v3" />
                <path d="M3 8h18" />
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M12 12v5" />
                <path d="m9 14 3 3 3-3" />
              </svg>
            </div>
            <p className="mt-5 text-[15px] font-medium text-[#52637A]">Waiting Review</p>
            <p className="mt-3 text-[40px] font-black tracking-tight text-gray-900">{pendingRequests.length} Requests</p>
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#16A34A]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 9 11 14 8 11" />
              </svg>
            </div>
            <p className="mt-5 text-[15px] font-medium text-[#52637A]">Processed Today</p>
            <p className="mt-3 text-[40px] font-black tracking-tight text-gray-900">{processedToday} Items</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="flex flex-col gap-5 border-b border-gray-100 px-6 py-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-[34px] font-black tracking-tight text-gray-900">Pending Approval</h2>
                <span className="inline-flex rounded-full bg-[#FFF1E7] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-primary">
                  Requires Action
                </span>
              </div>
              <p className="mt-3 text-[15px] font-medium leading-7 text-[#8EA0BC]">
                Confirm deposits after reviewing payment proof and funding method details.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-[14px] font-bold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#FBFCFE] text-left">
                <tr className="text-[12px] font-black uppercase tracking-[0.16em] text-[#8EA0BC]">
                  <th className="px-6 py-5">Request ID</th>
                  <th className="px-6 py-5">User Information</th>
                  <th className="px-6 py-5">Deposit Details</th>
                  <th className="px-6 py-5">Method</th>
                  <th className="px-6 py-5">Verification</th>
                  <th className="px-6 py-5 text-right">Approval Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-t border-gray-100">
                    <td className="px-6 py-6 align-top">
                      <p className="text-[16px] font-black text-gray-900">{request.id}</p>
                      <p className="mt-2 text-[12px] font-medium text-[#9AA7BD]">{request.createdAt}</p>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF1E7] text-[15px] font-black text-[#B45309]">
                          {request.initials}
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-gray-900">{request.user}</p>
                          <p className="mt-1 text-[13px] font-medium text-[#7C8AA5]">{request.reference}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <p className="text-[16px] font-black text-gray-900">{request.amount}</p>
                      <p className={`mt-2 text-[12px] font-black uppercase tracking-[0.14em] ${
                        request.feeLabel.toLowerCase().includes('zero') ? 'text-[#16A34A]' : 'text-[#DC2626]'
                      }`}>
                        {request.feeLabel}
                      </p>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <div className="inline-flex items-center gap-3 text-[15px] font-semibold text-[#52637A]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="6" width="18" height="12" rx="2" />
                          <path d="M7 12h10" />
                        </svg>
                        {request.method}
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <button
                        type="button"
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-[#F3F5F8] px-4 text-[13px] font-bold text-[#52637A] transition-colors hover:bg-[#EDEFF4]"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {request.proof}
                      </button>
                    </td>
                    <td className="px-6 py-6 align-top text-right">
                      <button
                        type="button"
                        onClick={() => confirmDeposit(request.id)}
                        disabled={request.status === 'Processed'}
                        className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#B45309] px-5 text-[14px] font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#9A4307] disabled:cursor-not-allowed disabled:bg-[#D7DFEA] disabled:text-[#52637A]"
                      >
                        {request.status === 'Pending' ? 'Confirm Deposit' : 'Deposited'}
                      </button>
                      <p className="mt-3 text-[12px] font-medium leading-6 text-[#9AA7BD]">
                        {request.status === 'Pending'
                          ? 'Confirming will credit the user wallet and trigger a notification.'
                          : 'Deposit has been released to the user wallet.'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[14px] font-medium text-[#63748C]">
              Showing {filteredRequests.length} of {requests.length} requests pending approval
            </p>
            <div className="flex items-center gap-2 text-[14px] font-bold text-gray-700">
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-200 px-4 hover:bg-gray-50">
                Prev
              </button>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#B45309] text-white">1</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl">2</span>
              <button type="button" className="inline-flex h-10 items-center justify-center rounded-xl border border-gray-200 px-4 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.75fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1E7] text-[#B45309]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <h3 className="text-[30px] font-black tracking-tight text-gray-900">Confirmation Policy</h3>
                <p className="mt-4 text-[16px] font-medium leading-8 text-[#6B7A95]">
                  By clicking &quot;Confirm Deposit&quot;, you acknowledge that you have verified the proof of payment provided by the user. Funds will be instantly available in the user&apos;s primary wallet.
                </p>
                <p className="mt-5 text-[14px] font-black uppercase tracking-[0.16em] text-primary">Audit Log Enabled</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <h3 className="text-[30px] font-black tracking-tight text-gray-900">Need to Reject?</h3>
            <p className="mt-4 text-[16px] font-medium leading-8 text-[#6B7A95]">
              If proof is missing or invalid, reject the request with a specific reason so the user can re-upload.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-[#FFF1F2] px-5 text-[14px] font-black uppercase tracking-[0.14em] text-[#DC2626] transition-colors hover:bg-[#FFE4E8]"
            >
              Reject Request
            </button>
          </div>
        </div>
      </div>
    </AdminScaffold>
  );
}
