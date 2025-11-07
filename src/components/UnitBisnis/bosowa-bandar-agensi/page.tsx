"use client";
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

const BosowaBandarAgensi = () => {
  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-[120px] md:pt-[140px]">
      <div className="container">
        <SectionTitle
          title="PT Bosowa Bandar Agensi"
          paragraph="PT Bosowa Bandar Agensi adalah unit bisnis yang bergerak di bidang keagenan kapal..."
          mb="40px"
        />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <p className="text-body-color mb-6 text-lg leading-relaxed">
              Sebagai bagian dari Bosowa Group, Bosowa Bandar Agensi berperan
              dalam memfasilitasi operasional kapal domestik maupun
              internasional yang berlabuh di wilayah kerja Bosowa. Kami
              memastikan pelayanan keagenan berjalan cepat, aman, dan sesuai
              regulasi.
            </p>
            <ul className="text-body-color space-y-3 text-lg">
              <li>• Pelayanan keagenan kapal komersial dan industri.</li>
              <li>• Pengurusan dokumen kapal & kru secara profesional.</li>
              <li>• Koordinasi dengan otoritas pelabuhan dan pihak terkait.</li>
              <li>• Layanan 24 jam untuk kebutuhan operasional kapal.</li>
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
            Visi & Misi
          </h3>
          <p className="text-body-color mb-3 text-lg leading-relaxed">
            <strong>Visi:</strong> Menjadi mitra keagenan kapal terpercaya dan
            unggul di kawasan Indonesia Timur.
          </p>
          <p className="text-body-color text-lg leading-relaxed">
            <strong>Misi:</strong> Memberikan layanan keagenan profesional yang
            mendukung efisiensi pelayaran, kepatuhan hukum, dan kepuasan
            pelanggan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarAgensi;
