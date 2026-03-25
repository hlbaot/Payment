import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { I18nProvider } from "@/components/I18nProvider";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <I18nProvider>
      <Navbar />
      <main style={{ marginTop: 'var(--header-height)' }}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </I18nProvider>
  );
}
