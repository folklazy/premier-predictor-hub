import { useState } from "react";
import { TabBar } from "@/components/TabBar";
import { MatchCard } from "@/components/MatchCard";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-primary pt-12 pb-6 px-6 rounded-b-3xl shadow-strong">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">Premier Score</h1>
            <p className="text-primary-foreground/80 text-sm">Predict & Earn Points</p>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-full px-4 py-2">
            <span className="text-primary-foreground font-bold">🪙 850 pts</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-primary-foreground/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-foreground">23</div>
            <div className="text-xs text-primary-foreground/80">Predictions</div>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-foreground">67%</div>
            <div className="text-xs text-primary-foreground/80">Accuracy</div>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-2xl p-3 text-center">
            <div className="text-2xl font-bold text-primary-foreground">#142</div>
            <div className="text-xs text-primary-foreground/80">Rank</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Tab Selector */}
        <div className="bg-card rounded-2xl p-1.5 shadow-soft border border-border">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setSelectedTab("upcoming")}
              className={cn(
                "py-2.5 px-4 rounded-xl font-semibold text-sm transition-all",
                selectedTab === "upcoming"
                  ? "bg-gradient-primary text-primary-foreground shadow-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Upcoming ({upcomingMatches.length})
            </button>
            <button
              onClick={() => setSelectedTab("completed")}
              className={cn(
                "py-2.5 px-4 rounded-xl font-semibold text-sm transition-all",
                selectedTab === "completed"
                  ? "bg-gradient-primary text-primary-foreground shadow-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Completed ({completedMatches.length})
            </button>
          </div>
        </div>

        {/* Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              {selectedTab === "upcoming" ? "Upcoming Matches" : "Completed Matches"}
            </h2>
            <button className="text-primary text-sm font-semibold hover:text-primary-dark transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {selectedTab === "upcoming" &&
              upcomingMatches.map((match) => <MatchCard key={match.id} {...match} />)}
            {selectedTab === "completed" &&
              completedMatches.map((match) => <MatchCard key={match.id} {...match} />)}
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Home;
