import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/Diverse_professionals_collaborating_hero_image_d1a67f9c.png";

interface HeroProps {
  onGetStarted: () => void;
  onSearch: (query: string) => void;
}

export default function Hero({ onGetStarted, onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    console.log("Hero search triggered:", searchQuery);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Diverse professionals collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Connect with Top
          <span className="text-accent"> Freelancers</span>
          <br />
          Worldwide
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Find skilled professionals for your projects or showcase your talents to global clients. 
          Secure payments, real-time collaboration, and success guaranteed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for jobs, skills, or freelancers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 h-12 text-lg bg-white/90 backdrop-blur border-white/20 text-gray-900 placeholder:text-gray-600"
              data-testid="input-hero-search"
            />
          </div>
          <Button 
            onClick={handleSearch}
            size="lg"
            className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground"
            data-testid="button-hero-search"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            variant="outline"
            className="h-12 px-8 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
            data-testid="button-get-started"
          >
            Get Started for Free
          </Button>
          <Button 
            variant="ghost"
            size="lg"
            className="h-12 px-8 text-white hover:bg-white/10"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">50k+</div>
            <div className="text-sm text-gray-300">Active Freelancers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">25k+</div>
            <div className="text-sm text-gray-300">Completed Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">98%</div>
            <div className="text-sm text-gray-300">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}