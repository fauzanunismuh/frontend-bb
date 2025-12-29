"use client";
import { useLanguage } from "@/app/providers";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FlagGB, FlagID } from "./FlagIcons";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);

  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById("navbarCollapse");
      const toggler = document.getElementById("navbarToggler");
      if (navbarOpen && nav && !nav.contains(event.target as Node) && !toggler?.contains(event.target as Node)) {
        setNavbarOpen(false);
        setOpenIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbarOpen]);

  const syncAdminState = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("bbi_admin_token");
    setAdminLoggedIn(Boolean(token));
  };

  useEffect(() => {
    syncAdminState();
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "bbi_admin_token" || event.key === "bbi_admin_profile") {
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

  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("/#")) return;

    e.preventDefault();
    setOpenIndex(-1);

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
        { id: 2, title: "About Us", path: "/about-us", newTab: false },
        { id: 3, title: "Vision & Mission", path: "/vision-mission", newTab: false },
        {
          id: 4,
          title: "Business Units",
          newTab: false,
          submenu: [
            { id: 41, title: "PT Bosowa Bandar Agensi", path: "/unit-bisnis/bosowa-bandar-agensi", newTab: false },
            { id: 42, title: "PT Bosowa Bandar Indonesia", path: "/unit-bisnis/bosowa-bandar-indonesia", newTab: false },
            { id: 43, title: "PT Jasa Pelabuhan Indonesia", path: "/unit-bisnis/jasa-pelabuhan-indonesia", newTab: false },
          ],
        },
        { id: 5, title: "Branch Info", path: "/branch-info", newTab: false },
        { id: 6, title: "Publications", path: "/publications", newTab: false },
        { id: 7, title: "Contact", path: "/#Footer", newTab: false },
      ];
    }
    return menuData;
  };

  const handleLanguageChange = (lang: "id" | "en") => {
    setLanguage(lang);
    
    const routeMap: Record<string, { en: string; id: string }> = {
      about: { en: "/about-us", id: "/about" },
      "visi-misi": { en: "/vision-mission", id: "/visi-misi" },
      berita: { en: "/publications", id: "/berita" },
      "info-cabang": { en: "/branch-info", id: "/info-cabang" },
      "about-us": { en: "/about-us", id: "/about" },
      "vision-mission": { en: "/vision-mission", id: "/visi-misi" },
      publications: { en: "/publications", id: "/berita" },
      "branch-info": { en: "/branch-info", id: "/info-cabang" },
    };

    const currentPath = pathname.split("/")[1] || "/";

    if (routeMap[currentPath]) {
      const target = routeMap[currentPath][lang];
      if (target && target !== pathname) {
        router.push(target);
      }
    }
  };

  const currentMenuData = getMenuData();

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center transition-all duration-500 ${
          sticky
            ? "fixed bg-gradient-to-r from-[#162d5c]/95 via-[#1E468C]/95 to-[#162d5c]/95 backdrop-blur-xl py-2 shadow-lg shadow-black/10"
            : "relative bg-gradient-to-r from-[#162d5c] via-[#1E468C] to-[#162d5c] py-3"
        }`}
      >
        {/* Subtle top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/images/logo/logo-light.png"
                    alt="Bosowa Bandar Indonesia"
                    width={160}
                    height={40}
                    className={`relative transition-all duration-300 ${sticky ? "w-[130px]" : "w-[150px]"}`}
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <ul className="flex items-center gap-1">
                {currentMenuData.map((menuItem, index) => (
                  <li key={index} className="relative group">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        onClick={(e) => handleAnchorClick(e, menuItem.path)}
                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                          pathname === menuItem.path
                            ? "text-white bg-white/10"
                            : "text-gray-200 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {menuItem.title}
                        {pathname === menuItem.path && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                        )}
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSubmenu(index)}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                        >
                          {menuItem.title}
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {/* Desktop Dropdown */}
                        <div
                          className={`absolute top-full left-0 mt-2 w-64 origin-top transition-all duration-300 ${
                            openIndex === index
                              ? "opacity-100 scale-100 visible"
                              : "opacity-0 scale-95 invisible"
                          }`}
                        >
                          <div className="bg-[#1E468C]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden">
                            {menuItem.submenu?.map((submenuItem, idx) => (
                              <Link
                                href={submenuItem.path}
                                key={idx}
                                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/5 last:border-0"
                                onClick={() => setOpenIndex(-1)}
                              >
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
                
                {/* Admin Menu (Desktop) */}
                {adminLoggedIn && (
                  <li className="relative group">
                    <button
                      onClick={() => handleSubmenu(menuData.length)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Admin
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${openIndex === menuData.length ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`absolute top-full right-0 mt-2 w-48 origin-top transition-all duration-300 ${
                        openIndex === menuData.length
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible"
                      }`}
                    >
                      <div className="bg-[#1E468C]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                        <Link
                          href="/admin/berita"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-all"
                          onClick={() => setOpenIndex(-1)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Kelola
                        </Link>
                        <button
                          type="button"
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                          onClick={() => {
                            handleAdminLogout();
                            setOpenIndex(-1);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Keluar
                        </button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Language Switcher */}
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10">
                  <button
                    onClick={() => handleLanguageChange("id")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                      language === "id"
                        ? "bg-white shadow-lg scale-105"
                        : "hover:bg-white/10"
                    }`}
                    aria-label="Bahasa Indonesia"
                  >
                    <FlagID className="h-4 w-4 rounded-sm" />
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                      language === "en"
                        ? "bg-white shadow-lg scale-105"
                        : "hover:bg-white/10"
                    }`}
                    aria-label="English"
                  >
                    <FlagGB className="h-4 w-4 rounded-sm" />
                  </button>
                </div>

                {/* Theme Toggle */}
                <ThemeToggler />

                {/* Sign In Button - only show when not logged in */}
                {!adminLoggedIn && (
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1E468C] bg-white hover:bg-gray-100 rounded-full shadow-lg shadow-black/10 hover:shadow-black/20 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    {language === "id" ? "Masuk" : "Sign In"}
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="relative lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${
                      navbarOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                      navbarOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${
                      navbarOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden transition-opacity duration-300 ${
          navbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setNavbarOpen(false)}
      />

      <nav
        id="navbarCollapse"
        className={`fixed top-0 right-0 z-[110] h-full w-[300px] bg-gradient-to-b from-[#162d5c] to-[#1E468C] shadow-2xl lg:hidden transform transition-transform duration-300 ease-out ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Image
            src="/images/logo/logo-light.png"
            alt="Bosowa"
            width={120}
            height={30}
            className="w-[100px]"
          />
          <button
            onClick={() => setNavbarOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-80px)] py-4">
          <ul className="px-4 space-y-1">
            {currentMenuData.map((menuItem, index) => (
              <li key={index}>
                {menuItem.path ? (
                  <Link
                    href={menuItem.path}
                    onClick={(e) => {
                      handleAnchorClick(e, menuItem.path);
                      setNavbarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      pathname === menuItem.path
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${pathname === menuItem.path ? "bg-red-500" : "bg-gray-500"}`} />
                    {menuItem.title}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleSubmenu(index)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                        {menuItem.title}
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-white/10 pl-4">
                        {menuItem.submenu?.map((submenuItem, idx) => (
                          <Link
                            href={submenuItem.path}
                            key={idx}
                            className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            onClick={() => {
                              setNavbarOpen(false);
                              setOpenIndex(-1);
                            }}
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </li>
            ))}

            {/* Admin Menu (Mobile) */}
            {adminLoggedIn && (
              <li className="pt-2 mt-2 border-t border-white/10">
                <button
                  onClick={() => handleSubmenu(menuData.length)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Admin
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openIndex === menuData.length ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === menuData.length ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-white/10 pl-4">
                    <Link
                      href="/admin/berita"
                      className="block px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                      onClick={() => {
                        setNavbarOpen(false);
                        setOpenIndex(-1);
                      }}
                    >
                      Kelola
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                      onClick={() => {
                        handleAdminLogout();
                        setNavbarOpen(false);
                        setOpenIndex(-1);
                      }}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>

          {/* Mobile Bottom Actions */}
          <div className="px-4 mt-6 pt-6 border-t border-white/10 space-y-4">
            {/* Language Switcher */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {language === "id" ? "Bahasa" : "Language"}
              </span>
              <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10">
                <button
                  onClick={() => handleLanguageChange("id")}
                  className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                    language === "id" ? "bg-white shadow-lg" : "hover:bg-white/10"
                  }`}
                >
                  <FlagID className="h-5 w-5 rounded-sm" />
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                    language === "en" ? "bg-white shadow-lg" : "hover:bg-white/10"
                  }`}
                >
                  <FlagGB className="h-5 w-5 rounded-sm" />
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {language === "id" ? "Tema" : "Theme"}
              </span>
              <ThemeToggler />
            </div>

            {/* Sign In Button - only show when not logged in */}
            {!adminLoggedIn && (
              <Link
                href="/signin"
                onClick={() => setNavbarOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#1E468C] bg-white hover:bg-gray-100 rounded-xl shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                {language === "id" ? "Masuk" : "Sign In"}
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
