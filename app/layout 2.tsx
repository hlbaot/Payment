import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SwiftGuard Kinetic",
    template: "%s | SwiftGuard Kinetic",
  },
  description: "The architect of institutional-grade cross-border liquidity.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#FF6600',
                  muted: '#666666',
                  foreground: '#111111',
                  'section-bg': '#F9FAFB',
                }
              }
            }
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

