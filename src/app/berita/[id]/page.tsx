import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client";

export const dynamic = "force-dynamic";

const BeritaDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  try {
    const { id } = await params; // ✅ harus di-await
    const berita = await getBeritaDetail(id);
    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
