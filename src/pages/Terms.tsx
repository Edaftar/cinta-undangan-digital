
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">Last updated: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">1. Penerimaan Syarat dan Ketentuan</h2>
            <p className="mb-4">
              Dengan mengakses atau menggunakan layanan UntukSelamaNya, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.
              Jika Anda tidak setuju dengan bagian manapun dari syarat ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">2. Perubahan Layanan</h2>
            <p className="mb-4">
              UntukSelamaNya berhak untuk setiap saat memodifikasi atau menghentikan, sementara atau permanen, sebagian atau seluruh
              layanan dengan atau tanpa pemberitahuan sebelumnya. Anda setuju bahwa UntukSelamaNya tidak bertanggung jawab kepada Anda atau pihak
              ketiga manapun atas perubahan, penangguhan, atau penghentian layanan.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">3. Akun Pengguna</h2>
            <p className="mb-4">
              Untuk menggunakan beberapa fitur layanan kami, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk menjaga
              kerahasiaan kredensial akun Anda, termasuk kata sandi, dan untuk semua aktivitas yang terjadi di bawah akun Anda.
              Anda harus segera memberi tahu UntukSelamaNya tentang penggunaan tidak sah akun Anda atau pelanggaran keamanan lainnya.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">4. Penggunaan yang Diizinkan</h2>
            <p className="mb-4">
              Anda setuju untuk tidak mereproduksi, menduplikasi, menyalin, menjual, memperdagangkan, atau mengeksploitasi bagian mana pun
              dari layanan UntukSelamaNya, penggunaan layanan, atau akses ke layanan tanpa izin tertulis dari kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">5. Hak Kekayaan Intelektual</h2>
            <p className="mb-4">
              Konten yang tersedia melalui layanan kami, termasuk tetapi tidak terbatas pada teks, grafik, logo, ikon, gambar, klip audio,
              unduhan digital, dan kompilasi data adalah milik UntukSelamaNya atau pemberi lisensinya dan dilindungi oleh hukum hak cipta Indonesia
              dan internasional. Seluruh perangkat lunak yang digunakan pada layanan adalah milik UntukSelamaNya atau pemasok perangkat lunaknya
              dan dilindungi oleh hukum hak cipta Indonesia dan internasional.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">6. Penghentian Akun</h2>
            <p className="mb-4">
              UntukSelamaNya berhak untuk menangguhkan atau menghentikan akun Anda dan menolak layanan saat ini atau di masa depan dengan atau tanpa
              alasan dan tanpa pemberitahuan untuk alasan apapun, termasuk jika kami yakin bahwa Anda telah melanggar ketentuan ini.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">7. Batasan Tanggung Jawab</h2>
            <p className="mb-4">
              UntukSelamaNya tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau teladan, termasuk
              tetapi tidak terbatas pada kehilangan keuntungan yang diakibatkan dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">8. Ganti Rugi</h2>
            <p className="mb-4">
              Anda setuju untuk membela, mengganti rugi, dan membebaskan UntukSelamaNya, afiliasinya, dan masing-masing direktur, pejabat, karyawan,
              dan agennya dari dan terhadap klaim, kewajiban, kerusakan, kerugian, dan biaya, termasuk biaya pengacara yang wajar, yang timbul dari
              atau dengan cara apapun terkait dengan penggunaan layanan kami oleh Anda, pelanggaran Anda terhadap ketentuan ini, atau pelanggaran Anda
              terhadap hak pihak ketiga.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">9. Hukum yang Berlaku</h2>
            <p className="mb-4">
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang timbul dari atau
              terkait dengan ketentuan ini akan tunduk pada yurisdiksi eksklusif pengadilan di Indonesia.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-4">10. Kontak</h2>
            <p className="mb-4">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di <a href="mailto:hello@untukselamanya.com" className="text-wedding-rosegold hover:underline">hello@untukselamanya.com</a>
            </p>
            
            <p className="italic text-gray-600 mt-8">
              Dengan menggunakan layanan UntukSelamaNya, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
