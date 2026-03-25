import InfoPage from '@/components/InfoPage';

export default function CommissionTablePage() {
  return (
    <InfoPage
      eyebrow="Pricing"
      title="Commission Table"
      description="Commission guidance now has a dedicated route so users can continue from navigation without landing on a placeholder link."
      highlights={[
        'Counter cards already expose sample commission percentages for comparison.',
        'Use the marketplace to evaluate counters by rate, minimum amount, and availability.',
        'Continue into create-order once the pricing path is clear.',
      ]}
      primaryAction={{ href: '/counter-market', label: 'Compare Counters' }}
      secondaryAction={{ href: '/create-order', label: 'Create Order' }}
    />
  );
}
