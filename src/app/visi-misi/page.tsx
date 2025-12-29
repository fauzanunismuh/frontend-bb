"use client";

import { useLanguage } from "@/app/providers";
import VisiMisiClient from "@/components/VisiMisi/VisiMisiClient";
import { useEffect } from "react";

const VisiMisiPage = () => {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("id");
  }, [setLanguage]);

  return <VisiMisiClient />;
};

export default VisiMisiPage;
