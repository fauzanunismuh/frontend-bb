"use client";

import { useLanguage } from "@/app/providers";
import InfoCabangClient from "@/components/InfoCabang/InfoCabangClient";
import { useEffect } from "react";

export default function InfoCabangPage() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("id");
  }, [setLanguage]);

  return <InfoCabangClient />;
}
