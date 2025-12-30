"use client";

import { useLanguage } from "@/app/providers";
import VisiMisiClient from "@/components/VisiMisi/VisiMisiClient";
import { useEffect } from "react";

export default function VisionMissionPage() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage("en");
  }, [setLanguage]);

  return <VisiMisiClient />;
}
