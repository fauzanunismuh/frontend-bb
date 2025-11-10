"use client";
import { useLanguage } from "@/app/providers"; // Import hook
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

const AboutPage = () => {
  const { language } = useLanguage(); // Gunakan context

  // Objek teks DILENGKAPI untuk seluruh halaman ini
  const texts = {
    id: {
      // Bagian 1
      title: "Tentang Grup Bosowa",
      paragraph:
        "Didirikan pada tahun 1973 oleh Dr. H. Aksa Mahmud, Grup Bosowa (PT Bosowa Corporindo) merupakan salah satu konglomerasi terbesar di Indonesia Timur. Berawal dari perdagangan semen, Bosowa telah berkembang menjadi grup usaha multinasional dengan lebih dari 30 anak perusahaan yang bergerak di berbagai sektor strategis, termasuk otomotif, semen, keuangan, infrastruktur, energi, dan pendidikan.",
      subParagraph1:
        "Sebagai pionir pembangunan di Kawasan Timur Indonesia, Bosowa memiliki komitmen kuat terhadap kemandirian ekonomi bangsa. Dengan semangat <strong>“Membangun dari Timur untuk Indonesia”</strong>, Bosowa terus berinovasi menghadirkan solusi dan layanan yang memberi nilai tambah bagi masyarakat serta mendukung pertumbuhan ekonomi nasional.",
      subParagraph2:
        "Di bawah payung PT Bosowa Corporindo, seluruh unit bisnis dikelola dengan prinsip profesionalisme, keberlanjutan, dan tanggung jawab sosial.",

      // Bagian 2
      bandarTitle: "Bosowa Bandar Group",
      bandarParagraph:
        "Bosowa Bandar Group adalah salah satu unit bisnis strategis di bawah Bosowa Group yang berfokus pada pengelolaan pelabuhan, jasa bongkar muat, dan logistik terpadu. Didirikan untuk mendukung kegiatan distribusi dan perdagangan nasional, Bosowa Bandar Group  menjadi penghubung penting antara sektor industri, perdagangan, dan transportasi laut.",

      // Bagian 3
      unitTitle: "Unit Bisnis di Bawah Bosowa Bandar Group",
      unitParagraph:
        "Sebagai bagian dari Grup Bosowa yang terus berkembang, Bosowa Bandar Group menaungi beberapa unit usaha pendukung yang berperan dalam memperkuat ekosistem pelabuhan dan logistik nasional.",
      unit1Title: "PT Bosowa Bandar Agensi",
      unit1Paragraph:
        "PT Bosowa Bandar Agensi bergerak di bidang keagenan kapal, menyediakan layanan profesional untuk memastikan kelancaran aktivitas pelayaran di pelabuhan Bosowa dan kawasan sekitarnya.",
      unit2Title: "PT Bosowa Bandar Indonesia",
      unit2Paragraph:
        "PT Bosowa Bandar Indonesia (BBI) adalah entitas utama yang mengelola pelabuhan, bongkar muat, dan layanan logistik terpadu dengan standar profesional dan berorientasi pada efisiensi.",
      unit3Title: "PT Jasa Pelabuhan Indonesia",
      unit3Paragraph:
        "PT Jasa Pelabuhan Indonesia fokus pada pengelolaan operasional pelabuhan serta penyediaan layanan teknis pendukung seperti bongkar muat, terminal, dan operasional maritim terpadu.",
    },
    en: {
      // Bagian 1
      title: "About Bosowa Group",
      paragraph:
        "Founded in 1973 by Dr. H. Aksa Mahmud, Bosowa Group (PT Bosowa Corporindo) is one of the largest conglomerates in Eastern Indonesia. Starting from cement trading, Bosowa has grown into a multinational business group with more than 30 subsidiaries engaged in various strategic sectors, including automotive, cement, finance, infrastructure, energy, and education.",
      subParagraph1:
        "As a development pioneer in Eastern Indonesia, Bosowa has a strong commitment to the nation's economic independence. With the spirit of <strong>“Building from the East for Indonesia”</strong>, Bosowa continues to innovate to provide solutions and services that add value to the community and support national economic growth.",
      subParagraph2:
        "Under the umbrella of PT Bosowa Corporindo, all business units are managed with the principles of professionalism, sustainability, and social responsibility.",

      // Bagian 2
      bandarTitle: "Bosowa Bandar Group",
      bandarParagraph:
        "Bosowa Bandar Group is a strategic business unit under Bosowa Group focused on port management, stevedoring services, and integrated logistics. Established to support national distribution and trade activities, Bosowa Bandar Group serves as a crucial link between industrial, trade, and maritime transport sectors.",

      // Bagian 3
      unitTitle: "Business Units Under Bosowa Bandar Group",
      unitParagraph:
        "As part of the ever-expanding Bosowa Group, Bosowa Bandar Group oversees several supporting business units that play a role in strengthening the national port and logistics ecosystem.",
      unit1Title: "PT Bosowa Bandar Agensi",
      unit1Paragraph:
        "PT Bosowa Bandar Agensi operates in the shipping agency sector, providing professional services to ensure the smooth running of shipping activities at Bosowa ports and surrounding areas.",
      unit2Title: "PT Bosowa Bandar Indonesia",
      unit2Paragraph:
        "PT Bosowa Bandar Indonesia (BBI) is the main entity that manages ports, stevedoring, and integrated logistics services with professional standards and an orientation towards efficiency.",
      unit3Title: "PT Jasa Pelabuhan Indonesia",
      unit3Paragraph:
        "PT Jasa Pelabuhan Indonesia focuses on port operational management and the provision of supporting technical services such as stevedoring, terminals, and integrated maritime operations.",
    },
  };

  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <section
      id="about"
      className="dark:bg-gray-dark mt-0 bg-gray-50 pt-15 lg:pt-32"
    >
      <div className="container">
        {/* ========== Bagian 1: Tentang Bosowa Group ========== */}
        <div className="mb-20">
          <SectionTitle title={t.title} paragraph={t.paragraph} mb="40px" />

          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <p
                className="text-body-color mb-6 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.subParagraph1 }}
              ></p>
              <p className="text-body-color text-lg leading-relaxed">
                {t.subParagraph2}
              </p>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[150/60] max-w-[500px]">
                <Image
                  src="/images/about/bosowa-group.png"
                  alt="Bosowa Group"
                  fill
                  className="mx-auto rounded-2xl object-cover shadow-lg dark:hidden"
                />
                <Image
                  src="/images/about/bosowa-group.png"
                  alt="Bosowa Group"
                  fill
                  className="mx-auto hidden rounded-2xl object-cover shadow-lg dark:block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========== Bagian 2: Bosowa Bandar Indonesia ========== */}
        <div className="mb-20">
          <SectionTitle
            title={t.bandarTitle}
            paragraph={t.bandarParagraph}
            mb="40px"
          />
        </div>

        {/* ========== Bagian 3: Unit Bisnis di bawah Bosowa Bandar Indonesia ========== */}
        <div className="mb-20">
          <SectionTitle
            title={t.unitTitle}
            paragraph={t.unitParagraph}
            mb="40px"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* === 1. Bosowa Bandar Agensi === */}
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <div className="relative mb-8 h-18 w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/about/bosowa-agensi.png"
                  alt="Bosowa Bandar Agensi"
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.unit1Title}
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                {t.unit1Paragraph}
              </p>
            </div>

            {/* === 2. Bosowa Bandar Indonesia === */}
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <div className="relative mb-0 h-35 w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/about/bosowa-bandar-dark.png"
                  alt="Bosowa Bandar Indonesia"
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.unit2Title}
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                {t.unit2Paragraph}
              </p>
            </div>

            {/* === 3. Jasa Pelabuhan Indonesia === */}
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <div className="relative mb-4 h-24 w-full overflow-hidden rounded-lg">
                <Image
                  src="/images/about/jasa-pelabuhan.png"
                  alt="Jasa Pelabuhan Indonesia"
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                {t.unit3Title}
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                {t.unit3Paragraph}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
