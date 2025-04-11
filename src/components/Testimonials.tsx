
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rina & Andi',
    image: '/placeholder.svg',
    rating: 5,
    text: 'Terima kasih Cinta! Undangan pernikahan kami jadi sangat cantik dan personal. Banyak tamu yang memuji tampilannya.',
    date: '10 Maret 2023'
  },
  {
    name: 'Diana & Budi',
    image: '/placeholder.svg',
    rating: 5,
    text: 'Proses pembuatan sangat mudah dan hasilnya memuaskan. Fitur RSVP digital sangat membantu kami mendata kehadiran tamu.',
    date: '25 April 2023'
  },
  {
    name: 'Sinta & Rudi',
    image: '/placeholder.svg',
    rating: 5,
    text: 'Desainnya elegan dan banyak pilihan. Customer service juga sangat membantu ketika kami butuh bantuan.',
    date: '15 Juni 2023'
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-wedding-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Apa Kata Mereka?</h2>
          <p className="text-gray-600">
            Pasangan yang telah menggunakan layanan undangan digital Cinta
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <p className="text-sm text-gray-500 mt-4">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
