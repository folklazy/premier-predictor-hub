import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, Target, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MatchDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const match = {
    id: 1,
    home: 'Arsenal',
    away: 'Brentford',
    homeScore: 3,
    awayScore: 1,
    date: 'Nov 5, 2024',
    homeLogo: '🔴',
    awayLogo: '🐝',
    stadium: 'Emirates Stadium',
    attendance: '60,383',
    prediction: 'home',
    result: 'correct'
  };

  const stats = [
    { label: 'Possession', home: 62, away: 38 },
    { label: 'Shots', home: 18, away: 7 },
    { label: 'Shots on Target', home: 8, away: 3 },
    { label: 'Corners', home: 9, away: 2 },
    { label: 'Fouls', home: 8, away: 12 },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-6 px-6">
        <button
          onClick={() => navigate("/results")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-bold font-display text-foreground">Match Details</h1>
        <p className="text-muted-foreground text-sm">{match.date}</p>
      </div>

      <div className="px-6 space-y-6 pb-8">
        {/* Score Card */}
        <div className="glass-strong rounded-3xl p-6 animate-scale-in">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-success bg-success/20 px-4 py-1.5 rounded-full border border-success/30">
              FULL TIME
            </span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="text-6xl mb-3">{match.homeLogo}</div>
              <div className="font-bold text-lg font-display text-foreground mb-2">{match.home}</div>
              <div className="text-5xl font-bold font-display text-primary">{match.homeScore}</div>
            </div>

            <div className="px-4">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground">-</span>
              </div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-6xl mb-3">{match.awayLogo}</div>
              <div className="font-bold text-lg font-display text-foreground mb-2">{match.away}</div>
              <div className="text-5xl font-bold font-display text-secondary">{match.awayScore}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {match.stadium}
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" />
              {match.attendance}
            </div>
          </div>
        </div>

        {/* Match Statistics */}
        <div className="glass rounded-3xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-bold font-display text-foreground">Match Statistics</h2>
          </div>

          <div className="space-y-5">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="font-bold text-foreground w-10">{stat.home}</span>
                  <span className="text-muted-foreground text-xs flex-1 text-center">{stat.label}</span>
                  <span className="font-bold text-foreground w-10 text-right">{stat.away}</span>
                </div>
                <div className="flex gap-1 h-2.5 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-gradient-primary transition-all duration-500 rounded-l-full"
                    style={{ width: `${(stat.home / (stat.home + stat.away)) * 100}%` }}
                  />
                  <div
                    className="bg-gradient-gold transition-all duration-500 rounded-r-full"
                    style={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Prediction */}
        <div className={`rounded-3xl p-6 animate-slide-up ${match.result === 'correct' ? 'bg-success/10 border-2 border-success/30' : 'bg-destructive/10 border-2 border-destructive/30'}`} style={{ animationDelay: "0.2s" }}>
          <div className="text-center">
            {match.result === 'correct' ? (
              <div className="w-16 h-16 rounded-2xl bg-success/20 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-destructive/20 mx-auto mb-4 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
            )}
            <h3 className="font-bold text-foreground text-xl font-display mb-1">
              {match.result === 'correct' ? 'Prediction Correct!' : 'Prediction Wrong'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You predicted {match.prediction === 'home' ? match.home : match.prediction === 'away' ? match.away : 'Draw'} to win
            </p>
            {match.result === 'correct' && (
              <div className="inline-flex items-center gap-2 bg-success text-success-foreground px-5 py-2.5 rounded-full font-bold shadow-glow">
                +3 Points Earned
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full h-14 rounded-2xl border-border hover:bg-muted hover:border-primary transition-all"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default MatchDetails;