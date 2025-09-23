import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userType: "client" | "freelancer", userData: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [userType, setUserType] = useState<"client" | "freelancer">("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleLogin = () => {
    console.log("Login attempt:", { ...loginData, userType });
    
    // todo: remove mock functionality - integrate with real auth
    const mockUser = {
      id: "1",
      email: loginData.email,
      name: `${signupData.firstName || "John"} ${signupData.lastName || "Doe"}`,
      userType,
    };
    
    onAuthSuccess(userType, mockUser);
    onClose();
  };

  const handleSignup = () => {
    if (signupData.password !== signupData.confirmPassword) {
      console.log("Passwords don't match");
      return;
    }
    
    console.log("Signup attempt:", { ...signupData, userType });
    
    // todo: remove mock functionality - integrate with real auth
    const mockUser = {
      id: "2",
      email: signupData.email,
      name: `${signupData.firstName} ${signupData.lastName}`,
      userType,
    };
    
    onAuthSuccess(userType, mockUser);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle>Welcome to FreelanceHub</DialogTitle>
          <DialogDescription>
            Join our community of talented freelancers and forward-thinking clients
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
            <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Sign In</CardTitle>
                <CardDescription>
                  Access your FreelanceHub account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    data-testid="input-login-email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      data-testid="input-login-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleLogin} className="w-full" data-testid="button-login-submit">
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Create Account</CardTitle>
                <CardDescription>
                  Choose your account type to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>I want to:</Label>
                  <RadioGroup value={userType} onValueChange={(value: "client" | "freelancer") => setUserType(value)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover-elevate">
                      <RadioGroupItem value="freelancer" id="freelancer" data-testid="radio-freelancer" />
                      <Label htmlFor="freelancer" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Briefcase className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Work as a Freelancer</div>
                          <div className="text-sm text-muted-foreground">Find projects and build your career</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover-elevate">
                      <RadioGroupItem value="client" id="client" data-testid="radio-client" />
                      <Label htmlFor="client" className="flex items-center gap-2 cursor-pointer flex-1">
                        <User className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Hire as a Client</div>
                          <div className="text-sm text-muted-foreground">Find talented freelancers for your projects</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                      data-testid="input-first-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                      data-testid="input-last-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    data-testid="input-signup-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    data-testid="input-signup-password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    data-testid="input-confirm-password"
                  />
                </div>

                <Button onClick={handleSignup} className="w-full" data-testid="button-signup-submit">
                  Create Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}