'use client';

import { useState } from 'react';
import SharedSupportInbox from '@/components/support/SharedSupportInbox';
import SupporterScaffold from '@/components/supporter/SupporterScaffold';

export default function SupporterMessagesPage() {
  const [knowledgeSearch, setKnowledgeSearch] = useState('');

  return (
    <SupporterScaffold
      searchValue={knowledgeSearch}
      onSearchChange={setKnowledgeSearch}
    >
      <SharedSupportInbox />
    </SupporterScaffold>
  );
}
