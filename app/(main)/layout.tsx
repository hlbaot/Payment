 'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { I18nProvider } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const hideFooterRoutes = new Set(["/find-a-location", "/orders"]);
  const shouldHideFooter = hideFooterRoutes.has(pathname);
  const shouldUseOwnHeaderOffset = pathname === "/find-a-location";

  return (
    <I18nProvider>
      <Navbar />
      <main style={{ marginTop: shouldUseOwnHeaderOffset ? 0 : 'var(--header-height)' }}>
        {children}
      </main>
      {shouldHideFooter ? null : <Footer />}
      <ChatWidget />
    </I18nProvider>
  );
}
