import InfoPage from '@/components/InfoPage';

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms"
      description="This route gives users a real destination for platform terms while the complete legal content is being prepared."
      highlights={[
        'Transaction flows may be subject to verification and compliance review.',
        'User actions and order states should remain auditable within the workspace.',
        'For account-specific legal questions, continue through support.',
      ]}
      primaryAction={{ href: '/support', label: 'Ask Legal Support' }}
      secondaryAction={{ href: '/privacy', label: 'Review Privacy' }}
    />
  );
}
