'use client';

import { useState } from 'react';
import AdminScaffold from '@/components/admin/AdminScaffold';
import SharedSupportInbox from '@/components/support/SharedSupportInbox';

export default function AdminSupportPage() {
  const [search, setSearch] = useState('');

  return (
    <AdminScaffold
      searchPlaceholder="Search admin support..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <SharedSupportInbox mode="messages" />
    </AdminScaffold>
  );
}
