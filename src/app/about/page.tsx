"use client";

import { useLanguage } from "@/app/providers";
import AboutClient from "@/components/About/AboutClient";
import { useEffect } from "react";

const AboutPage = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("id");
  }, [setLanguage]);

  return <AboutClient />;
};

export default AboutPage;
