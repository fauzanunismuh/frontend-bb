"use client";

import { useLanguage } from "@/app/providers"; // Impor hook
import {
  requestAdminPasswordReset,
  type ForgotPasswordResponse,
} from "@/lib/api";
import Link from "next/link";
import { FormEvent, useState } from "react";

// Teks
const texts = {
  id: {
    title: "Lupa Password",
    description:
      "Masukkan email admin yang terdaftar untuk menerima tautan reset.",
    successMessage:
      "Kami telah mengirim instruksi reset password ke email Anda.",
    errorMessage: "Gagal mengirim permintaan. Coba lagi nanti.",
    labelEmail: "Email Admin",
    placeholderEmail: "admin@bosowa.co.id",
    buttonSubmit: "Kirim Tautan Reset",
    buttonLoading: "Mengirim...",
    backToLogin: "Sudah ingat password?",
    backToLoginLink: "Kembali ke halaman masuk",
  },
  en: {
    title: "Forgot Password",
    description: "Enter your registered admin email to receive a reset link.",
    successMessage: "We have sent password reset instructions to your email.",
    errorMessage: "Failed to send request. Please try again later.",
    labelEmail: "Admin Email",
    placeholderEmail: "admin@bosowa.co.id",
    buttonSubmit: "Send Reset Link",
    buttonLoading: "Sending...",
    backToLogin: "Remember your password?",
    backToLoginLink: "Back to sign in",
  },
};

const ForgotPasswordForm = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const response: ForgotPasswordResponse = await requestAdminPasswordReset({
        email,
      });
      setSuccess(response.message || t.successMessage);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg">
      <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
        {t.title}
      </h2>
      <p className="mb-6 text-center text-sm text-gray-600">{t.description}</p>

      {/* ... (error & success messages) ... */}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="reset-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t.labelEmail}
          </label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
            placeholder={t.placeholderEmail}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#000F68] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#001A99] disabled:opacity-70"
        >
          {loading ? t.buttonLoading : t.buttonSubmit}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {t.backToLogin}{" "}
        <Link href="/signin" className="font-semibold text-[#000F68]">
          {t.backToLoginLink}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
