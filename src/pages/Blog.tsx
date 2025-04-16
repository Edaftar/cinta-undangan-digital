
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, ArrowRight, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Ide Pernikahan Outdoor yang Memukau",
      slug: "ide-pernikahan-outdoor",
      excerpt: "Panduan lengkap untuk merancang pernikahan outdoor yang sempurna dengan tips dekorasi dan persiapan.",
      image: "/blog/wedding-outdoor.jpg",
      author: "Siti Rahayu",
      date: "2025-03-15",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Cara Memilih Kue Pengantin yang Tepat",
      slug: "memilih-kue-pengantin",
      excerpt: "Temukan tips untuk memilih kue pengantin yang sesuai dengan tema, jumlah tamu, dan budget Anda.",
      image: "/blog/wedding-cake.jpg",
      author: "Budi Santoso",
      date: "2025-03-01",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Tren Bunga untuk Pernikahan di 2025",
      slug: "tren-bunga-pernikahan",
      excerpt: "Temukan tren bunga terpopuler untuk pernikahan di tahun 2025 dengan pilihan warna dan jenis bunga.",
      image: "/blog/wedding-flowers.jpg",
      author: "Diana Putri",
      date: "2025-02-20",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Tips Memilih Vendor Katering untuk Pernikahan",
      slug: "tips-vendor-katering",
      excerpt: "Panduan lengkap untuk memilih vendor katering yang tepat untuk hari pernikahan Anda.",
      image: "/blog/wedding-catering.jpg",
      author: "Ahmad Hidayat",
      date: "2025-02-10",
      readTime: "7 min"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-wedding-light-blush to-wedding-ivory py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog UntukSelamaNya</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tips, inspirasi, dan panduan untuk membantu Anda merencanakan pernikahan impian.
            </p>
          </div>
        </section>
        
        {/* Blog Posts Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-[3/2] bg-gray-200">
                    <img 
                      src={post.image || "/placeholder.svg"} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-wedding-rosegold" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      
                      <Button variant="link" className="text-wedding-rosegold p-0" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Baca Selengkapnya <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ingin melihat lebih banyak artikel tentang pernikahan?
              </p>
              <Button variant="outline" className="border-wedding-rosegold text-wedding-rosegold">
                Lihat Semua Artikel
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
