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
  },
  en: {
    title: "PT Bosowa Bandar Indonesia",
    paragraph:
      "PT Bosowa Bandar Indonesia (BBI) is part of Bosowa Group engaged in port management, stevedoring, and integrated logistics services.",
    subParagraph:
      "Bosowa Bandar Indonesia is here to improve port operational efficiency through a modern management system and complete supporting infrastructure. We are committed to providing sustainable logistics solutions for the national maritime industry.",
  },
};

const BosowaBandarIndonesia = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-24 md:pt-28 lg:pt-32">
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

export default BosowaBandarIndonesia;
