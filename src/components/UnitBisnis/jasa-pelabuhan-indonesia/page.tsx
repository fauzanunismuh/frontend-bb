"use client";
import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";

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
            <ul className="text-body-color space-y-3 text-lg">
              <li>• Manajemen terminal dan operasional pelabuhan.</li>
              <li>• Perawatan fasilitas dermaga dan alat bongkar muat.</li>
              <li>• Pengelolaan logistik laut secara terpadu.</li>
              <li>• Layanan teknis dan keselamatan pelabuhan.</li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[150/60] max-w-[500px]">
              <Image
                src="/images/about/jasa-pelabuhan.jpg"
                alt="Jasa Pelabuhan Indonesia"
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
              Menjadi perusahaan jasa pelabuhan profesional dan terdepan di
              Indonesia Timur.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold text-[#1E468C] dark:text-white">
              Misi
            </h3>
            <ul className="text-body-color space-y-3 text-lg">
              <li>• Memberikan layanan pelabuhan dengan standar tinggi.</li>
              <li>• Mengoptimalkan operasional melalui teknologi digital.</li>
              <li>• Mengembangkan SDM unggul dan berdaya saing global.</li>
              <li>• Mendorong efisiensi rantai logistik nasional.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JasaPelabuhanIndonesia;
