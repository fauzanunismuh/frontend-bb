// Ubah nama type agar tidak konflik

// Definisikan tipe baru yang diekspor dari blog.ts
type BeritaSekilas = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
};

const BeritaSekilasData: { id: BeritaSekilas[]; en: BeritaSekilas[] } = {
  id: [
    {
      id: 1,
      title:
        "OTO KLINIK Luncurkan Program Membership, Ada Voucher Diskon Servis",
      paragraph:
        "Sebagai bentuk apresiasi kepada pelanggan setia, OTO KLINIK menghadirkan Program Membership yang memberikan keuntungan eksklusif bagi pengguna layanan servis kendaraan.",
      image: "/images/BeritaSekilas/BeritaSekilas1.png",
    },
    {
      id: 2,
      title: "Bosowa Bandar Dukung Efisiensi Logistik Nasional",
      paragraph:
        "Bosowa Bandar Indonesia terus memperkuat perannya dalam mendukung rantai pasok nasional melalui layanan pelabuhan yang modern, cepat, dan efisien.",
      image: "/images/BeritaSekilas/BeritaSekilas2.png",
    },
    {
      id: 3,
      title: "Sinergi Bersama Mitra untuk Pelayanan Lebih Baik",
      paragraph:
        "Melalui kolaborasi strategis dengan berbagai mitra usaha, Bosowa Bandar berkomitmen memberikan layanan pelabuhan yang unggul dan berdaya saing.",
      image: "/images/BeritaSekilas/BeritaSekilas3.png",
    },
  ],
  en: [
    {
      id: 1,
      title:
        "OTO KLINIK Launches Membership Program, Service Discount Vouchers Available",
      paragraph:
        "As a form of appreciation for loyal customers, OTO KLINIK introduces a Membership Program that provides exclusive benefits for vehicle service users.",
      image: "/images/BeritaSekilas/BeritaSekilas1.png",
    },
    {
      id: 2,
      title: "Bosowa Bandar Supports National Logistics Efficiency",
      paragraph:
        "Bosowa Bandar Indonesia continues to strengthen its role in supporting the national supply chain through modern, fast, and efficient port services.",
      image: "/images/BeritaSekilas/BeritaSekilas2.png",
    },
    {
      id: 3,
      title: "Synergy with Partners for Better Service",
      paragraph:
        "Through strategic collaboration with various business partners, Bosowa Bandar is committed to providing superior and competitive port services.",
      image: "/images/BeritaSekilas/BeritaSekilas3.png",
    },
  ],
};

export default BeritaSekilasData;
