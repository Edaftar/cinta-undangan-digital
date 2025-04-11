
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-wedding-purple to-wedding-deep-purple rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-2xl mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Membuat Undangan Pernikahan Digital?
            </h2>
            <p className="text-white text-opacity-90">
              Buat undangan pernikahan digitalmu sekarang dan bagikan kebahagiaan dengan orang tersayang.
            </p>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-wedding-deep-purple hover:bg-wedding-pink px-8 py-6 text-lg"
            asChild
          >
            <Link to="/templates">
              Buat Sekarang <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
