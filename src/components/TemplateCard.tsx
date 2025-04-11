
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Template } from "@/data/templates";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          <img 
            src={template.image} 
            alt={template.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        {template.popular && (
          <Badge className="absolute top-3 right-3 bg-wedding-purple text-white">
            Popular
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold">{template.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        
        <div className="mt-4 space-y-2">
          {template.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <Check size={14} className="text-wedding-purple mr-2 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="outline"
          className="border-wedding-purple text-wedding-purple hover:bg-wedding-bg-light"
          asChild
        >
          <Link to={`/preview/${template.id}`}>
            Preview
          </Link>
        </Button>
        
        <Button
          className="bg-wedding-purple hover:bg-wedding-deep-purple text-white"
          asChild
        >
          <Link to={`/create/${template.id}`}>
            Use <ArrowRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
