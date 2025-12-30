"use client";

import { useLanguage } from "@/app/providers";
import InfoCabangClient from "@/components/InfoCabang/InfoCabangClient";
import { useEffect } from "react";

export default function BranchInfoPage() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  return <InfoCabangClient />;
}
