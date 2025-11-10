import BeritaSekilas from "@/components/BeritaSekilas";
import ScrollUp from "@/components/Common/ScrollUp";
import FunFact from "@/components/FunFact";
import Hero from "@/components/Hero";
import Mitra from "@/components/Mitra";
import UnitBisnis from "@/components/UnitBisnis";
import Video from "@/components/Video";
import { getBeritaPublic } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default async function Home() {
  let publikasi = null;
  try {
    const { data } = await getBeritaPublic({ limit: 3 });
    publikasi = data;
  } catch (error) {
    console.error("Gagal memuat publikasi terbaru:", error);
  }

  return (
    <>
      <ScrollUp />
      <Hero />
      <UnitBisnis />
      <Video />
      <FunFact />
      <Mitra />
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <BeritaSekilas items={publikasi ?? undefined} />
      {/* <Contact /> */}
    </>
  );
}
