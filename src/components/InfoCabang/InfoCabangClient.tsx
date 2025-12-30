"use client";

import { useLanguage } from "@/app/providers";
import { getCabangPublic, InfoCabang } from "@/lib/api";
import { useEffect, useState } from "react";

const texts = {
  id: {
    heading: "Informasi Cabang",
    description: "Berikut adalah daftar kantor cabang kami di berbagai lokasi.",
    empty: "Belum ada informasi cabang.",
    loading: "Memuat...",
    address: "Alamat:",
    phone: "Telepon:",
  },
  en: {
    heading: "Branch Information",
    description: "Here is a list of our branch offices in various locations.",
    empty: "No branch information yet.",
    loading: "Loading...",
    address: "Address:",
    phone: "Phone:",
  },
};

// SVG Icons
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
  >
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
      clipRule="evenodd"
    />
  </svg>
);

export default function InfoCabangClient() {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;
  const [branches, setBranches] = useState<InfoCabang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getCabangPublic();
        if (!cancelled) {
          setBranches(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-24 py-16 md:py-20 lg:py-24 transition-colors duration-300">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
            {language === 'en' ? 'Our Network' : 'Jaringan Kami'}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl mb-4">
            {t.heading}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-8 animate-pulse max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row h-auto md:h-64 rounded-2xl bg-gray-200 dark:bg-gray-800"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : branches.length === 0 ? (
          <div className="text-center py-20">
             <p className="text-2xl text-gray-400 dark:text-gray-600 font-bold opacity-50">
              {t.empty}
            </p>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="group flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 md:hover:-translate-y-1"
              >
                {/* Map Section - Left side on desktop, Top on mobile */}
                <div className="relative w-full md:w-5/12 lg:w-5/12 h-56 md:h-auto overflow-hidden bg-gray-200 dark:bg-gray-700 [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500">
                   {branch.google_maps_embed ? (
                      <div
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{
                          __html: branch.google_maps_embed,
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-700/50">
                        <span className="text-sm">No Map Available</span>
                      </div>
                    )}
                </div>
                
                {/* Card Content - Right side */}
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {branch.nama_cabang}
                    </h3>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-600 dark:text-red-400">
                         <MapPinIcon />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {t.address}
                        </span>
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-0.5">
                          {branch.alamat}
                        </p>
                      </div>
                    </div>

                    {branch.no_telepon && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                          <PhoneIcon />
                        </div>
                        <div>
                           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              {t.phone}
                            </span>
                            <div className="mt-0.5">
                              <a 
                                href={`tel:${branch.no_telepon}`} 
                                className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {branch.no_telepon}
                              </a>
                            </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-6 md:mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 md:flex md:justify-start">
                     <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.alamat + " " + branch.nama_cabang)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="active:scale-95 inline-flex items-center justify-center w-full md:w-auto py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-500/30"
                      >
                        <span className="mr-2">📍</span>
                        {language === 'en' ? 'Get Directions' : 'Petunjuk Arah'}
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
