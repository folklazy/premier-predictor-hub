import { TabBar } from "@/components/TabBar";
import { useNavigate } from "react-router-dom";
import { Trophy, ChevronRight, Medal } from "lucide-react";

const Standings = () => {
  const navigate = useNavigate();
  
  const standings = [
    { pos: 1, team: 'Man City', played: 11, won: 9, drawn: 1, lost: 1, gd: '+25', points: 28, logo: '💙', trend: 'up' },
    { pos: 2, team: 'Arsenal', played: 11, won: 8, drawn: 2, lost: 1, gd: '+18', points: 26, logo: '🔴', trend: 'up' },
    { pos: 3, team: 'Liverpool', played: 11, won: 7, drawn: 3, lost: 1, gd: '+15', points: 24, logo: '❤️', trend: 'same' },
    { pos: 4, team: 'Chelsea', played: 11, won: 6, drawn: 3, lost: 2, gd: '+10', points: 21, logo: '🔵', trend: 'down' },
    { pos: 5, team: 'Tottenham', played: 11, won: 6, drawn: 2, lost: 3, gd: '+8', points: 20, logo: '⚪', trend: 'up' },
    { pos: 6, team: 'Newcastle', played: 11, won: 5, drawn: 4, lost: 2, gd: '+6', points: 19, logo: '⚫', trend: 'same' },
    { pos: 7, team: 'Man United', played: 11, won: 5, drawn: 3, lost: 3, gd: '+4', points: 18, logo: '🔴', trend: 'down' },
    { pos: 8, team: 'Brighton', played: 11, won: 5, drawn: 2, lost: 4, gd: '+2', points: 17, logo: '⚪', trend: 'up' },
  ];

  const getPositionStyle = (pos: number) => {
    if (pos === 1) return "bg-gradient-gold text-secondary-foreground";
    if (pos === 2) return "bg-muted-foreground/30 text-foreground";
    if (pos === 3) return "bg-accent/30 text-accent-foreground";
    if (pos <= 4) return "bg-primary/20 text-primary";
    return "bg-muted text-muted-foreground";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return "↑";
    if (trend === 'down') return "↓";
    return "•";
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return "text-success";
    if (trend === 'down') return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-glow opacity-50 pointer-events-none" />
      
      {/* Header */}
      <div className="relative pt-12 pb-6 px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
            <Trophy className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">League Table</h1>
            <p className="text-muted-foreground text-sm">Premier League 2024/25</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6">
        <div className="glass-strong rounded-3xl overflow-hidden animate-scale-in">
          {/* Table Header */}
          <div className="bg-muted/50 px-4 py-3 flex items-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="w-10 text-center">#</div>
            <div className="flex-1 pl-2">Team</div>
            <div className="w-10 text-center hidden sm:block">P</div>
            <div className="w-10 text-center hidden sm:block">GD</div>
            <div className="w-12 text-center">Pts</div>
            <div className="w-8"></div>
          </div>

          {/* Table Rows */}
          {standings.map((team, index) => (
            <div
              key={team.pos}
              onClick={() => navigate(`/team/${team.team}`)}
              className="px-4 py-4 flex items-center border-t border-border hover:bg-muted/30 cursor-pointer transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Position */}
              <div className="w-10 flex justify-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${getPositionStyle(team.pos)}`}>
                  {team.pos === 1 && <Medal className="w-4 h-4" />}
                  {team.pos !== 1 && team.pos}
                </div>
              </div>

              {/* Team */}
              <div className="flex-1 flex items-center gap-3 pl-2">
                <span className="text-2xl">{team.logo}</span>
                <div>
                  <span className="font-semibold text-foreground">{team.team}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className={getTrendColor(team.trend)}>{getTrendIcon(team.trend)}</span>
                    <span className="text-muted-foreground hidden sm:inline">
                      {team.won}W {team.drawn}D {team.lost}L
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="w-10 text-center text-sm text-muted-foreground hidden sm:block">{team.played}</div>
              <div className="w-10 text-center text-sm text-success font-medium hidden sm:block">{team.gd}</div>
              
              {/* Points */}
              <div className="w-12 text-center">
                <span className="inline-block px-3 py-1 rounded-lg bg-primary/20 text-primary font-bold text-sm">
                  {team.points}
                </span>
              </div>

              {/* Arrow */}
              <div className="w-8 flex justify-end">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-gold" />
            <span>Champion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary/20" />
            <span>UCL Spots</span>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Standings;