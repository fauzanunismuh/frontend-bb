import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getBeritaPublic } from "@/lib/api";
import Hero from "@/components/Hero";
import ScrollUp from "@/components/Common/ScrollUp";

// Lazy load heavy components below the fold
const UnitBisnis = dynamic(() => import("@/components/UnitBisnis"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Video = dynamic(() => import("@/components/Video"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const FunFact = dynamic(() => import("@/components/FunFact"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Mitra = dynamic(() => import("@/components/Mitra"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const BeritaSekilas = dynamic(() => import("@/components/BeritaSekilas"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});

export const metadata: Metadata = {
  title: "Bosowa Bandar Group",
  description: "",
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
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <UnitBisnis />
      </Suspense>
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Video />
      </Suspense>
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <FunFact />
      </Suspense>
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Mitra />
      </Suspense>
      {/* <AboutSectionOne /> */}
      {/* <AboutSectionTwo /> */}
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <BeritaSekilas items={publikasi ?? undefined} />
      </Suspense>
      {/* <Contact /> */}
    </>
  );
}
