import { Brand } from "@/types/brand";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* ======== Judul & Deskripsi ======== */}
        <SectionTitle
          title="Mitra dan Klien Kami"
          paragraph="Bosowa Bandar Indonesia menjalin kemitraan strategis dengan berbagai perusahaan dan lembaga untuk mendukung layanan pelabuhan yang profesional, efisien, dan terpercaya."
          center
          mb="80px"
        />

        {/* ======== Logo Brand ======== */}
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="bg-gray-light/70 dark:bg-gray-dark/80 flex flex-wrap items-center justify-center rounded-lg px-8 py-10 shadow-sm sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {brandsData.map((brand) => (
                <SingleBrand key={brand.id} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="flex w-full items-center justify-center px-4 py-6 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative flex h-[100px] w-[180px] items-center justify-center rounded-md bg-white/40 opacity-80 backdrop-blur-sm transition hover:opacity-100 dark:bg-white/10"
      >
        <Image
          src={imageLight}
          alt={name}
          width={160}
          height={90}
          className="hidden h-auto w-auto object-contain dark:block"
        />
        <Image
          src={image}
          alt={name}
          width={160}
          height={90}
          className="block h-auto w-auto object-contain dark:hidden"
        />
      </a>
    </div>
  );
};
