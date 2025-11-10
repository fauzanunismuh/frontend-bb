"use client";

import { useLanguage } from "@/app/providers"; // 1. Impor hook
import { PublicBerita } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

// 2. Definisikan teks
const texts = {
  id: {
    title: "Semua Publikasi",
    description:
      "Temukan seluruh berita, kegiatan, dan informasi terbaru dari Bosowa Bandar Group.",
    empty: "Belum ada berita yang dipublikasikan.",
    readMore: "Baca Selengkapnya →",
  },
  en: {
    title: "All Publications",
    description:
      "Find all the latest news, activities, and information from Bosowa Bandar Group.",
    empty: "No news has been published yet.",
    readMore: "Read More →",
  },
};

type BeritaClientPageProps = {
  newsList: PublicBerita[];
};

export default function BeritaClientPage({ newsList }: BeritaClientPageProps) {
  // 3. Gunakan hook bahasa
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          {/* 4. Ganti teks statis */}
          <h2 className="text-dark mb-3 text-3xl font-bold dark:text-white">
            {t.title}
          </h2>
          <p className="text-body-color dark:text-gray-400">{t.description}</p>
        </div>

        <div className="flex flex-col gap-10">
          {newsList.length === 0 && (
            <p className="text-body-color text-center dark:text-gray-400">
              {t.empty}
            </p>
          )}

          {newsList.map((news) => (
            <div
              key={news.id}
              className="flex flex-col items-start overflow-hidden rounded-lg bg-white shadow duration-300 hover:shadow-lg md:flex-row dark:bg-gray-800"
            >
              <div className="relative h-64 w-full md:w-1/3">
                <Image
                  src={news.gambar_utama_url}
                  alt={news.judul}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex-1 p-6 md:p-8">
                <h3 className="text-dark mb-3 text-xl font-bold md:text-2xl dark:text-white">
                  <Link
                    href={`/berita/${news.slug}`}
                    className="hover:text-primary dark:hover:text-primary"
                  >
                    {news.judul}
                  </Link>
                </h3>
                <p className="text-body-color mb-4 line-clamp-3 dark:text-gray-400">
                  {news.ringkasan}
                </p>
                <Link
                  href={`/berita/${news.slug}`}
                  className="text-primary font-semibold hover:underline"
                >
                  {t.readMore} {/* 4. Ganti teks statis */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
