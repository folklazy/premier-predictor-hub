import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, Target } from "lucide-react";
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
  };

  const stats = [
    { label: 'Possession', home: 62, away: 38 },
    { label: 'Shots', home: 18, away: 7 },
    { label: 'Shots on Target', home: 8, away: 3 },
    { label: 'Corners', home: 9, away: 2 },
    { label: 'Fouls', home: 8, away: 12 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary px-6 pt-12 pb-6">
        <button
          onClick={() => navigate("/results")}
          className="text-primary-foreground mb-4 flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">Match Details</h1>
        <p className="text-primary-foreground/80 text-sm">{match.date}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-success bg-success-light px-3 py-1 rounded-full">
              FULL TIME
            </span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="text-5xl mb-2">{match.homeLogo}</div>
              <div className="font-bold text-lg text-foreground mb-2">{match.home}</div>
              <div className="text-4xl font-bold text-primary">{match.homeScore}</div>
            </div>

            <div className="px-4">
              <div className="text-3xl font-bold text-muted-foreground">-</div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-5xl mb-2">{match.awayLogo}</div>
              <div className="font-bold text-lg text-foreground mb-2">{match.away}</div>
              <div className="text-4xl font-bold text-primary">{match.awayScore}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              {match.stadium}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {match.attendance}
            </div>
          </div>
        </div>

        {/* Match Statistics */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Match Statistics</h2>
          </div>

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
                    className="bg-secondary rounded-r"
                    style={{ width: `${(stat.away / (stat.home + stat.away)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Prediction */}
        <div className="bg-success-light rounded-2xl p-6 border-2 border-success">
          <div className="text-center">
            <div className="text-3xl mb-2">✓</div>
            <h3 className="font-bold text-foreground mb-1">Your Prediction: Correct!</h3>
            <p className="text-sm text-muted-foreground mb-3">
              You predicted {match.home} to win
            </p>
            <div className="inline-flex items-center gap-2 bg-success text-success-foreground px-4 py-2 rounded-full font-bold">
              +3 Points Earned
            </div>
          </div>
        </div>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default MatchDetails;
