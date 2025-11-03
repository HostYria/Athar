
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { toast } = useToast();
  const [view, setView] = useState<"auth" | "reset">("auth");
  
  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  
  // Reset password state
  const [resetEmail, setResetEmail] = useState("");
  
  // Loading states
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginIdentifier || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: loginIdentifier,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast({
        title: "Success",
        description: "Login successful!",
      });
      
      // Handle successful login (e.g., redirect, store user data)
      console.log("Logged in user:", data.user);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !repeatPassword || !birthday || !sex) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== repeatPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          birthday,
          sex,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      // Clear form and switch to login
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setBirthday("");
      setSex("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestPasswordReset = async () => {
    if (!resetEmail) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      toast({
        title: "Success",
        description: "Password reset request submitted. Admin will send the code to your email.",
      });

      setResetEmail("");
      setView("auth");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Request failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-cyan-100 via-purple-100 to-pink-100 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-primary opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 gradient-primary opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl gradient-primary mb-6 shadow-2xl relative">
            <Sparkles className="h-10 w-10 text-white" />
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-3">Athar</h1>
          <p className="text-muted-foreground text-lg">منصة أثر</p>
        </div>

        <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-2xl">
          {view === "auth" ? (
            <>
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Welcome</CardTitle>
                <CardDescription className="text-base">Sign in to your account or create a new one</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login">
                  <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full p-1 mb-6">
                    <TabsTrigger value="login" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-login">Login</TabsTrigger>
                    <TabsTrigger value="register" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-white" data-testid="tab-register">Register</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-identifier" className="text-sm font-medium">Username / Email</Label>
                      <Input
                        id="login-identifier"
                        placeholder="Enter username or email"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-login-identifier"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-login-password"
                        disabled={isLoading}
                      />
                    </div>
                    <Button 
                      className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all" 
                      onClick={handleLogin} 
                      data-testid="button-login"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm" 
                      data-testid="button-forgot-password"
                      onClick={() => setView("reset")}
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </Button>
                  </TabsContent>

                  <TabsContent value="register" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-register-username"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-register-email"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-register-password"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repeat-password" className="text-sm font-medium">Repeat Password</Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        placeholder="Repeat your password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-repeat-password"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthday" className="text-sm font-medium">Birthday</Label>
                      <Input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                        data-testid="input-birthday"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sex" className="text-sm font-medium">Sex</Label>
                      <Select value={sex} onValueChange={setSex} disabled={isLoading}>
                        <SelectTrigger id="sex" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20" data-testid="select-sex">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all" 
                      onClick={handleRegister} 
                      data-testid="button-register"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-fit mb-2"
                  onClick={() => setView("auth")}
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
                <CardTitle className="text-2xl gradient-text">Reset Password</CardTitle>
                <CardDescription className="text-base">
                  Enter your email to request a password reset code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="your@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20"
                    disabled={isLoading}
                  />
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    After submitting your request, an admin will manually send a reset code to your email.
                  </p>
                </div>
                <Button 
                  className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={handleRequestPasswordReset}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Request Reset Code"}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
