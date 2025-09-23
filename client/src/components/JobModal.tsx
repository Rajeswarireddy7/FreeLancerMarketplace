import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus } from "lucide-react";

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPosted: (jobData: any) => void;
}

export default function JobModal({ isOpen, onClose, onJobPosted }: JobModalProps) {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    budgetType: "fixed" as "fixed" | "hourly",
    budgetMin: "",
    budgetMax: "",
    duration: "",
    experienceLevel: "",
    skills: [] as string[],
    location: "remote",
  });
  
  const [newSkill, setNewSkill] = useState("");

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

  const durations = [
    "Less than 1 month",
    "1-3 months",
    "3-6 months", 
    "More than 6 months",
  ];

  const experienceLevels = [
    "Entry Level",
    "Intermediate",
    "Expert",
  ];

  const addSkill = () => {
    if (newSkill && !jobData.skills.includes(newSkill)) {
      setJobData({...jobData, skills: [...jobData.skills, newSkill]});
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setJobData({...jobData, skills: jobData.skills.filter(s => s !== skill)});
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Job posted:", jobData);
    
    // todo: remove mock functionality - integrate with real API
    const newJob = {
      id: `job-${Date.now()}`,
      ...jobData,
      postedAt: new Date().toISOString(),
      proposalsCount: 0,
      status: "open",
    };
    
    onJobPosted(newJob);
    
    // Reset form
    setJobData({
      title: "",
      description: "",
      category: "",
      budgetType: "fixed",
      budgetMin: "",
      budgetMax: "",
      duration: "",
      experienceLevel: "",
      skills: [],
      location: "remote",
    });
    setStep(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="job-modal">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Step {step} of 3: {step === 1 ? "Job Details" : step === 2 ? "Budget & Timeline" : "Skills & Requirements"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tell us about your project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Build a responsive website for my startup"
                  value={jobData.title}
                  onChange={(e) => setJobData({...jobData, title: e.target.value})}
                  data-testid="input-job-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-category">Category *</Label>
                <Select value={jobData.category} onValueChange={(value) => setJobData({...jobData, category: value})}>
                  <SelectTrigger data-testid="select-job-category">
                    <SelectValue placeholder="Select a category" />
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

              <div className="space-y-2">
                <Label htmlFor="job-description">Project Description *</Label>
                <Textarea
                  id="job-description"
                  placeholder="Describe your project in detail. What do you need done? What are your expectations?"
                  rows={6}
                  value={jobData.description}
                  onChange={(e) => setJobData({...jobData, description: e.target.value})}
                  data-testid="textarea-job-description"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!jobData.title || !jobData.category || !jobData.description}
                  data-testid="button-next-step1"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Budget Type *</Label>
                <RadioGroup 
                  value={jobData.budgetType} 
                  onValueChange={(value: "fixed" | "hourly") => setJobData({...jobData, budgetType: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" data-testid="radio-fixed-budget" />
                    <Label htmlFor="fixed" className="cursor-pointer">
                      Fixed Price - Pay a set amount for the entire project
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" data-testid="radio-hourly-budget" />
                    <Label htmlFor="hourly" className="cursor-pointer">
                      Hourly Rate - Pay for time worked
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-min">
                    Minimum Budget ($) *
                  </Label>
                  <Input
                    id="budget-min"
                    type="number"
                    placeholder="500"
                    value={jobData.budgetMin}
                    onChange={(e) => setJobData({...jobData, budgetMin: e.target.value})}
                    data-testid="input-budget-min"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget-max">
                    Maximum Budget ($) *
                  </Label>
                  <Input
                    id="budget-max"
                    type="number"
                    placeholder="2000"
                    value={jobData.budgetMax}
                    onChange={(e) => setJobData({...jobData, budgetMax: e.target.value})}
                    data-testid="input-budget-max"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-duration">Project Duration *</Label>
                <Select value={jobData.duration} onValueChange={(value) => setJobData({...jobData, duration: value})}>
                  <SelectTrigger data-testid="select-job-duration">
                    <SelectValue placeholder="Select project duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} data-testid="button-back-step2">
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!jobData.budgetMin || !jobData.budgetMax || !jobData.duration}
                  data-testid="button-next-step2"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="experience-level">Experience Level *</Label>
                <Select value={jobData.experienceLevel} onValueChange={(value) => setJobData({...jobData, experienceLevel: value})}>
                  <SelectTrigger data-testid="select-experience-level">
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

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g. JavaScript, React)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    data-testid="input-add-skill"
                  />
                  <Button type="button" onClick={addSkill} size="icon" data-testid="button-add-skill">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {jobData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {jobData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 hover:bg-transparent"
                          onClick={() => removeSkill(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} data-testid="button-back-step3">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!jobData.experienceLevel}
                  data-testid="button-post-job"
                >
                  Post Job
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}