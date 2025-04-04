import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Search,
  PlusSquare,
  Heart,
  MessageCircle,
  User,
  Home,
  Bell,
} from "lucide-react";
import {
  FaSearch,
  FaSignOutAlt,
  FaStackOverflow,
  FaTachometerAlt,
  FaUserCircle,
  FaUtensils,
} from "react-icons/fa";

const comLogo = "/ic-com.png";

export default function Layout() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(
    window.innerWidth >= 768
  );
  const navigate = useNavigate();
  const route = useLocation();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  React.useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (route: string) => {
    navigate(route);
    setMenuOpen(false);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="p-3 mt-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={comLogo} alt="Logo" className="h-10 w-10 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                EpiGram
              </h1>
            </div>
            {/* Close Button for Mobile */}
            <button
              className="md:hidden text-gray-700 dark:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2 mt-10">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Home className="h-6 w-6 mr-3" />
              <span className="font-medium">Home</span>
            </button>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <PlusSquare className="h-6 w-6 mr-3" />
              <span className="font-medium">Create Post</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Heart className="h-6 w-6 mr-3" />
              <span className="font-medium">Liked Posts</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="h-6 w-6 mr-3" />
              <span className="font-medium">Notifications</span>
            </button>
            <button className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <MessageCircle className="h-6 w-6 mr-3" />
              <span className="font-medium">Messages</span>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <User className="h-6 w-6 mr-3" />
              <span className="font-medium">Profile</span>
            </button>
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center px-4 py-3 mt-8 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-full"
          >
            {darkMode ? (
              <>
                <Sun className="h-6 w-6 mr-3" />
                <span className="font-medium">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-6 w-6 mr-3" />
                <span className="font-medium">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40 flex justify-between p-3">
        {/* Menu Button for Mobile */}
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <div className="flex justify-center items-center w-full px-4">
          <input
            className="w-full max-w-[600px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            placeholder="Search lost & found items..."
            type="search"
          />
        </div>

        <FaUserCircle
          className="h-10 w-10 cursor-pointer bg-gray-200 rounded-full text-gray-400 hover:text-gray-400"
          size={32}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
      {menuOpen && (
        <div className="absolute right-3 mt-20 w-56 bg-white shadow-lg rounded-lg py-2 dark:bg-gray-800 dark:shadow-md border dark:border-gray-700">
          {/* Menu Items */}
          {[
            { path: "/cantine", label: "Cantine", icon: <FaUtensils /> },
            {
              path: "/stackoverflow",
              label: "StackOverflow",
              icon: <FaStackOverflow />,
            },
            { path: "/home", label: "Lost & Found", icon: <FaSearch /> },
            {
              path: "/dashboard",
              label: "Dashboard",
              icon: <FaTachometerAlt />,
            },
          ].map((item) => (
            <button
              key={item.path}
              className={`flex items-center px-4 py-3 w-full transition-all rounded-md text-black dark:text-gray-200 
          ${
            route.pathname === item.path
              ? "bg-gray-100 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="mr-3 text-lg">{item.icon}</span> {item.label}
            </button>
          ))}

          {/* Divider */}
          <hr className="border-gray-300 dark:border-gray-600 my-2" />

          {/* Exit Button */}
          <button
            className="flex items-center px-4 py-3 w-full text-red-600 font-semibold transition-all rounded-md hover:bg-red-100 dark:hover:bg-red-900"
            onClick={() => handleNavigation("/logout")}
          >
            <FaSignOutAlt className="mr-3 text-lg" /> Exit
          </button>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`transition-all min-h-screen pt-16 bg-gray-50 dark:bg-gray-800 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
