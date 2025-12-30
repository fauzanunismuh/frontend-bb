"use client";

import { useLanguage } from "@/app/providers";
import BeritaClient from "@/components/Berita/BeritaClient";
import { PublicBerita, getBeritaPublic } from "@/lib/api";
import { useEffect, useState } from "react";

export default function PublicationsPage() {
  const { setLanguage } = useLanguage();
  const [newsList, setNewsList] = useState<PublicBerita[]>([]);
  
  // We need to fetch data here or reuse the same logic
  // Simple fetch on mount for now
  useEffect(() => {
    setLanguage("en");
    
    // Fetch news
    getBeritaPublic({ limit: 9 }).then(res => {
      setNewsList(res.data);
    }).catch(err => console.error(err));
  }, [setLanguage]);

  return <BeritaClient newsList={newsList} />;
}
