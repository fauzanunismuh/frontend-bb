"use client";

import { useLanguage } from "@/app/providers"; // Impor hook
import { loginAdmin } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

// Teks
const texts = {
  id: {
    title: "Masuk",
    errorMessage: "Gagal masuk. Silakan periksa kembali kredensial Anda.",
    labelEmail: "Username / Email",
    placeholderEmail: "Masukkan email Anda",
    labelPassword: "Password",
    placeholderPassword: "Masukkan password Anda",
    forgotPassword: "Lupa Password?",
    buttonSubmit: "Masuk",
    buttonLoading: "Memproses...",
  },
  en: {
    title: "Sign In",
    errorMessage: "Login failed. Please check your credentials.",
    labelEmail: "Username / Email",
    placeholderEmail: "Enter your email",
    labelPassword: "Password",
    placeholderPassword: "Enter your password",
    forgotPassword: "Forgot Password?",
    buttonSubmit: "Sign In",
    buttonLoading: "Processing...",
  },
};

const SigninForm = () => {
  const router = useRouter();
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await loginAdmin({ email, password });
      localStorage.setItem("bbi_admin_token", result.access_token);
      localStorage.setItem("bbi_admin_profile", JSON.stringify(result.admin));
      router.push("/admin/berita");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 rounded-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        {t.title}
      </h2>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t.labelEmail}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
            placeholder={t.placeholderEmail}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t.labelPassword}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
            placeholder={t.placeholderPassword}
            required
          />
        </div>

        <div className="mb-8 flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-gray-800 hover:underline"
          >
            {t.forgotPassword}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#000F68] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#001A99]"
        >
          {loading ? t.buttonLoading : t.buttonSubmit}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
