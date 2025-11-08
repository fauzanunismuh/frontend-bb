"use client";
import SectionTitle from "@/components/Common/SectionTitle";

const BosowaBandarIndonesia = () => {
  return (
    <section className="dark:bg-gray-dark bg-gray-50 pt-24 md:pt-28 lg:pt-32">
      {" "}
      {/* Diubah pt-20 -> pt-24 */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BosowaBandarIndonesia;
