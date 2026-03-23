import InfoPage from '@/components/InfoPage';

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="Contact"
      description="Reach the SwiftGuard Kinetic team for product walkthroughs, onboarding help, and transaction support."
      highlights={[
        'Use support for active orders, payment issues, or urgent flow blockers.',
        'Use this contact route as the destination for demo and sales conversations.',
        'Move back into the product once you have the guidance you need.',
      ]}
      primaryAction={{ href: '/support', label: 'Open Support Resources' }}
      secondaryAction={{ href: '/counter-market', label: 'Browse Counters' }}
    />
  );
}
