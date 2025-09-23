import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, DollarSign, MapPin, Star } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  budget: {
    min: number;
    max: number;
    type: "fixed" | "hourly";
  };
  duration: string;
  location: string;
  skills: string[];
  postedTime: string;
  client: {
    name: string;
    avatar?: string;
    rating: number;
    totalSpent: number;
  };
  proposalsCount: number;
  onApply: (jobId: string) => void;
  onSave: (jobId: string) => void;
}

export default function JobCard({
  id,
  title,
  description,
  budget,
  duration,
  location,
  skills,
  postedTime,
  client,
  proposalsCount,
  onApply,
  onSave,
}: JobCardProps) {
  const handleApply = () => {
    onApply(id);
    console.log("Apply clicked for job:", id);
  };

  const handleSave = () => {
    onSave(id);
    console.log("Save clicked for job:", id);
  };

  return (
    <Card className="hover-elevate" data-testid={`job-card-${id}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2" data-testid={`job-title-${id}`}>
              {title}
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span data-testid={`job-budget-${id}`}>
                  ${budget.min}-${budget.max} {budget.type === "hourly" ? "/hr" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {budget.type === "fixed" ? "Fixed Price" : "Hourly"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`job-description-${id}`}>
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 5).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 5 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{skills.length - 5} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback className="text-xs">
                {client.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="font-medium">{client.name}</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{client.rating.toFixed(1)}</span>
                <span>•</span>
                <span>${client.totalSpent.toLocaleString()} spent</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {proposalsCount} proposals • {postedTime}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={handleApply} className="flex-1" data-testid={`button-apply-${id}`}>
          Apply Now
        </Button>
        <Button onClick={handleSave} variant="outline" data-testid={`button-save-${id}`}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}