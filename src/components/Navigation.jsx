import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navigation = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Directory' },
    { id: 'memories', label: 'Memories' },
    { id: 'events', label: 'Events' },
  ];

  const userNavItems = user
    ? [
        ...baseNavItems,
        { id: 'jobs', label: 'Jobs' },
        { id: 'mentorship', label: 'Mentorship' },
        { id: 'stories', label: 'Stories' },
        { id: 'dashboard', label: 'Dashboard' },
      ]
    : baseNavItems;

  const navItems = profile?.role === 'admin'
    ? [...userNavItems, { id: 'admin', label: 'Admin' }]
    : userNavItems;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        currentPage === 'home' && !isScrolled
          ? 'bg-white/10 backdrop-blur-md' // Only transparent on home page when not scrolled
          : 'bg-white/95 backdrop-blur-xl shadow-medium' // Solid background on all other pages and when scrolled
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d2/Gati_Shakti_Vishwavidyalaya_Logo.png"
                alt="Gati Shakti Vishwavidyalaya Logo"
                className="w-10 h-10 relative z-10 group-hover:scale-110 transition-all duration-300 object-contain"
              />
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                currentPage === 'home' && !isScrolled ? 'text-white drop-shadow-lg' : 'text-gray-900'
              }`}>
                GSVConnect
              </h1>
              <p className={`text-xs font-medium transition-colors duration-300 ${
                currentPage === 'home' && !isScrolled ? 'text-white/80' : 'text-neutral-600'
              }`}>
                Where Memories Meet Futures
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  currentPage === item.id
                    ? currentPage === 'home' && !isScrolled
                      ? 'bg-white text-primary-900 shadow-soft'
                      : 'bg-primary-900 text-white shadow-soft'
                    : currentPage === 'home' && !isScrolled
                    ? 'text-white/90 hover:bg-white/20 hover:text-white'
                    : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">

            {user ? (
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-800'
                  }`}>
                    {profile?.full_name || 'User'}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    currentPage === 'home' && !isScrolled ? 'text-white/80' : 'text-neutral-600'
                  }`}>
                    {profile?.user_type === 'alumni' ? 'Alumni' : 'Student'}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    currentPage === 'home' && !isScrolled
                      ? 'text-white/90 hover:bg-white/20 hover:text-white'
                      : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 shadow-soft ${
                    currentPage === 'home' && !isScrolled
                      ? 'bg-white text-primary-900 hover:bg-white/90'
                      : 'bg-primary-900 text-white hover:bg-primary-800'
                  }`}
                >
                  Join Now
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                currentPage === 'home' && !isScrolled
                  ? 'bg-white/20 hover:bg-white/30'
                  : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 transition-colors duration-300 ${
                  currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-700'
                }`} />
              ) : (
                <Menu className={`w-6 h-6 transition-colors duration-300 ${
                  currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-700'
                }`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t shadow-medium transition-all duration-300 ${
          currentPage === 'home' && !isScrolled
            ? 'bg-white/95 backdrop-blur-md border-white/20'
            : 'bg-white border-neutral-200'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-primary-900 text-white'
                    : 'text-neutral-700 hover:bg-primary-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={signOut}
                className="block w-full text-left px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-primary-900 font-medium hover:bg-primary-50 rounded-xl"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onNavigate('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 bg-primary-900 text-white rounded-xl font-medium hover:bg-primary-800"
                >
                  Join Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
