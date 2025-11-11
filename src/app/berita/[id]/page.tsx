import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client";

export const dynamic = "force-dynamic";

const BeritaDetail = async ({ params }: { params: { id: string } }) => {
  try {
    const berita = await getBeritaDetail(params.id);
    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
