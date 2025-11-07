"use client";

import SectionTitle from "@/components/Common/SectionTitle";

const VisiMisiPage = () => {
  return (
    <section
      id="visi-misi"
      className="dark:bg-gray-dark mt-15 bg-gray-50 pt-20 md:pt-28 lg:pt-32"
    >
      <div className="container">
        {/* Judul Halaman */}
        <SectionTitle
          title="Visi & Misi"
          paragraph="Sebagai bagian dari Bosowa Group, Bosowa Bandar Group berkomitmen untuk menjadi perusahaan pengelola pelabuhan dan logistik yang modern, efisien, dan berdaya saing tinggi. Visi dan misi kami menjadi dasar dalam setiap langkah pengembangan bisnis untuk mendukung pembangunan ekonomi nasional."
          mb="60px"
        />

        {/* Visi */}
        <div className="mb-16">
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            Visi
          </h3>
          <p className="text-body-color text-lg leading-relaxed">
            Menjadi perusahaan pengelola pelabuhan yang profesional dan
            berstandar internasional.
          </p>
        </div>

        {/* Misi */}
        <div>
          <h3 className="mb-4 text-3xl font-bold text-[#1E468C] dark:text-white">
            Misi
          </h3>
          <ul className="text-body-color list-inside list-decimal space-y-4 text-lg leading-relaxed">
            <li>Bekerja dengan konsep pelayanan prima.</li>
            <li>Menjalankan operasional secara profesional dan efisien.</li>
            <li>Memaksimalkan manfaat bagi seluruh pemangku kepentingan.</li>
          </ul>
        </div>

        {/* Nilai Perusahaan */}
        <div className="mt-20">
          <h3 className="mb-8 text-2xl font-bold text-[#1E468C] dark:text-white">
            Filosofi PRIMA
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Profesional
              </h4>
              <p className="text-body-color text-base">
                Menjalankan tugas dengan kompetensi tinggi, integritas, dan
                tanggung jawab demi menjaga reputasi Bosowa sebagai mitra
                terpercaya di industri maritim.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Responsif
              </h4>
              <p className="text-body-color text-base">
                Cepat dan tanggap dalam memenuhi kebutuhan pelanggan serta
                perubahan situasi di lingkungan pelabuhan dan industri maritim.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Inovatif
              </h4>
              <p className="text-body-color text-base">
                Terus beradaptasi dan mengembangkan solusi baru guna
                meningkatkan efisiensi, layanan, dan daya saing perusahaan.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Melayani
              </h4>
              <p className="text-body-color text-base">
                Mengutamakan kepuasan pelanggan dengan memberikan pelayanan yang
                ramah, cepat, dan tepat sasaran.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800">
              <h4 className="mb-2 text-xl font-semibold text-[#1E468C] dark:text-white">
                Amanah & Terpercaya
              </h4>
              <p className="text-body-color text-base">
                Menjaga kepercayaan mitra dan stakeholder dengan bekerja jujur,
                konsisten, serta menjunjung nilai-nilai moral dan tanggung jawab
                sosial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
