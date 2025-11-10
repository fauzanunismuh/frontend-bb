"use client";
import { useLanguage } from "@/app/providers"; // Import hook
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag"; // [BARU] Impor library bendera
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const { language, setLanguage } = useLanguage(); // Gunakan context
  const pathname = usePathname();
  const router = useRouter();

  // ... (Semua fungsi helper Anda tetap sama: navbarToggleHandler, handleStickyNavbar, syncAdminState, ...)
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const syncAdminState = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("bbi_admin_token");
    setAdminLoggedIn(Boolean(token));
  };

  useEffect(() => {
    syncAdminState();
    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === "bbi_admin_token" ||
        event.key === "bbi_admin_profile"
      ) {
        syncAdminState();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [pathname]);

  const handleAdminLogout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("bbi_admin_token");
    setAdminLoggedIn(false);
    localStorage.removeItem("bbi_admin_profile");
    router.push("/signin");
  };

  const handleSubmenu = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleAnchorClick = (e, href) => {
    if (!href.startsWith("/#")) return;

    e.preventDefault();
    setOpenIndex(-1); // 櫨 Tutup semua submenu

    const targetId = href.split("#")[1];
    const element = document.getElementById(targetId);

    if (pathname === "/") {
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const getMenuData = () => {
    if (language === "en") {
      return [
        { id: 1, title: "Home", path: "/", newTab: false },
        { id: 2, title: "About Us", path: "/about", newTab: false },
        { id: 3, title: "Vision & Mission", path: "/visi-misi", newTab: false },
        {
          id: 4,
          title: "Business Units",
          newTab: false,
          submenu: [
            {
              id: 41,
              title: "PT Bosowa Bandar Agensi",
              path: "/unit-bisnis/bosowa-bandar-agensi",
              newTab: false,
            },
            {
              id: 42,
              title: "PT Bosowa Bandar Indonesia",
              path: "/unit-bisnis/bosowa-bandar-indonesia",
              newTab: false,
            },
            {
              id: 43,
              title: "PT Jasa Pelabuhan Indonesia",
              path: "/unit-bisnis/jasa-pelabuhan-indonesia",
              newTab: false,
            },
          ],
        },
        { id: 5, title: "Publications", path: "/berita", newTab: false },
        { id: 6, title: "Contact", path: "/#Footer", newTab: false },
      ];
    }
    // Default (ID)
    return menuData;
  };

  const currentMenuData = getMenuData();

  return (
    <header
      className={`header top-0 left-0 z-40 flex w-full items-center transition-all duration-300 ${
        sticky
          ? "fixed bg-[#1E468C] py-0 shadow-md"
          : "absolute bg-[#1E468C]/90 py-0"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`header-logo block ${sticky ? "py-4" : "py-6"}`}
            >
              <Image
                src="/images/logo/logo-light.png"
                alt="logo"
                width={140}
                height={30}
                className="block dark:hidden"
              />
              <Image
                src="/images/logo/logo-light.png"
                alt="logo"
                width={140}
                height={30}
                className="hidden dark:block"
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex items-center justify-end gap-4">
            {/* ... (Tombol Mobile Toggler) ... */}
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="block rounded-lg px-3 py-[6px] ring-white focus:ring-2 lg:hidden"
            >
              <span
                className={`my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
                  navbarOpen ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`my-1.5 block h-0.5 w-[30px] bg-white transition-all duration-300 ${
                  navbarOpen ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </button>

            {/* Navigasi */}
            <nav
              id="navbarCollapse"
              className={`navbar absolute top-full right-0 z-30 w-[250px] rounded border border-white/20 bg-[#1E468C] px-6 py-4 duration-300 lg:static lg:block lg:w-auto lg:border-none lg:bg-transparent ${
                navbarOpen ? "block" : "hidden lg:block"
              }`}
            >
              {/* ... (Menu items ...
                ... (kode <ul ...> ... <li> ... </ul> Anda tetap sama)
              ...
              ... (Menu Admin juga tetap sama) ...
              ... (Saya memendekkan bagian ini agar fokus pada perubahan)
              */}
              <ul className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-4">
                {currentMenuData.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        onClick={(e) => {
                          handleAnchorClick(e, menuItem.path);
                          setNavbarOpen(false); // 櫨 Tutup hamburger menu
                          setOpenIndex(-1); // 櫨 Tutup semua submenu
                        }}
                        className={`whitespace-nowrap text-white transition ${
                          // Menambahkan whitespace-nowrap
                          pathname === menuItem.path
                            ? "font-semibold underline underline-offset-4"
                            : "hover:text-gray-300"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <p
                          onClick={() => handleSubmenu(index)}
                          className="flex cursor-pointer items-center gap-1 whitespace-nowrap text-white hover:text-gray-300" // Menambahkan whitespace-nowrap
                        >
                          {menuItem.title}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-300 ${
                              openIndex === index ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              d="M6 8L10 12L14 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </p>
                        <div
                          className={`transition-all duration-300 lg:absolute lg:top-full lg:left-0 lg:w-[200px] lg:rounded-md lg:bg-[#1E468C]/95 lg:shadow-lg ${
                            openIndex === index
                              ? "visible block opacity-100"
                              : "invisible hidden opacity-0"
                          }`}
                        >
                          {menuItem.submenu?.map((submenuItem, idx) => (
                            <Link
                              href={submenuItem.path}
                              key={idx}
                              className="block px-4 py-2 text-white hover:bg-white/10"
                              onClick={() => {
                                setNavbarOpen(false); // 櫨 Tutup hamburger menu
                                setOpenIndex(-1); // 櫨 Tutup submenu
                              }}
                            >
                              {submenuItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
                {adminLoggedIn && (
                  <li className="group relative">
                    <p
                      onClick={() => handleSubmenu(menuData.length)}
                      className="flex cursor-pointer items-center gap-1 text-white hover:text-gray-300"
                    >
                      Admin
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-300 ${
                          openIndex === menuData.length ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M6 8L10 12L14 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </p>
                    <div
                      className={`transition-all duration-300 lg:absolute lg:top-full lg:left-0 lg:w-[200px] lg:rounded-md lg:bg-[#1E468C]/95 lg:shadow-lg ${
                        openIndex === menuData.length
                          ? "visible block opacity-100"
                          : "invisible hidden opacity-0"
                      }`}
                    >
                      <Link
                        href="/admin/berita"
                        className="block px-4 py-2 text-white hover:bg-white/10"
                        onClick={() => {
                          setNavbarOpen(false);
                          setOpenIndex(-1);
                        }}
                      >
                        Kelola Berita
                      </Link>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-white hover:bg-white/10"
                        onClick={() => {
                          handleAdminLogout();
                          setNavbarOpen(false);
                          setOpenIndex(-1);
                        }}
                      >
                        Keluar
                      </button>
                    </div>
                  </li>
                )}
              </ul>
              {/* === Kontrol untuk Mobile (BARU) === */}
              <div className="mt-5 flex flex-col items-start gap-4 lg:hidden">
                <Link
                  href="/signin"
                  className="text-base font-medium text-white hover:opacity-80"
                >
                  {language === "id" ? "Masuk" : "Sign In"}
                </Link>
                {/* [PERUBAHAN] Language Switcher (Mobile) */}
                <div className="flex items-center space-x-1 rounded-full bg-white/10 p-1">
                  <button
                    onClick={() => setLanguage("id")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      language === "id" ? "bg-white" : "hover:bg-white/20"
                    }`}
                    aria-label="Ganti ke Bahasa Indonesia"
                  >
                    <ReactCountryFlag
                      countryCode="ID"
                      svg
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      language === "en" ? "bg-white" : "hover:bg-white/20"
                    }`}
                    aria-label="Switch to English"
                  >
                    <ReactCountryFlag
                      countryCode="GB"
                      svg
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    />
                  </button>
                </div>
                <ThemeToggler />
              </div>
            </nav>

            {/* === Kanan paling akhir (Desktop) === */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/signin"
                className="text-base font-medium text-white hover:opacity-80"
              >
                {language === "id" ? "Masuk" : "Sign In"}
              </Link>
              {/* [PERUBAHAN] Language Switcher (Desktop) */}
              <div className="flex items-center space-x-1 rounded-full bg-white/10 p-1">
                <button
                  onClick={() => setLanguage("id")}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    language === "id" ? "bg-white" : "hover:bg-white/20"
                  }`}
                  aria-label="Ganti ke Bahasa Indonesia"
                >
                  <ReactCountryFlag
                    countryCode="ID"
                    svg
                    style={{
                      width: "1.5rem", // 24px
                      height: "1.5rem", // 24px
                    }}
                  />
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    language === "en" ? "bg-white" : "hover:bg-white/20"
                  }`}
                  aria-label="Switch to English"
                >
                  <ReactCountryFlag
                    countryCode="GB"
                    svg
                    style={{
                      width: "1.5rem", // 24px
                      height: "1.5rem", // 24px
                    }}
                  />
                </button>
              </div>
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
