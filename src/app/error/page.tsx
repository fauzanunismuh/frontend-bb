"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import Link from "next/link";
// Hapus Metadata karena ini sekarang Komponen Klien
// import { Metadata } from "next";

// export const metadata: Metadata = { ... };

const texts = {
  id: {
    title: "Maaf, halaman tidak dapat ditemukan",
    description:
      "Halaman yang Anda cari sepertinya telah dipindahkan, dihapus, atau tidak ada.",
    button: "Kembali ke Beranda",
  },
  en: {
    title: "Sorry, the page can’t be found",
    description:
      "The page you were looking for appears to have been moved, deleted or does not exist.",
    button: "Back to Homepage",
  },
};

const ErrorPage = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <>
      <section className="relative z-10 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[530px] text-center">
                <div className="mx-auto mb-9 text-center">
                  {/* ... SVG 404 ... */}
                  <svg
                    className="mx-auto w-full text-center"
                    height="210"
                    viewBox="0 0 474 210"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* ... (path data) ... */}
                  </svg>
                </div>
                <h3 className="mb-4 text-3xl font-bold text-black sm:text-4xl dark:text-white">
                  {t.title}
                </h3>
                <p className="text-body-color mb-10 text-base leading-relaxed font-medium sm:text-lg sm:leading-relaxed">
                  {t.description}
                </p>
                <Link
                  href="/"
                  className="bg-primary shadow-signUp hover:text-primary rounded-md px-8 py-3 text-base font-bold text-white duration-300 hover:bg-white md:px-9 lg:px-8 xl:px-9"
                >
                  {t.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ... (elemen SVG dekoratif) ... */}
      </section>
    </>
  );
};

export default ErrorPage;
