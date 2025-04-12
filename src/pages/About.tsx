
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Shield, Clock, Medal, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-wedding-light-blush to-wedding-ivory py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-6">Tentang UntukSelamaNya</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Kami hadir untuk membantu pasangan menyampaikan momen bahagia pernikahan 
              mereka dengan cara yang elegan dan modern melalui undangan digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white">
                <Link to="/templates">Lihat Template</Link>
              </Button>
              <Button asChild variant="outline" className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush">
                <Link to="/pricing">Paket Harga</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold font-playfair text-center mb-8">Kisah Kami</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  UntukSelamaNya dimulai dari keinginan untuk membantu pasangan di Indonesia menghadirkan undangan pernikahan yang lebih modern, ramah lingkungan, dan tetap menjunjung nilai-nilai tradisi.
                </p>
                <p className="my-4">
                  Didirikan pada tahun 2023, tim kami yang terdiri dari para desainer dan pengembang berdedikasi untuk menciptakan platform undangan pernikahan digital yang mudah digunakan namun tetap elegan.
                </p>
                <p>
                  Nama "UntukSelamaNya" terinspirasi dari komitmen pernikahan yang abadi dan selamanya. Kami percaya bahwa setiap pernikahan adalah awal dari sebuah cerita cinta yang akan berlangsung selamanya, dan kami ingin ikut menjadi bagian dari awal cerita indah tersebut.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-wedding-ivory">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-center mb-12">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-wedding-light-blush p-3 rounded-full inline-flex mb-4">
                  <Heart className="h-8 w-8 text-wedding-rosegold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cinta &amp; Ketulusan</h3>
                <p className="text-gray-600">
                  Kami menyediakan layanan dengan cinta dan ketulusan untuk memastikan setiap undangan merepresentasikan kebahagiaan pasangan.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-wedding-light-blush p-3 rounded-full inline-flex mb-4">
                  <Users className="h-8 w-8 text-wedding-rosegold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fokus pada Pengguna</h3>
                <p className="text-gray-600">
                  Setiap fitur yang kami kembangkan selalu berfokus pada kemudahan dan kebutuhan pengguna.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-wedding-light-blush p-3 rounded-full inline-flex mb-4">
                  <Shield className="h-8 w-8 text-wedding-rosegold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Kepercayaan</h3>
                <p className="text-gray-600">
                  Kami menjunjung tinggi kepercayaan yang diberikan dan berkomitmen memberikan layanan terbaik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair text-center mb-12">Mengapa Memilih Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-wedding-light-blush p-2 rounded-full mr-4 flex-shrink-0">
                  <Medal className="h-5 w-5 text-wedding-rosegold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kualitas Premium</h3>
                  <p className="text-gray-600">
                    Desain undangan yang elegan dan profesional dengan perhatian pada detail untuk memberikan pengalaman terbaik.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-wedding-light-blush p-2 rounded-full mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-wedding-rosegold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Mudah Digunakan</h3>
                  <p className="text-gray-600">
                    Platform yang intuitif memungkinkan Anda membuat undangan digital dalam hitungan menit tanpa keahlian khusus.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-wedding-light-blush p-2 rounded-full mr-4 flex-shrink-0">
                  <Clock className="h-5 w-5 text-wedding-rosegold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hemat Waktu</h3>
                  <p className="text-gray-600">
                    Tak perlu lagi mengantar undangan satu per satu, cukup bagikan link dan semua tamu dapat melihatnya.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-wedding-light-blush p-2 rounded-full mr-4 flex-shrink-0">
                  <Heart className="h-5 w-5 text-wedding-rosegold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ramah Lingkungan</h3>
                  <p className="text-gray-600">
                    Pilihan undangan digital mengurangi penggunaan kertas dan berkontribusi pada pelestarian lingkungan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-wedding-light-blush">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-playfair mb-6">
              Siap Membuat Undangan Pernikahan Digital?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Bergabunglah dengan ribuan pasangan yang telah membagikan momen bahagia mereka
              melalui undangan digital UntukSelamaNya.
            </p>
            <Button asChild className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white px-8 py-6 text-lg">
              <Link to="/templates">Mulai Sekarang</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
