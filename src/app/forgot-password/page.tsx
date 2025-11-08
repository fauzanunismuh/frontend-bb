import { Metadata } from "next";
import Image from "next/image";
import ForgotPasswordForm from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Password | PT Bosowa Bandar Indonesia",
  description: "Minta tautan reset password untuk admin Bosowa Bandar.",
};

const ForgotPasswordPage = () => {
  return (
    <section className="mt-15 flex min-h-screen flex-col bg-[#F9FBFF] md:flex-row">
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
            Reset Password Admin
          </h1>
          <p className="mb-10 text-base text-gray-600">
            Kami akan mengirim tautan reset melalui email yang terdaftar.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[#F5F9FF] md:w-1/2">
        <div className="w-full max-w-md px-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
