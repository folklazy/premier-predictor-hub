import { useState } from "react";
import { TabBar } from "@/components/TabBar";
import { MatchCard } from "@/components/MatchCard";
import { cn } from "@/lib/utils";
import { Sparkles, TrendingUp, Target, Crown } from "lucide-react";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "completed">("upcoming");

  const upcomingMatches = [
    { id: 1, home: 'Arsenal', away: 'Chelsea', date: 'Today 19:30', homeWin: 45, draw: 28, awayWin: 27, homeLogo: '🔴', awayLogo: '🔵' },
    { id: 2, home: 'Man City', away: 'Liverpool', date: 'Tomorrow 17:00', homeWin: 52, draw: 25, awayWin: 23, homeLogo: '💙', awayLogo: '❤️' },
    { id: 3, home: 'Tottenham', away: 'Man United', date: 'Sun 20:00', homeWin: 38, draw: 30, awayWin: 32, homeLogo: '⚪', awayLogo: '🔴' }
  ];

  const completedMatches = [
    { id: 4, home: 'Arsenal', away: 'Brentford', date: 'Nov 5', homeWin: 45, draw: 28, awayWin: 27, homeLogo: '🔴', awayLogo: '🐝', homeScore: 3, awayScore: 1, isCompleted: true },
    { id: 5, home: 'Liverpool', away: 'Brighton', date: 'Nov 4', homeWin: 52, draw: 25, awayWin: 23, homeLogo: '❤️', awayLogo: '⚪', homeScore: 2, awayScore: 2, isCompleted: true },
    { id: 6, home: 'Man City', away: 'Tottenham', date: 'Nov 3', homeWin: 60, draw: 22, awayWin: 18, homeLogo: '💙', awayLogo: '⚪', homeScore: 4, awayScore: 0, isCompleted: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl animate-float">⚽</span>
              <h1 className="text-3xl font-bold font-display text-gradient">Premier Score</h1>
            </div>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              AI-Powered Predictions
            </p>
          </div>
          <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2 glow-gold">
            <Crown className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-bold font-display">850</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="glass rounded-2xl p-4 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold font-display text-foreground">23</div>
            <div className="text-xs text-muted-foreground">Predictions</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-2xl font-bold font-display text-foreground">67%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="glass rounded-2xl p-4 text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-2">
              <Crown className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-2xl font-bold font-display text-foreground">#142</div>
            <div className="text-xs text-muted-foreground">Global Rank</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Tab Selector */}
        <div className="glass rounded-2xl p-1.5">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setSelectedTab("upcoming")}
              className={cn(
                "py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300",
                selectedTab === "upcoming"
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                Upcoming ({upcomingMatches.length})
              </span>
            </button>
            <button
              onClick={() => setSelectedTab("completed")}
              className={cn(
                "py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300",
                selectedTab === "completed"
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Completed ({completedMatches.length})
            </button>
          </div>
        </div>

        {/* Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display text-foreground">
              {selectedTab === "upcoming" ? "🔥 Live & Upcoming" : "📊 Recent Results"}
            </h2>
          </div>

          <div className="space-y-4">
            {selectedTab === "upcoming" &&
              upcomingMatches.map((match, index) => (
                <div key={match.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MatchCard {...match} />
                </div>
              ))}
            {selectedTab === "completed" &&
              completedMatches.map((match, index) => (
                <div key={match.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MatchCard {...match} />
                </div>
              ))}
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Home;