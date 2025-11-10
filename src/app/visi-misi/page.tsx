"use client";

import { useLanguage } from "@/app/providers"; // 1. Import hook
import SectionTitle from "@/components/Common/SectionTitle";

const VisiMisiPage = () => {
  const { language } = useLanguage(); // 2. Panggil hook

  // 3. Buat objek terjemahan
  const texts = {
    id: {
      title: "Visi & Misi",
      paragraph:
        "Sebagai bagian dari Bosowa Group, Bosowa Bandar Group berkomitmen untuk menjadi perusahaan pengelola pelabuhan dan logistik yang modern, efisien, dan berdaya saing tinggi. Visi dan misi kami menjadi dasar dalam setiap langkah pengembangan bisnis untuk mendukung pembangunan ekonomi nasional.",
      visiTitle: "Visi",
      visiParagraph:
        "Menjadi perusahaan pengelola pelabuhan yang profesional dan berstandar internasional.",
      misiTitle: "Misi",
      misiList: [
        "Bekerja dengan konsep pelayanan prima.",
        "Menjalankan operasional secara profesional dan efisien.",
        "Memaksimalkan manfaat bagi seluruh pemangku kepentingan.",
      ],
      filosofiTitle: "Filosofi PRIMA",
      prima1Title: "Profesional",
      prima1Paragraph:
        "Menjalankan tugas dengan kompetensi tinggi, integritas, dan tanggung jawab demi menjaga reputasi Bosowa sebagai mitra terpercaya di industri maritim.",
      prima2Title: "Responsif",
      prima2Paragraph:
        "Cepat dan tanggap dalam memenuhi kebutuhan pelanggan serta perubahan situasi di lingkungan pelabuhan dan industri maritim.",
      prima3Title: "Inovatif",
      prima3Paragraph:
        "Terus beradaptasi dan mengembangkan solusi baru guna meningkatkan efisiensi, layanan, dan daya saing perusahaan.",
      prima4Title: "Melayani",
      prima4Paragraph:
        "Mengutamakan kepuasan pelanggan dengan memberikan pelayanan yang ramah, cepat, dan tepat sasaran.",
      prima5Title: "Amanah & Terpercaya",
      prima5Paragraph:
        "Menjaga kepercayaan mitra dan stakeholder dengan bekerja jujur, konsisten, serta menjunjung nilai-nilai moral dan tanggung jawab sosial.",
    },
    en: {
      title: "Vision & Mission",
      paragraph:
        "As part of Bosowa Group, Bosowa Bandar Group is committed to becoming a modern, efficient, and highly competitive port management and logistics company. Our vision and mission form the basis for every step of business development to support national economic growth.",
      visiTitle: "Vision",
      visiParagraph:
        "To be a professional port management company of international standard.",
      misiTitle: "Mission",
      misiList: [
        "Work with the concept of service excellence.",
        "Operate professionally and efficiently.",
        "Maximize benefits for all stakeholders.",
      ],
      filosofiTitle: "PRIMA Philosophy",
      prima1Title: "Professional",
      prima1Paragraph:
        "Carrying out tasks with high competence, integrity, and responsibility to maintain Bosowa's reputation as a trusted partner in the maritime industry.",
      prima2Title: "Responsive",
      prima2Paragraph:
        "Quick and responsive in meeting customer needs and changing situations in the port environment and maritime industry.",
      prima3Title: "Innovative",
      prima3Paragraph:
        "Continuously adapting and developing new solutions to improve efficiency, services, and company competitiveness.",
      prima4Title: "Service-Oriented",
      prima4Paragraph:
        "Prioritizing customer satisfaction by providing friendly, fast, and targeted services.",
      prima5Title: "Trustworthy & Reliable",
      prima5Paragraph:
        "Maintaining the trust of partners and stakeholders by working honestly, consistently, and upholding moral values and social responsibility.",
    },
  };

  const t = language === "en" ? texts.en : texts.id; // Pilih bahasa

  return (
    <section
      id="visi-misi"
      className="dark:bg-gray-dark bg-gray-50 pt-10 md:pt-28 lg:pt-32"
    >
      <div className="container">
        {/* 4. Ganti semua teks hardcode dengan variabel */}
        <SectionTitle title={t.title} paragraph={t.paragraph} mb="60px" />

        {/* Visi */}
        <div className="mb-16">
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            {t.visiTitle}
          </h3>
          <p className="text-body-color text-lg leading-relaxed">
            {t.visiParagraph}
          </p>
        </div>

        {/* Misi */}
        <div>
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            {t.misiTitle}
          </h3>
          <ul className="text-body-color list-inside list-decimal space-y-4 text-lg leading-relaxed">
            <li>{t.misiList[0]}</li>
            <li>{t.misiList[1]}</li>
            <li>{t.misiList[2]}</li>
          </ul>
        </div>

        {/* Nilai Perusahaan */}
        <div className="mt-20">
          <h3 className="mb-8 text-2xl font-bold text-[#1E468C] dark:text-white">
            {t.filosofiTitle}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.prima1Title}
              </h4>
              <p className="text-body-color text-base">{t.prima1Paragraph}</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.prima2Title}
              </h4>
              <p className="text-body-color text-base">{t.prima2Paragraph}</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.prima3Title}
              </h4>
              <p className="text-body-color text-base">{t.prima3Paragraph}</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.prima4Title}
              </h4>
              <p className="text-body-color text-base">{t.prima4Paragraph}</p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.prima5Title}
              </h4>
              <p className="text-body-color text-base">{t.prima5Paragraph}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
