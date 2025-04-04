import React, { useState } from "react";
import {
  FaUserCircle,
  FaUtensils,
  FaStackOverflow,
  FaSearch,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const route = useLocation();

  const handleNavigation = (route: string) => {
    navigate(route);
    setMenuOpen(false);
  };
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Dining</h1>
          <div className="flex items-right space-x-6">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className=" w-8 h-8" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <FaUserCircle
              size={42}
              className="cursor-pointer bg-gray-200 p-2 rounded-full text-gray-600 hover:text-black-900"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div> */}
        <div className="absolute top-3 left-5 flex justify-between items-center w-full">
          {/* Left-aligned Title */}
          <h1 className="text-2xl font-bold text-gray-900">Student Dining</h1>

          {/* Right-aligned Icons */}
          <div className="absolute  flex right-10 items-center space-x-6">
            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-8 h-8" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Profile Icon */}
            <FaUserCircle
              size={42}
              className="cursor-pointer bg-gray-200 p-2 rounded-full text-gray-600 hover:text-black"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>

        {menuOpen && (
          <div className="absolute right-3 mt-5 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
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
                className={`flex items-center px-4 py-3 w-full transition-all rounded-md text-gray-900 dark:text-gray-200 
          ${
            route.pathname === item.path
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
              className="flex items-center px-4 py-3 w-full text-red-600 font-semibold transition-all rounded-md 
        hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400"
              onClick={() => handleNavigation("/logout")}
            >
              <FaSignOutAlt className="mr-3 text-lg" /> Exit
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
