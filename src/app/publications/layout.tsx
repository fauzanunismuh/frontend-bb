import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar Group - Publications",
  description: "Recent news and publications from Bosowa Bandar Group.",
};

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
