import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grup Bosowa Bandar - Unit Bisnis",
  description: "Unit bisnis dan anak perusahaan Grup Bosowa Bandar dalam industri jasa pelabuhan.",
};

export default function UnitBisnisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
