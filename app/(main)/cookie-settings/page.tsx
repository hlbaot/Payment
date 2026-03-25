import InfoPage from '@/components/InfoPage';

export default function CookieSettingsPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Cookie Settings"
      description="This route keeps privacy controls reachable from auth screens and legal footers instead of sending users into a dead end."
      highlights={[
        'Preferences and consent surfaces should stay accessible from both auth and app flows.',
        'Users should be able to revisit privacy decisions without losing context.',
        'Account questions can continue through support if anything is unclear.',
      ]}
      primaryAction={{ href: '/privacy', label: 'Review Privacy Guidance' }}
      secondaryAction={{ href: '/support', label: 'Get Help' }}
    />
  );
}
