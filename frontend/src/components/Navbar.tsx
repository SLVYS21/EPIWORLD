import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const comLogo = "/ic-com.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={comLogo} alt="Logo" className="w-12 h-12 mr-4" />
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            EpiGram
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/auth" className="bg-gray-300 hover:text-gray-400 px-5 py-2 transition rounded-lg duration-200">Connect</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-2">
          <Link to="/auth" className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Connect
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
