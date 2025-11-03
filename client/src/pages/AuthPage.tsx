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
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");

  const handleLogin = () => {
    console.log("Login:", { loginIdentifier, loginPassword });
  };

  const handleRegister = () => {
    console.log("Register:", { username, email, password, repeatPassword, birthday, sex });
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
                  />
                </div>
                <Button className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all" onClick={handleLogin} data-testid="button-login">
                  Login
                </Button>
                <Button variant="ghost" className="w-full text-sm" data-testid="button-forgot-password">
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex" className="text-sm font-medium">Sex</Label>
                  <Select value={sex} onValueChange={setSex}>
                    <SelectTrigger id="sex" className="rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border-white/20" data-testid="select-sex">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full rounded-full gradient-primary text-white shadow-lg hover:shadow-xl transition-all" onClick={handleRegister} data-testid="button-register">
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
