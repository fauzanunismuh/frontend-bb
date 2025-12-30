import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Admin Dashboard",
  description: "Panel administrasi Grup Bosowa Bandar.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
