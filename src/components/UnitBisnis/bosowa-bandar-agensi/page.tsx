"use client";
import { useLanguage } from "@/app/providers"; // 1. Impor hook bahasa
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

// 2. Definisikan semua teks dalam dua bahasa
const texts = {
  id: {
    title: "PT Bosowa Bandar Agensi",
    paragraph:
      "PT Bosowa Bandar Agensi adalah unit bisnis yang bergerak di bidang keagenan kapal, memberikan layanan profesional dan efisien untuk mendukung kelancaran aktivitas pelayaran di pelabuhan Bosowa dan sekitarnya.",
    subParagraph:
      "Sebagai bagian dari Bosowa Group, Bosowa Bandar Agensi berperan dalam memfasilitasi operasional kapal domestik maupun internasional yang berlabuh di wilayah kerja Bosowa. Kami memastikan pelayanan keagenan berjalan cepat, aman, dan sesuai regulasi.",
    services: [
      "Pelayanan keagenan kapal komersial dan industri.",
      "Pengurusan dokumen kapal & kru secara profesional.",
      "Koordinasi dengan otoritas pelabuhan dan pihak terkait.",
      "Layanan 24 jam untuk kebutuhan operasional kapal.",
    ],
    visionMissionTitle: "Visi & Misi",
    visionLabel: "Visi:",
    visionText:
      "Menjadi mitra keagenan kapal terpercaya dan unggul di kawasan Indonesia Timur.",
    missionLabel: "Misi:",
    missionText:
      "Memberikan layanan keagenan profesional yang mendukung efisiensi pelayaran, kepatuhan hukum, dan kepuasan pelanggan.",
  },
  en: {
    title: "PT Bosowa Bandar Agensi",
    paragraph:
      "PT Bosowa Bandar Agensi is a business unit engaged in ship agency, providing professional and efficient services to support the smooth running of shipping activities at Bosowa port and its surroundings.",
    subParagraph:
      "As part of Bosowa Group, Bosowa Bandar Agensi plays a role in facilitating the operations of domestic and international ships docking in Bosowa's work area. We ensure agency services run quickly, safely, and in accordance with regulations.",
    services: [
      "Agency services for commercial and industrial vessels.",
      "Professional handling of ship & crew documents.",
      "Coordination with port authorities and related parties.",
      "24-hour service for ship operational needs.",
    ],
    visionMissionTitle: "Vision & Mission",
    visionLabel: "Vision:",
    visionText:
      "To become a trusted and superior ship agency partner in the Eastern Indonesia region.",
    missionLabel: "Mission:",
    missionText:
      "Providing professional agency services that support shipping efficiency, legal compliance, and customer satisfaction.",
  },
};

const BosowaBandarAgensi = () => {
  const { language } = useLanguage(); // 3. Panggil hook
  const t = language === "en" ? texts.en : texts.id; // 4. Pilih teks yang akan digunakan

  return (
    // 5. JARAK ATAS SUDAH DIPERBARUI DI SINI
    <section className="dark:bg-gray-dark bg-gray-50 pt-16 md:pt-20 lg:py-24">
      {" "}
      <div className="container">
        {/* 6. Ganti semua teks statis dengan variabel 't' */}
        <SectionTitle title={t.title} paragraph={t.paragraph} mb="40px" />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <p className="text-body-color mb-6 text-lg leading-relaxed">
              {t.subParagraph}
            </p>
            <ul className="text-body-color space-y-3 text-lg">
              {t.services.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[150/60] max-w-[500px]">
              <Image
                src="/images/about/bosowa-agensi.jpg"
                alt="Bosowa Bandar Agensi"
                fill
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-4 text-2xl font-bold text-[#1E468C] dark:text-white">
            {t.visionMissionTitle}
          </h3>
          <p className="text-body-color mb-3 text-lg leading-relaxed">
            <strong>{t.visionLabel}</strong> {t.visionText}
          </p>
          <p className="text-body-color text-lg leading-relaxed">
            <strong>{t.missionLabel}</strong> {t.missionText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarAgensi;
