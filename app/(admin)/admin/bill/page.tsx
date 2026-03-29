'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';
import {
  cancelDepositRequest,
  confirmDepositRequest,
  DEPOSITS_UPDATED_EVENT,
  formatUsd,
  getWalletBalance,
  loadDepositRequests,
  type DepositRequest,
} from '@/data/fake/runtime-store';

export default function AdminBillPage() {
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

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === 'Pending'),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pendingRequests;

    return pendingRequests.filter((request) =>
      [request.userName, request.userEmail, request.id]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [pendingRequests, search]);

  const pendingAmount = pendingRequests.reduce((total, request) => total + request.amount, 0);

  return (
    <AdminScaffold
      searchPlaceholder="Tìm đơn chờ xử lý..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="mx-auto max-w-[1180px] space-y-8">
        <div className="max-w-[340px] rounded-[24px] bg-gradient-to-br from-[#D45700] via-[#F36A00] to-[#FF7A00] px-6 py-6 text-white shadow-[0_20px_40px_rgba(243,106,0,0.22)]">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/75">Tổng đơn chờ duyệt</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="text-[40px] font-black leading-none tracking-tight">{pendingRequests.length}</h2>
            <p className="text-right text-[12px] font-bold text-white/85">{formatUsd(pendingAmount)}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-[#FBFCFE]">
                <tr className="text-left text-[12px] font-black uppercase tracking-[0.16em] text-[#8EA0BC]">
                  <th className="px-7 py-5">Tên</th>
                  <th className="px-7 py-5">Email</th>
                  <th className="px-7 py-5">Ví</th>
                  <th className="px-7 py-5">Số tiền cộng</th>
                  <th className="px-7 py-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="border-t border-gray-100">
                      <td className="px-7 py-6 align-top">
                        <p className="text-[16px] font-black text-gray-900">{request.userName}</p>
                      </td>
                      <td className="px-7 py-6 align-top text-[14px] font-medium text-[#52637A]">
                        {request.userEmail}
                      </td>
                      <td className="px-7 py-6 align-top text-[15px] font-black text-gray-900">
                        {formatUsd(getWalletBalance(request.userEmail))}
                      </td>
                      <td className="px-7 py-6 align-top text-[16px] font-black text-primary">
                        {formatUsd(request.amount)}
                      </td>
                      <td className="px-7 py-6 align-top text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              cancelDepositRequest(request.id);
                              setRequests(loadDepositRequests());
                            }}
                            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl bg-[#FFF1F2] px-4 text-[12px] font-black uppercase tracking-[0.14em] text-[#E11D48] transition-colors hover:bg-[#FFE4E8]"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              confirmDepositRequest(request.id);
                              setRequests(loadDepositRequests());
                            }}
                            className="inline-flex min-h-[42px] items-center justify-center rounded-2xl bg-[#16A34A] px-4 text-[12px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#15803D]"
                          >
                            Duyệt
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-7 py-16 text-center">
                      <p className="text-[18px] font-bold text-gray-900">Không có đơn chờ xử lý</p>
                      <p className="mt-2 text-[14px] font-medium text-[#94A3B8]">
                        Các đơn nạp ví do support tạo sẽ xuất hiện tại đây khi đang chờ admin duyệt.
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
