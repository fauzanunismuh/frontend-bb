"use client";
import { useState } from "react";

const Contact = () => {
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
    alert("Pesan terkirim!");
  };

  return (
    <section
      id="contact"
      className="relative bg-cover bg-center py-20"
      style={{
        backgroundImage: "url('/images/contact/pelabuhan.jpg')", // ubah sesuai gambar background-mu
      }}
    >
      {/* Overlay transparan opsional */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl md:flex-row">
          {/* KIRI: Peta & Info Kontak */}
          <div className="w-full p-8 md:w-1/2">
            <h2 className="mb-6 text-2xl font-bold text-black">Kontak</h2>

            <div className="mb-6 h-[250px] w-full overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1986.903175462349!2d119.41332684624446!3d-5.134862231354158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf1d565744bd59%3A0x7bc6dc5b9fc4bb3!2sMenara%20Bosowa!5e0!3m2!1sid!2sid!4v1762399905057!5m2!1sid!2sid"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Menara Bosowa"
              ></iframe>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-gray-700">
              <p>
                <strong>Kantor Pusat (Menara Bosowa Lt. 8 Unit J)</strong>
                <br />
                Jl. Jend. Sudirman No. 5
                <br />
                Makassar 90113
                <br />
                Sulawesi Selatan, Indonesia
              </p>

              <p className="flex items-center space-x-2">
                <i className="fa-solid fa-phone text-primary"></i>
                <span>+62 411 567 890</span>
              </p>
              <p className="flex items-center space-x-2">
                <i className="fa-solid fa-envelope text-primary"></i>
                <span>bosowabandarindonesia@bosowa.co.id</span>
              </p>
            </div>
          </div>

          {/* KANAN: Form Kontak */}
          <div className="w-full bg-gray-50 p-8 md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nama Anda
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
                  E-mail Anda
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
                  Subjek
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
                  Pesan Anda (opsional)
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 rounded-md px-6 py-2 text-sm font-semibold text-white"
              >
                KIRIM
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
