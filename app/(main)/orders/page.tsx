'use client';

import { useI18n } from '@/components/I18nProvider';

export default function OrdersPage() {
  const { t } = useI18n();

  return (
    <div className="track-transfer-page">
      <section className="track-transfer-card" aria-label={t('orders.title')}>
        <h1>{t('orders.title')}</h1>
        <p>{t('orders.subtitle')}</p>

        <label htmlFor="track-transfer-input" className="sr-only">
          {t('orders.pinLabel')}
        </label>
        <input
          id="track-transfer-input"
          type="text"
          placeholder={t('orders.pinPlaceholder')}
          className="track-transfer-input"
        />

        <button type="button" className="track-transfer-button" disabled>
          {t('orders.trackButton')}
        </button>

        <button type="button" className="track-transfer-help">
          {t('orders.help')}
        </button>
      </section>
    </div>
  );
}
