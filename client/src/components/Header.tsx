import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, User, Menu, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  userRole?: "client" | "freelancer" | null;
  onLogin: () => void;
  onPostJob?: () => void;
}

export default function Header({ userRole, onLogin, onPostJob }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Search triggered:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FH</span>
            </div>
            <span className="font-bold text-xl">FreelanceHub</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" data-testid="nav-find-work">
              Find Work
            </Button>
            <Button variant="ghost" data-testid="nav-find-talent">
              Find Talent
            </Button>
            <Button variant="ghost" data-testid="nav-how-it-works">
              How it Works
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or freelancers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-9 w-64"
                data-testid="input-search"
              />
            </div>
          </div>

          {userRole ? (
            <div className="flex items-center gap-2">
              {userRole === "client" && onPostJob && (
                <Button onClick={onPostJob} data-testid="button-post-job">
                  Post a Job
                </Button>
              )}
              
              <Button variant="ghost" size="icon" data-testid="button-messages">
                <MessageSquare className="w-4 h-4" />
              </Button>
              
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" data-testid="button-user-menu">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
                  <DropdownMenuItem data-testid="menu-dashboard">Dashboard</DropdownMenuItem>
                  <DropdownMenuItem data-testid="menu-settings">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem data-testid="menu-logout">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Badge variant="outline" className="hidden sm:block">
                {userRole === "client" ? "Client" : "Freelancer"}
              </Badge>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={onLogin} data-testid="button-login">
                Login
              </Button>
              <Button onClick={onLogin} data-testid="button-signup">
                Sign Up
              </Button>
            </div>
          )}

          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}