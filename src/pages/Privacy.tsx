
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Kebijakan Privasi</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p className="mb-4">
              UntukSelamaNya berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
              menggunakan, dan membagikan informasi pribadi Anda ketika Anda menggunakan layanan kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Informasi yang Anda Berikan</h3>
            <p className="mb-4">
              Kami mengumpulkan informasi yang Anda berikan secara langsung saat Anda:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Membuat akun (nama, email, password)</li>
              <li>Membuat undangan pernikahan (nama pasangan, tanggal, lokasi acara)</li>
              <li>Mengunggah foto atau konten lainnya</li>
              <li>Berkomunikasi dengan kami</li>
              <li>Berlangganan layanan premium kami</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Informasi yang Dikumpulkan Secara Otomatis</h3>
            <p className="mb-4">
              Saat Anda menggunakan layanan kami, kami dapat mengumpulkan informasi tertentu secara otomatis, termasuk:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Log perangkat dan penggunaan (alamat IP, jenis perangkat, dll.)</li>
              <li>Informasi tentang bagaimana Anda berinteraksi dengan layanan kami</li>
              <li>Cookie dan teknologi pelacakan serupa</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="mb-4">
              Kami menggunakan informasi yang kami kumpulkan untuk:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Menyediakan dan memelihara layanan kami</li>
              <li>Mengembangkan fitur dan konten baru</li>
              <li>Memproses transaksi pembayaran</li>
              <li>Mengirim pemberitahuan terkait akun Anda</li>
              <li>Merespons pertanyaan dan memberikan dukungan pelanggan</li>
              <li>Memahami bagaimana pengguna menggunakan layanan kami</li>
              <li>Mendeteksi, mencegah, dan mengatasi masalah teknis atau keamanan</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Berbagi Informasi Anda</h2>
            <p className="mb-4">
              Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi pengguna kami kepada pihak lain. Kami dapat membagikan
              informasi dalam keadaan berikut:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Dengan penyedia layanan dan mitra yang membantu kami menjalankan layanan</li>
              <li>Untuk mematuhi kewajiban hukum</li>
              <li>Untuk melindungi hak, properti, atau keselamatan UntukSelamaNya, pengguna kami, atau publik</li>
              <li>Sehubungan dengan penjualan, merger, atau akuisisi semua atau sebagian bisnis kami</li>
              <li>Dengan persetujuan Anda</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Keamanan Data</h2>
            <p className="mb-4">
              Kami mengimplementasikan langkah-langkah keamanan yang tepat untuk melindungi terhadap akses, pengubahan,
              pengungkapan, atau perusakan yang tidak sah terhadap informasi pribadi Anda. Namun, tidak ada metode transmisi
              internet atau penyimpanan elektronik yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Retensi Data</h2>
            <p className="mb-4">
              Kami akan menyimpan informasi pribadi Anda selama diperlukan untuk memenuhi tujuan yang diuraikan dalam
              kebijakan privasi ini, kecuali jika periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Hak Privasi Anda</h2>
            <p className="mb-4">
              Tergantung pada lokasi Anda, Anda mungkin memiliki hak tertentu sehubungan dengan informasi pribadi Anda, termasuk:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Mengakses informasi pribadi Anda</li>
              <li>Memperbaiki informasi yang tidak akurat</li>
              <li>Menghapus informasi pribadi Anda</li>
              <li>Membatasi pemrosesan informasi Anda</li>
              <li>Menerima informasi pribadi Anda dalam format yang dapat dibaca mesin</li>
              <li>Mengajukan keberatan terhadap pemrosesan tertentu dari informasi Anda</li>
              <li>Mencabut persetujuan pada setiap saat</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">7. Cookie dan Teknologi Pelacakan</h2>
            <p className="mb-4">
              Kami menggunakan cookie dan teknologi pelacakan serupa untuk melacak aktivitas di layanan kami dan menyimpan informasi
              tertentu. Anda dapat mengatur browser Anda untuk menolak semua cookie atau untuk menunjukkan kapan cookie dikirim.
              Namun, jika Anda tidak menerima cookie, Anda mungkin tidak dapat menggunakan beberapa bagian dari layanan kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">8. Perubahan pada Kebijakan Privasi Ini</h2>
            <p className="mb-4">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan dengan
              memposting kebijakan baru dan memperbarui tanggal "terakhir diperbarui" di halaman ini. Anda disarankan untuk meninjau
              kebijakan ini secara berkala untuk informasi terbaru tentang praktik privasi kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">9. Kontak Kami</h2>
            <p className="mb-4">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di <a href="mailto:hello@untukselamanya.com" className="text-wedding-rosegold hover:underline">hello@untukselamanya.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
