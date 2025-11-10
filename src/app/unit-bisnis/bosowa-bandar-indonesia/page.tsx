"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import SectionTitle from "@/components/Common/SectionTitle";

// Teks
const texts = {
  id: {
    title: "PT Bosowa Bandar Indonesia",
    paragraph:
      "PT Bosowa Bandar Indonesia (BBI) merupakan bagian dari Bosowa Group yang bergerak di bidang pengelolaan pelabuhan, bongkar muat, dan layanan logistik terpadu.",
    subParagraph:
      "Bosowa Bandar Indonesia hadir untuk meningkatkan efisiensi operasional pelabuhan melalui sistem manajemen modern dan infrastruktur pendukung yang lengkap. Kami berkomitmen menghadirkan solusi logistik berkelanjutan untuk industri maritim nasional.",
    locationTitle: "Area Layanan Utama",
    locations: {
      jeneponto: {
        title: "Area Jeneponto",
        points: ["PLTU Bosowa Energi", "PLN Punagaya"],
      },
    },
  },
  en: {
    title: "PT Bosowa Bandar Indonesia",
    paragraph:
      "PT Bosowa Bandar Indonesia (BBI) is part of Bosowa Group engaged in port management, stevedoring, and integrated logistics services.",
    subParagraph:
      "Bosowa Bandar Indonesia is here to improve port operational efficiency through a modern management system and complete supporting infrastructure. We are committed to providing sustainable logistics solutions for the national maritime industry.",
    locationTitle: "Main Service Area",
    locations: {
      jeneponto: {
        title: "Jeneponto Area",
        points: ["PLTU Bosowa Energi", "PLN Punagaya"],
      },
    },
  },
};

const BosowaBandarIndonesia = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-16 md:pt-20 lg:py-24">
      {" "}
      {/* Diubah pt-20 -> pt-24 */}
      <div className="container">
        <SectionTitle title={t.title} paragraph={t.paragraph} mb="40px" />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <p className="text-body-color mb-6 text-lg leading-relaxed">
              {t.subParagraph}
            </p>
          </div>

          {/* === Area Peta Preview === */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="dark:bg-gray-dark rounded-md bg-white p-6 shadow-md">
              <h3 className="text-primary mb-4 text-xl font-bold">
                {t.locationTitle}
              </h3>
              <div className="flex flex-wrap gap-8">
                {/* Kolom 1 */}
                <div>
                  <h4 className="text-dark mb-2 text-lg font-semibold dark:text-white">
                    {t.locations.jeneponto.title}
                  </h4>
                  <ul className="list-disc pl-6">
                    {t.locations.jeneponto.points.map((point) => (
                      <li key={point} className="text-body-color text-base">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* === Akhir Area Peta === */}
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarIndonesia;
