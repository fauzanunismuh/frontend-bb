import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Info Cabang",
  description: "Daftar kantor cabang Grup Bosowa Bandar di berbagai lokasi.",
};

export default function InfoCabangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
