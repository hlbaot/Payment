'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { orders, statusStyles, type OrderStatus } from '@/data/orders';

type StatusFilter = 'All' | 'Pending' | 'Completed';
type DateFilter = 'all' | 'last-7' | 'last-30' | 'oct-2023';

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        search.trim().length === 0 ||
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.recipient.toLowerCase().includes(search.toLowerCase()) ||
        order.counter.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || order.status === statusFilter;

      const orderDate = new Date(order.dateValue);
      const matchesDate =
        dateFilter === 'all' ||
        (dateFilter === 'last-7' && orderDate >= new Date('2023-10-17')) ||
        (dateFilter === 'last-30' && orderDate >= new Date('2023-09-24')) ||
        (dateFilter === 'oct-2023' && order.dateValue.startsWith('2023-10'));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [search, statusFilter, dateFilter]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-20">
      <div className="container max-w-[1280px] mx-auto px-6 md:px-10 pt-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              Control Center
            </p>
            <h1 className="text-[34px] font-black tracking-tight text-gray-900 md:text-[40px]">
              Orders Management
            </h1>
            <p className="mt-3 max-w-2xl text-[15px] font-medium leading-relaxed text-gray-500">
              Track every institutional order, review settlement progress, and jump into detail pages from one workspace.
            </p>
          </div>

          <Link
            href="/create-order"
            className="inline-flex h-[52px] items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-[13px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(255,102,0,0.25)] transition-all hover:bg-[#E65C00]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Create Order
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col gap-4 lg:flex-row xl:max-w-[760px]">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                type="text"
                placeholder="Search by Order ID..."
                className="h-[58px] w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-5 text-[14px] font-medium text-gray-800 shadow-sm shadow-black/[0.02] placeholder:text-gray-400 focus:border-primary"
              />
            </div>

            <div className="relative min-w-[220px]">
              <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value as DateFilter)}
                className="h-[58px] w-full appearance-none rounded-2xl border border-gray-200 bg-white pl-14 pr-12 text-[14px] font-semibold text-gray-700 shadow-sm shadow-black/[0.02]"
              >
                <option value="all">Date Range</option>
                <option value="last-7">Last 7 days</option>
                <option value="last-30">Last 30 days</option>
                <option value="oct-2023">October 2023</option>
              </select>
              <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <span className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-700">
              Status:
            </span>
            <div className="inline-flex rounded-2xl bg-[#EEE7E2] p-1.5">
              {(['All', 'Pending', 'Completed'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-xl px-5 py-3 text-[13px] font-bold transition-all ${
                    statusFilter === status
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[34px] border border-gray-100 bg-white shadow-[0_24px_60px_rgba(17,24,39,0.07)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-[0.28em] text-gray-400">
                  <th className="px-6 py-7">Order ID</th>
                  <th className="px-6 py-7">Recipient / Counter</th>
                  <th className="px-6 py-7">Type</th>
                  <th className="px-6 py-7">Date</th>
                  <th className="px-6 py-7">Amount (USD)</th>
                  <th className="px-6 py-7">Status</th>
                  <th className="px-6 py-7 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="mx-auto max-w-md">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FFF1E8] text-primary">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M8 10h8" />
                            <path d="M8 14h8" />
                          </svg>
                        </div>
                        <h3 className="text-[18px] font-bold text-gray-900">No matching orders</h3>
                        <p className="mt-2 text-[14px] font-medium leading-7 text-gray-500">
                          Try another order ID, change the date range, or switch the status filter to see more results.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-6 py-7 align-middle">
                        <span className="block max-w-[110px] text-[14px] font-black leading-6 tracking-tight text-gray-900">
                          {order.orderNumber}
                        </span>
                      </td>
                      <td className="px-6 py-7 align-middle">
                        <div className="flex min-w-[210px] items-center gap-4">
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${order.accentClass}`}>
                            {order.initials}
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold leading-6 text-gray-900">
                              {order.recipient}
                            </p>
                            <p className="text-[14px] leading-6 text-gray-900">
                              {order.counter}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-7 align-middle">
                        <span className="block max-w-[130px] text-[14px] leading-6 text-gray-700">
                          {order.type}
                        </span>
                      </td>
                      <td className="px-6 py-7 align-middle">
                        <span className="block max-w-[110px] text-[14px] leading-6 text-gray-500">
                          {order.date}
                        </span>
                      </td>
                      <td className="px-6 py-7 align-middle">
                        <span className="text-[15px] font-black tracking-tight text-gray-900">
                          {order.amount}
                        </span>
                      </td>
                      <td className="px-6 py-7 align-middle">
                        <span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${statusStyles[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-7 text-right align-middle">
                        <Link
                          href={`/order-status/${order.id}`}
                          className="text-[14px] font-bold leading-5 text-primary transition-colors hover:text-[#E65C00]"
                        >
                          View
                          <br />
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <p className="text-[13px] font-medium text-gray-400">
              Showing {filteredOrders.length === 0 ? 0 : 1}-{filteredOrders.length} of 142 orders
            </p>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-300 transition-colors hover:border-gray-300 hover:text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E8E3DE] bg-white text-[14px] font-bold text-gray-900 shadow-sm">
                1
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-xl text-[14px] font-bold text-gray-700 transition-colors hover:bg-gray-50">
                2
              </button>
              <button className="flex h-11 w-11 items-center justify-center rounded-xl text-[14px] font-bold text-gray-700 transition-colors hover:bg-gray-50">
                3
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#D65000] via-[#FF6A00] to-[#FF8A2A] p-8 text-white shadow-[0_24px_50px_rgba(255,102,0,0.28)]">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                  <path d="M20 4v8h-8" />
                </svg>
              </div>
              <span className="rounded-xl bg-white/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/90">
                Real-time
              </span>
            </div>
            <p className="text-[14px] font-medium text-white/80">Pending Settlement</p>
            <p className="mt-2 text-[48px] font-black leading-none tracking-tight">
              $284,500.00
            </p>
          </div>

          <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF1E8] text-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-300">
                Total Monthly
              </span>
            </div>
            <p className="text-[14px] font-medium text-gray-500">Processed Volume</p>
            <p className="mt-2 text-[48px] font-black leading-none tracking-tight text-gray-900">
              $1.24M
            </p>
          </div>

          <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-[0_18px_40px_rgba(17,24,39,0.05)]">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF1E8] text-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m9 9 6 6" />
                  <path d="m15 9-6 6" />
                </svg>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-300">
                Security Check
              </span>
            </div>
            <p className="text-[14px] font-medium text-gray-500">Flagged Orders</p>
            <p className="mt-2 text-[48px] font-black leading-none tracking-tight text-gray-900">
              2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
