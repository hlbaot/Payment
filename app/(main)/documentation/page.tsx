'use client';

import InfoPage from '@/components/InfoPage';
import { useI18n } from '@/components/I18nProvider';

export default function DocumentationPage() {
  const { t } = useI18n();

  return (
    <InfoPage
      eyebrow={t('resources.docs.eyebrow')}
      title={t('resources.docs.title')}
      description={t('resources.docs.desc')}
      highlights={[
        t('resources.docs.h1'),
        t('resources.docs.h2'),
        t('resources.docs.h3'),
      ]}
      primaryAction={{ href: '/counter-market', label: t('resources.docs.primary') }}
      secondaryAction={{ href: '/orders', label: t('resources.docs.secondary') }}
    />
  );
}
