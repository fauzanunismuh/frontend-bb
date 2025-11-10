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
    locationTitle: "Area Operasional",
    locations: {
      banyuwangi: {
        title: "Area Banyuwangi",
        points: [
          "Jetty Semen Bosowa Banyuwangi",
          "Jetty Misi Mulia Pertronusa",
        ],
      },
      jeneponto: {
        title: "Area Jeneponto",
        points: ["Jetty PLTU Bosowa Energi"],
      },
      makassar: {
        title: "Area Makassar",
        points: ["Jetty BDE Lantebung", "Pelabuhan Soekarno Hatta"],
      },
    },
  },
  en: {
    title: "PT Jasa Pelabuhan Indonesia",
    paragraph:
      "PT Jasa Pelabuhan Indonesia is a business entity focused on port operational management and the provision of technical support services for stevedoring, terminal, and maritime operations.",
    subParagraph:
      "With experience and professional resources, Jasa Pelabuhan Indonesia supports the smooth running of export-import activities, goods storage, and efficient port infrastructure management.",
    locationTitle: "Operational Area",
    locations: {
      banyuwangi: {
        title: "Banyuwangi Area",
        points: [
          "Jetty Semen Bosowa Banyuwangi",
          "Jetty Misi Mulia Pertronusa",
        ],
      },
      jeneponto: {
        title: "Jeneponto Area",
        points: ["Jetty PLTU Bosowa Energi"],
      },
      makassar: {
        title: "Makassar Area",
        points: ["Jetty BDE Lantebung", "Soekarno Hatta Port"],
      },
    },
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
                    {t.locations.banyuwangi.title}
                  </h4>
                  <ul className="list-disc pl-6">
                    {t.locations.banyuwangi.points.map((point) => (
                      <li key={point} className="text-body-color text-base">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Kolom 2 */}
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
                {/* Kolom 3 */}
                <div>
                  <h4 className="text-dark mb-2 text-lg font-semibold dark:text-white">
                    {t.locations.makassar.title}
                  </h4>
                  <ul className="list-disc pl-6">
                    {t.locations.makassar.points.map((point) => (
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

export default JasaPelabuhanIndonesia;
