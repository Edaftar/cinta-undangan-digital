
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Kebijakan Privasi</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Pendahuluan</h2>
              <p className="text-gray-700">
                UntukSelamaNya ("kami", "kita", atau "perusahaan kami") menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan privasi ini akan menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkapkan informasi yang kami kumpulkan dari Anda ketika Anda menggunakan layanan kami.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-700 mb-3">
                Kami mengumpulkan beberapa jenis informasi dari pengguna kami, termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Informasi identitas pribadi (nama, alamat email, nomor telepon, dll) yang Anda berikan saat mendaftar ke layanan kami.</li>
                <li>Informasi yang Anda berikan saat membuat undangan pernikahan digital (nama pasangan, detail acara, foto, dll).</li>
                <li>Data tentang cara Anda menggunakan layanan kami, seperti halaman yang Anda kunjungi dan fitur yang Anda gunakan.</li>
                <li>Informasi teknis seperti jenis perangkat, sistem operasi, dan data browser yang Anda gunakan.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Bagaimana Kami Menggunakan Informasi Anda</h2>
              <p className="text-gray-700 mb-3">
                Kami menggunakan informasi yang kami kumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Menyediakan, mengoperasikan, dan memelihara layanan kami</li>
                <li>Meningkatkan, mempersonalisasi, dan mengembangkan layanan kami</li>
                <li>Memahami dan menganalisis bagaimana Anda menggunakan layanan kami</li>
                <li>Mengembangkan produk baru, layanan, fitur, dan fungsionalitas</li>
                <li>Berkomunikasi dengan Anda, baik secara langsung atau melalui salah satu mitra kami, termasuk untuk layanan pelanggan</li>
                <li>Mengirimkan email, pembaruan, atau informasi penting lainnya</li>
                <li>Menemukan dan mencegah penipuan</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Penyimpanan Data</h2>
              <p className="text-gray-700">
                Kami akan menyimpan data pribadi Anda hanya selama diperlukan untuk tujuan yang kami kumpulkan. Kami akan menyimpan dan menggunakan informasi Anda sejauh yang diperlukan untuk mematuhi kewajiban hukum kami, menyelesaikan perselisihan, dan menegakkan perjanjian kami.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Keamanan Data</h2>
              <p className="text-gray-700">
                Keamanan data Anda penting bagi kami, tetapi ingat bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindungi informasi pribadi Anda, kami tidak dapat menjamin keamanan absolutnya.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Perubahan pada Kebijakan Privasi Ini</h2>
              <p className="text-gray-700">
                Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini dan, jika perubahan signifikan, kami akan mengirimkan pemberitahuan kepada Anda melalui email.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:
              </p>
              <p className="text-gray-700 mt-2">
                Email: privacy@untukselamanya.com<br />
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

export default Privacy;
