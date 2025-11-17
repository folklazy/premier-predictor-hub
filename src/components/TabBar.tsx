import { Home, Trophy, Calendar, User } from "lucide-react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";

export const TabBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-6 py-3 z-50 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Home className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-xs font-semibold">Home</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/standings"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Trophy className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-xs font-semibold">Table</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/results"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <Calendar className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-xs font-semibold">Results</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
          activeClassName="text-primary"
        >
          {({ isActive }) => (
            <>
              <User className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="text-xs font-semibold">Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};
