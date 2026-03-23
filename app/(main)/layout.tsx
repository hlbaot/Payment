import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import type { ReactNode } from "react";

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
