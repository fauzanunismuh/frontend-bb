import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client"; // Impor komponen klien

type BeritaDetailProps = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

const BeritaDetail = async ({ params }: BeritaDetailProps) => {
  try {
    const berita = await getBeritaDetail(params.id);

    // Teruskan data ke komponen klien
    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
