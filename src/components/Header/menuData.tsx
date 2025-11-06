import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Tentang Kami",
    path: "/about",
    newTab: false,
  },
  {
    id: 2,
    title: "Visi & Misi",
    path: "/visi-misi",
    newTab: false,
  },
  {
    id: 3,
    title: "Unit Bisnis",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Bosowa Bandar Agensi",
        path: "/",
        newTab: false,
      },
      {
        id: 32,
        title: "Bosowa Bandar Indonesia",
        path: "/",
        newTab: false,
      },
      {
        id: 33,
        title: "Jasa Pelabuhan Indonesia",
        path: "/",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Publikasi",
    path: "/berita",
    newTab: false,
  },
  {
    id: 5,
    title: "Kontak",
    path: "/#Footer",
    newTab: false,
  },
];
export default menuData;
