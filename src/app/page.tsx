import BeritaSekilas from "@/components/BeritaSekilas";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Mitra from "@/components/Mitra";
import UnitBisnis from "@/components/UnitBisnis";
import Video from "@/components/Video";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bosowa Bandar",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <UnitBisnis />
      <Video />
      <Mitra />
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      {/* <BeritaSekilas /> */}
      <BeritaSekilas />
      {/* <Contact /> */}
    </>
  );
}
