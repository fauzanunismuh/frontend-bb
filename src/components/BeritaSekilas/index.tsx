"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import BeritaSekilasData from "@/components/BeritaSekilas/BeritaSekilasData";
import SingleBeritaSekilas, {
  type BeritaCard,
} from "@/components/BeritaSekilas/SingleBeritaSekilas";
import { PublicBerita } from "@/lib/api";
import Link from "next/link";
import { useMemo } from "react"; // Impor useMemo

type BeritaSekilasProps = {
  items?: PublicBerita[] | null;
};

// Teks
const texts = {
  id: {
    title: "Publikasi",
    description:
      "Dapatkan informasi terbaru seputar kegiatan, mitra, dan layanan Bosowa Bandar Group.",
    buttonAll: "Lihat Semua",
  },
  en: {
    title: "Publications",
    description:
      "Get the latest information about activities, partners, and services of Bosowa Bandar Group.",
    buttonAll: "View All",
  },
};

const normalizeToCard = (item: PublicBerita): BeritaCard => ({
  slug: item.slug,
  title: item.judul,
  summary: item.ringkasan,
  imageUrl: item.gambar_utama_url,
  publishedAt: item.published_at,
});

// Fallback sekarang perlu bilingual
const getFallbackCards = (language: string): BeritaCard[] => {
  const data = language === "en" ? BeritaSekilasData.en : BeritaSekilasData.id;
  return data.slice(0, 3).map((item) => ({
    slug: item.id.toString(), // Slug dummy
    title: item.title,
    summary: item.paragraph,
    imageUrl: item.image,
  }));
};

const BeritaSekilas = ({ items }: BeritaSekilasProps) => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  // Gunakan useMemo untuk fallback
  const fallbackCards = useMemo(() => getFallbackCards(language), [language]);

  const cards =
    items && items.length > 0
      ? items.slice(0, 3).map(normalizeToCard)
      : fallbackCards;

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
      <div className="container">
        {/* Judul */}
        <div className="mb-12 text-center">
          <h2 className="text-dark mb-3 text-3xl font-bold dark:text-white">
            {t.title}{" "}
          </h2>
          <p className="text-body-color dark:text-gray-400">{t.description}</p>
        </div>

        {/* Grid 3 Berita */}
        <div className="-mx-4 flex flex-wrap justify-center">
          {cards.map((card) => (
            <div key={card.slug} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <SingleBeritaSekilas data={card} />
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua */}
        <div className="mt-10 text-center">
          <Link
            href="/berita"
            className="bg-primary hover:bg-opacity-90 rounded-lg px-6 py-3 text-sm font-medium text-white shadow transition"
          >
            {t.buttonAll}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeritaSekilas;
