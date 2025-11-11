"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import BeritaSekilasData from "@/components/BeritaSekilas/BeritaSekilasData";
import SingleBeritaSekilas, {
  type BeritaCard,
} from "@/components/BeritaSekilas/SingleBeritaSekilas";
import { PublicBerita } from "@/lib/api";
import { translateText } from "@/lib/translate";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react"; // Impor hook

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
  const [autoTranslations, setAutoTranslations] = useState<
    Record<string, { title?: string; summary?: string }>
  >({});

  // Gunakan useMemo untuk fallback
  const fallbackCards = useMemo(() => getFallbackCards(language), [language]);

  useEffect(() => {
    let cancelled = false;

    async function translateMissing() {
      if (language !== "en" || !items || items.length === 0) {
        setAutoTranslations({});
        return;
      }

      const entries = await Promise.all(
        items.slice(0, 3).map(async (item) => {
          if (item.judul_en && item.ringkasan_en) {
            return [item.slug, { title: item.judul_en, summary: item.ringkasan_en }] as const;
          }

          const [title, summary] = await Promise.all([
            item.judul_en ? item.judul_en : translateText(item.judul, "en"),
            item.ringkasan_en ? item.ringkasan_en : translateText(item.ringkasan, "en"),
          ]);

          return [item.slug, { title, summary }] as const;
        }),
      );

      if (!cancelled) {
        setAutoTranslations(Object.fromEntries(entries));
      }
    }

    translateMissing();
    return () => {
      cancelled = true;
    };
  }, [items, language]);

  const cards =
    items && items.length > 0
      ? items.slice(0, 3).map((item) => {
          const auto = autoTranslations[item.slug];
          const localizedTitle =
            language === "en"
              ? item.judul_en ?? auto?.title ?? item.judul
              : item.judul;
          const localizedSummary =
            language === "en"
              ? item.ringkasan_en ?? auto?.summary ?? item.ringkasan
              : item.ringkasan;
          return {
            slug: item.slug,
            title: localizedTitle ?? "",
            summary: localizedSummary ?? "",
            imageUrl: item.gambar_utama_url,
            publishedAt: item.published_at,
          };
        })
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
