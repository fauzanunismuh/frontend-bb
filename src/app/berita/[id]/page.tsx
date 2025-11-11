import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client";

type BeritaDetailParams = {
  id: string;
};

type BeritaDetailProps = {
  params: BeritaDetailParams;
};

export const dynamic = "force-dynamic";

const BeritaDetail = async ({ params }: BeritaDetailProps) => {
  try {
    const { id } = params; // ✅ tanpa await
    const berita = await getBeritaDetail(id);

    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
