import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Smartphone, 
  Palette, 
  PenTool, 
  TrendingUp, 
  BarChart3, 
  Wrench, 
  Headphones 
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: any;
  description: string;
  jobCount: number;
  averageRate: string;
}

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function Categories({ onCategorySelect }: CategoriesProps) {
  const categories: Category[] = [
    {
      id: "web-dev",
      name: "Web Development",
      icon: Code,
      description: "Frontend, backend, and full-stack web solutions",
      jobCount: 1250,
      averageRate: "$45-85/hr"
    },
    {
      id: "mobile-dev",
      name: "Mobile Development", 
      icon: Smartphone,
      description: "iOS, Android, and cross-platform mobile apps",
      jobCount: 890,
      averageRate: "$40-80/hr"
    },
    {
      id: "design",
      name: "Design & Creative",
      icon: Palette,
      description: "UI/UX design, graphics, branding, and visual content",
      jobCount: 2100,
      averageRate: "$35-75/hr"
    },
    {
      id: "writing",
      name: "Writing & Content",
      icon: PenTool,
      description: "Copywriting, content creation, and editorial services", 
      jobCount: 1670,
      averageRate: "$25-60/hr"
    },
    {
      id: "marketing",
      name: "Marketing & Sales",
      icon: TrendingUp,
      description: "Digital marketing, SEO, social media, and sales",
      jobCount: 980,
      averageRate: "$30-70/hr"
    },
    {
      id: "data",
      name: "Data & Analytics",
      icon: BarChart3,
      description: "Data analysis, visualization, and business intelligence",
      jobCount: 540,
      averageRate: "$50-90/hr"
    },
    {
      id: "engineering",
      name: "Engineering & Architecture",
      icon: Wrench,
      description: "Software architecture, DevOps, and system design",
      jobCount: 320,
      averageRate: "$60-120/hr"
    },
    {
      id: "support",
      name: "Admin & Support",
      icon: Headphones,
      description: "Virtual assistance, customer support, and admin tasks",
      jobCount: 750,
      averageRate: "$15-40/hr"
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    console.log("Category selected:", categoryId);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find skilled professionals across various industries and specializations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="hover-elevate cursor-pointer transition-all duration-200"
                onClick={() => handleCategoryClick(category.id)}
                data-testid={`category-card-${category.id}`}
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg" data-testid={`category-name-${category.id}`}>
                    {category.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Available Jobs:</span>
                      <Badge variant="secondary">{category.jobCount.toLocaleString()}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Avg. Rate:</span>
                      <span className="font-medium text-accent">{category.averageRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Badge variant="outline" className="px-4 py-2 cursor-pointer hover-elevate">
            View All Categories
          </Badge>
        </div>
      </div>
    </section>
  );
}