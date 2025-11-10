"use client";
import { useLanguage } from "@/app/providers"; // Impor hook
import { useState } from "react";

// Teks
const texts = {
  id: {
    title: "Kontak",
    office: "Kantor Pusat (Menara Bosowa Lt. 8 Unit J)",
    address:
      "Jl. Jend. Sudirman No. 5\nMakassar 90113\nSulawesi Selatan, Indonesia",
    email: "Email:",
    whatsapp: "WhatsApp:",
    website: "Website:",
    formName: "Nama Anda",
    formEmail: "E-mail Anda",
    formSubject: "Subjek",
    formMessage: "Pesan Anda (opsional)",
    buttonSubmit: "KIRIM",
    alertMessage: "Pesan terkirim!",
  },
  en: {
    title: "Contact",
    office: "Head Office (Menara Bosowa 8th Fl. Unit J)",
    address:
      "Jl. Jend. Sudirman No. 5\nMakassar 90113\nSouth Sulawesi, Indonesia",
    email: "Email:",
    whatsapp: "WhatsApp:",
    website: "Website:",
    formName: "Your Name",
    formEmail: "Your E-mail",
    formSubject: "Subject",
    formMessage: "Your Message (optional)",
    buttonSubmit: "SUBMIT",
    alertMessage: "Message sent!",
  },
};

const Contact = () => {
  const { language } = useLanguage(); // Panggil hook
  const t = language === "en" ? texts.en : texts.id; // Pilih teks

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t.alertMessage);
  };

  return (
    <section
      id="contact"
      className="relative bg-cover bg-center py-20"
      style={{
        backgroundImage: "url('/images/contact/pelabuhan.jpg')",
      }}
    >
      {/* ... (Overlay) ... */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl md:flex-row">
          {/* KIRI: Peta & Info Kontak */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="mb-6 text-2xl font-bold text-black">{t.title}</h2>

            {/* ... (iFrame Peta) ... */}

            <div className="space-y-3 text-sm leading-relaxed text-gray-700">
              <p>
                <strong>{t.office}</strong>
                <br />
                {t.address.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>

              <p className="flex items-center space-x-2">
                <i className="fa-solid fa-phone text-primary"></i>
                <span>+62 411 567 890</span>
              </p>
              <p className="flex items-center space-x-2">
                <i className="fa-solid fa-envelope text-primary"></i>
                <span>{t.email} bosowabandarindonesia@bosowa.co.id</span>
              </p>
              <p className="flex items-center space-x-2">
                <i className="fa-brands fa-whatsapp text-primary"></i>
                <span>{t.whatsapp} +62 898 8821 777</span>
              </p>
              <p className="flex items-center space-x-2">
                <i className="fa-solid fa-globe text-primary"></i>
                <span>
                  {t.website}{" "}
                  <a href="https://bosowabandar.com/">
                    https://bosowabandar.com/
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* KANAN: Form Kontak */}
          <div className="w-full bg-gray-50 p-8 md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t.formName}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t.formEmail}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t.formSubject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t.formMessage}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 rounded-md px-6 py-2 text-sm font-semibold text-white"
              >
                {t.buttonSubmit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
