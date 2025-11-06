"use client";
import blogData from "@/components/Blog/blogData";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const BeritaDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Berita tidak ditemukan.
        </h2>
        <Link
          href="/berita"
          className="text-primary mt-4 inline-block underline"
        >
          ← Kembali ke daftar berita
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-light/30 dark:bg-gray-dark/30 py-16 md:py-20 lg:py-24">
      <div className="container max-w-4xl">
        <h1 className="text-dark mb-6 text-3xl font-bold dark:text-white">
          {blog.title}
        </h1>

        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="text-body-color space-y-6 leading-relaxed dark:text-gray-300">
          <p>{blog.paragraph}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a
            tortor non neque tincidunt aliquet. Donec dignissim lorem sit amet
            libero interdum, nec fermentum magna bibendum. Curabitur viverra
            malesuada dolor.
          </p>
          <p>
            Bosowa Bandar Indonesia terus berkomitmen untuk memberikan layanan
            terbaik kepada pelanggan dengan mengutamakan profesionalitas,
            integritas, dan efisiensi.
          </p>
        </div>

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
};

export default BeritaDetail;
