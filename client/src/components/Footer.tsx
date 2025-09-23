import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail,
  MapPin,
  Phone,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    console.log("Newsletter subscription triggered");
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FH</span>
              </div>
              <span className="font-bold text-xl">FreelanceHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting talented freelancers with innovative clients worldwide. 
              Build your career or grow your business with our trusted platform.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" data-testid="social-facebook">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-twitter">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-linkedin">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-instagram">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* For Freelancers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-find-work">
                  Find Work
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-build-portfolio">
                  Build Portfolio
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-freelancer-resources">
                  Resources & Tips
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-success-stories">
                  Success Stories
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-freelancer-community">
                  Community
                </Button>
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-hire-freelancers">
                  Hire Freelancers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-post-job">
                  Post a Job
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-client-resources">
                  Hiring Guide
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-enterprise">
                  Enterprise Solutions
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-project-management">
                  Project Management
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest job opportunities and platform updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button onClick={handleSubscribe} data-testid="button-subscribe">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3 pt-4">
              <h4 className="font-medium">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@freelancehub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-about">
              About Us
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-careers">
              Careers
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-privacy">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-terms">
              Terms of Service
            </Button>
            <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground" data-testid="link-help">
              Help Center
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs">
              Trusted Platform
            </Badge>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> 
              <span>© {currentYear} FreelanceHub</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}