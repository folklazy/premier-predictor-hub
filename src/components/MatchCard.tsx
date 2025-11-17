import { Clock, TrendingUp, ChevronRight } from "lucide-react";
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
    <div className="bg-card rounded-2xl p-4 shadow-soft border border-border hover:shadow-medium transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <span className="text-xs font-semibold text-accent-foreground bg-accent px-2 py-1 rounded-full">
          Premier League
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{homeLogo}</div>
          <div className="font-semibold text-card-foreground">{home}</div>
          {isCompleted && (
            <div className="text-2xl font-bold text-primary mt-2">{homeScore}</div>
          )}
        </div>

        <div className="px-4">
          <div className="text-2xl font-bold text-muted-foreground">
            {isCompleted ? "-" : "VS"}
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="text-3xl mb-1">{awayLogo}</div>
          <div className="font-semibold text-card-foreground">{away}</div>
          {isCompleted && (
            <div className="text-2xl font-bold text-primary mt-2">{awayScore}</div>
          )}
        </div>
      </div>

      {!isCompleted && (
        <>
          <div className="bg-muted rounded-xl p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Win Probability</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-primary">{homeWin}%</div>
                <div className="text-xs text-muted-foreground">Home</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-muted-foreground">{draw}%</div>
                <div className="text-xs text-muted-foreground">Draw</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-primary">{awayWin}%</div>
                <div className="text-xs text-muted-foreground">Away</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate(`/predict/${id}`)}
            className="w-full"
            variant="default"
          >
            Make Prediction
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {isCompleted && (
        <Button
          onClick={() => navigate(`/match/${id}`)}
          variant="outline"
          className="w-full"
        >
          View Details
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
