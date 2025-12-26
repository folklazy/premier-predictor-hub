import { useState, useEffect } from "react";
import { TabBar } from "@/components/TabBar";
import { Clock, CheckCircle, HourglassIcon, XCircle, TrendingUp, Target, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Results = () => {
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<"all" | "correct" | "wrong" | "pending">("all");
  const [userPredictions, setUserPredictions] = useState<any[]>([]);

  useEffect(() => {
    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    setUserPredictions(predictions);
  }, []);

  const mockResults = [
    { id: 1, home: 'Arsenal', away: 'Brentford', homeScore: 3, awayScore: 1, prediction: 'home', status: 'correct', date: 'Nov 5', homeLogo: '🔴', awayLogo: '🐝' },
    { id: 2, home: 'Liverpool', away: 'Brighton', homeScore: 2, awayScore: 2, prediction: 'home', status: 'wrong', date: 'Nov 4', homeLogo: '❤️', awayLogo: '⚪' },
    { id: 3, home: 'Man City', away: 'Tottenham', homeScore: 4, awayScore: 0, prediction: 'home', status: 'correct', date: 'Nov 3', homeLogo: '💙', awayLogo: '⚪' },
    { id: 4, home: 'Chelsea', away: 'Newcastle', homeScore: 1, awayScore: 1, prediction: 'draw', status: 'correct', date: 'Nov 3', homeLogo: '🔵', awayLogo: '⚫' },
    { id: 5, home: 'Man United', away: 'Aston Villa', homeScore: 0, awayScore: 2, prediction: 'home', status: 'wrong', date: 'Nov 2', homeLogo: '🔴', awayLogo: '🦁' },
  ];

  const allResults = [...userPredictions, ...mockResults];

  const filteredResults = filterTab === 'all'
    ? allResults
    : allResults.filter(m => m.status === filterTab);

  const correctCount = allResults.filter(m => m.status === 'correct').length;
  const wrongCount = allResults.filter(m => m.status === 'wrong').length;
  const pendingCount = allResults.filter(m => m.status === 'pending').length;
  const accuracy = allResults.length > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) || 0 : 0;

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-6 px-6">
        <h1 className="text-2xl font-bold font-display text-foreground mb-2">Your Predictions</h1>
        <p className="text-muted-foreground text-sm">Track your prediction history</p>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          <div className="glass rounded-2xl p-3 text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Target className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-lg font-bold font-display text-foreground">{allResults.length}</div>
            <div className="text-[10px] text-muted-foreground">Total</div>
          </div>
          <div className="glass rounded-2xl p-3 text-center animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-lg font-bold font-display text-success">{correctCount}</div>
            <div className="text-[10px] text-muted-foreground">Correct</div>
          </div>
          <div className="glass rounded-2xl p-3 text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <XCircle className="w-5 h-5 text-destructive mx-auto mb-1" />
            <div className="text-lg font-bold font-display text-destructive">{wrongCount}</div>
            <div className="text-[10px] text-muted-foreground">Wrong</div>
          </div>
          <div className="glass rounded-2xl p-3 text-center animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <TrendingUp className="w-5 h-5 text-secondary mx-auto mb-1" />
            <div className="text-lg font-bold font-display text-secondary">{accuracy}%</div>
            <div className="text-[10px] text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-4">
        <div className="glass rounded-2xl p-1.5 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            <button
              onClick={() => setFilterTab('all')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap",
                filterTab === 'all'
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All ({allResults.length})
            </button>
            {pendingCount > 0 && (
              <button
                onClick={() => setFilterTab('pending')}
                className={cn(
                  "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap flex items-center gap-2",
                  filterTab === 'pending'
                    ? "bg-secondary text-secondary-foreground shadow-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Pending ({pendingCount})
              </button>
            )}
            <button
              onClick={() => setFilterTab('correct')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap",
                filterTab === 'correct'
                  ? "bg-success text-success-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              ✓ Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilterTab('wrong')}
              className={cn(
                "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap",
                filterTab === 'wrong'
                  ? "bg-destructive text-destructive-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              ✗ Wrong ({wrongCount})
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="px-6 space-y-3">
        {filteredResults.map((match, index) => (
          <div
            key={match.id}
            onClick={() => navigate(`/match/${match.id}`)}
            className="glass rounded-2xl p-4 hover:shadow-glow transition-all duration-300 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{match.date}</span>
              </div>
              {match.status === 'pending' ? (
                <span className="bg-secondary/20 text-secondary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-secondary/30">
                  <HourglassIcon className="w-3 h-3 animate-pulse" />
                  Pending
                </span>
              ) : match.status === 'correct' ? (
                <span className="bg-success/20 text-success text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-success/30">
                  <CheckCircle className="w-3 h-3" />
                  +3 pts
                </span>
              ) : (
                <span className="bg-destructive/20 text-destructive text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-destructive/30">
                  <XCircle className="w-3 h-3" />
                  Wrong
                </span>
              )}
            </div>

            {/* Match Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-center flex-1">
                <div className="text-3xl mb-1">{match.homeLogo}</div>
                <div className="font-medium text-foreground text-sm">{match.home}</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold font-display text-foreground">
                  {match.status === 'pending' ? (
                    <span className="text-muted-foreground">vs</span>
                  ) : (
                    `${match.homeScore} - ${match.awayScore}`
                  )}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="text-3xl mb-1">{match.awayLogo}</div>
                <div className="font-medium text-foreground text-sm">{match.away}</div>
              </div>
            </div>

            {/* Prediction */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Your prediction:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">
                  {match.prediction === 'home' ? match.home + ' Win' :
                    match.prediction === 'away' ? match.away + ' Win' : 'Draw'}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 rounded-3xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <p className="text-muted-foreground font-medium">No predictions found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Start predicting to see results here</p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};

export default Results;