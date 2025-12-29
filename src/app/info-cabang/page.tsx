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
  },
  en: {
    heading: "Branch Information",
    description: "Here is a list of our branch offices in various locations.",
    empty: "No branch information yet.",
    loading: "Loading...",
    address: "Address:",
  },
};

export default function InfoCabangPage() {
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
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 mt-24 py-16 md:py-20 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-dark mb-3 text-3xl font-bold dark:text-white">
            {t.heading}
          </h1>
          <p className="text-body-color dark:text-gray-400">
            {t.description}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-body-color dark:text-gray-400">
            {t.loading}
          </p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : branches.length === 0 ? (
          <p className="text-center text-body-color dark:text-gray-400">
            {t.empty}
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-900"
              >
                <h3 className="text-dark mb-2 text-xl font-semibold dark:text-white">
                  {branch.nama_cabang}
                </h3>
                <p className="text-body-color mb-4 text-sm dark:text-gray-400">
                  <span className="font-semibold">{t.address}</span>{" "}
                  {branch.alamat}
                </p>
                {branch.google_maps_embed && (
                  <div
                    className="h-[200px] w-full overflow-hidden rounded-lg [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{
                      __html: branch.google_maps_embed,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
