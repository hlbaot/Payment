import InfoPage from '@/components/InfoPage';

export default function SupportPage() {
  return (
    <InfoPage
      eyebrow="Support"
      title="Support Center"
      description="Use support resources to recover from payment issues, review order status, and get back to the right workflow quickly."
      highlights={[
        'Check current orders when support requests are tied to a specific transaction.',
        'Return to wallet or counter screens depending on whether the issue is balance or order setup.',
        'Use chat and in-app flows as the fastest path once you know where to continue.',
      ]}
      primaryAction={{ href: '/orders', label: 'Open Orders' }}
      secondaryAction={{ href: '/wallet', label: 'Open Wallet' }}
    />
  );
}
