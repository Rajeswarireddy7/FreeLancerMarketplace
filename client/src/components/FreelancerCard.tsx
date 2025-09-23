import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, DollarSign, Heart } from "lucide-react";

interface FreelancerCardProps {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  description: string;
  skills: string[];
  completedJobs: number;
  successRate: number;
  isOnline: boolean;
  onViewProfile: (freelancerId: string) => void;
  onInvite: (freelancerId: string) => void;
  onSave: (freelancerId: string) => void;
}

export default function FreelancerCard({
  id,
  name,
  title,
  avatar,
  rating,
  reviewCount,
  hourlyRate,
  location,
  description,
  skills,
  completedJobs,
  successRate,
  isOnline,
  onViewProfile,
  onInvite,
  onSave,
}: FreelancerCardProps) {
  const handleViewProfile = () => {
    onViewProfile(id);
    console.log("View profile clicked for freelancer:", id);
  };

  const handleInvite = () => {
    onInvite(id);
    console.log("Invite clicked for freelancer:", id);
  };

  const handleSave = () => {
    onSave(id);
    console.log("Save clicked for freelancer:", id);
  };

  return (
    <Card className="hover-elevate" data-testid={`freelancer-card-${id}`}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>
                {name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate" data-testid={`freelancer-name-${id}`}>
              {name}
            </h3>
            <p className="text-sm text-muted-foreground truncate" data-testid={`freelancer-title-${id}`}>
              {title}
            </p>
            
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviewCount})</span>
              </div>
              
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">${hourlyRate}/hr</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSave}
            data-testid={`button-save-freelancer-${id}`}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`freelancer-description-${id}`}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">{completedJobs}</span>
            <span className="text-muted-foreground ml-1">jobs completed</span>
          </div>
          <div>
            <span className="font-medium">{successRate}%</span>
            <span className="text-muted-foreground ml-1">success rate</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={handleViewProfile} variant="outline" className="flex-1" data-testid={`button-view-profile-${id}`}>
          View Profile
        </Button>
        <Button onClick={handleInvite} className="flex-1" data-testid={`button-invite-${id}`}>
          Invite
        </Button>
      </CardFooter>
    </Card>
  );
}