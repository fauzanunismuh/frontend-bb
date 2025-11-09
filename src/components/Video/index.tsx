"use client";

import { useLanguage } from "@/app/providers"; // Impor hook
import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

// Teks
const texts = {
  id: {
    title: "Bosowa Bandar Group",
    description:
      "Perusahaan swasta nasional berdiri membawa sejarah lokal Indonesia Timur. Bosowa Bandar Group merupakan Badan Usaha Pelabuhan (BUP) yang merupakan bagian dari Bosowa Corporindo.",
  },
  en: {
    title: "Bosowa Bandar Group",
    description:
      "A national private company established with the local history of Eastern Indonesia. Bosowa Bandar Group is a Port Business Entity (BUP) which is part of Bosowa Corporindo.",
  },
};

export default function Video() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  return (
    <>
      <section className="relative z-10 py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={t.title}
            paragraph={t.description}
            center
            mb="80px"
          />
        </div>

        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[770px] overflow-hidden rounded-md">
                <div className="relative aspect-[77/40] items-center justify-center">
                  {!isPlaying ? (
                    <>
                      <Image
                        src="/images/video/image.png"
                        alt="video thumbnail"
                        className="object-cover"
                        fill
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          aria-label="video play button"
                          onClick={() => setIsPlaying(true)}
                          className="text-primary flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white/75 transition hover:bg-white"
                        >
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            className="fill-current"
                          >
                            <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <iframe
                      className="absolute top-0 left-0 h-full w-full"
                      src="https://www.youtube.com/embed/z4hiz113Ej0?si=MjYfoFaI-kDFuZES&autoplay=1"
                      title="Bosowa Bandar Indonesia"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
