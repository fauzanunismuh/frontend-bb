"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import Image from "next/image";
import Link from "next/link";

// Teks
const texts = {
  id: {
    readMore: "Baca Selengkapnya →",
  },
  en: {
    readMore: "Read More →",
  },
};

export type BeritaCard = {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  publishedAt?: string | null;
};

const SingleBeritaSekilas = ({ data }: { data: BeritaCard }) => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  const { title, imageUrl, summary = "", slug } = data;
  const excerpt =
    summary.length > 180 ? `${summary.slice(0, 177).trimEnd()}...` : summary;

  return (
    <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative flex h-full flex-col overflow-hidden rounded-xs bg-white duration-300">
      {/* Gambar utama */}
      <Link
        href={`/berita/${slug}`}
        className="relative block aspect-37/22 w-full"
      >
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </Link>

      {/* Konten */}
      <div className="flex flex-grow flex-col p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={`/berita/${slug}`}
            className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white"
          >
            {title}
          </Link>
        </h3>
        <p className="border-body-color/10 text-body-color mb-6 flex-grow border-b pb-6 text-base font-medium dark:border-white/10">
          {excerpt}
        </p>

        {/* Tombol baca selengkapnya */}
        <div className="flex items-center justify-between">
          <Link
            href={`/berita/${slug}`}
            className="text-primary hover:text-primary/80 text-sm font-semibold"
          >
            {t.readMore}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBeritaSekilas;
