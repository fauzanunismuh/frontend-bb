"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-dark relative z-10 bg-white pt-16 md:pt-20 lg:pt-24">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* Bagian Logo & Deskripsi */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12">
            <div className="mb-12 max-w-[360px] lg:mb-16">
              <Link href="/" className="mb-8 inline-block">
                <Image
                  src="/images/logo/Bosowa-Bosowa-Bandar-Indonesia-tulisan-putih-scaled.png"
                  alt="Bosowa Bandar Indonesia"
                  width={180}
                  height={40}
                  className="dark:hidden"
                />
                <Image
                  src="/images/logo/Bosowa-Bosowa-Bandar-Indonesia-tulisan-putih-scaled.png"
                  alt="Bosowa Bandar Indonesia"
                  width={180}
                  height={40}
                  className="hidden dark:block"
                />
              </Link>
              <p className="text-body-color dark:text-body-color-dark mb-6 text-base leading-relaxed">
                PT Bosowa Bandar Indonesia merupakan Badan Usaha Pelabuhan (BUP)
                yang menyediakan layanan pengelolaan pelabuhan, keagenan kapal,
                bongkar muat, dan kapal tunda secara profesional dan terpercaya.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📍 <strong>Kantor Pusat:</strong>
                <br />
                Jl. Sultan Alauddin No. 10, Makassar, Sulawesi Selatan,
                Indonesia <br />
                ☎️ (0411) 123-456 • ✉️ info@bosowabandar.co.id
              </p>
            </div>
          </div>

          {/* Link Navigasi */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                Navigasi
              </h2>
              <ul>
                <li>
                  <Link
                    href="/"
                    className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-3 block text-base duration-300"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-3 block text-base duration-300"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-3 block text-base duration-300"
                  >
                    Layanan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary mb-3 block text-base duration-300"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
                Ikuti Kami
              </h2>
              <div className="flex items-center space-x-5">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  <i className="fa-brands fa-facebook-f text-xl"></i>
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  <i className="fa-brands fa-instagram text-xl"></i>
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  <i className="fa-brands fa-linkedin-in text-xl"></i>
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                >
                  <i className="fa-brands fa-youtube text-xl"></i>
                </Link>
              </div>
            </div>

            {/* Logo Mitra */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
                Our Clients
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <Image
                  src="/images/footer/Logo_Indocement_Tiga_Roda.svg.png"
                  alt="Bosowa Group"
                  width={90}
                  height={40}
                  className="opacity-80 transition hover:opacity-100"
                />
                <Image
                  src="/images/footer/pelayaran.png"
                  alt="Pelindo"
                  width={90}
                  height={40}
                  className="opacity-80 transition hover:opacity-100"
                />
                <Image
                  src="/images/footer/pertamina.png"
                  alt="BKI"
                  width={80}
                  height={40}
                  className="opacity-80 transition hover:opacity-100"
                />
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
