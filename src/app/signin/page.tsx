"use client";

import { useLanguage } from "@/app/providers";
import Image from "next/image";
import SigninForm from "./signin-form";

const texts = {
  id: {
    title: "Admin Website",
    subtitle: "Bosowa Bandar",
    description: "Silakan masuk untuk mengelola website Bosowa Bandar Indonesia",
    features: [
      "Kelola konten website dengan mudah",
      "Dashboard admin yang intuitif",
      "Akses penuh ke semua fitur"
    ]
  },
  en: {
    title: "Website Admin",
    subtitle: "Bosowa Bandar",
    description: "Please sign in to manage the Bosowa Bandar Indonesia website",
    features: [
      "Manage website content easily",
      "Intuitive admin dashboard",
      "Full access to all features"
    ]
  },
};

const SigninPage = () => {
  const { language } = useLanguage();
  const t = language === "en" ? texts.en : texts.id;

  return (
    <section className="relative flex min-h-[calc(100vh-48px)] flex-col md:flex-row overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d2341] to-[#071020] dark:from-[#030712] dark:via-[#0f172a] dark:to-[#020617]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Left Column - Branding */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 md:w-1/2 md:items-start md:px-12 lg:px-20 z-10">
        <div className="max-w-lg w-full">
          {/* Logo with glow effect */}
          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/images/logo/logo-signin.png"
              alt="Bosowa Logo"
              width={200}
              height={100}
              className="relative w-40 h-auto md:w-52 drop-shadow-2xl"
              priority
            />
          </div>

          {/* Title with gradient */}
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent md:text-4xl lg:text-5xl">
            {t.subtitle}
          </h2>
          
          <p className="mb-8 text-lg text-gray-300/90 leading-relaxed">
            {t.description}
          </p>

          {/* Feature List */}
          <ul className="space-y-4">
            {t.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-300/80">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Decorative Line */}
          <div className="mt-12 hidden md:block">
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 via-blue-500 to-purple-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="relative flex w-full items-center justify-center px-6 py-12 md:w-1/2 md:px-12 lg:px-20 z-10">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="relative backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
            {/* Card glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            
            <SigninForm />
          </div>

          {/* Bottom text */}
          <p className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Bosowa Bandar Indonesia. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
