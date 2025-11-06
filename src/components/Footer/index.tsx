"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="Footer"
      className="dark:bg-gray-dark relative z-10 bg-white pt-16 md:pt-20 lg:pt-24"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* === KIRI: Logo & Deskripsi === */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12">
            <div className="mb-5 max-w-[360px] lg:mb-16">
              <Link href="/" className="mb-8 inline-block">
                {/* Logo terang */}
                <Image
                  src="/images/logo/logo-dark.png"
                  alt="Bosowa Bandar Indonesia"
                  width={180}
                  height={40}
                  className="dark:hidden"
                />
                {/* Logo gelap */}
                <Image
                  src="/images/logo/logo-light.png"
                  alt="Bosowa Bandar Indonesia"
                  width={180}
                  height={40}
                  className="hidden dark:block"
                />
              </Link>

              <p className="text-body-color dark:text-body-color-dark mt-0 text-base leading-relaxed">
                PT Bosowa Bandar Indonesia merupakan bagian dari Bosowa
                Corporindo yang bergerak di bidang pengelolaan pelabuhan,
                keagenan kapal, bongkar muat, dan kapal tunda secara profesional
                dan terpercaya. Kami berkomitmen memberikan layanan terbaik bagi
                mitra industri maritim di Indonesia Timur.
              </p>
            </div>
          </div>

          {/* === TENGAH: Navigasi & Alamat === */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-5 lg:mb-5 lg:text-left">
              <div>
                <h2 className="mb-3 text-xl font-bold text-black dark:text-white">
                  Hubungi Kami
                </h2>
                <p className="text-body-color dark:text-body-color-dark text-base">
                  <b>Alamat:</b> Menara Bosowa Lt. 8 Unit J Jl. Jend. Sudirman
                  No.5 Kel. Pisang Utara, Kec. Ujung Pandang Kota Makassar,
                  Sulawesi Selatan Indonesia 90115 <br />
                  <b>Email:</b> bosowa.bandar@bosowa.co.id <br />
                  <b>WhatsApp:</b> +62 898 8821 777 <br />
                  <b>Website:</b>{" "}
                  <a href="https://bosowabandar.com/">
                    https://bosowabandar.com/
                  </a>
                </p>
              </div>
            </div>

            {/* Ikon Sosial Media */}
            <h2 className="mb-5 text-xl font-bold text-black dark:text-white">
              Sosial Media
            </h2>
            <div className="space-x-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary transition"
              >
                <i className="fa-brands fa-facebook-f text-2xl"></i>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary transition"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary transition"
              >
                <i className="fa-brands fa-linkedin-in text-2xl"></i>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
                className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary transition"
              >
                <i className="fa-brands fa-youtube text-2xl"></i>
              </Link>
            </div>
          </div>

          {/* === KANAN: Maps === */}
          <div className="mt-5 w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12">
            <div className="mb-12 lg:mb-16 lg:text-left">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                Lokasi Kami
              </h2>

              {/* Google Maps Iframe */}
              <div className="mb-6 overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8071451498486!2d119.41161287412116!3d-5.134734794842436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf030020151c7f%3A0x91f6cbbf1acbc877!2sPT.%20Bosowa%20Bandar%20Indonesia!5e0!3m2!1sid!2sid!4v1762406204313!5m2!1sid!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Garis Batas */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600"></div>

        {/* Copyright */}
        <div className="pb-8 text-center">
          <p className="text-body-color text-sm dark:text-white/80">
            © {new Date().getFullYear()} PT Bosowa Bandar Indonesia. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
