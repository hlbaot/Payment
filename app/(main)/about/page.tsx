import InfoPage from '@/components/InfoPage';

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="About SwiftGuard Kinetic"
      description="SwiftGuard Kinetic is positioned as a high-trust payments workspace for cross-border liquidity, order orchestration, and secure settlement tracking."
      highlights={[
        'Built around transparent transaction states and clear handoffs.',
        'Combines marketplace discovery, wallet management, and order monitoring.',
        'Optimized to keep users oriented during sensitive payment journeys.',
      ]}
      primaryAction={{ href: '/', label: 'Return to Homepage' }}
      secondaryAction={{ href: '/contact', label: 'Contact Our Team' }}
    />
  );
}
