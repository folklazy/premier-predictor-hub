import { TabBar } from "@/components/TabBar";
import { ChevronRight, Crown, Target, TrendingUp, Settings, Bell, Shield, LogOut, Award, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Settings, label: "Account Settings", route: "/settings", color: "text-primary" },
    { icon: Bell, label: "Notifications", route: "/notifications", color: "text-secondary" },
    { icon: Shield, label: "Privacy & Security", route: "/privacy", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-8 px-6">
        {/* Profile Card */}
        <div className="glass-strong rounded-3xl p-6 text-center animate-scale-in">
          <div className="w-28 h-28 rounded-3xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-glow relative">
            <span className="text-5xl">👤</span>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
              <Crown className="w-5 h-5 text-secondary-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-display text-foreground mb-1">John Smith</h2>
          <p className="text-muted-foreground text-sm mb-6">john.smith@email.com</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                <Crown className="w-4 h-4 text-secondary" />
              </div>
              <div className="text-xl font-bold font-display text-foreground">850</div>
              <div className="text-[10px] text-muted-foreground">Points</div>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div className="text-xl font-bold font-display text-foreground">67%</div>
              <div className="text-[10px] text-muted-foreground">Accuracy</div>
            </div>
            <div className="glass rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div className="text-xl font-bold font-display text-foreground">#142</div>
              <div className="text-[10px] text-muted-foreground">Rank</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-lg font-bold font-display text-foreground mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Achievements
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
            <div className="glass rounded-2xl p-4 min-w-[120px] text-center flex-shrink-0">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-xs font-semibold text-foreground">Champion</div>
              <div className="text-[10px] text-muted-foreground">10 Streak</div>
            </div>
            <div className="glass rounded-2xl p-4 min-w-[120px] text-center flex-shrink-0">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-xs font-semibold text-foreground">Sharpshooter</div>
              <div className="text-[10px] text-muted-foreground">80% Accuracy</div>
            </div>
            <div className="glass rounded-2xl p-4 min-w-[120px] text-center flex-shrink-0">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-xs font-semibold text-foreground">On Fire</div>
              <div className="text-[10px] text-muted-foreground">5 Wins</div>
            </div>
            <div className="glass rounded-2xl p-4 min-w-[120px] text-center flex-shrink-0 opacity-50">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-xs font-semibold text-foreground">Legend</div>
              <div className="text-[10px] text-muted-foreground">Locked</div>
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="mt-6 glass rounded-2xl p-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-bold text-foreground">Current Streak</div>
                <div className="text-sm text-muted-foreground">Keep it going!</div>
              </div>
            </div>
            <div className="text-3xl font-bold font-display text-gradient">7🔥</div>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-6 glass-strong rounded-3xl overflow-hidden animate-slide-up" style={{ animationDelay: "0.3s" }}>
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="w-full px-5 py-4 flex items-center justify-between border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
          
          <button
            onClick={() => navigate("/login")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-destructive/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <span className="font-medium text-destructive">Logout</span>
            </div>
            <ChevronRight className="w-5 h-5 text-destructive/50" />
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Profile;