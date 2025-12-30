import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Publikasi",
  description: "Berita dan publikasi terbaru dari Grup Bosowa Bandar.",
};

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
