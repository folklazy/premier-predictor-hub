import { TabBar } from "@/components/TabBar";
import { useNavigate } from "react-router-dom";

const Standings = () => {
  const navigate = useNavigate();
  
  const standings = [
    { pos: 1, team: 'Man City', played: 11, won: 9, drawn: 1, lost: 1, points: 28, logo: '💙' },
    { pos: 2, team: 'Arsenal', played: 11, won: 8, drawn: 2, lost: 1, points: 26, logo: '🔴' },
    { pos: 3, team: 'Liverpool', played: 11, won: 7, drawn: 3, lost: 1, points: 24, logo: '❤️' },
    { pos: 4, team: 'Chelsea', played: 11, won: 6, drawn: 3, lost: 2, points: 21, logo: '🔵' },
    { pos: 5, team: 'Tottenham', played: 11, won: 6, drawn: 2, lost: 3, points: 20, logo: '⚪' },
  ];

  return (
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
              onClick={() => navigate(`/team/${team.team}`)}
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

      <TabBar />
    </div>
  );
};

export default Standings;
