'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DEPOSITS_UPDATED_EVENT,
  formatUsd,
  getDepositRequestsByEmail,
  getWalletBalance,
  WALLETS_UPDATED_EVENT,
  type DepositRequest,
} from '@/data/fake/runtime-store';
import { fakeUsers } from '@/data/fake/users';

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('user@kinetic.com');
  const [currentUserName, setCurrentUserName] = useState('John Doe');

  useEffect(() => {
    const fallbackUser = fakeUsers.find((user) => user.role === 'user');
    const nextEmail = sessionStorage.getItem('userEmail') ?? fallbackUser?.email ?? 'user@kinetic.com';
    const nextName = sessionStorage.getItem('userName') ?? fallbackUser?.userName ?? 'John Doe';

    const syncWalletData = () => {
      const nextBalance = getWalletBalance(nextEmail);
      setWalletBalance(nextBalance);
      sessionStorage.setItem('walletBalance', String(nextBalance));
      setDepositRequests(getDepositRequestsByEmail(nextEmail));
    };

    setCurrentUserEmail(nextEmail);
    setCurrentUserName(nextName);
    syncWalletData();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'shared-user-wallets' || event.key === 'shared-deposit-requests') {
        syncWalletData();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(WALLETS_UPDATED_EVENT, syncWalletData);
    window.addEventListener(DEPOSITS_UPDATED_EVENT, syncWalletData);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(WALLETS_UPDATED_EVENT, syncWalletData);
      window.removeEventListener(DEPOSITS_UPDATED_EVENT, syncWalletData);
    };
  }, []);

  const pendingDeposits = useMemo(
    () => depositRequests.filter((request) => request.status === 'Pending'),
    [depositRequests]
  );
  const depositHistory = useMemo(
    () => depositRequests.filter((request) => request.status === 'Confirmed'),
    [depositRequests]
  );

  const totalConfirmedAmount = depositHistory.reduce((total, request) => total + request.amount, 0);
  const totalPendingAmount = pendingDeposits.reduce((total, request) => total + request.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <main className="pt-12">
          <div className="mb-10 flex flex-col gap-3">
            <h1 className="text-[28px] font-black tracking-tight text-gray-900">Kinetic Wallet</h1>
            <p className="text-[15px] font-medium text-[#64748B]">
              {currentUserName} can track pending deposits here, and confirmed deposits are added to the wallet automatically after admin approval.
            </p>
          </div>

          <div className="mb-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="rounded-[36px] bg-primary p-10 text-white shadow-[0_25px_60px_rgba(255,102,0,0.3)]">
              <p className="text-[12px] font-black uppercase tracking-[0.22em] text-white/70">Available Balance</p>
              <h2 className="mt-4 text-[58px] font-black leading-none tracking-tight">{formatUsd(walletBalance)}</h2>
              <p className="mt-3 text-[15px] font-bold text-[#86EFAC]">Lợi nhuận mỗi ngày: 20$</p>
              <p className="mt-5 text-[13px] font-medium text-white/80">{currentUserEmail}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/12 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">Pending Deposits</p>
                  <p className="mt-3 text-[26px] font-black">{formatUsd(totalPendingAmount)}</p>
                </div>
                <div className="rounded-[24px] bg-white/12 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">Deposit History</p>
                  <p className="mt-3 text-[26px] font-black">{formatUsd(totalConfirmedAmount)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
              <h3 className="text-[20px] font-black tracking-tight text-gray-900">Pending Queue</h3>
              <p className="mt-2 text-[14px] font-medium text-[#94A3B8]">
                Support-created orders stay here until admin confirms them.
              </p>

              <div className="mt-6 space-y-3">
                {pendingDeposits.length > 0 ? (
                  pendingDeposits.map((request) => (
                    <div key={request.id} className="rounded-[24px] border border-[#F3E7DE] bg-[#FFF9F4] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[14px] font-black text-gray-900">{request.id}</p>
                          <p className="mt-1 text-[12px] font-medium text-[#94A3B8]">{request.method}</p>
                        </div>
                        <span className="text-[14px] font-black text-primary">{formatUsd(request.amount)}</span>
                      </div>
                      <p className="mt-3 text-[11px] font-black uppercase tracking-[0.16em] text-[#D97706]">
                        Waiting For Admin Confirmation
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[24px] border border-dashed border-gray-200 px-5 py-10 text-center">
                    <p className="text-[15px] font-bold text-gray-900">No pending deposits</p>
                    <p className="mt-2 text-[13px] font-medium text-[#94A3B8]">
                      Ask support to create a deposit order and it will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-[36px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
              <h3 className="text-[22px] font-black tracking-tight text-gray-900">Deposit History</h3>
              <p className="text-[14px] font-medium text-[#94A3B8]">
                Confirmed deposits are stored here after admin approval and reflected in the wallet balance above.
              </p>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-[11px] font-black uppercase tracking-[0.18em] text-[#8EA0BC]">
                    <th className="px-3 py-4">Deposit ID</th>
                    <th className="px-3 py-4">Method</th>
                    <th className="px-3 py-4">Created</th>
                    <th className="px-3 py-4">Confirmed</th>
                    <th className="px-3 py-4">Amount</th>
                    <th className="px-3 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {depositHistory.length > 0 ? (
                    depositHistory.map((request) => (
                      <tr key={request.id} className="border-t border-gray-100">
                        <td className="px-3 py-5 text-[14px] font-black text-gray-900">{request.id}</td>
                        <td className="px-3 py-5 text-[14px] font-semibold text-[#52637A]">{request.method}</td>
                        <td className="px-3 py-5 text-[13px] font-medium text-[#94A3B8]">{request.createdAt}</td>
                        <td className="px-3 py-5 text-[13px] font-medium text-[#94A3B8]">{request.confirmedAt ?? '-'}</td>
                        <td className="px-3 py-5 text-[15px] font-black text-[#16A34A]">{formatUsd(request.amount)}</td>
                        <td className="px-3 py-5">
                          <span className="inline-flex min-h-[30px] items-center rounded-full bg-[#ECFDF3] px-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#16A34A]">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-3 py-14 text-center">
                        <p className="text-[16px] font-bold text-gray-900">No confirmed deposits yet</p>
                        <p className="mt-2 text-[13px] font-medium text-[#94A3B8]">
                          Confirmed items from admin will be stored here automatically.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
