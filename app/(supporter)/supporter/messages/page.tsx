'use client';

import { useMemo, useState } from 'react';
import SupporterScaffold from '@/components/supporter/SupporterScaffold';

type ConversationFilter = 'all' | 'unread' | 'resolved';

type SupportMessage = {
  id: string;
  sender: 'user' | 'supporter';
  text: string;
  time: string;
};

type SupportConversation = {
  id: string;
  userName: string;
  userCode: string;
  avatarSeed: string;
  preview: string;
  time: string;
  status: 'Open' | 'Unread' | 'Resolved';
  tier: 'Premium' | 'Platinum' | 'Standard';
  online: boolean;
  recentOrders: Array<{
    label: string;
    orderId: string;
    amount: string;
  }>;
  recentDeposits: Array<{
    label: string;
    amount: string;
    status: string;
  }>;
  notes: string[];
  messages: SupportMessage[];
};

const initialConversations: SupportConversation[] = [
  {
    id: 'conv-1',
    userName: 'John Doe',
    userCode: 'ID: 8829-XJ2',
    avatarSeed: 'john-doe',
    preview: 'Deposit ID #D-99231 has been pending for over 24 hours.',
    time: '14:22',
    status: 'Unread',
    tier: 'Premium',
    online: true,
    recentOrders: [
      { label: 'Apple Store Purchase', orderId: '#ORD-0922', amount: '$1,499.00' },
      { label: 'Cloud Hosting Monthly', orderId: '#ORD-0811', amount: '$89.00' },
    ],
    recentDeposits: [
      { label: 'Wire Transfer', amount: '$5,000.00', status: 'Pending' },
    ],
    notes: ['Priority customer. Requested same-day follow-up before 9 PM.'],
    messages: [
      {
        id: 'm-1',
        sender: 'user',
        text: 'Hello, I’m checking on the status of my deposit ID #D-99231. It has been pending for over 24 hours now. Is there an issue?',
        time: '14:18',
      },
      {
        id: 'm-2',
        sender: 'supporter',
        text: 'Hi John! I’m looking into this for you right now. Just a moment while I pull up your account details and transaction history.',
        time: '14:20',
      },
      {
        id: 'm-3',
        sender: 'user',
        text: 'Thank you for the quick update. I’m traveling and need those funds cleared by tonight if possible.',
        time: '14:22',
      },
    ],
  },
  {
    id: 'conv-2',
    userName: 'Elena Rodriguez',
    userCode: 'ID: 5512-ZB8',
    avatarSeed: 'elena-rodriguez',
    preview: 'I need help with my credit card authorization.',
    time: '09:15',
    status: 'Open',
    tier: 'Standard',
    online: false,
    recentOrders: [
      { label: 'Card Purchase', orderId: '#ORD-0671', amount: '$320.00' },
    ],
    recentDeposits: [],
    notes: ['Identity refresh was requested before retrying the card deposit.'],
    messages: [
      {
        id: 'm-4',
        sender: 'user',
        text: 'I need help with my credit card authorization. The deposit keeps failing at the last step.',
        time: '09:02',
      },
      {
        id: 'm-5',
        sender: 'supporter',
        text: 'I can help with that. Please give me a second to confirm whether your authorization lock has been cleared.',
        time: '09:15',
      },
    ],
  },
  {
    id: 'conv-3',
    userName: 'Marcus Sterling',
    userCode: 'ID: 7710-LQ1',
    avatarSeed: 'marcus-sterling',
    preview: 'The wire transfer was successful. Close the ticket please.',
    time: 'Yesterday',
    status: 'Resolved',
    tier: 'Platinum',
    online: false,
    recentOrders: [
      { label: 'Treasury Transfer', orderId: '#ORD-0991', amount: '$12,400.00' },
    ],
    recentDeposits: [
      { label: 'Wire Transfer', amount: '$12,400.00', status: 'Completed' },
    ],
    notes: ['Resolved after wire confirmation from operations.'],
    messages: [
      {
        id: 'm-6',
        sender: 'user',
        text: 'The wire transfer was successful. You can close the ticket now.',
        time: 'Yesterday',
      },
    ],
  },
];

export default function SupporterMessagesPage() {
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [conversationSearch, setConversationSearch] = useState('');
  const [filter, setFilter] = useState<ConversationFilter>('all');
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);
  const [reply, setReply] = useState('');
  const [noteDraft, setNoteDraft] = useState('');

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
    initialConversations[0];

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

  const tierTone =
    selectedConversation.tier === 'Platinum'
      ? 'bg-[#0F6CBD] text-white'
      : selectedConversation.tier === 'Premium'
        ? 'bg-[#FFF1E7] text-primary'
        : 'bg-[#EEF2FF] text-[#4F46E5]';

  return (
    <SupporterScaffold
      searchValue={knowledgeSearch}
      onSearchChange={setKnowledgeSearch}
    >
      <div className="grid min-h-[calc(100vh-81px)] grid-cols-1 xl:grid-cols-[320px_minmax(420px,1fr)_290px]">
        <aside className="border-b border-r border-gray-200 bg-white xl:border-b-0">
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
                placeholder="Search conversations..."
                className="h-[48px] w-full rounded-2xl border border-[#E8EDF4] bg-[#F8FAFD] pl-12 pr-4 text-[14px] font-medium text-gray-800 outline-none transition-colors focus:border-primary"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ['all', 'All'],
                ['unread', 'Unread'],
                ['resolved', 'Resolved'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value as ConversationFilter)}
                  className={`inline-flex min-h-[34px] items-center rounded-full px-4 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${
                    filter === value
                      ? 'bg-[#B45309] text-white'
                      : 'bg-[#F3F5F8] text-[#64748B] hover:bg-[#EDEFF4]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[calc(100vh-240px)] overflow-y-auto p-3">
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
                        <div>
                          <p className="text-[18px] font-bold tracking-tight text-gray-900">
                            {conversation.userName}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[14px] font-medium leading-6 text-[#64748B]">
                            {conversation.preview}
                          </p>
                        </div>
                        <span className="text-[12px] font-medium text-[#9AA7BD]">
                          {conversation.time}
                        </span>
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
                          {conversation.tier}
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

        <section className="flex min-h-[720px] flex-col border-b border-r border-gray-200 bg-white xl:border-b-0">
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
                <h1 className="text-[28px] font-black tracking-tight text-gray-900">
                  {selectedConversation.userName}
                </h1>
                <p className="mt-1 text-[12px] font-black uppercase tracking-[0.18em] text-[#22C55E]">
                  {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

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
          </div>

          <div className="flex-1 overflow-y-auto bg-[#FCFCFD] px-6 py-8">
            <div className="mx-auto mb-8 w-max rounded-xl bg-[#F3F5F8] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#94A3B8]">
              Today
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
              {selectedConversation.userName} is typing...
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
                placeholder="Type a message..."
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
            <p className="mt-2 text-center text-[13px] font-medium text-[#94A3B8]">
              {selectedConversation.userCode}
            </p>
            <div className={`mx-auto mt-5 inline-flex min-h-[34px] items-center rounded-full px-5 text-[11px] font-black uppercase tracking-[0.18em] ${tierTone}`}>
              {selectedConversation.tier} Tier
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
                  Recent Orders
                </p>
                <button type="button" className="text-[12px] font-black uppercase tracking-[0.16em] text-primary">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {selectedConversation.recentOrders.map((order) => (
                  <div key={order.orderId} className="rounded-2xl border border-gray-100 bg-[#FCFCFD] px-4 py-3">
                    <p className="text-[14px] font-bold text-gray-900">{order.label}</p>
                    <div className="mt-2 flex items-center justify-between gap-4 text-[13px] font-medium text-[#94A3B8]">
                      <span>{order.orderId}</span>
                      <span className="font-black text-gray-900">{order.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
                Recent Deposits
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
                    No recent deposit tickets.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-[#A0AEC0]">
                Support Notes
              </p>
              <textarea
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Add a private note..."
                className="min-h-[140px] w-full rounded-[22px] border border-gray-100 bg-[#F8FAFD] px-4 py-4 text-[14px] font-medium text-gray-800 outline-none placeholder:text-[#B0B8C6] focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddNote}
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl border border-[#E8EDF4] bg-white px-4 text-[13px] font-bold text-[#52637A] transition-colors hover:bg-gray-50"
              >
                Save Private Note
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
              Resolve Conversation
            </button>
          </div>
        </aside>
      </div>
    </SupporterScaffold>
  );
}
