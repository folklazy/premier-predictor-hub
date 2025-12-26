import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="w-24 h-24 rounded-3xl bg-gradient-primary mx-auto mb-6 flex items-center justify-center shadow-glow animate-float">
            <span className="text-5xl">⚽</span>
          </div>
          <h1 className="text-4xl font-bold font-display text-gradient mb-2">Premier Score</h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Predict & Win Big
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-strong rounded-3xl p-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 rounded-2xl bg-muted border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 rounded-2xl bg-muted border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-gradient-primary hover:shadow-glow transition-all duration-300 text-base font-bold group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-2xl border-border hover:bg-muted hover:border-primary transition-all duration-300 text-foreground"
              onClick={() => navigate("/")}
            >
              <span className="text-xl mr-3">🌐</span>
              Continue with Google
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <button className="text-primary font-semibold hover:text-primary-light transition-colors">
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-xs mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Login;