import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>/</span>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Usuario Demo
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
