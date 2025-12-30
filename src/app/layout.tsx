import "@fortawesome/fontawesome-free/css/all.min.css";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Providers } from "./providers";
import { LayoutContent } from "./layout-content";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body suppressHydrationWarning className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
