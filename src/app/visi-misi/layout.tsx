import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Visi & Misi",
  description: "Visi dan misi Grup Bosowa Bandar dalam industri jasa pelabuhan Indonesia.",
};

export default function VisiMisiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
