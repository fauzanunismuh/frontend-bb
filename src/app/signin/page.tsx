import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | PT Bosowa Bandar Indonesia",
  description: "Halaman masuk akun PT Bosowa Bandar Indonesia",
};

const SigninPage = () => {
  return (
    <section className="dark:bg-gray-dark relative z-10 mb-0 overflow-hidden bg-gray-50 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-2/3 lg:w-1/2">
            <div className="shadow-three dark:bg-dark mx-auto max-w-[480px] rounded-md bg-white px-6 py-10 sm:p-[50px]">
              <h3 className="mb-4 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                Sign In
              </h3>
              <p className="text-body-color mb-10 text-center text-base">
                Masuk ke akun Anda untuk melanjutkan.
              </p>

              {/* 🔹 Form Sign In */}
              <form>
                {/* Email */}
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
                    placeholder="Masukkan email Anda"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-md border bg-[#f8f8f8] px-5 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                    required
                  />
                </div>

                {/* Password */}
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
                    placeholder="Masukkan password Anda"
                    className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-md border bg-[#f8f8f8] px-5 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B]"
                    required
                  />
                </div>

                {/* Checkbox & Forgot Password */}
                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <label
                    htmlFor="remember"
                    className="text-body-color flex cursor-pointer items-center text-sm select-none"
                  >
                    <input
                      type="checkbox"
                      id="remember"
                      className="accent-primary mr-2"
                    />
                    Remember me
                  </label>
                  <Link
                    href="#"
                    className="text-primary mt-2 text-sm font-medium hover:underline sm:mt-0"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Tombol Sign In */}
                <button
                  type="submit"
                  className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 w-full rounded-md px-8 py-3 text-base font-medium text-white duration-300"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background dekoratif opsional */}
      <div className="absolute top-0 left-0 z-[-1] opacity-10">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
            fill="url(#paint0_linear_95:1005)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1E468C" />
              <stop offset="1" stopColor="#1E468C" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SigninPage;
