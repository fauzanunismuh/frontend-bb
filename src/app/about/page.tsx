"use client";
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

const AboutPage = () => {
  return (
    <section
      id="about"
      className="dark:bg-gray-dark mt-15 bg-gray-50 pt-20 md:pt-28 lg:pt-32"
    >
      <div className="container">
        {/* ========== Bagian 1: Tentang Bosowa Group ========== */}
        <div className="mb-20">
          <SectionTitle
            title="Tentang Grup Bosowa"
            paragraph="Didirikan pada tahun 1973 oleh Dr. H. Aksa Mahmud, Grup Bosowa (PT Bosowa Corporindo) merupakan salah satu konglomerasi terbesar di Indonesia Timur. Berawal dari perdagangan semen, Bosowa telah berkembang menjadi grup usaha multinasional dengan lebih dari 30 anak perusahaan yang bergerak di berbagai sektor strategis, termasuk otomotif, semen, keuangan, infrastruktur, energi, dan pendidikan."
            mb="40px"
          />

          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <p className="text-body-color mb-6 text-lg leading-relaxed">
                Sebagai pionir pembangunan di Kawasan Timur Indonesia, Bosowa
                memiliki komitmen kuat terhadap kemandirian ekonomi bangsa.
                Dengan semangat{" "}
                <strong>“Membangun dari Timur untuk Indonesia”</strong>, Bosowa
                terus berinovasi menghadirkan solusi dan layanan yang memberi
                nilai tambah bagi masyarakat serta mendukung pertumbuhan ekonomi
                nasional.
              </p>
              <p className="text-body-color text-lg leading-relaxed">
                Di bawah payung PT Bosowa Corporindo, seluruh unit bisnis
                dikelola dengan prinsip profesionalisme, keberlanjutan, dan
                tanggung jawab sosial.
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
            title="Bosowa Bandar Indonesia"
            paragraph="PT Bosowa Bandar Indonesia (BBI) adalah salah satu unit bisnis strategis di bawah Bosowa Group yang berfokus pada pengelolaan pelabuhan, jasa bongkar muat, dan logistik terpadu. Didirikan untuk mendukung kegiatan distribusi dan perdagangan nasional, BBI menjadi penghubung penting antara sektor industri, perdagangan, dan transportasi laut."
            mb="40px"
          />

          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <p className="text-body-color mb-6 text-lg leading-relaxed">
                Dengan infrastruktur modern dan manajemen profesional, Bosowa
                Bandar Indonesia menghadirkan solusi logistik yang efisien dan
                terintegrasi — mulai dari bongkar muat, penyimpanan, hingga
                distribusi. BBI beroperasi di bawah prinsip{" "}
                <strong>efisiensi, keandalan, dan keberlanjutan</strong>, serta
                terus mengembangkan layanan untuk memenuhi kebutuhan industri di
                berbagai wilayah Indonesia.
              </p>

              <ul className="text-body-color space-y-3 text-lg">
                <li>• Lokasi strategis di kawasan pelabuhan industri.</li>
                <li>• Fasilitas modern dengan sistem manajemen digital.</li>
                <li>• SDM berkompeten di bidang pelabuhan dan logistik.</li>
                <li>
                  • Berorientasi pada keselamatan, kecepatan, dan ketepatan
                  layanan.
                </li>
              </ul>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[150/60] max-w-[500px]">
                <Image
                  src="/images/about/bosowa-bandar-dark.png"
                  alt="Bosowa Bandar Indonesia"
                  fill
                  className="mx-auto rounded-2xl object-cover shadow-lg dark:hidden"
                />
                <Image
                  src="/images/about/bosowa-bandar-dark.png"
                  alt="Bosowa Bandar Indonesia"
                  fill
                  className="mx-auto hidden rounded-2xl object-cover shadow-lg dark:block"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========== Bagian 3: Unit Bisnis di bawah Bosowa Bandar Indonesia ========== */}
        <div className="mb-20">
          <SectionTitle
            title="Unit Bisnis di Bawah Bosowa Bandar Indonesia"
            paragraph="Sebagai bagian dari Grup Bosowa yang terus berkembang, Bosowa Bandar Indonesia menaungi beberapa unit usaha pendukung yang berperan dalam memperkuat ekosistem pelabuhan dan logistik nasional."
            mb="40px"
          />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                PT Bosowa Port Services
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                Menyediakan layanan bongkar muat kapal, penyimpanan kargo, dan
                manajemen pelabuhan dengan standar operasional tinggi untuk
                mendukung kelancaran arus barang di pelabuhan Bosowa.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                PT Bosowa Terminal Logistics
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                Fokus pada layanan logistik dan transportasi darat, termasuk
                distribusi semen, bahan bangunan, dan komoditas industri dengan
                jaringan armada yang luas.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800 dark:shadow-none">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                PT Bosowa Energy Port
              </h4>
              <p className="text-body-color text-base leading-relaxed">
                Mengelola fasilitas energi dan terminal bahan bakar pendukung
                kegiatan pelabuhan serta pasokan energi untuk kawasan industri
                Bosowa.
              </p>
            </div>
          </div>
        </div>

        {/* ========== Bagian 4: Visi & Misi ========== */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-[#1E468C] dark:text-white">
              Visi
            </h3>
            <p className="text-body-color text-lg leading-relaxed">
              Menjadi penyedia layanan pelabuhan dan logistik terpadu terbaik di
              Indonesia yang berkontribusi pada pembangunan ekonomi nasional dan
              efisiensi rantai pasok.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold text-[#1E468C] dark:text-white">
              Misi
            </h3>
            <ul className="text-body-color space-y-3 text-lg">
              <li>
                • Menghadirkan layanan pelabuhan dan logistik berstandar
                internasional.
              </li>
              <li>
                • Meningkatkan daya saing melalui digitalisasi dan inovasi
                operasional.
              </li>
              <li>
                • Membangun sinergi antar unit bisnis untuk menciptakan
                ekosistem logistik terpadu.
              </li>
              <li>
                • Berkontribusi terhadap pembangunan berkelanjutan dan tanggung
                jawab sosial.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
