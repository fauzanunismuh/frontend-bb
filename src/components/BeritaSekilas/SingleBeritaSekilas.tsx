import { BeritaSekilas } from "@/types/BeritaSekilas";
import Image from "next/image";
import Link from "next/link";

const SingleBeritaSekilas = ({
  BeritaSekilas,
}: {
  BeritaSekilas: BeritaSekilas;
}) => {
  const { title, image, paragraph, id } = BeritaSekilas;

  return (
    <div className="group shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark relative overflow-hidden rounded-xs bg-white duration-300">
      {/* Gambar utama */}
      <Link
        href={`/berita/${id}`}
        className="relative block aspect-37/22 w-full"
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </Link>

      {/* Konten */}
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={`/berita/${id}`}
            className="hover:text-primary dark:hover:text-primary mb-4 block text-xl font-bold text-black sm:text-2xl dark:text-white"
          >
            {title}
          </Link>
        </h3>
        <p className="border-body-color/10 text-body-color mb-6 border-b pb-6 text-base font-medium dark:border-white/10">
          {paragraph}
        </p>

        {/* Tombol baca selengkapnya */}
        <div className="flex items-center justify-between">
          <Link
            href={`/berita/${id}`}
            className="text-primary hover:text-primary/80 text-sm font-semibold"
          >
            Baca Selengkapnya →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBeritaSekilas;
