"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import SectionTitle from "@/components/Common/SectionTitle";

// Teks
const texts = {
  id: {
    title: "PT Jasa Pelabuhan Indonesia",
    paragraph:
      "PT Jasa Pelabuhan Indonesia merupakan entitas bisnis yang fokus pada pengelolaan operasional pelabuhan dan penyediaan layanan teknis pendukung kegiatan bongkar muat, terminal, dan operasional maritim.",
    subParagraph:
      "Dengan pengalaman dan sumber daya profesional, Jasa Pelabuhan Indonesia mendukung kelancaran kegiatan ekspor-impor, penyimpanan barang, hingga pengelolaan infrastruktur pelabuhan yang efisien.",
  },
  en: {
    title: "PT Jasa Pelabuhan Indonesia",
    paragraph:
      "PT Jasa Pelabuhan Indonesia is a business entity focused on port operational management and the provision of technical support services for stevedoring, terminal, and maritime operations.",
    subParagraph:
      "With experience and professional resources, Jasa Pelabuhan Indonesia supports the smooth running of export-import activities, goods storage, and efficient port infrastructure management.",
  },
};

const JasaPelabuhanIndonesia = () => {
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

export default JasaPelabuhanIndonesia;
