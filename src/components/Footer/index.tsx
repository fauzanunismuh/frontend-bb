"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import Image from "next/image";
import Link from "next/link";
// Teks
const texts = {
  id: {
    description:
      "Bosowa Bandar Group merupakan bagian dari Bosowa Corporindo yang bergerak di bidang pengelolaan pelabuhan, keagenan kapal, bongkar muat, dan kapal tunda secara profesional dan terpercaya. Kami berkomitmen memberikan layanan terbaik bagi mitra industri maritim di Indonesia Timur.",
    contactTitle: "Hubungi Kami",
    addressLabel: "Alamat:",
    addressValue:
      "Menara Bosowa Lt. 8 Unit J Jl. Jend. Sudirman No.5 Kel. Pisang Utara, Kec. Ujung Pandang Kota Makassar, Sulawesi Selatan Indonesia 90115",
    emailLabel: "Email:",
    whatsappLabel: "WhatsApp:",
    websiteLabel: "Website:",
    socialTitle: "Sosial Media",
    locationTitle: "Lokasi Kami",
    copyright: `© ${new Date().getFullYear()} PT Bosowa Bandar Group. All rights reserved.`,
  },
  en: {
    description:
      "Bosowa Bandar Group, part of Bosowa Corporindo, operates in port management, ship agency, stevedoring, and tugboat services professionally and reliably. We are committed to providing the best services for maritime industry partners in Eastern Indonesia.",
    contactTitle: "Contact Us",
    addressLabel: "Address:",
    addressValue:
      "Menara Bosowa 8th Fl. Unit J Jl. Jend. Sudirman No.5 Pisang Utara, Ujung Pandang Makassar, South Sulawesi Indonesia 90115",
    emailLabel: "Email:",
    whatsappLabel: "WhatsApp:",
    websiteLabel: "Website:",
    socialTitle: "Social Media",
    locationTitle: "Our Location",
    copyright: `© ${new Date().getFullYear()} PT Bosowa Bandar Group. All rights reserved.`,
  },
};

const Footer = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <footer
      id="Footer"
      className="dark:bg-gray-dark relative z-10 mt-20 bg-white pt-16 md:pt-20 lg:pt-15"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* === KIRI: Logo & Deskripsi === */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12">
            <div className="mb-5 max-w-[360px] lg:mb-16">
              <Link href="/" className="mb-8 inline-block">
                <Image
                  src="/images/logo/logo-light.png"
                  alt="logo"
                  width={150} // Sesuaikan width jika perlu
                  height={50} // Sesuaikan height jika perlu
                  className="hidden w-full dark:block" // Ini dari kode Anda sebelumnya, untuk mode gelap
                />
                {/* Anda mungkin juga ingin logo mode terang di sini */}
                <Image
                  src="/images/logo/logo-dark.png"
                  alt="logo"
                  width={150}
                  height={50}
                  className="w-full dark:hidden" // Ini untuk mode terang
                />
              </Link>

              <p className="text-body-color dark:text-body-color-dark mt-0 text-base leading-relaxed">
                {t.description}
              </p>
            </div>
          </div>

          {/* === TENGAH: Navigasi & Alamat === */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-5 lg:mb-5 lg:text-left">
              <div>
                <h2 className="mb-3 text-xl font-bold text-black dark:text-white">
                  {t.contactTitle}
                </h2>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  <b>{t.addressLabel}</b> {t.addressValue} <br />
                  <b>{t.emailLabel}</b> bosowa.bandar@bosowa.co.id <br />
                  <b>{t.whatsappLabel}</b> +62 898 8821 777 <br />
                  <b>{t.websiteLabel}</b>{" "}
                  <a href="https://bosowabandar.com/">
                    https://bosowabandar.com/
                  </a>
                </p>
              </div>
            </div>

            {/* Ikon Sosial Media */}
            <h2 className="mb-5 text-xl font-bold text-black dark:text-white">
              {t.socialTitle}
            </h2>
            {/* ... (Social media links) ... */}
          </div>

          {/* === KANAN: Maps === */}
          <div className="mt-5 w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-12 lg:mb-16 lg:text-left">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                {t.locationTitle}
              </h2>

              {/* ... (Google Maps Iframe) ... */}
            </div>
          </div>
        </div>

        {/* ... (Garis Batas) ... */}

        {/* Copyright */}
        <div className="pb-8 text-center">
          <p className="text-body-color text-sm dark:text-white/80">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
