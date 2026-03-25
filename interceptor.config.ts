import type { InterceptorConfig } from '@wrkspace-co/interceptor';

const config: InterceptorConfig = {
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  llm: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKeyEnv: 'OPENAI_API_KEY',
  },
  i18n: {
    messagesPath: 'i18n/locales/{locale}.json',
  },
};

export default config;

