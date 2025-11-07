import { Metadata } from "next";
import SigninForm from "./signin-form";

export const metadata: Metadata = {
  title: "Sign In | PT Bosowa Bandar Indonesia",
  description: "Halaman masuk akun PT Bosowa Bandar Indonesia",
};

const SigninPage = () => {
  return (
    <section className="dark:bg-gray-dark relative z-10 mb-0 overflow-hidden bg-gray-50 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <SigninForm />
      </div>

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
