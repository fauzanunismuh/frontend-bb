import { getBeritaPublic } from "@/lib/api";
// Impor komponen klien yang baru (yang akan kita buat selanjutnya)
import BeritaClientPage from "./berita-client-page";

export const dynamic = "force-dynamic";

const BeritaPage = async () => {
  let newsList = [];
  try {
    const { data } = await getBeritaPublic({ limit: 9 });
    newsList = data;
  } catch (error) {
    console.error("Gagal memuat berita:", error);
    // Biarkan newsList kosong agar halaman klien dapat menanganinya
  }

  return <BeritaClientPage newsList={newsList} />;
};

export default BeritaPage;
