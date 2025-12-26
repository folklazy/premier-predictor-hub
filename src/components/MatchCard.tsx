import { Clock, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
  id: number;
  home: string;
  away: string;
  date: string;
  homeWin: number;
  draw: number;
  awayWin: number;
  homeLogo: string;
  awayLogo: string;
  isCompleted?: boolean;
  homeScore?: number;
  awayScore?: number;
}

export const MatchCard = ({
  id,
  home,
  away,
  date,
  homeWin,
  draw,
  awayWin,
  homeLogo,
  awayLogo,
  isCompleted,
  homeScore,
  awayScore,
}: MatchCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="glass rounded-3xl p-5 hover:shadow-glow transition-all duration-500 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground font-medium">{date}</span>
        </div>
        <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20">
          Premier League
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex-1 text-center group/team">
          <div className="text-5xl mb-2 transition-transform duration-300 group-hover/team:scale-110">{homeLogo}</div>
          <div className="font-bold text-foreground font-display">{home}</div>
          {isCompleted && (
            <div className="text-3xl font-bold text-primary mt-2 font-display">{homeScore}</div>
          )}
        </div>

        <div className="px-6">
          {isCompleted ? (
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">-</span>
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
              <span className="text-xl font-bold text-primary-foreground font-display">VS</span>
            </div>
          )}
        </div>

        <div className="flex-1 text-center group/team">
          <div className="text-5xl mb-2 transition-transform duration-300 group-hover/team:scale-110">{awayLogo}</div>
          <div className="font-bold text-foreground font-display">{away}</div>
          {isCompleted && (
            <div className="text-3xl font-bold text-primary mt-2 font-display">{awayScore}</div>
          )}
        </div>
      </div>

      {!isCompleted && (
        <>
          {/* Win Probability */}
          <div className="glass-strong rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-2">
                <Zap className="w-3 h-3 text-secondary" />
                AI Win Probability
              </span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            
            {/* Progress Bar */}
            <div className="flex h-3 rounded-full overflow-hidden bg-muted mb-3">
              <div 
                className="bg-gradient-primary transition-all duration-500" 
                style={{ width: `${homeWin}%` }}
              />
              <div 
                className="bg-muted-foreground/30 transition-all duration-500" 
                style={{ width: `${draw}%` }}
              />
              <div 
                className="bg-gradient-gold transition-all duration-500" 
                style={{ width: `${awayWin}%` }}
              />
            </div>
            
            <div className="flex justify-between text-center">
              <div className="flex-1">
                <div className="text-lg font-bold text-primary font-display">{homeWin}%</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-muted-foreground font-display">{draw}%</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-secondary font-display">{awayWin}%</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/predict/${id}`)}
            className="w-full h-14 text-base font-bold rounded-2xl bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
          >
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Make Prediction
            <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </>
      )}

      {isCompleted && (
        <Button
          onClick={() => navigate(`/match/${id}`)}
          variant="outline"
          className="w-full h-12 rounded-2xl border-border hover:bg-muted hover:border-primary transition-all duration-300"
        >
          View Match Details
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
};