'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '@/components/I18nProvider';
import {
  createDepositRequest,
  DEPOSITS_UPDATED_EVENT,
  formatUsd,
  getWalletBalance,
  loadDepositRequests,
  loadSupportConversations,
  saveSupportConversations,
  SUPPORT_UPDATED_EVENT,
  type SupportConversation,
} from '@/data/fake/runtime-store';

type ConversationFilter = 'all' | 'unread' | 'resolved';

type SharedSupportInboxProps = {
  mode?: 'messages' | 'operations' | 'full';
};

export default function SharedSupportInbox({ mode = 'full' }: SharedSupportInboxProps) {
  const { t } = useI18n();
  const [conversationSearch, setConversationSearch] = useState('');
  const [filter, setFilter] = useState<ConversationFilter>('all');
  const [conversations, setConversations] = useState<SupportConversation[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [reply, setReply] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositModalConversationId, setDepositModalConversationId] = useState<string | null>(null);
  const [pendingDepositCount, setPendingDepositCount] = useState(0);
  const [currentRole, setCurrentRole] = useState<'admin' | 'supporter' | 'user' | ''>('');

  const isSaving = useRef(false);

  useEffect(() => {
    const initialData = loadSupportConversations();
    setConversations(initialData);
    setSelectedId((current) => current || initialData[0]?.id || '');
    setCurrentRole((sessionStorage.getItem('userRole') as 'admin' | 'supporter' | 'user' | null) ?? '');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    isSaving.current = true;
    saveSupportConversations(conversations);
    // Use setTimeout to reset the flag after the current event loop,
    // so any dispatched events within this tick are ignored
    setTimeout(() => { isSaving.current = false; }, 0);
  }, [conversations]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'shared-support-conversations') {
        setConversations(loadSupportConversations());
      }
    };

    const handleSupportUpdated = () => {
      if (isSaving.current) return;
      setConversations(loadSupportConversations());
    };

    const handleDepositUpdated = () => {
      setPendingDepositCount(loadDepositRequests().filter((request) => request.status === 'Pending').length);
      setConversations(loadSupportConversations());
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(SUPPORT_UPDATED_EVENT, handleSupportUpdated);
    window.addEventListener(DEPOSITS_UPDATED_EVENT, handleDepositUpdated);
    setPendingDepositCount(loadDepositRequests().filter((request) => request.status === 'Pending').length);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(SUPPORT_UPDATED_EVENT, handleSupportUpdated);
      window.removeEventListener(DEPOSITS_UPDATED_EVENT, handleDepositUpdated);
    };
  }, []);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const matchesSearch =
        conversationSearch.trim().length === 0 ||
        conversation.userName
          .toLowerCase()
          .includes(conversationSearch.trim().toLowerCase()) ||
        conversation.preview
          .toLowerCase()
          .includes(conversationSearch.trim().toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'unread' && conversation.status === 'Unread') ||
        (filter === 'resolved' && conversation.status === 'Resolved');

      return matchesSearch && matchesFilter;
    });
  }, [conversationSearch, conversations, filter]);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedId) ??
    conversations[0];

  const handleSelectConversation = (conversationId: string) => {
    setSelectedId(conversationId);
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId && conversation.status === 'Unread'
          ? { ...conversation, status: 'Open' }
          : conversation
      )
    );
  };

  const handleSendReply = () => {
    const trimmedReply = reply.trim();
    if (!trimmedReply) return;

    const nextTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              preview: trimmedReply,
              time: nextTime,
              status: 'Open',
              messages: [
                ...conversation.messages,
                {
                  id: `${conversation.id}-${Date.now()}`,
                  sender: 'supporter',
                  text: trimmedReply,
                  time: nextTime,
                },
              ],
            }
          : conversation
      )
    );
    setReply('');
  };

  const handleAddNote = () => {
    const trimmedNote = noteDraft.trim();
    if (!trimmedNote) return;

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? {
              ...conversation,
              notes: [trimmedNote, ...conversation.notes],
            }
          : conversation
      )
    );
    setNoteDraft('');
  };

  const handleResolveConversation = () => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedId
          ? { ...conversation, status: 'Resolved' }
          : conversation
      )
    );
  };

  const handleCreateDepositRequest = () => {
    const nextAmount = Number(depositAmount.replace(/[^0-9.]/g, ''));
    const targetConversation =
      conversations.find((conversation) => conversation.id === depositModalConversationId) ?? selectedConversation;
    if (!targetConversation || !Number.isFinite(nextAmount) || nextAmount <= 0) return;

    createDepositRequest({
      conversationId: targetConversation.id,
      userName: targetConversation.userName,
      userEmail: targetConversation.userEmail,
      amount: nextAmount,
      method: 'Support Wallet Credit',
      note: '',
    });

    setConversations(loadSupportConversations());
    setPendingDepositCount(loadDepositRequests().filter((request) => request.status === 'Pending').length);
    setDepositAmount('');
    setDepositModalConversationId(null);
  };

  const activeDepositConversation =
    conversations.find((conversation) => conversation.id === depositModalConversationId) ?? null;

  if (!selectedConversation) {
    return null;
  }

  const tierTone =
    selectedConversation.tier === 'Platinum'
      ? 'bg-[#0F6CBD] text-white'
      : selectedConversation.tier === 'Premium'
        ? 'bg-[#FFF1E7] text-primary'
        : 'bg-[#EEF2FF] text-[#4F46E5]';

  const getTierLabel = (tier: SupportConversation['tier']) =>
    tier === 'Premium'
      ? t('supporter.tierPremium')
      : tier === 'Platinum'
        ? t('supporter.tierPlatinum')
        : t('supporter.tierStandard');

  const showChatPanel = mode === 'messages' || mode === 'full';
  const showOperationsPanel = mode === 'operations' || mode === 'full';
  const gridClassName =
    showChatPanel && showOperationsPanel
      ? 'xl:grid-cols-[320px_minmax(420px,1fr)_290px]'
      : 'xl:grid-cols-[320px_minmax(520px,1fr)]';

  return (
    <div className={`grid h-[100dvh] min-h-[680px] grid-cols-1 ${gridClassName}`}>
      <aside className="flex min-h-0 flex-col border-b border-r border-gray-200 bg-white xl:border-b-0">
        <div className="border-b border-gray-100 px-5 py-5">
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA7BD]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              type="text"
              value={conversationSearch}
              onChange={(event) => setConversationSearch(event.target.value)}
              placeholder={t('supporter.searchConversations')}
              className="h-[48px] w-full rounded-2xl border border-[#E8EDF4] bg-[#F8FAFD] pl-12 pr-4 text-[14px] font-medium text-gray-800 outline-none transition-colors focus:border-primary"
            />
          </label>

        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          {filteredConversations.map((conversation) => {
            const isActive = conversation.id === selectedId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => handleSelectConversation(conversation.id)}
                className={`mb-3 w-full rounded-[24px] border px-4 py-4 text-left transition-all ${
                  isActive
                    ? 'border-[#F3E7DE] bg-[#FFF8F3] shadow-sm'
                    : 'border-transparent bg-white hover:border-gray-100 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F3F5F8] text-[14px] font-black text-[#64748B]">
                    {conversation.userName
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                    {conversation.online ? (
                      <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E]"></span>
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-[18px] font-bold tracking-tight text-gray-900">
                            {conversation.userName}
                          </p>
                        </div>
                        <p className="mt-1 text-[12px] font-semibold tracking-[0.01em] text-[#94A3B8]">
                          {conversation.userEmail}
                        </p>
                        <p className="mt-2 line-clamp-2 text-[14px] font-medium leading-6 text-[#64748B]">
                          {conversation.preview}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className="text-[12px] font-medium text-[#9AA7BD]">
                          {conversation.time}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className={`inline-flex min-h-[24px] items-center rounded-full px-3 text-[10px] font-black uppercase tracking-[0.14em] ${
                          conversation.tier === 'Platinum'
                            ? 'bg-[#E7F0FF] text-[#0F6CBD]'
                            : conversation.tier === 'Premium'
                              ? 'bg-[#FFF1E7] text-primary'
                              : 'bg-[#EEF2FF] text-[#4F46E5]'
                        }`}
                      >
                        {getTierLabel(conversation.tier)}
                      </span>
                      {conversation.status === 'Unread' ? (
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {showChatPanel ? (
      <section className="flex min-h-0 flex-col border-b border-r border-gray-200 bg-white xl:border-b-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F8] text-[14px] font-black text-[#64748B]">
              {selectedConversation.userName
                .split(' ')
                .slice(0, 2)
                .map((part) => part[0])
                .join('')}
              {selectedConversation.online ? (
                <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#22C55E]"></span>
              ) : null}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[28px] font-black tracking-tight text-gray-900">
                  {selectedConversation.userName}
                </h1>
                {currentRole === 'supporter' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setDepositAmount('');
                      setDepositModalConversationId(selectedConversation.id);
                    }}
                    className="inline-flex min-h-[34px] items-center justify-center rounded-full bg-[#FFF3E8] px-4 text-[11px] font-black uppercase tracking-[0.16em] text-primary transition-colors hover:bg-[#FFE8D6]"
                  >
                    Lên đơn
                  </button>
                ) : null}
              </div>
              <p className="mt-1 text-[13px] font-semibold text-[#94A3B8]">
                {selectedConversation.userEmail}
              </p>
              <p className="mt-2 text-[12px] font-black uppercase tracking-[0.18em] text-[#22C55E]">
                {selectedConversation.online ? t('supporter.online') : t('supporter.offline')}
              </p>
            </div>
          </div>

          {currentRole !== 'supporter' ? (
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl transition-colors hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 8-6 4 6 4V8Z" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl transition-colors hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.72 19.72 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.72 19.72 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl transition-colors hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto bg-[#FCFCFD] px-6 py-8">
          <div className="mx-auto mb-8 w-max rounded-xl bg-[#F3F5F8] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
            {t('supporter.today')}
          </div>

          <div className="space-y-6">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${
                  message.sender === 'supporter' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'user' ? (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F3F5F8] text-[12px] font-black text-[#64748B]">
                    {selectedConversation.userName
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                  </div>
                ) : null}

                <div
                  className={`max-w-[75%] rounded-[24px] px-5 py-4 text-[16px] font-medium leading-8 shadow-sm ${
                    message.sender === 'supporter'
                      ? 'rounded-br-md bg-gradient-to-br from-[#D45700] via-[#F36A00] to-[#FF7A00] text-white'
                      : 'rounded-bl-md border border-gray-100 bg-[#F3F5F8] text-gray-900'
                  }`}
                >
                  {message.text}
                </div>

                {message.sender === 'supporter' ? (
                  <div className="text-[12px] font-medium text-[#9AA7BD]">
                    {message.time}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 text-[14px] font-medium text-[#B0B8C6]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D1D5DB]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D1D5DB] [animation-delay:120ms]"></span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#D1D5DB] [animation-delay:240ms]"></span>
            {selectedConversation.userName} {t('supporter.isTyping')}
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white px-4 py-4">
          <div className="flex items-center gap-3 rounded-[28px] border border-[#EEF2F6] bg-[#FBFCFD] p-3">
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#94A3B8] transition-colors hover:bg-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#94A3B8] transition-colors hover:bg-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#94A3B8] transition-colors hover:bg-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 15s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </button>
            <input
              type="text"
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSendReply();
                }
              }}
              placeholder={t('supporter.typeMessage')}
              className="h-[48px] flex-1 bg-transparent px-2 text-[15px] font-medium text-gray-800 outline-none placeholder:text-[#B0B8C6]"
            />
            <button
              type="button"
              onClick={handleSendReply}
              disabled={reply.trim().length === 0}
              className="flex h-[48px] w-[48px] items-center justify-center rounded-2xl bg-[#B45309] text-white shadow-[0_12px_24px_rgba(180,83,9,0.22)] transition-colors hover:bg-[#9A4307] disabled:cursor-not-allowed disabled:bg-[#D7DFEA] disabled:text-[#94A3B8]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      ) : null}

      {showOperationsPanel ? (
      <aside className="bg-[#FCFCFD] p-6">
        <div className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-[0_20px_50px_rgba(17,24,39,0.05)]">
          <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-[28px] bg-[#F8FAFD] text-[28px] font-black text-[#64748B]">
            {selectedConversation.userName
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0])
              .join('')}
          </div>
          <h2 className="mt-6 text-center text-[20px] font-black tracking-tight text-gray-900">
            {selectedConversation.userName}
          </h2>
          <p className="mt-2 text-center text-[13px] font-semibold text-[#94A3B8]">
            {selectedConversation.userEmail}
          </p>
          <p className="mt-1 text-center text-[13px] font-medium text-[#B0B8C6]">
            {selectedConversation.userCode}
          </p>
          {currentRole === 'admin' ? (
            <Link
              href="/admin/deposits"
              className="mt-6 inline-flex min-h-[40px] w-full items-center justify-center rounded-2xl border border-[#FAD4B8] bg-[#FFF8F2] px-4 text-[12px] font-black uppercase tracking-[0.16em] text-primary transition-colors hover:bg-[#FFF3E8]"
            >
              Open Deposit Queue
            </Link>
          ) : null}

          <div className="mt-8">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
              Create Deposit Order
            </p>
            <div className="overflow-hidden rounded-[28px] border border-[#F6D9C4] bg-gradient-to-br from-[#FFF8F2] via-white to-[#FFF4EA] shadow-[0_18px_40px_rgba(255,102,0,0.06)]">
              <div className="space-y-5 px-5 py-5">
                <div className="rounded-[22px] bg-white px-4 py-4 shadow-sm">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-primary">
                    Current Wallet Balance
                  </p>
                  <h3 className="mt-2 text-[22px] font-black tracking-tight text-gray-900">
                    {formatUsd(getWalletBalance(selectedConversation.userEmail))}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-[#7B879C]">
                    {selectedConversation.userName}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-[#A0AEC0]">
                    {selectedConversation.userEmail}
                  </p>
                </div>

                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                    Amount To Add Into Wallet
                  </span>
                  <input
                    type="text"
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                    placeholder="5000"
                    className="mt-2 h-[58px] w-full rounded-[22px] border border-[#F1D7C0] bg-white px-5 text-[26px] font-black tracking-tight text-gray-900 outline-none placeholder:text-[#C4CCD8] focus:border-primary"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleCreateDepositRequest}
                  disabled={Number(depositAmount.replace(/[^0-9.]/g, '')) <= 0}
                  className="inline-flex min-h-[50px] w-full items-center justify-center rounded-[22px] bg-[#FF7A1A] px-4 text-[13px] font-black uppercase tracking-[0.18em] text-white shadow-[0_18px_34px_rgba(255,122,26,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#FF8C38] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#FFC38F] disabled:text-white disabled:shadow-[0_12px_24px_rgba(255,122,26,0.16)]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {mode !== 'operations' ? (
            <>
              <div className="mt-8">
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
                  {t('supporter.recentDeposits')}
                </p>
                <div className="space-y-3">
                  {selectedConversation.recentDeposits.length > 0 ? (
                    selectedConversation.recentDeposits.map((deposit) => (
                      <div key={`${deposit.label}-${deposit.amount}`} className="rounded-2xl border border-gray-100 bg-[#FCFCFD] px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[14px] font-bold text-gray-900">{deposit.label}</p>
                          <span className="text-[13px] font-black text-gray-900">{deposit.amount}</span>
                        </div>
                        <p className="mt-2 text-[12px] font-black uppercase tracking-[0.16em] text-primary">
                          {deposit.status}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-center text-[13px] font-medium text-[#94A3B8]">
                      {t('supporter.noDeposits')}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
                  {t('supporter.supportNotes')}
                </p>
                <textarea
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder={t('supporter.notePlaceholder')}
                  className="min-h-[140px] w-full rounded-[22px] border border-gray-100 bg-[#F8FAFD] px-4 py-4 text-[14px] font-medium text-gray-800 outline-none placeholder:text-[#B0B8C6] focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl border border-[#E8EDF4] bg-white px-4 text-[13px] font-bold text-[#52637A] transition-colors hover:bg-gray-50"
                >
                  {t('supporter.saveNote')}
                </button>

                <div className="mt-4 space-y-3">
                  {selectedConversation.notes.map((note) => (
                    <div key={note} className="rounded-2xl bg-[#FCFCFD] px-4 py-3 text-[13px] font-medium leading-6 text-[#64748B]">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleResolveConversation}
                className="mt-8 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl border border-[#E8EDF4] bg-[#FCFCFD] px-5 text-[13px] font-black uppercase tracking-[0.18em] text-[#94A3B8] transition-colors hover:bg-gray-50"
              >
                {t('supporter.resolveConversation')}
              </button>
            </>
          ) : null}
        </div>
      </aside>
      ) : null}

      {depositModalConversationId && activeDepositConversation ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111827]/40 px-5 py-8">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label={t('common.close')}
            onClick={() => {
              setDepositModalConversationId(null);
              setDepositAmount('');
            }}
          />
          <div className="relative z-[81] w-full max-w-[420px] rounded-[28px] border border-[#F3E7DE] bg-white p-6 shadow-[0_28px_70px_rgba(17,24,39,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#94A3B8]">
                  Tạo đơn cộng ví
                </p>
                <h3 className="mt-2 text-[24px] font-black tracking-tight text-gray-900">
                  {activeDepositConversation.userName}
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-[#94A3B8]">
                  {activeDepositConversation.userEmail}
                </p>
              </div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#74839B] transition-colors hover:bg-[#F1F5F9]"
                aria-label={t('common.close')}
                onClick={() => {
                  setDepositModalConversationId(null);
                  setDepositAmount('');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mt-6 rounded-[22px] bg-[#FFF8F2] px-4 py-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-primary">
                Số dư ví hiện tại
              </p>
              <p className="mt-2 text-[26px] font-black tracking-tight text-gray-900">
                {formatUsd(getWalletBalance(activeDepositConversation.userEmail))}
              </p>
            </div>

            <label className="mt-5 block">
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
                Số tiền cộng thêm
              </span>
              <input
                type="text"
                value={depositAmount}
                onChange={(event) => setDepositAmount(event.target.value)}
                placeholder="5000"
                className="mt-2 h-[58px] w-full rounded-[22px] border border-[#F1D7C0] bg-white px-5 text-[26px] font-black tracking-tight text-gray-900 outline-none placeholder:text-[#C4CCD8] focus:border-primary"
              />
            </label>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setDepositModalConversationId(null);
                  setDepositAmount('');
                }}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[20px] bg-[#F3F4F6] px-4 text-[13px] font-bold text-[#64748B] transition-colors hover:bg-[#E5E7EB]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleCreateDepositRequest}
                disabled={Number(depositAmount.replace(/[^0-9.]/g, '')) <= 0}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[20px] bg-[#FF7A1A] px-4 text-[13px] font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_34px_rgba(255,122,26,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#FF8C38] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#FFC38F] disabled:shadow-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
