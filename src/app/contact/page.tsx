import SectionTitle from "@/components/Common/SectionTitle";
import { getKontakInfo } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak | Bosowa Bandar Indonesia",
  description:
    "Hubungi Bosowa Bandar Indonesia untuk informasi lebih lanjut mengenai layanan pelabuhan, kerja sama, dan kemitraan bisnis.",
};

const ContactPage = async () => {
  const kontak = await getKontakInfo();

  return (
    <section className="bg-gray-light/40 dark:bg-gray-dark/40 relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Kontak Kami"
          paragraph="Hubungi kami untuk informasi lebih lanjut mengenai layanan dan kerja sama Bosowa Bandar Indonesia. Kami siap membantu Anda dengan respons cepat dan profesional."
          center
          mb="50px"
        />

        <div className="mb-12 text-center">
          <p className="text-body-color mb-2 dark:text-gray-300">
            📍 <strong>Alamat:</strong> {kontak.alamat_kantor}
          </p>
          <p className="text-body-color mb-2 dark:text-gray-300">
            ☎️ <strong>Telepon:</strong> {kontak.no_hp}
          </p>
          <p className="text-body-color dark:text-gray-300">
            ✉️ <strong>Email:</strong> {kontak.email}
          </p>
        </div>

        <div
          className="relative h-[450px] w-full overflow-hidden rounded-xl shadow-lg [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: kontak.google_maps_embed }}
        />
      </div>
    </section>
  );
};

export default ContactPage;
