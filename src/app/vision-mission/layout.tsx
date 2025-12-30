import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar Group - Vision & Mission",
  description: "Vision and mission of Bosowa Bandar Group in the Indonesian port services industry.",
};

export default function VisionMissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
