"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import Link from "next/link";

const texts = {
  id: {
    home: "Beranda",
  },
  en: {
    home: "Home",
  },
};

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black sm:text-3xl dark:text-white">
                  {pageName}
                </h1>
                <p className="text-body-color text-base leading-relaxed font-medium">
                  {description}
                </p>
              </div>
            </div>
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-end">
                <ul className="flex items-center md:justify-end">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="text-body-color hover:text-primary pr-1 text-base font-medium"
                    >
                      {t.home}
                    </Link>
                    <span className="border-body-color mr-3 block h-2 w-2 rotate-45 border-t-2 border-r-2"></span>
                  </li>
                  <li className="text-primary text-base font-medium">
                    {pageName}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ... (elemen SVG dekoratif) ... */}
      </section>
    </>
  );
};

export default Breadcrumb;
