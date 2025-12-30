"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSigninPage = pathname === "/signin";

  return (
    <>
      {/* Header selalu muncul (termasuk di halaman signin) */}
      <Header />

      {children}

      {/* Footer & ScrollToTop hanya muncul jika bukan halaman signin */}
      {!isSigninPage && <Footer />}
      {!isSigninPage && <ScrollToTop />}
    </>
  );
}
