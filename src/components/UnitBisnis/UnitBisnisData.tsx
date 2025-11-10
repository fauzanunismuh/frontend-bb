import { Feature } from "@/types/feature";

// Definisikan ikon di luar agar bisa dipakai ulang
const iconKeagenan = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    className="text-primary fill-current"
  >
    {/* Icon baru untuk Keagenan Kapal (Kapal) */}
    <path d="M21.99 8c0-.55-.45-1-1-1h-1.01L18.2 3.68c-.19-.38-.58-.62-.99-.62H6.79c-.41 0-.8.24-.99.62L4.02 7H3c-.55 0-1 .45-1 1s.45 1 1 1h1v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V9h1c.55 0 1-.45 1-1zM6.85 5h10.29l1.04 2H5.81l1.04-2zM17 18H7V9h10v9z" />
  </svg>
);

const iconBongkar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    className="text-primary fill-current"
  >
    {/* Icon untuk Jasa Bongkar Muat (Crane) */}
    <path d="M2 21h20v-2H2v2zm17-9V7l3-3V2h-4v2l-3 3v5l-4-4-8 8v3h2v-2.59L12 10l5 5.41V20h2v-8h2z" />
  </svg>
);

const iconTunda = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    className="text-primary fill-current"
  >
    {/* Icon untuk Layanan Kapal Tunda */}
    <path d="M20 21c-2.5 0-4.71-1.28-6-3.22C12.71 19.72 10.5 21 8 21H4v-2h4c1.66 0 3-1.34 3-3v-2H7V8l5-4 5 4v6h-4v2c0 1.66 1.34 3 3 3h4v2h-4zM12 6.3 9.6 8h4.8L12 6.3z" />
  </svg>
);

export const UnitBisnisData: { [key: string]: Feature[] } = {
  id: [
    {
      id: 1,
      icon: iconKeagenan,
      title: "Keagenan Kapal",
      paragraph:
        "Menyediakan layanan agensi perkapalan terbaik untuk kebutuhan reguler maupun sistem pelayaran bebas. Kami telah melayani dibeberapa pelabuhan di Indonesia, diantaranya Pelabuhan Makassar, Jeneponto, Barru, Konawe dan Banyuwangi.",
    },
    {
      id: 2,
      icon: iconBongkar,
      title: "Jasa Bongkar Muat (PBM)",
      paragraph:
        "Melayani kegiatan pembongkaran barang dari kapal ke dermaga dan pemuatan barang dari dermaga ke kapal.",
    },
    {
      id: 3,
      icon: iconTunda,
      title: "Layanan Kapal Tunda",
      paragraph:
        "Layanan kapal tunda (tug assist) untuk membantu kapal lain, baik dalam mendorong, menarik, maupun menggandeng kapal, khususnya saat akan merapat atau meninggalkan dermaga di pelabuhan.",
    },
  ],
  en: [
    {
      id: 1,
      icon: iconKeagenan,
      title: "Ship Agency",
      paragraph:
        "Providing the best shipping agency services for regular needs or free shipping systems. We have served several ports in Indonesia, including Makassar, Jeneponto, Barru, Konawe, and Banyuwangi.",
    },
    {
      id: 2,
      icon: iconBongkar,
      title: "Stevedoring Services (PBM)",
      paragraph:
        "Serving the activities of unloading goods from the ship to the dock and loading goods from the dock to the ship.",
    },
    {
      id: 3,
      icon: iconTunda,
      title: "Tugboat Services",
      paragraph:
        "Tug assist services to help other vessels, whether pushing, pulling, or towing, especially when docking or leaving the pier.",
    },
  ],
};

// Ekspor default lama (jika ada file lain yang masih menggunakannya)
// Anda bisa hapus ini jika sudah migrasi semua
export default UnitBisnisData.id;
