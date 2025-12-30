import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar Group - Branch Info",
  description: "List of Bosowa Bandar Group branch offices in various locations.",
};

export default function BranchInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
