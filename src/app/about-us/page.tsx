"use client";

import { useLanguage } from "@/app/providers";
import AboutClient from "@/components/About/AboutClient";
import { useEffect } from "react";

export default function AboutUsPage() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  return <AboutClient />;
}
