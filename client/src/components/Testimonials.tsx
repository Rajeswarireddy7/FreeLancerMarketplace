import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import developerImage from "@assets/generated_images/Female_developer_profile_photo_174cac2f.png";
import designerImage from "@assets/generated_images/Male_designer_profile_photo_178b8b6a.png";
import marketingImage from "@assets/generated_images/Female_marketing_specialist_photo_4c3c61f2.png";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  project: string;
  userType: "client" | "freelancer";
}

export default function Testimonials() {
  // todo: remove mock functionality - replace with real testimonials data
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      avatar: developerImage,
      rating: 5,
      review: "FreelanceHub has transformed my freelancing career. The platform makes it easy to find quality clients and manage projects efficiently. The secure payment system gives me peace of mind.",
      project: "E-commerce Platform Development",
      userType: "freelancer"
    },
    {
      id: "2", 
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      avatar: designerImage,
      rating: 5,
      review: "As a client, I've found exceptional talent on FreelanceHub. The vetting process ensures high-quality freelancers, and the project management tools keep everything organized.",
      project: "Mobile App Design",
      userType: "client"
    },
    {
      id: "3",
      name: "Emily Johnson",
      role: "Digital Marketing Specialist", 
      avatar: marketingImage,
      rating: 5,
      review: "The real-time chat and collaboration features have made working with international clients seamless. I've built lasting relationships and grown my business significantly.",
      project: "SEO & Content Strategy",
      userType: "freelancer"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from freelancers and clients who have found success on FreelanceHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative" data-testid={`testimonial-${testimonial.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-muted-foreground/20" />
                  <p className="text-muted-foreground leading-relaxed pl-4" data-testid={`testimonial-review-${testimonial.id}`}>
                    "{testimonial.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold" data-testid={`testimonial-name-${testimonial.id}`}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.project}</p>
                  </div>

                  <Badge 
                    variant={testimonial.userType === "client" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {testimonial.userType === "client" ? "Client" : "Freelancer"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15k+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$2M+</div>
              <div className="text-sm text-muted-foreground">Paid to Freelancers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}