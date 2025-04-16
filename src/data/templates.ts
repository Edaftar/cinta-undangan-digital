
export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  category: string;
  popular?: boolean;
}

export const categories = [
  { id: "all", name: "Semua" },
  { id: "elegant", name: "Elegant" },
  { id: "minimalist", name: "Minimalist" },
  { id: "rustic", name: "Rustic" },
  { id: "traditional", name: "Traditional" },
  { id: "modern", name: "Modern" },
  { id: "islamic", name: "Islamic" }
];

export const templates = [
  {
    id: "elegant-1",
    name: "Elegant Rose",
    description: "Template elegan dengan warna rose gold dan sentuhan ornamen floral yang indah.",
    image: "/template-previews/elegant-rose-preview.jpg",
    features: [
      "Animasi transisi halus",
      "Fitur RSVP lengkap",
      "Galeri foto",
      "Cerita cinta",
      "Lokasi peta"
    ],
    category: "elegant",
    popular: true
  },
  {
    id: "minimalist-1",
    name: "Minimalist White",
    description: "Template minimalis dengan latar putih bersih dan tipografi modern.",
    image: "/template-previews/minimalist-preview.jpg",
    features: [
      "Desain sederhana",
      "Loading cepat",
      "Mobile-friendly",
      "Hitung mundur",
      "Lokasi peta"
    ],
    category: "minimalist"
  },
  {
    id: "rustic-1",
    name: "Rustic Charm",
    description: "Template dengan tema rustic yang hangat dengan elemen kayu dan alam.",
    image: "/template-previews/rustic-preview.jpg",
    features: [
      "Efek parallax",
      "Galeri foto",
      "Hitung mundur",
      "Lokasi peta",
      "RSVP online"
    ],
    category: "rustic",
    popular: true
  },
  {
    id: "modern-1",
    name: "Modern Geometry",
    description: "Template modern dengan pola geometris dan warna kontemporer.",
    image: "/template-previews/modern-preview.jpg",
    features: [
      "Animasi SVG",
      "Fully responsive",
      "Hitung mundur",
      "Galeri masonry",
      "RSVP digital"
    ],
    category: "modern"
  },
  {
    id: "jawa-1",
    name: "Javanese Traditional",
    description: "Template dengan tema pernikahan tradisional Jawa yang elegan.",
    image: "/template-previews/javanese-preview.jpg",
    features: [
      "Ornamen batik",
      "Dual language",
      "Kalender Jawa",
      "Galeri foto",
      "RSVP online"
    ],
    category: "traditional"
  },
  {
    id: "islamic-1",
    name: "Islamic Ornament",
    description: "Template dengan tema Islami yang mewah dengan ornamen geometris khas.",
    image: "/template-previews/islamic-preview.jpg",
    features: [
      "Kaligrafi Islami",
      "Ornamen geometris",
      "Ayat suci",
      "Lokasi masjid",
      "RSVP digital"
    ],
    category: "islamic"
  },
  {
    id: "islamic-2",
    name: "Islamic Elegance",
    description: "Template dengan tema Islamic yang elegan dengan ornamen geometris dan kaligrafi modern.",
    image: "/template-previews/islamic-preview.jpg",
    features: [
      "Kaligrafi modern",
      "Animasi halus",
      "Ayat-ayat pilihan",
      "RSVP digital",
      "Mobile-friendly",
      "Background islami",
      "Font Arabic",
      "Tema warna emas-hijau"
    ],
    category: "islamic",
    popular: true
  },
  {
    id: "elegance-white",
    name: "Elegance White",
    description: "Template minimalis modern dengan dominasi warna putih dan tipografi elegan untuk pernikahan mewah.",
    image: "/template-previews/elegance-white-preview.jpg",
    features: [
      "Desain minimalis premium",
      "Animasi transisi halus",
      "Foto profil melingkar",
      "Galeri foto interaktif",
      "Layout modern",
      "Font elegan",
      "RSVP terintegrasi",
      "Kompatibel semua perangkat"
    ],
    category: "minimalist",
    popular: true
  },
  {
    id: "vintage-garden",
    name: "Vintage Garden",
    description: "Template romantis dengan tema taman vintage, ilustrasi flora dan dekorasi klasik.",
    image: "/template-previews/vintage-garden-preview.jpg",
    features: [
      "Ilustrasi floral",
      "Elemen vintage",
      "Animasi scroll lembut",
      "Layout bergaya majalah",
      "Efek foto artistik",
      "Timeline sejarah cinta",
      "Peta interaktif",
      "Ucapan tamu terintegrasi"
    ],
    category: "elegant"
  }
];
