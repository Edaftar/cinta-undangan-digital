
import { useState } from "react";
import { templates, categories } from "@/data/templates";
import TemplateCard from "./TemplateCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedTemplates = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTemplates = activeCategory === "all" 
    ? templates.slice(0, 6) 
    : templates.filter(t => t.category === activeCategory).slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Template Undangan Pilihan</h2>
          <p className="text-gray-600">
            Pilih dari berbagai template undangan pernikahan yang elegan dan indah untuk membuat momen spesialmu lebih berkesan.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={
                activeCategory === category.id
                  ? "bg-wedding-purple hover:bg-wedding-deep-purple text-white"
                  : "border-wedding-purple text-wedding-purple hover:bg-wedding-bg-light"
              }
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-wedding-purple text-wedding-purple hover:bg-wedding-bg-light px-8"
            asChild
          >
            <Link to="/templates">
              Lihat Semua Template
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTemplates;
