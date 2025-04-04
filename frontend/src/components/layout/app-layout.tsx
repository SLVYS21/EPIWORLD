
import { ReactNode, useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex w-full relative">
        {isSidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/50 z-30 lg:hidden`}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <AppSidebar isOpen={isSidebarOpen} />
        
        <main className="flex-1 min-h-screen">
          <div className="sticky top-0 z-20 lg:hidden flex items-center p-4 bg-background border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold">EpiFlow</h1>
          </div>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
