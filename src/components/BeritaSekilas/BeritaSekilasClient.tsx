"use client";

import { useEffect, useState } from "react";
import { getBeritaPublic, PublicBerita } from "@/lib/api";
import SingleBeritaSekilas from "@/components/BeritaSekilas/SingleBeritaSekilas";
import { useLanguage } from "@/app/providers";
import Link from "next/link";

const texts = {
  id: {
    title: "Publikasi",
    description:
      "Dapatkan informasi terbaru seputar kegiatan, mitra, dan layanan Bosowa Bandar Group.",
    buttonAll: "Lihat Semua",
    empty: "Belum ada berita terbaru.",
    loading: "Memuat berita...",
  },
  en: {
    title: "Publications",
    description:
      "Get the latest information about activities, partners, and services of Bosowa Bandar Group.",
    buttonAll: "View All",
    empty: "No recent news available.",
    loading: "Loading news...",
  },
};

export default function BeritaSekilasClient() {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;
  const [items, setItems] = useState<PublicBerita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBeritaPublic({ limit: 3 })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch berita:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const cards = items.map((item) => {
    const localizedTitle =
      language === "en" ? item.judul_en ?? item.judul : item.judul;
    const localizedSummary =
      language === "en" ? item.ringkasan_en ?? item.ringkasan : item.ringkasan;
    return {
      slug: item.slug,
      title: localizedTitle ?? "",
      summary: localizedSummary ?? "",
      imageUrl: item.gambar_utama_url,
      publishedAt: item.published_at,
    };
  });

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-dark mb-3 text-3xl font-bold dark:text-white">
            {t.title}
          </h2>
          <p className="text-body-color dark:text-gray-400">{t.description}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-body-color dark:text-gray-400 text-lg">
              {t.loading}
            </div>
          </div>
        ) : cards.length > 0 ? (
          <div className="-mx-4 flex flex-wrap justify-center">
            {cards.map((card) => (
              <div key={card.slug} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <SingleBeritaSekilas data={card} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-body-color dark:text-gray-400 text-lg">
              {t.empty}
            </div>
          </div>
        )}

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
}
