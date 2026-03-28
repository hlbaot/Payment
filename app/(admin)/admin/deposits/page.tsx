'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';
import {
  confirmDepositRequest,
  DEPOSITS_UPDATED_EVENT,
  formatUsd,
  getWalletBalance,
  loadDepositRequests,
  type DepositRequest,
} from '@/data/fake/runtime-store';

export default function AdminDepositsPage() {
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState<DepositRequest[]>([]);

  useEffect(() => {
    const syncRequests = () => {
      setRequests(loadDepositRequests());
    };

    syncRequests();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'shared-deposit-requests') {
        syncRequests();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(DEPOSITS_UPDATED_EVENT, syncRequests);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(DEPOSITS_UPDATED_EVENT, syncRequests);
    };
  }, []);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return requests;

    return requests.filter((request) =>
      [request.id, request.userName, request.userEmail, request.method, request.note]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [requests, search]);

  const pendingRequests = requests.filter((request) => request.status === 'Pending');
  const confirmedRequests = requests.filter((request) => request.status === 'Confirmed');
  const pendingAmount = pendingRequests.reduce((total, request) => total + request.amount, 0);

  return (
    <AdminScaffold
      searchPlaceholder="Search deposit requests..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1180px] space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[30px] bg-gradient-to-br from-[#D45700] via-[#F36A00] to-[#FF7A00] px-7 py-8 text-white shadow-[0_24px_50px_rgba(243,106,0,0.25)]">
            <p className="text-[12px] font-black uppercase tracking-[0.24em] text-white/75">Pending Deposit Volume</p>
            <h2 className="mt-4 text-[42px] font-black tracking-tight">{formatUsd(pendingAmount)}</h2>
            <p className="mt-3 text-[15px] font-medium text-white/85">
              Requests created by support are waiting here for admin confirmation.
            </p>
          </div>

          <div className="rounded-[30px] bg-white p-7 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#8EA0BC]">Waiting Review</p>
            <h3 className="mt-4 text-[42px] font-black tracking-tight text-gray-900">{pendingRequests.length}</h3>
            <p className="mt-2 text-[14px] font-medium text-[#64748B]">Pending deposit orders in queue.</p>
          </div>

          <div className="rounded-[30px] bg-white p-7 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#8EA0BC]">Confirmed</p>
            <h3 className="mt-4 text-[42px] font-black tracking-tight text-gray-900">{confirmedRequests.length}</h3>
            <p className="mt-2 text-[14px] font-medium text-[#64748B]">Wallet credits released to users.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-[34px] font-black tracking-tight text-gray-900">Deposit Approval Queue</h1>
              <p className="mt-2 text-[15px] font-medium text-[#8EA0BC]">
                Admin confirmation will credit the user wallet and keep the deposit history for the user role.
              </p>
            </div>
            <span className="inline-flex min-h-[38px] items-center rounded-full bg-[#FFF1E7] px-4 text-[11px] font-black uppercase tracking-[0.16em] text-primary">
              {pendingRequests.length} Pending
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#FBFCFE]">
                <tr className="text-left text-[12px] font-black uppercase tracking-[0.16em] text-[#8EA0BC]">
                  <th className="px-7 py-5">User</th>
                  <th className="px-7 py-5">Email</th>
                  <th className="px-7 py-5">Amount</th>
                  <th className="px-7 py-5">Method</th>
                  <th className="px-7 py-5">Current Wallet</th>
                  <th className="px-7 py-5">Status</th>
                  <th className="px-7 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => {
                    const currentWallet = getWalletBalance(request.userEmail);

                    return (
                      <tr key={request.id} className="border-t border-gray-100">
                        <td className="px-7 py-6 align-top">
                          <p className="text-[16px] font-black text-gray-900">{request.userName}</p>
                          <p className="mt-1 text-[12px] font-medium text-[#9AA7BD]">{request.id}</p>
                        </td>
                        <td className="px-7 py-6 align-top text-[14px] font-medium text-[#52637A]">
                          {request.userEmail}
                        </td>
                        <td className="px-7 py-6 align-top text-[16px] font-black text-primary">
                          {formatUsd(request.amount)}
                        </td>
                        <td className="px-7 py-6 align-top text-[14px] font-semibold text-[#52637A]">
                          {request.method}
                          {request.note ? (
                            <p className="mt-2 max-w-[220px] text-[12px] font-medium leading-6 text-[#94A3B8]">
                              {request.note}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-7 py-6 align-top text-[15px] font-black text-gray-900">
                          {formatUsd(currentWallet)}
                        </td>
                        <td className="px-7 py-6 align-top">
                          <span
                            className={`inline-flex min-h-[34px] items-center rounded-full px-4 text-[11px] font-black uppercase tracking-[0.14em] ${
                              request.status === 'Pending'
                                ? 'bg-[#FFF4DA] text-[#D97706]'
                                : 'bg-[#ECFDF3] text-[#16A34A]'
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-7 py-6 align-top text-right">
                          <button
                            type="button"
                            onClick={() => {
                              confirmDepositRequest(request.id);
                              setRequests(loadDepositRequests());
                            }}
                            disabled={request.status === 'Confirmed'}
                            className="inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#16A34A] px-5 text-[13px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#15803D] disabled:cursor-not-allowed disabled:bg-[#D7DFEA] disabled:text-[#64748B]"
                          >
                            {request.status === 'Pending' ? 'Confirm Deposit' : 'Credited'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-7 py-16 text-center">
                      <p className="text-[18px] font-bold text-gray-900">No deposit requests yet</p>
                      <p className="mt-2 text-[14px] font-medium text-[#94A3B8]">
                        Support-created deposit orders will appear here for admin review.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminScaffold>
  );
}
