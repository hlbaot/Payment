'use client';

import InfoPage from '@/components/InfoPage';
import { useI18n } from '@/components/I18nProvider';

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <InfoPage
      eyebrow={t('resources.contact.eyebrow')}
      title={t('resources.contact.title')}
      description={t('resources.contact.desc')}
      highlights={[
        t('resources.contact.h1'),
        t('resources.contact.h2'),
        t('resources.contact.h3'),
      ]}
      primaryAction={{ href: '/support', label: t('resources.contact.primary') }}
      secondaryAction={{ href: '/counter-market', label: t('resources.contact.secondary') }}
    />
  );
}
