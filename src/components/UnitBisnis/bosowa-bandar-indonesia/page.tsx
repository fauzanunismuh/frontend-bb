"use client";
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

const BosowaBandarIndonesia = () => {
  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-20 md:pt-28 lg:pt-32">
      <div className="container">
        <SectionTitle
          title="PT Bosowa Bandar Indonesia"
          paragraph="PT Bosowa Bandar Indonesia (BBI) merupakan bagian dari Bosowa Group yang bergerak di bidang pengelolaan pelabuhan, bongkar muat, dan layanan logistik terpadu."
          mb="40px"
        />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <p className="text-body-color mb-6 text-lg leading-relaxed">
              Bosowa Bandar Indonesia hadir untuk meningkatkan efisiensi
              operasional pelabuhan melalui sistem manajemen modern dan
              infrastruktur pendukung yang lengkap. Kami berkomitmen
              menghadirkan solusi logistik berkelanjutan untuk industri maritim
              nasional.
            </p>
            <ul className="text-body-color space-y-3 text-lg">
              <li>• Layanan bongkar muat dan penyimpanan barang.</li>
              <li>• Fasilitas pelabuhan modern dengan manajemen digital.</li>
              <li>• SDM kompeten dan bersertifikat pelabuhan.</li>
              <li>• Komitmen terhadap keselamatan dan kecepatan layanan.</li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[150/60] max-w-[500px]">
              <Image
                src="/images/about/bosowa-bandar-dark.png"
                alt="Bosowa Bandar Indonesia"
                fill
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-2xl font-bold text-[#1E468C] dark:text-white">
              Visi
            </h3>
            <p className="text-body-color text-lg leading-relaxed">
              Menjadi penyedia layanan pelabuhan dan logistik terbaik yang
              mendukung pertumbuhan ekonomi nasional.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold text-[#1E468C] dark:text-white">
              Misi
            </h3>
            <ul className="text-body-color space-y-3 text-lg">
              <li>• Menyediakan layanan profesional dan terintegrasi.</li>
              <li>• Mengedepankan digitalisasi operasional pelabuhan.</li>
              <li>• Meningkatkan daya saing logistik nasional.</li>
              <li>• Menjaga keberlanjutan dan tanggung jawab sosial.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarIndonesia;
