import { Metadata } from "next";
import Image from "next/image";
import SigninForm from "./signin-form";

export const metadata: Metadata = {
  title: "Masuk | PT Bosowa Bandar Indonesia",
  description: "Halaman masuk akun PT Bosowa Bandar Indonesia",
};

const SigninPage = () => {
  return (
    <section className="mt-15 flex min-h-screen flex-col bg-[#F9FBFF] md:flex-row">
      {/* Kolom kiri */}
      <div className="flex w-full flex-col items-start justify-center bg-white px-10 py-16 md:w-1/2 md:px-20">
        <div className="max-w-md">
          <Image
            src="/images/logo/logo-dark.png"
            alt="Bosowa Logo"
            width={300}
            height={400}
            className="mb-10"
          />

          <h1 className="mb-4 text-4xl leading-tight font-bold text-[#D90000]">
            Admin Website <br /> Bosowa Bandar
          </h1>
          <p className="mb-10 text-base text-gray-600">
            Silakan masuk untuk mengelola website Bosowa Bandar
          </p>
        </div>
      </div>

      {/* Kolom kanan */}
      <div className="flex w-full items-center justify-center bg-[#F5F9FF] md:w-1/2">
        <div className="w-full max-w-md px-8">
          <SigninForm />
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
