
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TemplateCard from "@/components/TemplateCard";
import { templates, categories } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-wedding-ivory">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-wedding-light-blush to-wedding-ivory py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Template Undangan Pernikahan</h1>
              <p className="text-gray-600 mb-8">
                Pilih template yang sesuai dengan selera dan tema pernikahanmu
              </p>
              
              <div className="relative mb-8 max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Cari template..."
                  className="pl-10 py-6 bg-white border-wedding-rosegold focus:border-wedding-deep-rosegold focus:ring-wedding-deep-rosegold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={
                      activeCategory === category.id
                        ? "bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                        : "border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush"
                    }
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">Tidak ada template yang sesuai dengan pencarian Anda.</p>
                <Button 
                  className="mt-4 bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Reset Pencarian
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
