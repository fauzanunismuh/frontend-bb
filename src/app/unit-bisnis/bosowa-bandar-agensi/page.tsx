"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import SectionTitle from "@/components/Common/SectionTitle";

// Teks
const texts = {
  id: {
    title: "PT Bosowa Bandar Agensi",
    paragraph:
      "PT Bosowa Bandar Agensi adalah unit bisnis yang bergerak di bidang keagenan kapal, memberikan layanan profesional dan efisien untuk mendukung kelancaran aktivitas pelayaran di pelabuhan Bosowa dan sekitarnya.",
    subParagraph:
      "Sebagai bagian dari Bosowa Group, Bosowa Bandar Agensi berperan dalam memfasilitasi operasional kapal domestik maupun internasional yang berlabuh di wilayah kerja Bosowa. Kami memastikan pelayanan keagenan berjalan cepat, aman, dan sesuai regulasi.",
    locationTitle: "Area Jangkauan",
    locations: {
      sulsel: {
        title: "Area Sulawesi Selatan",
        points: ["Makassar", "Jeneponto", "Barru"],
      },
      outerSulsel: {
        title: "Area Luar Sulawesi Selatan",
        points: [
          "Palu",
          "Konawe",
          "Kendari",
          "Banyuwangi",
          "Probolinggo",
          "Samarinda",
        ],
      },
    },
  },
  en: {
    title: "PT Bosowa Bandar Agensi",
    paragraph:
      "PT Bosowa Bandar Agensi is a business unit engaged in ship agency, providing professional and efficient services to support the smooth running of shipping activities at Bosowa port and its surroundings.",
    subParagraph:
      "As part of Bosowa Group, Bosowa Bandar Agensi plays a role in facilitating the operations of domestic and international ships docking in Bosowa's work area. We ensure agency services run quickly, safely, and in accordance with regulations.",
    locationTitle: "Service Area",
    locations: {
      sulsel: {
        title: "South Sulawesi Area",
        points: ["Makassar", "Jeneponto", "Barru"],
      },
      outerSulsel: {
        title: "Outer South Sulawesi Area",
        points: [
          "Palu",
          "Konawe",
          "Kendari",
          "Banyuwangi",
          "Probolinggo",
          "Samarinda",
        ],
      },
    },
  },
};

const BosowaBandarAgensi = () => {
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
                    {t.locations.sulsel.title}
                  </h4>
                  <ul className="list-disc pl-6">
                    {t.locations.sulsel.points.map((point) => (
                      <li key={point} className="text-body-color text-base">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Kolom 2 */}
                <div>
                  <h4 className="text-dark mb-2 text-lg font-semibold dark:text-white">
                    {t.locations.outerSulsel.title}
                  </h4>
                  <ul className="list-disc pl-6">
                    {t.locations.outerSulsel.points.map((point) => (
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

export default BosowaBandarAgensi;
