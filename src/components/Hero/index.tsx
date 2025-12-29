"use client";
import { useLanguage } from "@/app/providers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

// Blur placeholder generator
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop offset="0%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#2a2a2a" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;

const toBase64 = (str: string) => (typeof window === "undefined"
  ? Buffer.from(str).toString("base64")
  : window.btoa(str));

const blurDataUrl = toBase64(shimmer(800, 600));

// Pindahkan data slide ke luar atau buat fungsi untuk mengambilnya
const getSlidesData = (language: string) => {
  if (language === "en") {
    return [
      {
        title: "Find the Best Service For Your Fleet",
        description:
          "Bosowa Bandar Group is a Port Business Entity (BUP) providing port management, ship agency, stevedoring, and tugboat services.",
        image: "/images/hero/slide1.jpg",
        primaryLink: "#",
        contactUs: "Contact Us",
      },
      {
        title: "Fast, Safe, and Professional Stevedoring Services",
        description:
          "Supported by experienced personnel and modern equipment, Bosowa Bandar Group ensures efficient and timely loading/unloading processes for every vessel.",
        image: "/images/hero/slide2.jpg",
        primaryLink: "#",
        contactUs: "Contact Us",
      },
      {
        title: "Integrated Solutions for Agency and Tugboat Services",
        description:
          "As a strategic partner in the maritime industry, we provide agency and tugboat services with high safety standards, supporting port operational smoothness.",
        image: "/images/hero/slide3.JPG",
        primaryLink: "#",
        contactUs: "Contact Us",
      },
    ];
  }

  // Default (id)
  return [
    {
      title: "Temukan Layanan Terbaik Untuk Armada Anda",
      description:
        "Bosowa Bandar Group adalah Badan Usaha Pelabuhan (BUP) yang memberikan layanan pengelolaan pelabuhan, keagenan kapal, jasa bongkar muat dan layanan kapal tunda.",
      image: "/images/hero/slide1.jpg",
      primaryLink: "#",
      contactUs: "Hubungi Kami",
    },
    {
      title: "Pelayanan Bongkar Muat Cepat, Aman, dan Profesional",
      description:
        "Didukung oleh tenaga kerja berpengalaman dan peralatan modern, Bosowa Bandar Group memastikan proses bongkar muat berjalan efisien dan tepat waktu untuk setiap kapal yang berlabuh.",
      image: "/images/hero/slide2.jpg",
      primaryLink: "#",
      contactUs: "Hubungi Kami",
    },
    {
      title: "Solusi Terpadu untuk Keagenan dan Tunda Kapal",
      description:
        "Sebagai mitra strategis industri maritim, kami menyediakan layanan keagenan dan kapal tunda dengan standar keselamatan tinggi, mendukung kelancaran operasional pelabuhan di seluruh wilayah kerja Bosowa.",
      image: "/images/hero/slide3.JPG",
      primaryLink: "#",
      contactUs: "Hubungi Kami",
    },
  ];
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage(); // Gunakan hook

  // Gunakan useMemo agar data slides diperbarui saat bahasa berubah
  const slides = useMemo(() => getSlidesData(language), [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]); // Tambahkan slides.length sebagai dependensi

  return (
    <section
      id="home"
      className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white"
    >
      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover object-center"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL={blurDataUrl}
            />

            {/* 🔲 Overlay hitam transparan di atas gambar */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Overlay konten */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <h1 className="mt-8 mb-6 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-12 max-w-[800px] text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
                {slide.description}
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                  href="https://system.bosowabandar.com/auth/login"
                  className="bg-primary hover:bg-primary/80 rounded-xs px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out"
                  target="_blank" // opsional: buka di tab baru
                  rel="noopener noreferrer" // keamanan tambahan bila pakai target="_blank"
                >
                  Bosowa Bandar System
                </Link>

                <Link
                  href="https://wa.me/628988821777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xs bg-white/20 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm duration-300 ease-in-out hover:bg-white/30"
                >
                  {slide.contactUs}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicator */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform space-x-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
