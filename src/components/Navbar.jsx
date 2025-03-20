
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import logo from '../images/logo.png';
import { AuthContext } from './Provider/AuthProvider';
import { UserCircle2, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignout = () => {
    signout();
    setDropdownOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white shadow-md' 
          : 'py-4 bg-transparent'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-2" src={logo} alt="LOGO"/>
            <span className={`font-bold text-xl ${scrolled ? 'text-sport-darkgray' : 'text-white'}`}>
              SportsSphere
            </span>
          </Link>
          
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors`}
                aria-label="User menu"
              >
                <UserCircle2 className={`w-6 h-6 ${scrolled ? 'text-sport-darkgray' : 'text-gray-700'}`} />
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => navigateTo('/dashboard')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    User Dashboard
                  </button>
                  <button
                    onClick={() => navigateTo('/admin-dashbord')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </button>
                  <button
                    onClick={handleSignout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full bg-sport-blue text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
