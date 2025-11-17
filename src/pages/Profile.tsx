import { TabBar } from "@/components/TabBar";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-primary pt-12 pb-20 px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-foreground/20 backdrop-blur rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground mb-1">John Smith</h2>
          <p className="text-primary-foreground/80">john.smith@email.com</p>

          <div className="mt-6 bg-primary-foreground/20 backdrop-blur rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">850</div>
                <div className="text-xs text-primary-foreground/80">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">67%</div>
                <div className="text-xs text-primary-foreground/80">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">#142</div>
                <div className="text-xs text-primary-foreground/80">Global Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <button
            onClick={() => navigate("/settings")}
            className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors"
          >
            <span className="font-semibold text-foreground">Account Settings</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate("/notifications")}
            className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors"
          >
            <span className="font-semibold text-foreground">Notification Preferences</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate("/privacy")}
            className="w-full px-6 py-4 flex items-center justify-between border-b border-border hover:bg-muted transition-colors"
          >
            <span className="font-semibold text-foreground">Privacy & Security</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-destructive/10 transition-colors"
          >
            <span className="font-semibold text-destructive">Logout</span>
            <ChevronRight className="w-5 h-5 text-destructive" />
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Profile;
