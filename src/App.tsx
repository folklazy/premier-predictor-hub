import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home as HomeIcon, Trophy, Calendar, User, ArrowLeft, Clock, TrendingUp, ChevronRight, CheckCircle, HourglassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "standings" | "results" | "profile" | "prediction" | "matchDetails">("home");
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "completed">("upcoming");
  const [filterTab, setFilterTab] = useState<"all" | "correct" | "wrong" | "pending">("all");
  const [userPredictions, setUserPredictions] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    setUserPredictions(predictions);
  }, [currentPage]);

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

  const standings = [
    { pos: 1, team: 'Man City', played: 11, won: 9, drawn: 1, lost: 1, points: 28, logo: '💙' },
    { pos: 2, team: 'Arsenal', played: 11, won: 8, drawn: 2, lost: 1, points: 26, logo: '🔴' },
    { pos: 3, team: 'Liverpool', played: 11, won: 7, drawn: 3, lost: 1, points: 24, logo: '❤️' },
    { pos: 4, team: 'Chelsea', played: 11, won: 6, drawn: 3, lost: 2, points: 21, logo: '🔵' },
    { pos: 5, team: 'Tottenham', played: 11, won: 6, drawn: 2, lost: 3, points: 20, logo: '⚪' },
  ];

  const mockResults = [
    { id: 1, home: 'Arsenal', away: 'Brentford', homeScore: 3, awayScore: 1, prediction: 'home', status: 'correct', date: 'Nov 5', homeLogo: '🔴', awayLogo: '🐝' },
    { id: 2, home: 'Liverpool', away: 'Brighton', homeScore: 2, awayScore: 2, prediction: 'home', status: 'wrong', date: 'Nov 4', homeLogo: '❤️', awayLogo: '⚪' },
    { id: 3, home: 'Man City', away: 'Tottenham', homeScore: 4, awayScore: 0, prediction: 'home', status: 'correct', date: 'Nov 3', homeLogo: '💙', awayLogo: '⚪' },
    { id: 4, home: 'Chelsea', away: 'Newcastle', homeScore: 1, awayScore: 1, prediction: 'draw', status: 'correct', date: 'Nov 3', homeLogo: '🔵', awayLogo: '⚫' },
    { id: 5, home: 'Man United', away: 'Aston Villa', homeScore: 0, awayScore: 2, prediction: 'home', status: 'wrong', date: 'Nov 2', homeLogo: '🔴', awayLogo: '🦁' },
  ];

  const allResults = [...userPredictions, ...mockResults];
  const filteredResults = filterTab === 'all' ? allResults : allResults.filter(m => m.status === filterTab);
  const correctCount = allResults.filter(m => m.status === 'correct').length;
  const wrongCount = allResults.filter(m => m.status === 'wrong').length;
  const pendingCount = allResults.filter(m => m.status === 'pending').length;

  const handlePrediction = (matchId: number) => {
    setSelectedMatchId(matchId);
    setPrediction(null);
    setCurrentPage("prediction");
  };

  const handleConfirmPrediction = () => {
    const match = upcomingMatches.find(m => m.id === selectedMatchId);
    if (!match) return;

    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    const newPrediction = {
      id: Date.now(),
      matchId: match.id,
      home: match.home,
      away: match.away,
      homeLogo: match.homeLogo,
      awayLogo: match.awayLogo,
      prediction: prediction,
      status: 'pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      homeScore: null,
      awayScore: null,
    };
    predictions.unshift(newPrediction);
    localStorage.setItem('predictions', JSON.stringify(predictions));

    toast.success("Prediction submitted successfully!", {
      description: `You predicted ${prediction === 'home' ? match.home : prediction === 'away' ? match.away : 'Draw'} to win!`,
    });
    
    setTimeout(() => {
      setUserPredictions(predictions);
      setCurrentPage("results");
    }, 1500);
  };

  const renderMatchCard = (match: any) => (
    <div key={match.id} className="bg-card rounded-2xl p-4 shadow-soft border border-border hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{match.date}</span>
        </div>
        <span className="text-xs font-semibold text-accent-foreground bg-accent px-2 py-1 rounded-full">
          Premier League
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{match.homeLogo}</div>
          <div className="font-semibold text-card-foreground">{match.home}</div>
          {match.isCompleted && (
            <div className="text-2xl font-bold text-primary mt-2">{match.homeScore}</div>
          )}
        </div>

        <div className="px-4">
          <div className="text-2xl font-bold text-muted-foreground">
            {match.isCompleted ? "-" : "VS"}
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{match.awayLogo}</div>
          <div className="font-semibold text-card-foreground">{match.away}</div>
          {match.isCompleted && (
            <div className="text-2xl font-bold text-primary mt-2">{match.awayScore}</div>
          )}
        </div>
      </div>

      {!match.isCompleted && (
        <>
          <div className="bg-muted rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Win Probability</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-primary">{match.homeWin}%</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-muted-foreground">{match.draw}%</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-primary">{match.awayWin}%</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => handlePrediction(match.id)}
            className="w-full"
            variant="default"
          >
            Make Prediction
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {match.isCompleted && (
        <Button
          onClick={() => {
            setSelectedMatchId(match.id);
            setCurrentPage("matchDetails");
          }}
          variant="outline"
          className="w-full"
        >
          View Details
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );

  const renderTabBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 z-50 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setCurrentPage("home")}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "home" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <HomeIcon className={cn("w-6 h-6", currentPage === "home" && "fill-current")} />
          <span className="text-xs font-semibold">Home</span>
        </button>

        <button
          onClick={() => setCurrentPage("standings")}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "standings" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Trophy className={cn("w-6 h-6", currentPage === "standings" && "fill-current")} />
          <span className="text-xs font-semibold">Table</span>
        </button>

        <button
          onClick={() => setCurrentPage("results")}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "results" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Calendar className={cn("w-6 h-6", currentPage === "results" && "fill-current")} />
          <span className="text-xs font-semibold">Results</span>
        </button>

        <button
          onClick={() => setCurrentPage("profile")}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "profile" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <User className={cn("w-6 h-6", currentPage === "profile" && "fill-current")} />
          <span className="text-xs font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="max-w-md mx-auto bg-card shadow-strong min-h-screen">
          {/* Home Page */}
          {currentPage === "home" && (
            <div className="min-h-screen bg-background pb-24">
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

              <div className="px-6 py-6 space-y-6">
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

                <div>
                  <h2 className="text-lg font-bold text-foreground mb-4">
                    {selectedTab === "upcoming" ? "Upcoming Matches" : "Recently Completed"}
                  </h2>
                  <div className="space-y-4">
                    {(selectedTab === "upcoming" ? upcomingMatches : completedMatches).map(renderMatchCard)}
                  </div>
                </div>
              </div>

              {renderTabBar()}
            </div>
          )}

          {/* Standings Page */}
          {currentPage === "standings" && (
            <div className="min-h-screen bg-background pb-24">
              <div className="bg-gradient-primary pt-12 pb-6 px-6">
                <h1 className="text-2xl font-bold text-primary-foreground mb-2">League Table</h1>
                <p className="text-primary-foreground/80">Premier League 2024/25</p>
              </div>

              <div className="p-6">
                <div className="bg-card rounded-2xl shadow-soft overflow-hidden border border-border">
                  <div className="bg-muted px-4 py-3 border-b flex items-center text-xs font-semibold text-muted-foreground">
                    <div className="w-12">Pos</div>
                    <div className="flex-1">Team</div>
                    <div className="w-12 text-center">P</div>
                    <div className="w-12 text-center">W</div>
                    <div className="w-12 text-center">D</div>
                    <div className="w-12 text-center">L</div>
                    <div className="w-12 text-center font-bold">Pts</div>
                  </div>

                  {standings.map((team) => (
                    <div
                      key={team.pos}
                      className="px-4 py-4 border-b border-border flex items-center hover:bg-muted cursor-pointer transition-colors"
                    >
                      <div className="w-12 font-bold text-primary">{team.pos}</div>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-2xl">{team.logo}</span>
                        <span className="font-semibold text-foreground">{team.team}</span>
                      </div>
                      <div className="w-12 text-center text-sm text-muted-foreground">{team.played}</div>
                      <div className="w-12 text-center text-sm text-muted-foreground">{team.won}</div>
                      <div className="w-12 text-center text-sm text-muted-foreground">{team.drawn}</div>
                      <div className="w-12 text-center text-sm text-muted-foreground">{team.lost}</div>
                      <div className="w-12 text-center font-bold text-primary">{team.points}</div>
                    </div>
                  ))}
                </div>
              </div>

              {renderTabBar()}
            </div>
          )}

          {/* Results Page */}
          {currentPage === "results" && (
            <div className="min-h-screen bg-background pb-24">
              <div className="bg-gradient-primary pt-12 pb-6 px-6">
                <h1 className="text-2xl font-bold text-primary-foreground mb-2">Match Results</h1>
                <p className="text-primary-foreground/80">Premier League 2024/25</p>

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
                        ? "bg-gradient-primary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Pending ({pendingCount})
                  </button>
                  <button
                    onClick={() => setFilterTab('correct')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
                      filterTab === 'correct'
                        ? "bg-gradient-primary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Correct ({correctCount})
                  </button>
                  <button
                    onClick={() => setFilterTab('wrong')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap",
                      filterTab === 'wrong'
                        ? "bg-gradient-primary text-primary-foreground shadow-medium"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Wrong ({wrongCount})
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {filteredResults.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No matches found</p>
                  </div>
                ) : (
                  filteredResults.map((match) => (
                    <div
                      key={match.id}
                      onClick={() => {
                        if (match.status !== 'pending') {
                          setSelectedMatchId(match.id);
                          setCurrentPage("matchDetails");
                        }
                      }}
                      className={cn(
                        "bg-card rounded-2xl p-4 shadow-soft border border-border transition-shadow",
                        match.status !== 'pending' && "hover:shadow-medium cursor-pointer"
                      )}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-muted-foreground">{match.date}</span>
                        {match.status === 'correct' && (
                          <div className="flex items-center gap-1 text-success">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-semibold">Correct</span>
                          </div>
                        )}
                        {match.status === 'wrong' && (
                          <div className="flex items-center gap-1 text-destructive">
                            <span className="text-sm font-semibold">Wrong</span>
                          </div>
                        )}
                        {match.status === 'pending' && (
                          <div className="flex items-center gap-1 text-warning">
                            <HourglassIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Pending</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 text-center">
                          <div className="text-3xl mb-1">{match.homeLogo}</div>
                          <div className="font-semibold text-card-foreground">{match.home}</div>
                          {match.status !== 'pending' && (
                            <div className="text-2xl font-bold text-primary mt-2">{match.homeScore}</div>
                          )}
                        </div>

                        <div className="px-4">
                          <div className="text-2xl font-bold text-muted-foreground">
                            {match.status === 'pending' ? 'vs' : '-'}
                          </div>
                        </div>

                        <div className="flex-1 text-center">
                          <div className="text-3xl mb-1">{match.awayLogo}</div>
                          <div className="font-semibold text-card-foreground">{match.away}</div>
                          {match.status !== 'pending' && (
                            <div className="text-2xl font-bold text-primary mt-2">{match.awayScore}</div>
                          )}
                        </div>
                      </div>

                      <div className="bg-muted rounded-xl p-3">
                        <div className="text-xs text-muted-foreground mb-1">Your Prediction</div>
                        <div className="font-semibold text-foreground">
                          {match.prediction === 'home' ? match.home : match.prediction === 'away' ? match.away : 'Draw'}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {renderTabBar()}
            </div>
          )}

          {/* Profile Page */}
          {currentPage === "profile" && (
            <div className="min-h-screen bg-background pb-24">
              <div className="bg-gradient-primary pt-12 pb-20 px-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-foreground/20 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <h2 className="text-2xl font-bold text-primary-foreground mb-1">John Smith</h2>
                  <p className="text-primary-foreground/80">john.smith@email.com</p>

                  <div className="mt-6 bg-primary-foreground/20 backdrop-blur rounded-2xl p-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-foreground">850</div>
                        <div className="text-xs text-primary-foreground/80">Total Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-foreground">67%</div>
                        <div className="text-xs text-primary-foreground/80">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-foreground">#142</div>
                        <div className="text-xs text-primary-foreground/80">Global Rank</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 -mt-8">
                <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
                  <button className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors">
                    <span className="font-semibold text-foreground">Account Settings</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors">
                    <span className="font-semibold text-foreground">Notification Preferences</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors">
                    <span className="font-semibold text-foreground">Privacy & Security</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-destructive/10 transition-colors">
                    <span className="font-semibold text-destructive">Logout</span>
                    <ChevronRight className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              </div>

              {renderTabBar()}
            </div>
          )}

          {/* Prediction Page */}
          {currentPage === "prediction" && selectedMatchId && (
            <div className="min-h-screen bg-background">
              <div className="bg-card px-6 pt-12 pb-6 border-b border-border">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-primary mb-4 flex items-center gap-2 hover:text-primary-dark transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                <h1 className="text-2xl font-bold text-foreground">Make Your Prediction</h1>
              </div>

              <div className="p-6">
                {(() => {
                  const match = upcomingMatches.find(m => m.id === selectedMatchId);
                  if (!match) return null;

                  return (
                    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border mb-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex-1 text-center">
                          <div className="text-5xl mb-2">{match.homeLogo}</div>
                          <div className="font-bold text-lg text-foreground">{match.home}</div>
                        </div>

                        <div className="px-4">
                          <div className="text-muted-foreground font-bold">VS</div>
                          <div className="text-sm text-muted-foreground mt-1">{match.date}</div>
                        </div>

                        <div className="flex-1 text-center">
                          <div className="text-5xl mb-2">{match.awayLogo}</div>
                          <div className="font-bold text-lg text-foreground">{match.away}</div>
                        </div>
                      </div>

                      <div className="bg-accent rounded-xl p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">🧠</div>
                          <div className="flex-1">
                            <div className="font-semibold text-foreground mb-1">AI Analysis</div>
                            <p className="text-sm text-muted-foreground">
                              {match.home} has 65% win rate in last 5 home games. {match.away} struggling away with 2W-3L record.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => setPrediction('home')}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 transition-all",
                            prediction === 'home'
                              ? "border-primary bg-accent"
                              : "border-border bg-card hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{match.homeLogo}</span>
                              <div className="text-left">
                                <div className="font-bold text-foreground">{match.home} Wins</div>
                                <div className="text-sm text-muted-foreground">{match.homeWin}% probability</div>
                              </div>
                            </div>
                            {prediction === 'home' && <CheckCircle className="w-6 h-6 text-primary" />}
                          </div>
                        </button>

                        <button
                          onClick={() => setPrediction('draw')}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 transition-all",
                            prediction === 'draw'
                              ? "border-primary bg-accent"
                              : "border-border bg-card hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🤝</span>
                              <div className="text-left">
                                <div className="font-bold text-foreground">Draw</div>
                                <div className="text-sm text-muted-foreground">{match.draw}% probability</div>
                              </div>
                            </div>
                            {prediction === 'draw' && <CheckCircle className="w-6 h-6 text-primary" />}
                          </div>
                        </button>

                        <button
                          onClick={() => setPrediction('away')}
                          className={cn(
                            "w-full p-4 rounded-xl border-2 transition-all",
                            prediction === 'away'
                              ? "border-primary bg-accent"
                              : "border-border bg-card hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{match.awayLogo}</span>
                              <div className="text-left">
                                <div className="font-bold text-foreground">{match.away} Wins</div>
                                <div className="text-sm text-muted-foreground">{match.awayWin}% probability</div>
                              </div>
                            </div>
                            {prediction === 'away' && <CheckCircle className="w-6 h-6 text-primary" />}
                          </div>
                        </button>
                      </div>

                      <Button
                        onClick={handleConfirmPrediction}
                        disabled={!prediction}
                        className="w-full mt-6"
                        size="lg"
                      >
                        Confirm Prediction
                      </Button>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Match Details Page */}
          {currentPage === "matchDetails" && selectedMatchId && (
            <div className="min-h-screen bg-background">
              <div className="bg-gradient-primary px-6 pt-12 pb-6">
                <button
                  onClick={() => setCurrentPage("results")}
                  className="text-primary-foreground mb-4 flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Results
                </button>
                <h1 className="text-2xl font-bold text-primary-foreground">Match Details</h1>
              </div>

              <div className="p-6 space-y-6">
                {(() => {
                  const matchDetail = {
                    id: selectedMatchId,
                    home: 'Arsenal',
                    away: 'Brentford',
                    homeScore: 3,
                    awayScore: 1,
                    date: 'Nov 5, 2024',
                    homeLogo: '🔴',
                    awayLogo: '🐝',
                    stadium: 'Emirates Stadium',
                    attendance: '60,383',
                  };

                  const stats = [
                    { label: 'Possession', home: 62, away: 38 },
                    { label: 'Shots', home: 18, away: 7 },
                    { label: 'Shots on Target', home: 8, away: 3 },
                    { label: 'Corners', home: 9, away: 2 },
                    { label: 'Fouls', home: 8, away: 12 },
                  ];

                  return (
                    <>
                      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                        <div className="text-center mb-4">
                          <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
                            FULL TIME
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex-1 text-center">
                            <div className="text-5xl mb-2">{matchDetail.homeLogo}</div>
                            <div className="font-bold text-lg text-foreground mb-2">{matchDetail.home}</div>
                            <div className="text-4xl font-bold text-primary">{matchDetail.homeScore}</div>
                          </div>

                          <div className="px-4">
                            <div className="text-3xl font-bold text-muted-foreground">-</div>
                          </div>

                          <div className="flex-1 text-center">
                            <div className="text-5xl mb-2">{matchDetail.awayLogo}</div>
                            <div className="font-bold text-lg text-foreground mb-2">{matchDetail.away}</div>
                            <div className="text-4xl font-bold text-primary">{matchDetail.awayScore}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
                          <div>{matchDetail.stadium}</div>
                          <div>{matchDetail.attendance}</div>
                        </div>
                      </div>

                      <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                        <h2 className="text-lg font-bold text-foreground mb-4">Match Statistics</h2>

                        <div className="space-y-4">
                          {stats.map((stat, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-2 text-sm">
                                <span className="font-semibold text-foreground">{stat.home}</span>
                                <span className="text-muted-foreground">{stat.label}</span>
                                <span className="font-semibold text-foreground">{stat.away}</span>
                              </div>
                              <div className="flex gap-1 h-2">
                                <div
                                  className="bg-primary rounded-l"
                                  style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                                />
                                <div
                                  className="bg-muted rounded-r"
                                  style={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
