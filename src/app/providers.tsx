"use client";

import { ThemeProvider } from "next-themes";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// 1. Buat Language Context
type LanguageContextType = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// 2. Buat Language Provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("id"); // Default 'id'

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Buat hook untuk menggunakan context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// 4. Gabungkan dengan Provider yang ada
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        {" "}
        {/* Membungkus semua children */}
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
