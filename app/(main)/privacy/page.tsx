import InfoPage from '@/components/InfoPage';

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy"
      description="This page provides a live route for privacy guidance so users are not dropped into dead links during account and payment flows."
      highlights={[
        'Account and transaction details should be handled with clear purpose and traceability.',
        'Sensitive user actions should be protected with layered account security.',
        'Support remains the path for questions tied to a specific order or profile.',
      ]}
      primaryAction={{ href: '/security', label: 'Review Security' }}
      secondaryAction={{ href: '/support', label: 'Contact Support' }}
    />
  );
}
