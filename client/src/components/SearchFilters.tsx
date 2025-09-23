import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X, Filter } from "lucide-react";

interface SearchFiltersProps {
  type: "jobs" | "freelancers";
  onFiltersChange: (filters: any) => void;
}

export default function SearchFilters({ type, onFiltersChange }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    skills: [] as string[],
    location: "",
    experienceLevel: "",
    projectLength: "",
    clientHistory: "",
  });

  const categories = [
    "Web Development",
    "Mobile Development", 
    "Design & Creative",
    "Writing & Content",
    "Marketing & Sales",
    "Data & Analytics",
    "Engineering & Architecture",
    "Admin & Customer Support",
  ];

  const skillsSuggestions = [
    "JavaScript", "React", "Node.js", "Python", "UI/UX Design",
    "WordPress", "SEO", "Content Writing", "Digital Marketing",
    "Data Analysis", "Machine Learning", "PHP", "Flutter",
  ];

  const experienceLevels = [
    "Entry Level",
    "Intermediate", 
    "Expert",
  ];

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
    console.log("Filters updated:", newFilters);
  };

  const addSkill = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      updateFilters("skills", [...filters.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    updateFilters("skills", filters.skills.filter(s => s !== skill));
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: "",
      priceRange: [0, 1000],
      skills: [],
      location: "",
      experienceLevel: "",
      projectLength: "",
      clientHistory: "",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    console.log("Filters cleared");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
            Clear all
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-toggle-filters"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className={`space-y-6 ${!isOpen ? "hidden md:block" : ""}`}>
        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>
            {type === "jobs" ? "Budget Range" : "Hourly Rate"} 
            (${filters.priceRange[0]} - ${filters.priceRange[1]})
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters("priceRange", value)}
            max={1000}
            step={10}
            className="w-full"
            data-testid="slider-price-range"
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="grid grid-cols-2 gap-2">
            {skillsSuggestions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addSkill(skill);
                    } else {
                      removeSkill(skill);
                    }
                  }}
                  data-testid={`checkbox-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                />
                <Label htmlFor={skill} className="text-sm">
                  {skill}
                </Label>
              </div>
            ))}
          </div>
          
          {filters.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select value={filters.experienceLevel} onValueChange={(value) => updateFilters("experienceLevel", value)}>
            <SelectTrigger data-testid="select-experience">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => updateFilters("location", e.target.value)}
            data-testid="input-location"
          />
        </div>

        {type === "jobs" && (
          <>
            {/* Project Length */}
            <div className="space-y-2">
              <Label>Project Length</Label>
              <Select value={filters.projectLength} onValueChange={(value) => updateFilters("projectLength", value)}>
                <SelectTrigger data-testid="select-project-length">
                  <SelectValue placeholder="Select project length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3 months">1-3 months</SelectItem>
                  <SelectItem value="3-6 months">3-6 months</SelectItem>
                  <SelectItem value="6+ months">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Client History */}
            <div className="space-y-2">
              <Label>Client History</Label>
              <Select value={filters.clientHistory} onValueChange={(value) => updateFilters("clientHistory", value)}>
                <SelectTrigger data-testid="select-client-history">
                  <SelectValue placeholder="Select client history" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-hires">No hires yet</SelectItem>
                  <SelectItem value="1-9-hires">1-9 hires</SelectItem>
                  <SelectItem value="10+-hires">10+ hires</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}