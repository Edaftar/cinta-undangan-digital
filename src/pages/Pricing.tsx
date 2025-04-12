
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "Gratis",
    description: "Pilihan sempurna untuk memulai",
    features: [
      "1 Undangan Digital",
      "Template Dasar",
      "Masa Aktif 1 Bulan",
      "Fitur RSVP Dasar",
      "Galeri Foto (max 5)",
      "Dukungan Email",
    ],
    notIncluded: [
      "Template Premium",
      "Domain Khusus",
      "Tidak Ada Watermark",
      "Analitik Pengunjung",
      "Fitur Amplop Digital",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "Rp 199.000",
    description: "Untuk pengalaman yang lebih lengkap",
    features: [
      "3 Undangan Digital",
      "Semua Template",
      "Masa Aktif 3 Bulan",
      "Fitur RSVP Lengkap",
      "Galeri Foto (max 15)",
      "Domain Khusus",
      "Tanpa Watermark",
      "Dukungan Prioritas",
    ],
    notIncluded: [
      "Analitik Pengunjung Lanjutan",
      "Fitur Amplop Digital",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rp 349.000",
    description: "Pengalaman undangan digital terlengkap",
    features: [
      "Undangan Digital Tak Terbatas",
      "Semua Template",
      "Masa Aktif 1 Tahun",
      "Fitur RSVP Premium",
      "Galeri Foto Tak Terbatas",
      "Domain Khusus",
      "Tanpa Watermark",
      "Dukungan Prioritas 24/7",
      "Analitik Pengunjung Lanjutan",
      "Fitur Amplop Digital",
    ],
    notIncluded: [],
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-wedding-light-blush to-wedding-ivory py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-4">Paket Harga</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
              Pilih paket yang paling sesuai dengan kebutuhan undangan pernikahan digital Anda
            </p>
            
            {/* <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${!annual ? "font-bold" : "text-gray-600"}`}>Bulanan</span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  annual ? "bg-wedding-rosegold" : "bg-gray-300"
                }`}
                onClick={() => setAnnual(!annual)}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    annual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`ml-3 ${annual ? "font-bold" : "text-gray-600"}`}>Tahunan</span>
              <span className="ml-2 text-xs bg-wedding-rosegold text-white px-2 py-1 rounded">Hemat 20%</span>
            </div> */}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:transform hover:scale-105 ${
                    plan.popular ? "ring-2 ring-wedding-rosegold relative" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-wedding-rosegold text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        POPULER
                      </div>
                    </div>
                  )}
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold font-playfair">{plan.name}</h2>
                    <p className="text-gray-600 mt-1">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-sm uppercase text-gray-500 font-semibold">Termasuk</h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <h3 className="text-sm uppercase text-gray-500 font-semibold mt-6">Tidak Termasuk</h3>
                        <ul className="space-y-3">
                          {plan.notIncluded.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-500">
                              <X className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="p-6 bg-gray-50">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
                          : "bg-wedding-champagne hover:bg-opacity-80 text-wedding-text"
                      }`}
                      asChild
                    >
                      <Link to={user ? "/templates" : "/auth/signup"}>
                        {plan.id === "basic" ? "Mulai Gratis" : "Pilih Paket"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-center mb-12">
              Pertanyaan Umum
            </h2>
            <div className="max-w-3xl mx-auto divide-y">
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Berapa lama undangan digital saya akan aktif?</h3>
                <p className="text-gray-600">
                  Lama aktif undangan digital tergantung pada paket yang Anda pilih. Paket Basic aktif selama 1 bulan, Standard selama 3 bulan, dan Premium selama 1 tahun.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Apakah saya bisa mengubah template setelah membuat undangan?</h3>
                <p className="text-gray-600">
                  Ya, Anda dapat mengubah template kapan saja selama undangan masih aktif, tetapi perlu diingat bahwa beberapa konten mungkin perlu disesuaikan dengan template baru.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Bagaimana cara kerja fitur RSVP?</h3>
                <p className="text-gray-600">
                  Fitur RSVP memungkinkan tamu undangan untuk mengonfirmasi kehadiran mereka melalui form yang tersedia di undangan digital. Anda akan mendapatkan notifikasi dan dapat melihat daftar tamu yang telah mengonfirmasi kehadiran di dashboard Anda.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Apakah saya dapat menggunakan domain saya sendiri?</h3>
                <p className="text-gray-600">
                  Ya, untuk paket Standard dan Premium, Anda dapat menggunakan domain khusus (custom domain) untuk undangan digital Anda. Anda perlu membeli domain terlebih dahulu dan kami akan membantu mengaturnya.
                </p>
              </div>
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-2">Bagaimana cara kerja fitur Amplop Digital?</h3>
                <p className="text-gray-600">
                  Fitur Amplop Digital memungkinkan tamu undangan untuk memberikan hadiah pernikahan secara digital melalui transfer bank. Fitur ini hanya tersedia di paket Premium dan mencakup integrasi dengan berbagai metode pembayaran.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-wedding-light-blush">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair mb-6">
              Masih Punya Pertanyaan?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Tim dukungan kami siap membantu Anda dengan pertanyaan apa pun tentang paket dan fitur kami.
            </p>
            <Button asChild variant="outline" className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush px-8 py-6 text-lg">
              <Link to="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
