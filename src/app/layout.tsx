"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSigninPage = pathname === "/signin";

  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body suppressHydrationWarning className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {/* Header selalu muncul (termasuk di halaman signin) */}
          <Header />

          {children}

          {/* Footer & ScrollToTop hanya muncul jika bukan halaman signin */}
          {!isSigninPage && <Footer />}
          {!isSigninPage && <ScrollToTop />}
        </Providers>
      </body>
    </html>
  );
}
