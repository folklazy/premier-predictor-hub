import { Home, Trophy, Calendar, User } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

export const TabBar = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-50">
      <div className="glass-strong rounded-3xl px-4 py-3 shadow-glow">
        <div className="flex items-center justify-around">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300"
            activeClassName="bg-primary/20"
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-gradient-primary shadow-glow" : "bg-transparent"
                )}>
                  <Home className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/standings"
            className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300"
            activeClassName="bg-primary/20"
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-gradient-primary shadow-glow" : "bg-transparent"
                )}>
                  <Trophy className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>Table</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/results"
            className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300"
            activeClassName="bg-primary/20"
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-gradient-primary shadow-glow" : "bg-transparent"
                )}>
                  <Calendar className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>Results</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300"
            activeClassName="bg-primary/20"
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-gradient-primary shadow-glow" : "bg-transparent"
                )}>
                  <User className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>Profile</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};