import { getBeritaDetail } from "@/lib/api";
import { notFound } from "next/navigation";
import BeritaDetailClient from "./berita-detail-client";

export const dynamic = "force-dynamic";

// ✅ Definisi props yang benar
interface BeritaDetailProps {
  params: {
    id: string;
  };
}

// ✅ Komponen server yang benar
const BeritaDetail = async ({ params }: BeritaDetailProps) => {
  const { id } = await params; // ⬅️ ini kuncinya!

  try {
    const berita = await getBeritaDetail(id);
    return <BeritaDetailClient berita={berita} />;
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
