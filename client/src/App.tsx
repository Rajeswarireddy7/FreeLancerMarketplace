import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import JobModal from "./components/JobModal";
import JobCard from "./components/JobCard";
import FreelancerCard from "./components/FreelancerCard";
import SearchFilters from "./components/SearchFilters";

// Import generated images
import developerImage from "@assets/generated_images/Female_developer_profile_photo_174cac2f.png";
import designerImage from "@assets/generated_images/Male_designer_profile_photo_178b8b6a.png";
import marketingImage from "@assets/generated_images/Female_marketing_specialist_photo_4c3c61f2.png";

interface User {
  id: string;
  name: string;
  email: string;
  userType: "client" | "freelancer";
}

// Mock data - todo: remove mock functionality when integrating with real backend
const mockJobs = [
  {
    id: "job-1",
    title: "Build a Modern E-commerce Website with React",
    description: "Looking for an experienced React developer to build a full-featured e-commerce platform. The project includes user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard.",
    budget: { min: 2500, max: 4000, type: "fixed" as const },
    duration: "2-3 months",
    location: "Remote",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe API"],
    postedTime: "2 hours ago",
    client: { name: "Tech Startup Inc.", rating: 4.8, totalSpent: 15000 },
    proposalsCount: 12,
  },
  {
    id: "job-2", 
    title: "Mobile App UI/UX Design for Fitness Platform",
    description: "We need a talented UI/UX designer to create modern, user-friendly interfaces for our fitness tracking mobile app. This includes wireframes, prototypes, and final designs.",
    budget: { min: 1500, max: 2500, type: "fixed" as const },
    duration: "1-2 months",
    location: "Remote",
    skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
    postedTime: "5 hours ago",
    client: { name: "FitLife Solutions", rating: 4.9, totalSpent: 8500 },
    proposalsCount: 8,
  },
  {
    id: "job-3",
    title: "Content Writer for Tech Blog",
    description: "Seeking an experienced tech writer to create engaging blog posts about software development, AI, and emerging technologies. Must have strong research skills.",
    budget: { min: 40, max: 80, type: "hourly" as const },
    duration: "3-6 months",
    location: "Remote",
    skills: ["Content Writing", "Technical Writing", "SEO", "Research"],
    postedTime: "1 day ago",
    client: { name: "DevNews Media", rating: 4.7, totalSpent: 12000 },
    proposalsCount: 25,
  },
];

const mockFreelancers = [
  {
    id: "freelancer-1",
    name: "Sarah Chen",
    title: "Full-Stack Developer & UI/UX Designer",
    avatar: developerImage,
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 75,
    location: "San Francisco, CA",
    description: "Experienced full-stack developer with 6+ years building scalable web applications. Specialized in React, Node.js, and modern UI/UX design.",
    skills: ["React", "Node.js", "TypeScript", "Python", "UI/UX Design"],
    completedJobs: 89,
    successRate: 98,
    isOnline: true,
  },
  {
    id: "freelancer-2",
    name: "Marcus Rodriguez",
    title: "Senior Mobile App Developer",
    avatar: designerImage,
    rating: 4.8,
    reviewCount: 93,
    hourlyRate: 65,
    location: "Austin, TX",
    description: "Mobile app specialist with expertise in iOS, Android, and React Native. Built 50+ apps with millions of downloads.",
    skills: ["React Native", "iOS", "Android", "Swift", "Kotlin"],
    completedJobs: 67,
    successRate: 96,
    isOnline: false,
  },
  {
    id: "freelancer-3",
    name: "Emily Johnson",
    title: "Digital Marketing Strategist",
    avatar: marketingImage,
    rating: 4.9,
    reviewCount: 156,
    hourlyRate: 55,
    location: "New York, NY",
    description: "Results-driven marketing expert specializing in SEO, content strategy, and social media growth. Helped 100+ businesses scale.",
    skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    completedJobs: 134,
    successRate: 99,
    isOnline: true,
  },
];

function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "jobs" | "freelancers">("home");

  const handleAuthSuccess = (userType: "client" | "freelancer", userData: any) => {
    const newUser: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      userType,
    };
    setUser(newUser);
    console.log("User authenticated:", newUser);
  };

  const handleJobPosted = (jobData: any) => {
    console.log("New job posted:", jobData);
    // todo: remove mock functionality - add to real job list
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    if (query.toLowerCase().includes("job") || query.toLowerCase().includes("project")) {
      setCurrentView("jobs");
    } else if (query.toLowerCase().includes("freelancer") || query.toLowerCase().includes("developer")) {
      setCurrentView("freelancers");
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setCurrentView("jobs");
  };

  if (currentView === "jobs") {
    return (
      <div className="min-h-screen bg-background">
        <Header
          userRole={user?.userType || null}
          onLogin={() => setShowAuthModal(true)}
          onPostJob={() => setShowJobModal(true)}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Find Jobs</h1>
              <p className="text-muted-foreground">Discover opportunities that match your skills</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("home")} data-testid="button-back-home">
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFilters type="jobs" onFiltersChange={(filters) => console.log("Filters:", filters)} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">{mockJobs.length} jobs found</p>
                <Badge variant="secondary">{user?.userType === "freelancer" ? "Available for you" : "Posted jobs"}</Badge>
              </div>
              
              <div className="space-y-6">
                {mockJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    onApply={(jobId) => console.log("Applied to job:", jobId)}
                    onSave={(jobId) => console.log("Saved job:", jobId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        
        {user?.userType === "client" && (
          <JobModal
            isOpen={showJobModal}
            onClose={() => setShowJobModal(false)}
            onJobPosted={handleJobPosted}
          />
        )}
      </div>
    );
  }

  if (currentView === "freelancers") {
    return (
      <div className="min-h-screen bg-background">
        <Header
          userRole={user?.userType || null}
          onLogin={() => setShowAuthModal(true)}
          onPostJob={() => setShowJobModal(true)}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Find Freelancers</h1>
              <p className="text-muted-foreground">Connect with skilled professionals for your projects</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("home")} data-testid="button-back-home-freelancers">
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFilters type="freelancers" onFiltersChange={(filters) => console.log("Filters:", filters)} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">{mockFreelancers.length} freelancers found</p>
                <Badge variant="secondary">{user?.userType === "client" ? "Available to hire" : "Your competition"}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockFreelancers.map((freelancer) => (
                  <FreelancerCard
                    key={freelancer.id}
                    {...freelancer}
                    onViewProfile={(freelancerId) => console.log("View profile:", freelancerId)}
                    onInvite={(freelancerId) => console.log("Invite freelancer:", freelancerId)}
                    onSave={(freelancerId) => console.log("Save freelancer:", freelancerId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        
        {user?.userType === "client" && (
          <JobModal
            isOpen={showJobModal}
            onClose={() => setShowJobModal(false)}
            onJobPosted={handleJobPosted}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole={user?.userType || null}
        onLogin={() => setShowAuthModal(true)}
        onPostJob={() => setShowJobModal(true)}
      />
      
      <Hero
        onGetStarted={() => setShowAuthModal(true)}
        onSearch={handleSearch}
      />
      
      <Categories onCategorySelect={handleCategorySelect} />
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Jobs</h2>
            <p className="text-lg text-muted-foreground">High-quality opportunities from trusted clients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockJobs.slice(0, 3).map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onApply={(jobId) => console.log("Applied to job:", jobId)}
                onSave={(jobId) => console.log("Saved job:", jobId)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={() => setCurrentView("jobs")} size="lg" data-testid="button-view-all-jobs">
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Freelancers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Freelancers</h2>
            <p className="text-lg text-muted-foreground">Work with exceptional talent from around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockFreelancers.map((freelancer) => (
              <FreelancerCard
                key={freelancer.id}
                {...freelancer}
                onViewProfile={(freelancerId) => console.log("View profile:", freelancerId)}
                onInvite={(freelancerId) => console.log("Invite freelancer:", freelancerId)}
                onSave={(freelancerId) => console.log("Save freelancer:", freelancerId)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button onClick={() => setCurrentView("freelancers")} size="lg" variant="outline" data-testid="button-view-all-freelancers">
              View All Freelancers
            </Button>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of freelancers and clients who trust FreelanceHub for their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowAuthModal(true)}
              data-testid="button-cta-freelancer"
            >
              Start as Freelancer
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => setShowAuthModal(true)}
              data-testid="button-cta-client"
            >
              Hire Talent
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      {user?.userType === "client" && (
        <JobModal
          isOpen={showJobModal}
          onClose={() => setShowJobModal(false)}
          onJobPosted={handleJobPosted}
        />
      )}
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist.
          </p>
          <Button onClick={() => window.location.href = "/"} data-testid="button-go-home">
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;