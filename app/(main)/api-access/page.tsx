import InfoPage from '@/components/InfoPage';

export default function ApiAccessPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      title="API Access"
      description="API enablement is coordinated through the SwiftGuard operations team so your integration path stays secure and traceable."
      highlights={[
        'Prepare your integration scope before requesting production access.',
        'Use support to coordinate credentials, rate limits, and sandbox setup.',
        'Track order and payment behavior first in the product before automating it.',
      ]}
      primaryAction={{ href: '/support', label: 'Contact Integration Support' }}
      secondaryAction={{ href: '/documentation', label: 'Read Documentation' }}
    />
  );
}
