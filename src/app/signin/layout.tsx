import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Masuk Admin",
  description: "Halaman login untuk admin Grup Bosowa Bandar.",
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
