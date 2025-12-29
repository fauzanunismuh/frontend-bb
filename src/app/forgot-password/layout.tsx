import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Lupa Password",
  description: "Reset password akun admin Grup Bosowa Bandar.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
