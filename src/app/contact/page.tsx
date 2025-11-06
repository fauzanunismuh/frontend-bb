import SectionTitle from "@/components/Common/SectionTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak | Bosowa Bandar Indonesia",
  description:
    "Hubungi Bosowa Bandar Indonesia untuk informasi lebih lanjut mengenai layanan pelabuhan, kerja sama, dan kemitraan bisnis.",
};

const ContactPage = () => {
  return (
    <section className="bg-gray-light/40 dark:bg-gray-dark/40 relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* ======== Judul ======== */}
        <SectionTitle
          title="Kontak Kami"
          paragraph="Hubungi kami untuk informasi lebih lanjut mengenai layanan dan kerja sama Bosowa Bandar Indonesia. Kami siap membantu Anda dengan respons cepat dan profesional."
          center
          mb="50px"
        />

        {/* ======== Info Kontak ======== */}
        <div className="mb-12 text-center">
          <p className="text-body-color mb-2 dark:text-gray-300">
            📍 <strong>Alamat:</strong> Jl. Pelabuhan, Makassar, Sulawesi
            Selatan
          </p>
          <p className="text-body-color mb-2 dark:text-gray-300">
            ☎️ <strong>Telepon:</strong> (0411) 123456
          </p>
          <p className="text-body-color dark:text-gray-300">
            ✉️ <strong>Email:</strong> info@bosowabandar.co.id
          </p>
        </div>

        {/* ======== Google Maps ======== */}
        <div className="relative h-[450px] w-full overflow-hidden rounded-xl shadow-lg">
          <iframe
            title="Bosowa Bandar Indonesia Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15926.263927268456!2d119.4061736!3d-5.1464034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf1d4bb7f3a9cf%3A0x41a7f09cbab5d58c!2sPelabuhan%20Makassar!5e0!3m2!1sid!2sid!4v1709364174001!5m2!1sid!2sid"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
