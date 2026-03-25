'use client';

import InfoPage from '@/components/InfoPage';
import { useI18n } from '@/components/I18nProvider';

export default function SupportPage() {
  const { t } = useI18n();

  return (
    <InfoPage
      eyebrow={t('resources.support.eyebrow')}
      title={t('resources.support.title')}
      description={t('resources.support.desc')}
      highlights={[
        t('resources.support.h1'),
        t('resources.support.h2'),
        t('resources.support.h3'),
      ]}
      primaryAction={{ href: '/orders', label: t('resources.support.primary') }}
      secondaryAction={{ href: '/wallet', label: t('resources.support.secondary') }}
    />
  );
}
