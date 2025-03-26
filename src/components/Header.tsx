import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Settings, Search, FileText, Info, Shield, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../services/authService';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';
// import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  const { user, isAdminUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await signOut(token);
        localStorage.removeItem('auth_token');
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* {isSearchOpen && (
        <div className="fixed inset-x-0 top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 py-4 px-4 shadow-lg transition-all duration-300 transform">
          <div className="w-full h-full flex items-center justify-center">
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      )} */}
      <div 
        className={`transition-all duration-500 relative ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm'
        }`} 
        style={{ '--header-height': 'calc(2.5rem + 44px)' } as React.CSSProperties}
      >
        <div className="w-full mx-auto">
          <div className="flex flex-col relative">
            {/* Logo Section - Absolute positioned to overlap */}
            <div className="absolute left-4 top-5 z-10">
              <Link to="/" className="flex items-center group">
                <img 
                  src="images/logo.png" 
                  alt="ESIL Events Logo" 
                  className="h-20 w-20 transition-all duration-300 transform group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Search Bar Section */}
            <div className="w-full py-2 border-b border-gray-200/80 dark:border-gray-700/80">
              <div className="px-4 ml-24 flex items-center justify-between">
                <div className="flex-1 max-w-3xl">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <a 
                  href="tel:0620461385" 
                  className="hidden md:flex items-center space-x-2 px-3 py-1.5 ml-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">06 20 46 13 85</span>
                </a>
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center h-14 px-4">
              {/* Spacer for logo */}
              <div className="w-24"></div>

              <div className="flex-1 flex justify-center">
                <nav className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Accueil
                  </Link>
                  <div className="relative group">
                    <button
                      onMouseEnter={() => setShowMegaMenu(true)}
                      onMouseLeave={() => setShowMegaMenu(false)}
                      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>Nos produits</span>
                      <div className={`w-1 h-1 rounded-full bg-primary-500 dark:bg-primary-400 transition-all duration-300 ${showMegaMenu ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                    {showMegaMenu && (
                      <div
                        className="fixed left-0 right-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-50 border-t border-gray-200/80 dark:border-gray-700/80 transition-all duration-300"
                        style={{ top: 'calc(var(--header-height) - 1px)' }}
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                      >
                        <div className="max-w-7xl mx-auto px-4 py-6">
                          <MegaMenu />
                        </div>
                      </div>
                    )}
                  </div>
                  <Link to="/about" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    À propos
                  </Link>
                  <Link to="/delivery" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Livraison
                  </Link>
                  <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    Contact
                  </Link>
                </nav>
              </div>

              <div className="flex items-center space-x-3">
                <Link 
                  to="/cart" 
                  className="relative group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  {items.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-green-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      {items.length}
                    </span>
                  )}
                </Link>

                {user ? (
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg py-2 z-50 border border-gray-200/80 dark:border-gray-700/80 transition-all duration-200">
                        <div className="px-4 py-2 border-b border-gray-200/80 dark:border-gray-700/80">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.user_metadata.first_name || 'Mon compte'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                            Mon profil
                          </Link>
                          <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                            Mes commandes
                          </Link>
                          {isAdminUser && (
                            <Link to="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                              <Settings className="w-4 h-4 mr-2" />
                              Administration
                            </Link>
                          )}
                        </div>
                        <div className="py-1 border-t border-gray-200/80 dark:border-gray-700/80">
                          <button 
                            onClick={handleSignOut} 
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                          >
                            Déconnexion
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  </Link>
                )}

                <button
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-700/80">
              <div className="px-2 py-3 space-y-1">
                <Link to="/products" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  Nos produits
                </Link>
                <Link to="/about" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  À propos
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  Contact
                </Link>
                <Link to="/delivery" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                  Livraison
                </Link>
                {user && (
                  <>
                    <div className="border-t border-gray-200/80 dark:border-gray-700/80 my-2" />
                    <Link to="/orders" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                      Mes commandes
                    </Link>
                    <Link to="/profile" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                      Mon profil
                    </Link>
                  </>
                )}
                {isAdminUser && (
                  <Link to="/admin" className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200">
                    <Settings className="w-4 h-4 mr-2" />
                    Administration
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;