import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";
import {
  Home,
  Search,
  PlusCircle,
  BookOpen,
  Trophy,
  User,
  HelpCircle,
  Code,
  Calculator,
  Atom,
  BookText,
  BrainCircuit, Server 
} from "lucide-react";
import {
  FaSearch,
  FaUtensils,
} from "react-icons/fa";

interface AppSidebarProps {
  isOpen: boolean;
}

export function AppSidebar({ isOpen }: AppSidebarProps) {
  const sidebarWidth = "w-64";

  return (
    <aside 
    className={`${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } fixed lg:static lg:translate-x-0 z-40 h-screen ${sidebarWidth} bg-sidebar border-r transition-transform duration-200 ease-in-out`}
  >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Link to="/stackoverflow" className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">EpiFlow</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="space-y-4">
            <Link
              to="/stackoverflow"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Home className="h-4 w-4 mr-2" />
              <span>Home</span>
            </Link>
            <Link
              to="#"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Link>
            <Link
              to="/cantine"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FaUtensils className="h-4 w-4 mr-2" />
              <span>Cantine</span>
            </Link>
            <Link
              to="/home"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FaSearch className="h-4 w-4 mr-2" />
              <span>Lost & Found</span>
            </Link>
            <Link
              to="/#"
              className="flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Ask Question</span>
            </Link>
          </div>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-xs font-semibold text-sidebar-foreground/70 mb-2">
            POPULAR TOPICS
          </h3>
          <div className="space-y-1">
            <Link
              to="/topics/programming"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Code className="h-4 w-4 mr-2" />
              <span>Programming</span>
            </Link>
            <Link
              to="/topics/math"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Calculator className="h-5 w-5 mr-2" />
              <span>Computer Numerical Analysis (CNA)</span>
            </Link>
            <Link
              to="/topics/science"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Atom className="h-4 w-4 mr-2" />
              <span>Application Development</span>
            </Link>
            <Link
              to="/topics/literature"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BrainCircuit className="h-4 w-4 mr-2" />
              <span>Artificial Intelligence </span>
            </Link>
            <Link
              to="/topics/history"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <BookText className="h-4 w-4 mr-2" />
              <span>Advanced C++</span>
            </Link>
            <Link
              to="/topics/languages"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Server className="h-4 w-4 mr-2" />
              <span>Advanced DevOps</span>
            </Link>
          </div>
        </div>

        <div className="mt-auto px-6 py-4 border-t">
          <div className="space-y-1">
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              <span>Profile</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Trophy className="h-4 w-4 mr-2" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/help"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Help & FAQs</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
