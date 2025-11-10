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
  },
  en: {
    title: "PT Bosowa Bandar Agensi",
    paragraph:
      "PT Bosowa Bandar Agensi is a business unit engaged in ship agency, providing professional and efficient services to support the smooth running of shipping activities at Bosowa port and its surroundings.",
    subParagraph:
      "As part of Bosowa Group, Bosowa Bandar Agensi plays a role in facilitating the operations of domestic and international ships docking in Bosowa's work area. We ensure agency services run quickly, safely, and in accordance with regulations.",
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
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarAgensi;
