
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Ketentuan Layanan</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Penerimaan Ketentuan</h2>
              <p className="text-gray-700">
                Dengan mengakses atau menggunakan UntukSelamaNya ("Layanan"), Anda setuju untuk terikat oleh ketentuan layanan ini. Jika Anda tidak setuju dengan bagian apapun dari ketentuan ini, Anda tidak boleh mengakses Layanan.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Deskripsi Layanan</h2>
              <p className="text-gray-700">
                UntukSelamaNya menyediakan platform untuk pembuatan dan pengelolaan undangan pernikahan digital. Kami menawarkan berbagai template dan fitur yang dapat disesuaikan untuk membuat undangan yang unik. Kami berhak untuk mengubah, menangguhkan, atau menghentikan Layanan (atau bagian dari Layanan) kapan saja tanpa pemberitahuan sebelumnya.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Akun Pengguna</h2>
              <p className="text-gray-700 mb-3">
                Untuk menggunakan beberapa fitur Layanan kami, Anda perlu membuat akun. Anda bertanggung jawab untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Menjaga kerahasiaan kata sandi dan informasi akun Anda.</li>
                <li>Membatasi akses ke perangkat Anda dan keluar dari akun Anda setelah selesai menggunakan Layanan.</li>
                <li>Semua aktivitas yang terjadi dengan akun Anda.</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Kami berhak untuk menonaktifkan akun apa pun jika menurut pertimbangan kami, Anda telah melanggar ketentuan Layanan kami.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Konten Pengguna</h2>
              <p className="text-gray-700 mb-3">
                Layanan kami memungkinkan Anda untuk mengunggah, menyimpan, dan berbagi konten seperti teks, gambar, dan video ("Konten Pengguna"). Dengan mengunggah Konten Pengguna ke Layanan kami:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Anda menjamin bahwa Anda memiliki hak untuk mengunggah dan membagikan konten tersebut.</li>
                <li>Anda memberikan kami lisensi non-eksklusif, bebas royalti, di seluruh dunia untuk menggunakan, menyimpan, dan menampilkan Konten Pengguna Anda untuk tujuan menyediakan dan mempromosikan Layanan.</li>
                <li>Anda bertanggung jawab atas semua Konten Pengguna yang Anda unggah atau bagikan.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Konten yang Dilarang</h2>
              <p className="text-gray-700 mb-3">
                Anda tidak boleh mengunggah atau membagikan konten yang:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Melanggar hukum atau melanggar hak kekayaan intelektual pihak ketiga.</li>
                <li>Mengandung unsur pornografi, kekerasan, atau diskriminasi.</li>
                <li>Memfitnah, mencemarkan nama baik, mengancam, atau melecehkan.</li>
                <li>Mengandung malware, virus, atau kode berbahaya lainnya.</li>
                <li>Menyamar sebagai orang atau entitas lain.</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Kami berhak untuk menghapus Konten Pengguna apa pun yang melanggar ketentuan ini dan/atau menangguhkan atau menghentikan akun pengguna yang bersangkutan.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Pembayaran dan Langganan</h2>
              <p className="text-gray-700 mb-3">
                Beberapa fitur Layanan kami mungkin memerlukan pembayaran atau langganan. Dengan berlangganan:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Anda setuju untuk membayar semua biaya yang terkait dengan langganan Anda.</li>
                <li>Langganan akan diperpanjang secara otomatis kecuali Anda membatalkannya.</li>
                <li>Anda dapat membatalkan langganan kapan saja, tetapi tidak ada pengembalian dana untuk periode yang belum digunakan.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Perubahan Ketentuan</h2>
              <p className="text-gray-700">
                Kami berhak untuk mengubah ketentuan layanan ini kapan saja. Perubahan akan berlaku segera setelah diposting di situs web. Penggunaan berkelanjutan Anda atas Layanan setelah perubahan tersebut merupakan persetujuan Anda terhadap ketentuan yang baru.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Penyelesaian Sengketa</h2>
              <p className="text-gray-700">
                Segala sengketa yang timbul dari atau terkait dengan ketentuan ini akan diselesaikan melalui negosiasi dan mediasi terlebih dahulu. Jika sengketa tidak dapat diselesaikan dalam 30 hari melalui negosiasi dan mediasi, maka sengketa tersebut akan diselesaikan melalui arbitrase menurut hukum yang berlaku di Indonesia.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Kontak</h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami di:
              </p>
              <p className="text-gray-700 mt-2">
                Email: terms@untukselamanya.com<br />
                Telepon: +62 123 4567 890
              </p>
            </section>
            
            <section className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 text-center">
                Terakhir diperbarui: 16 April 2025
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
