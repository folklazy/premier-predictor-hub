import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Zap, Brain, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Prediction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selected, setSelected] = useState<string | null>(null);

  const match = {
    id: 1,
    home: 'Arsenal',
    away: 'Chelsea',
    date: 'Today 19:30',
    homeLogo: '🔴',
    awayLogo: '🔵'
  };

  const handleConfirm = () => {
    const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    const newPrediction = {
      id: Date.now(),
      matchId: match.id,
      home: match.home,
      away: match.away,
      homeLogo: match.homeLogo,
      awayLogo: match.awayLogo,
      prediction: selected,
      status: 'pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      homeScore: null,
      awayScore: null,
    };
    predictions.unshift(newPrediction);
    localStorage.setItem('predictions', JSON.stringify(predictions));

    toast.success("Prediction submitted!", {
      description: `You predicted ${selected === 'home' ? match.home : selected === 'away' ? match.away : 'Draw'} to win!`,
    });
    setTimeout(() => navigate("/results"), 1500);
  };

  const options = [
    { key: 'home', label: `${match.home} Wins`, logo: match.homeLogo, percentage: 45, reward: 3, color: 'primary' },
    { key: 'draw', label: 'Draw', logo: '🤝', percentage: 28, reward: 5, color: 'muted' },
    { key: 'away', label: `${match.away} Wins`, logo: match.awayLogo, percentage: 27, reward: 4, color: 'secondary' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-6 px-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-bold font-display text-foreground">Make Prediction</h1>
        <p className="text-muted-foreground text-sm mt-1">Choose wisely to earn points</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Match Card */}
        <div className="glass-strong rounded-3xl p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="text-6xl mb-3 animate-float">{match.homeLogo}</div>
              <div className="font-bold text-xl font-display text-foreground">{match.home}</div>
            </div>

            <div className="px-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <span className="text-xl font-bold text-primary-foreground font-display">VS</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2 text-center">{match.date}</div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-6xl mb-3 animate-float" style={{ animationDelay: "0.5s" }}>{match.awayLogo}</div>
              <div className="font-bold text-xl font-display text-foreground">{match.away}</div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-foreground mb-1 flex items-center gap-2">
                AI Analysis
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Arsenal has <span className="text-primary font-semibold">65% win rate</span> in last 5 home games. 
                Chelsea struggling away with <span className="text-destructive font-semibold">2W-3L</span> record.
              </p>
            </div>
          </div>
        </div>

        {/* Selection Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={option.key}
              onClick={() => setSelected(option.key)}
              className={cn(
                "w-full p-5 rounded-2xl border-2 transition-all duration-300 animate-slide-up",
                selected === option.key
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border glass hover:border-muted-foreground"
              )}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{option.logo}</span>
                  <div className="text-left">
                    <div className="font-bold text-foreground text-lg">{option.label}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-secondary" />
                      Reward: +{option.reward} points
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-2xl font-bold font-display",
                    option.color === 'primary' ? "text-primary" : 
                    option.color === 'secondary' ? "text-secondary" : "text-muted-foreground"
                  )}>
                    {option.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">probability</div>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selected === option.key && (
                <div className="mt-4 pt-4 border-t border-primary/30">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Selected</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <Button
          disabled={!selected}
          onClick={handleConfirm}
          className={cn(
            "w-full h-16 rounded-2xl text-lg font-bold transition-all duration-300 animate-slide-up",
            selected 
              ? "bg-gradient-primary hover:shadow-glow" 
              : "bg-muted text-muted-foreground"
          )}
          style={{ animationDelay: "0.5s" }}
        >
          {selected ? (
            <>
              <Zap className="w-6 h-6 mr-2" />
              Confirm Prediction
            </>
          ) : (
            "Select an option"
          )}
        </Button>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default Prediction;