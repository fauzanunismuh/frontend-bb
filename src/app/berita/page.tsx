"use client";
import blogData from "@/components/Blog/blogData";
import Image from "next/image";
import Link from "next/link";

const BeritaPage = () => {
  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 mt-40 py-16 md:py-20 lg:py-24">
      <div className="container">
        {/* Judul Halaman */}
        <div className="mb-12 text-center">
          <h2 className="text-dark mb-3 text-3xl font-bold dark:text-white">
            Semua Publikasi
          </h2>
          <p className="text-body-color dark:text-gray-400">
            Temukan seluruh berita, kegiatan, dan informasi terbaru dari Bosowa
            Bandar Indonesia.
          </p>
        </div>

        {/* Daftar Berita Vertikal */}
        <div className="flex flex-col gap-10">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col items-start overflow-hidden rounded-lg bg-white shadow duration-300 hover:shadow-lg md:flex-row dark:bg-gray-800"
            >
              {/* Gambar */}
              <div className="relative h-64 w-full md:w-1/3">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Konten */}
              <div className="flex-1 p-6 md:p-8">
                <h3 className="text-dark mb-3 text-xl font-bold md:text-2xl dark:text-white">
                  <Link
                    href={`/berita/${blog.id}`}
                    className="hover:text-primary dark:hover:text-primary"
                  >
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-body-color mb-4 line-clamp-3 dark:text-gray-400">
                  {blog.paragraph}
                </p>
                <Link
                  href={`/berita/${blog.id}`}
                  className="text-primary font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeritaPage;
