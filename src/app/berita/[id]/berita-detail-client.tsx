"use client";

import { useLanguage } from "@/app/providers";
import { PublicBerita } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

const texts = {
  id: {
    pageTitle: "Publikasi Bosowa Bandar Group",
    publishedOn: "Dipublikasikan pada",
    by: "Oleh",
    backLink: "← Kembali ke semua berita",
  },
  en: {
    pageTitle: "Bosowa Bandar Group Publication",
    publishedOn: "Published on",
    by: "By",
    backLink: "← Back to all news",
  },
};

type BeritaDetailClientProps = {
  berita: PublicBerita;
};

const BeritaDetailClient = ({ berita }: BeritaDetailClientProps) => {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;
  const localizedTitle =
    language === "en" ? berita.judul_en ?? berita.judul : berita.judul;
  const localizedSummary =
    language === "en"
      ? berita.ringkasan_en ?? berita.ringkasan
      : berita.ringkasan;
  const localizedContent =
    language === "en"
      ? berita.isi_konten_en ?? berita.isi_konten
      : berita.isi_konten;

  const publishedDate = berita.published_at
    ? new Date(berita.published_at).toLocaleDateString(
        language === "en" ? "en-US" : "id-ID",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : null;

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 mt-24 py-16 md:py-20 lg:py-24">
      <div className="container max-w-4xl">
        <p className="text-primary text-sm tracking-wide uppercase">
          {t.pageTitle}
        </p>
        <h1 className="text-dark mt-2 mb-3 text-3xl font-bold dark:text-white">
          {localizedTitle}
        </h1>
        {publishedDate && (
          <p className="text-body-color mb-6 text-sm dark:text-gray-400">
            {t.publishedOn} {publishedDate}
            {berita.penulis?.nama_lengkap
              ? ` • ${t.by} ${berita.penulis.nama_lengkap}`
              : ""}
          </p>
        )}

        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={berita.gambar_utama_url}
            alt={localizedTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <p className="text-body-color mb-8 text-lg dark:text-gray-200">
          {localizedSummary}
        </p>

        <article
          className="richtext-content"
          dangerouslySetInnerHTML={{ __html: localizedContent }}
        />

        <div className="mt-10">
          <Link href="/berita" className="text-primary font-semibold hover:underline">
            {t.backLink}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeritaDetailClient;
