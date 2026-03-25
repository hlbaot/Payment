'use client';

import InfoPage from '@/components/InfoPage';
import { useI18n } from '@/components/I18nProvider';

export default function ApiAccessPage() {
  const { t } = useI18n();

  return (
    <InfoPage
      eyebrow={t('resources.api.eyebrow')}
      title={t('resources.api.title')}
      description={t('resources.api.desc')}
      highlights={[
        t('resources.api.h1'),
        t('resources.api.h2'),
        t('resources.api.h3'),
      ]}
      primaryAction={{ href: '/support', label: t('resources.api.primary') }}
      secondaryAction={{ href: '/documentation', label: t('resources.api.secondary') }}
    />
  );
}
