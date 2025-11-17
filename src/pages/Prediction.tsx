import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    toast.success("Prediction submitted successfully!", {
      description: `You predicted ${selected === 'home' ? match.home : selected === 'away' ? match.away : 'Draw'} to win!`,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card px-6 pt-12 pb-6 border-b border-border">
        <button
          onClick={() => navigate("/")}
          className="text-primary mb-4 flex items-center gap-2 hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-foreground">Make Your Prediction</h1>
      </div>

      <div className="p-6">
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

          {/* AI Analysis */}
          <div className="bg-accent rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🧠</div>
              <div className="flex-1">
                <div className="font-semibold text-foreground mb-1">AI Analysis</div>
                <p className="text-sm text-muted-foreground">
                  Arsenal has 65% win rate in last 5 home games. Chelsea struggling away with 2W-3L record.
                </p>
              </div>
            </div>
          </div>

          {/* Selection Options */}
          <div className="space-y-3">
            <button
              onClick={() => setSelected('home')}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all",
                selected === 'home'
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{match.homeLogo}</span>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{match.home} Wins</div>
                    <div className="text-sm text-muted-foreground">Reward: +3 points</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">45%</div>
              </div>
            </button>

            <button
              onClick={() => setSelected('draw')}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all",
                selected === 'draw'
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤝</span>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Draw</div>
                    <div className="text-sm text-muted-foreground">Reward: +5 points</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-muted-foreground">28%</div>
              </div>
            </button>

            <button
              onClick={() => setSelected('away')}
              className={cn(
                "w-full p-4 rounded-xl border-2 transition-all",
                selected === 'away'
                  ? "border-primary bg-accent"
                  : "border-border bg-card hover:bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{match.awayLogo}</span>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{match.away} Wins</div>
                    <div className="text-sm text-muted-foreground">Reward: +4 points</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">27%</div>
              </div>
            </button>
          </div>

          <Button
            disabled={!selected}
            onClick={handleConfirm}
            className="w-full mt-6"
            size="lg"
          >
            Confirm Prediction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
