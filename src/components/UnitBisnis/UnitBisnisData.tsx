import { Feature } from "@/types/feature";

// Definisikan ikon di luar agar bisa dipakai ulang
const iconKeagenan = (
  <img
    src="/images/unit-bisnis/iconKeagenan.svg"
    alt="Keagenan Kapal"
    width="44"
    height="44"
    className="text-primary"
  />
);

const iconBongkar = (
  <img
    src="/images/unit-bisnis/iconBongkar.svg"
    alt="Keagenan Kapal"
    width="44"
    height="44"
    className="text-primary"
  />
);

const iconTunda = (
  <img
    src="/images/unit-bisnis/iconTunda.svg"
    alt="Keagenan Kapal"
    width="44"
    height="44"
    className="text-primary"
  />
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
