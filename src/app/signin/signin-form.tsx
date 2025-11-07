"use client";

import { loginAdmin } from "@/lib/api";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const router = useRouter();
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
      setError(
        err instanceof Error
          ? err.message
          : "Gagal masuk. Silakan periksa kembali kredensial Anda.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="-mx-4 flex flex-wrap justify-center">
      <div className="w-full px-4 md:w-2/3 lg:w-1/2">
        <div className="shadow-three dark:bg-dark mx-auto max-w-[480px] rounded-md bg-white px-6 py-10 sm:p-[50px]">
          <h3 className="mb-4 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
            Sign In
          </h3>
          <p className="text-body-color mb-6 text-center text-base">
            Masuk menggunakan akun admin untuk mengelola konten berita.
          </p>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-dark mb-3 block text-sm font-medium dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email Anda"
                autoComplete="email"
                className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-md border bg-[#f8f8f8] px-5 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-dark mb-3 block text-sm font-medium dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
                className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-md border bg-[#f8f8f8] px-5 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                required
              />
            </div>

            <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
              <label
                htmlFor="remember"
                className="text-body-color flex cursor-pointer items-center text-sm select-none"
              >
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-primary mr-2"
                  disabled
                />
                Remember me (segera hadir)
              </label>
              <Link
                href="#"
                className="text-primary mt-2 text-sm font-medium hover:underline sm:mt-0"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 disabled:bg-primary/50 w-full rounded-md px-8 py-3 text-base font-medium text-white duration-300"
            >
              {loading ? "Memproses..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
