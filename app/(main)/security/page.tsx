import InfoPage from '@/components/InfoPage';

export default function SecurityPage() {
  return (
    <InfoPage
      eyebrow="Security"
      title="Security Center"
      description="Review the product’s security entry points and continue into the settings area to manage account-level protection."
      highlights={[
        'Use Settings to review profile, contact, and security-adjacent details.',
        'Use Support when an active order needs attention from the operations team.',
        'Keep payment-related recovery actions close to the account workspace.',
      ]}
      primaryAction={{ href: '/settings', label: 'Open Settings' }}
      secondaryAction={{ href: '/support', label: 'Contact Support' }}
    />
  );
}
