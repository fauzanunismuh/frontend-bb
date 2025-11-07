"use client";
import SectionTitle from "@/components/Common/SectionTitle";

const JasaPelabuhanIndonesia = () => {
  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-20 md:pt-28 lg:pt-32">
      <div className="container">
        <SectionTitle
          title="PT Jasa Pelabuhan Indonesia"
          paragraph="PT Jasa Pelabuhan Indonesia merupakan entitas bisnis yang fokus pada pengelolaan operasional pelabuhan dan penyediaan layanan teknis pendukung kegiatan bongkar muat, terminal, dan operasional maritim."
          mb="40px"
        />

        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <p className="text-body-color mb-6 text-lg leading-relaxed">
              Dengan pengalaman dan sumber daya profesional, Jasa Pelabuhan
              Indonesia mendukung kelancaran kegiatan ekspor-impor, penyimpanan
              barang, hingga pengelolaan infrastruktur pelabuhan yang efisien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JasaPelabuhanIndonesia;
