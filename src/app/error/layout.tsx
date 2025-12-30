import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Error",
  description: "Terjadi kesalahan.",
};

export default function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
