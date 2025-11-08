"use client";

import {
  requestAdminPasswordReset,
  type ForgotPasswordResponse,
} from "@/lib/api";
import Link from "next/link";
import { FormEvent, useState } from "react";

const ForgotPasswordForm = () => {
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
      const response: ForgotPasswordResponse =
        await requestAdminPasswordReset({ email });
      setSuccess(
        response.message ||
          "Kami telah mengirim instruksi reset password ke email Anda.",
      );
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim permintaan. Coba lagi nanti.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg">
      <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
        Lupa Password
      </h2>
      <p className="mb-6 text-center text-sm text-gray-600">
        Masukkan email admin yang terdaftar untuk menerima tautan reset.
      </p>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="reset-email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email Admin
          </label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-700 focus:outline-none"
            placeholder="admin@bosowa.co.id"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#000F68] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#001A99] disabled:opacity-70"
        >
          {loading ? "Mengirim..." : "Kirim Tautan Reset"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah ingat password?{" "}
        <Link href="/signin" className="font-semibold text-[#000F68]">
          Kembali ke halaman masuk
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
