import InfoPage from '@/components/InfoPage';

export default function DocumentationPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      title="Documentation"
      description="Review product flows, transaction mechanics, and platform guidance for SwiftGuard Kinetic."
      highlights={[
        'Understand the counter marketplace flow before creating a new order.',
        'Review wallet, order tracking, and payout states in one place.',
        'Use this page as the entry point before moving into live transaction screens.',
      ]}
      primaryAction={{ href: '/counter-market', label: 'Explore Counter Market' }}
      secondaryAction={{ href: '/orders', label: 'View Orders' }}
    />
  );
}
