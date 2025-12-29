import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Tentang Kami",
  description: "Mengenal lebih dekat Grup Bosowa Bandar, sejarah, dan komitmen kami dalam industri jasa pelabuhan.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
