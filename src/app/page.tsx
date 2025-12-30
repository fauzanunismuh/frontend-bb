import { Metadata } from "next";
import { Suspense } from "react";
import dynamicImport from "next/dynamic";
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
// Use client-side fetching component to avoid server cache issues
const BeritaSekilasClient = dynamicImport(
  () => import("@/components/BeritaSekilas/BeritaSekilasClient"),
  {
    loading: () => <div className="py-20 text-center">Loading...</div>,
  }
);

export const metadata: Metadata = {
  title: "Bosowa Bandar Group",
  description: "",
  // other metadata
};

export default function Home() {
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
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <BeritaSekilasClient />
      </Suspense>
    </>
  );
}

