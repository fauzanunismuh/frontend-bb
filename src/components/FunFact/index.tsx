"use client";
import { useLanguage } from "@/app/providers"; // Import hook bahasa
import SectionTitle from "../Common/SectionTitle";

// Teks dan data bilingual
const texts = {
  id: {
    title: "Terpercaya Sejak 2012",
    paragraph:
      "Kami telah memberikan pelayanan terpercaya selama 13 tahun di Indonesia",
    stats: [
      { label: "Kapal", value: "10.000+" },
      { label: "Cabang", value: "5 Branch" },
      { label: "Mitra", value: "100+" },
    ],
  },
  en: {
    title: "Trusted Since 2012",
    paragraph: "We have provided trusted services for 13 years in Indonesia",
    stats: [
      { label: "Vessels", value: "10.000+" },
      { label: "Branches", value: "5 Branch" },
      { label: "Partners", value: "100+" },
    ],
  },
};

const FunFact = () => {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container">
        {/* Judul dan Paragraf */}
        <SectionTitle
          title={t.title}
          paragraph={t.paragraph}
          center
          mb="60px"
        />

        {/* Statistik */}
        <div className="flex flex-col items-center justify-center gap-10 text-center md:flex-row md:gap-20 lg:gap-24">
          {t.stats.map((stat, index) => (
            <div key={index} className="w-full md:w-auto">
              <h3 className="dark:text-primary mb-2 text-2xl font-semibold text-[#1E468C] md:text-3xl lg:text-4xl">
                {stat.label}
              </h3>
              <p className="text-dark text-4xl font-bold md:text-5xl lg:text-6xl dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunFact;
