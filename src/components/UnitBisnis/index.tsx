"use client"; // Tambahkan ini

import { useLanguage } from "@/app/providers"; // Impor hook
import { useMemo } from "react"; // Impor hook
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { UnitBisnisData } from "./UnitBisnisData"; // Impor data baru

// Teks
const texts = {
  id: {
    title: "Unit Bisnis",
    description:
      "Melalui berbagai unit bisnis, Bosowa Bandar terus memperkuat perannya sebagai penggerak utama sektor logistik dan pelabuhan di kawasan timur Indonesia.",
  },
  en: {
    title: "Business Units",
    description:
      "Through various business units, Bosowa Bandar continues to strengthen its role as a key driver of the logistics and port sector in eastern Indonesia.",
  },
};

const UnitBisnis = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  // Pilih data berdasarkan bahasa
  const features = useMemo(
    () => UnitBisnisData[language] || UnitBisnisData.id,
    [language],
  );

  return (
    <>
      <section id="UnitBisnis" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle title={t.title} paragraph={t.description} center />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UnitBisnis;
