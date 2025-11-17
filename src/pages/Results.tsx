import { useState, useEffect } from "react";
import { TabBar } from "@/components/TabBar";
import { Clock, CheckCircle, HourglassIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Results = () => {
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<"all" | "correct" | "wrong" | "pending">("all");
  const [userPredictions, setUserPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Load predictions from localStorage
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

  // Combine user predictions and mock results
  const allResults = [...userPredictions, ...mockResults];

  const filteredResults = filterTab === 'all'
    ? allResults
    : allResults.filter(m => m.status === filterTab);

  const correctCount = allResults.filter(m => m.status === 'correct').length;
  const wrongCount = allResults.filter(m => m.status === 'wrong').length;
  const pendingCount = allResults.filter(m => m.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary pt-12 pb-6 px-6">
        <h1 className="text-2xl font-bold text-primary-foreground mb-2">Match Results</h1>
        <p className="text-primary-foreground/80">Premier League 2024/25</p>

        {/* Stats Summary */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          <div className="bg-primary-foreground/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-primary-foreground">{allResults.length}</div>
            <div className="text-xs text-primary-foreground/80">Total</div>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-primary-foreground">{correctCount}</div>
            <div className="text-xs text-primary-foreground/80">Correct</div>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-primary-foreground">{wrongCount}</div>
            <div className="text-xs text-primary-foreground/80">Wrong</div>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-primary-foreground">{pendingCount}</div>
            <div className="text-xs text-primary-foreground/80">Pending</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 bg-card border-b border-border">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterTab('all')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
              filterTab === 'all'
                ? "bg-gradient-primary text-primary-foreground shadow-medium"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            All ({allResults.length})
          </button>
          <button
            onClick={() => setFilterTab('pending')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
              filterTab === 'pending'
                ? "bg-warning text-warning-foreground shadow-medium"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            ⏳ Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterTab('correct')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
              filterTab === 'correct'
                ? "bg-success text-success-foreground shadow-medium"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            ✓ Correct ({correctCount})
          </button>
          <button
            onClick={() => setFilterTab('wrong')}
            className={cn(
              "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
              filterTab === 'wrong'
                ? "bg-destructive text-destructive-foreground shadow-medium"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            ✗ Wrong ({wrongCount})
          </button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {filteredResults.map((match) => (
          <div
            key={match.id}
            onClick={() => navigate(`/match/${match.id}`)}
            className="bg-card rounded-2xl p-4 shadow-soft border border-border hover:shadow-medium transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">
                  {match.date} • FULL TIME
                </span>
              </div>
              {match.status === 'pending' ? (
                <span className="bg-warning/20 text-warning text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <HourglassIcon className="w-3 h-3" />
                  Pending
                </span>
              ) : match.status === 'correct' ? (
                <span className="bg-success-light text-success text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  +3pts
                </span>
              ) : (
                <span className="bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 rounded-full">
                  ✗ Wrong
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-center flex-1">
                <div className="text-3xl mb-1">{match.homeLogo}</div>
                <div className="font-semibold text-foreground text-sm">{match.home}</div>
              </div>
              <div className="px-4">
                <div className="text-3xl font-bold text-foreground">
                  {match.status === 'pending' ? 'vs' : `${match.homeScore} - ${match.awayScore}`}
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="text-3xl mb-1">{match.awayLogo}</div>
                <div className="font-semibold text-foreground text-sm">{match.away}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Your prediction:</span>
                <span className="text-xs font-bold text-primary">
                  {match.prediction === 'home' ? match.home + ' Win' :
                    match.prediction === 'away' ? match.away + ' Win' : 'Draw'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-muted-foreground">No matches found</p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};

export default Results;
