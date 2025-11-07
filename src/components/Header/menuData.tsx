import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Kami",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Visi & Misi",
    path: "/visi-misi",
    newTab: false,
  },
  {
    id: 4,
    title: "Unit Bisnis",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "PT Bosowa Bandar Agensi",
        path: "/unit-bisnis/bosowa-bandar-agensi",
        newTab: false,
      },
      {
        id: 42,
        title: "PT Bosowa Bandar Indonesia",
        path: "/unit-bisnis/bosowa-bandar-indonesia",
        newTab: false,
      },
      {
        id: 43,
        title: "PT Jasa Pelabuhan Indonesia",
        path: "/unit-bisnis/jasa-pelabuhan-indonesia",
        newTab: false,
      },
    ],
  },
  {
    id: 5,
    title: "Publikasi",
    path: "/berita",
    newTab: false,
  },
  {
    id: 6,
    title: "Kontak",
    path: "/#Footer",
    newTab: false,
  },
];
export default menuData;
