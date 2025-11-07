"use client";
import SectionTitle from "@/components/Common/SectionTitle";

const BosowaBandarAgensi = () => {
  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-20 md:pt-28 lg:pt-32">
      <div className="container">
        <SectionTitle
          title="PT Bosowa Bandar Agensi"
          paragraph="PT Bosowa Bandar Agensi adalah unit bisnis yang bergerak di bidang keagenan kapal, memberikan layanan profesional dan efisien untuk mendukung kelancaran aktivitas pelayaran di pelabuhan Bosowa dan sekitarnya."
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarAgensi;
