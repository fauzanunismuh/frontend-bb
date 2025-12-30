import { Metadata } from "next";
import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import { getBeritaPublic } from "@/lib/api";
import Hero from "@/components/Hero";
import ScrollUp from "@/components/Common/ScrollUp";

// Lazy load heavy components below the fold
const UnitBisnis = dynamicImport(() => import("@/components/UnitBisnis"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Video = dynamicImport(() => import("@/components/Video"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const FunFact = dynamicImport(() => import("@/components/FunFact"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const Mitra = dynamicImport(() => import("@/components/Mitra"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});
const BeritaSekilas = dynamicImport(() => import("@/components/BeritaSekilas"), {
  loading: () => <div className="py-20 text-center">Loading...</div>,
});

export const metadata: Metadata = {
  title: "Bosowa Bandar Group",
  description: "",
  // other metadata
};

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function Home() {
  let publikasi = null;
  try {
    const { data } = await getBeritaPublic({ limit: 3 });
    publikasi = data;
    console.log("[Homepage] Fetched publikasi:", publikasi?.length ?? 0, "items");
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
