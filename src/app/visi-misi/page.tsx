"use client";

import SectionTitle from "@/components/Common/SectionTitle";

const VisiMisiPage = () => {
  return (
    <section
      id="visi-misi"
      className="dark:bg-gray-dark bg-gray-50 pt-20 md:pt-28 lg:pt-32"
    >
      <div className="container">
        {/* Judul Halaman */}
        <SectionTitle
          title="Visi & Misi Bosowa Bandar Indonesia"
          paragraph="Sebagai bagian dari Grup Bosowa, PT Bosowa Bandar Indonesia berkomitmen untuk menjadi perusahaan pengelola pelabuhan dan logistik yang modern, efisien, dan berdaya saing tinggi. Visi dan misi kami menjadi dasar dalam setiap langkah pengembangan bisnis untuk mendukung pembangunan ekonomi nasional."
          mb="60px"
        />

        {/* Visi */}
        <div className="mb-16">
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            Visi
          </h3>
          <p className="text-body-color text-lg leading-relaxed">
            Menjadi penyedia layanan pelabuhan dan logistik terpadu terbaik di
            Indonesia yang berkontribusi terhadap efisiensi rantai pasok dan
            pembangunan ekonomi nasional.
          </p>
        </div>

        {/* Misi */}
        <div>
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            Misi
          </h3>
          <ul className="text-body-color space-y-4 text-lg leading-relaxed">
            <li>
              • Menghadirkan layanan pelabuhan dan logistik yang profesional,
              aman, dan berstandar internasional.
            </li>
            <li>
              • Meningkatkan efisiensi operasional melalui inovasi teknologi dan
              sistem manajemen digital.
            </li>
            <li>
              • Membangun sinergi antar unit bisnis dalam ekosistem logistik
              Bosowa Group.
            </li>
            <li>
              • Mengembangkan SDM unggul yang berintegritas dan berorientasi
              pelayanan.
            </li>
            <li>
              • Berkontribusi pada keberlanjutan lingkungan dan tanggung jawab
              sosial perusahaan.
            </li>
          </ul>
        </div>

        {/* Nilai Perusahaan */}
        <div className="mt-20">
          <h3 className="mb-6 text-3xl font-bold text-[#1E468C] dark:text-white">
            Nilai-Nilai Utama
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Integritas
              </h4>
              <p className="text-body-color text-base">
                Menjunjung tinggi kejujuran, transparansi, dan profesionalisme
                dalam setiap aspek pekerjaan.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Inovasi
              </h4>
              <p className="text-body-color text-base">
                Mendorong pengembangan solusi kreatif dan adaptif dalam
                menghadapi tantangan industri maritim modern.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Kolaborasi
              </h4>
              <p className="text-body-color text-base">
                Mengutamakan kerja sama dan sinergi lintas unit bisnis untuk
                mencapai tujuan bersama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
