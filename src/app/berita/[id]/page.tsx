import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client"; // Impor komponen klien

type BeritaDetailParams = {
  id: string;
};

type BeritaDetailProps = {
  params: BeritaDetailParams | Promise<BeritaDetailParams>;
};

export const dynamic = "force-dynamic";

const BeritaDetail = async ({ params }: BeritaDetailProps) => {
  try {
    const { id } = await params;
    const berita = await getBeritaDetail(id);

    // Teruskan data ke komponen klien
    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
