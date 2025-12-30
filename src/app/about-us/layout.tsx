import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar Group - About Us",
  description: "Get to know Bosowa Bandar Group, our history, and our commitment to the port services industry.",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
