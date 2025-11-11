"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import { getKontakInfo, KontakInfo } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Teks
const texts = {
  id: {
    description:
      "Perusahaan swasta nasional berdiri membawa sejarah lokal Indonesia Timur. Bosowa Bandar Indonesia merupakan Badan Usaha Pelabuhan (BUP) yang merupakan bagian dari Bosowa Corporindo. Kami memberikan pelayanan pengelolaan pelabuhan, keagenan kapal, jasa bongkar muat (PBM) dan layanan kapal tunda.",
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

const defaultMapEmbed =
  '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8071451177057!2d119.41418780000001!3d-5.1347348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf030020151c7f%3A0x91f6cbbf1acbc877!2sPT.%20Bosowa%20Bandar%20Indonesia!5e0!3m2!1sid!2sid!4v1762738404067!5m2!1sid!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

const Footer = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks
  const [kontak, setKontak] = useState<KontakInfo | null>(null);
  const fallbackEmail = "bosowa.bandar@bosowa.co.id";
  const fallbackPhone = "+62 898 8821 777";
  const email = kontak?.email ?? fallbackEmail;
  const phone = kontak?.no_hp ?? fallbackPhone;
  const phoneLinkTarget = phone.replace(/[^0-9]/g, "");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getKontakInfo();
        if (!cancelled) {
          setKontak(data);
        }
      } catch (error) {
        console.warn("Gagal memuat info perusahaan:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
                  width={150}
                  height={50}
                  className="hidden w-full dark:block"
                />
                <Image
                  src="/images/logo/logo-dark.png"
                  alt="logo"
                  width={150}
                  height={50}
                  className="w-full dark:hidden"
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
                  <b>{t.addressLabel}</b> {kontak?.alamat_kantor ?? t.addressValue} <br />
                  <b>{t.emailLabel}</b>{" "}
                  <a href={`mailto:${email}`} className="hover:text-primary">
                    {email}
                  </a>
                  <br />
                  <b>{t.whatsappLabel}</b>{" "}
                  <a
                    href={`https://wa.me/${phoneLinkTarget}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    {phone}
                  </a>
                  <br />
                  <b>{t.websiteLabel}</b>{" "}
                  <a
                    href="https://bosowabandar.com/"
                    className="hover:text-primary"
                  >
                    https://bosowabandar.com/
                  </a>
                </p>
              </div>
            </div>

            {/* [PERBAIKAN] Ikon Sosial Media */}
            <h2 className="mb-5 text-xl font-bold text-black dark:text-white">
              {t.socialTitle}
            </h2>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/bosowabandarindonesia/" // Ganti dengan URL Instagram Anda
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-body-color hover:text-primary dark:hover:text-primary dark:text-gray-400"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://youtube.com/@bosowabandarindonesia?si=1LbAtQYfa1minsb8" // Ganti dengan URL YouTube Anda
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-body-color hover:text-primary dark:hover:text-primary dark:text-gray-400"
              >
                <i className="fa-brands fa-youtube text-2xl"></i>
              </a>
            </div>
          </div>

          {/* === KANAN: Maps (PERBAIKAN) === */}
          <div className="mt-5 w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-12 lg:mb-16 lg:text-left">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                {t.locationTitle}
              </h2>

              <div className="rounded-lg shadow-md mx-auto max-w-[420px] overflow-hidden lg:mx-0">
                <div
                  className="h-[220px] w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{
                    __html: kontak?.google_maps_embed ?? defaultMapEmbed,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ... (Garis Batas) ... */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

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
