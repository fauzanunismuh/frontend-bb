import { getBeritaDetail } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BeritaDetailProps = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

const BeritaDetail = async ({ params }: BeritaDetailProps) => {
  try {
    const berita = await getBeritaDetail(params.id);
    const publishedDate = berita.published_at
      ? new Date(berita.published_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : null;

    return (
      <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
        <div className="container max-w-4xl">
          <p className="text-primary text-sm tracking-wide uppercase">
            Publikasi Bosowa Bandar Group
          </p>
          <h1 className="text-dark mt-2 mb-3 text-3xl font-bold dark:text-white">
            {berita.judul}
          </h1>
          {publishedDate && (
            <p className="text-body-color mb-6 text-sm dark:text-gray-400">
              Dipublikasikan pada {publishedDate}
              {berita.penulis?.nama_lengkap
                ? ` • Oleh ${berita.penulis.nama_lengkap}`
                : ""}
            </p>
          )}

          <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={berita.gambar_utama_url}
              alt={berita.judul}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <p className="text-body-color mb-8 text-lg dark:text-gray-200">
            {berita.ringkasan}
          </p>

          <article
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: berita.isi_konten }}
          />

          <div className="mt-10">
            <Link
              href="/berita"
              className="text-primary font-semibold hover:underline"
            >
              ← Kembali ke semua berita
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    notFound();
  }
};

export default BeritaDetail;
