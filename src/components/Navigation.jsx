import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, profile, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

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
    { id: 'events', label: 'Events' },
    {
      id: 'yearbook',
      label: 'Yearbook',
      subItems: [
        { id: 'photo-gallery', label: 'Photo Gallery' },
        { id: 'video-gallery', label: 'Video Gallery' },
        { id: 'magazine', label: 'Alumni Magazine' },
      ]
    },
  ];

  const userNavItems = user
    ? [
        ...baseNavItems,
        { id: 'jobs', label: 'Jobs' },
        { id: 'mentorship', label: 'Mentorship' },
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
          ? 'bg-white/10 backdrop-blur-md dark:bg-black/20' // Only transparent on home page when not scrolled
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-medium' // Solid background on all other pages and when scrolled
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d2/Gati_Shakti_Vishwavidyalaya_Logo.png"
                alt="Gati Shakti Vishwavidyalaya Logo"
                className={`w-8 sm:w-10 h-8 sm:h-10 relative z-10 group-hover:scale-110 transition-all duration-300 object-contain ${
                  currentPage === 'home' && !isScrolled ? 'brightness-0 invert' : ''
                }`}
              />
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                currentPage === 'home' && !isScrolled ? 'text-white drop-shadow-lg' : 'text-gray-900 dark:text-gray-100'
              }`}>
                GSVConnect
              </h1>
              <p className={`text-xs font-medium transition-colors duration-300 ${
                currentPage === 'home' && !isScrolled ? 'text-white/80' : 'text-neutral-600 dark:text-neutral-300'
              }`}>
                Where Memories Meet Futures
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-1 ${
                        item.subItems.some(subItem => currentPage === subItem.id)
                          ? currentPage === 'home' && !isScrolled
                            ? 'bg-white text-primary-900 shadow-soft'
                            : 'bg-primary-900 text-white shadow-soft'
                          : currentPage === 'home' && !isScrolled
                          ? 'text-white/90 hover:bg-white/20 hover:text-white'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-100'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.id && (
                      <div className={`absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 ${
                        currentPage === 'home' && !isScrolled ? 'backdrop-blur-md bg-white/95' : ''
                      }`}>
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onNavigate(subItem.id);
                              setOpenDropdown(null);
                            }}
                            className={`block w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              currentPage === subItem.id
                                ? 'bg-primary-900 text-white'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-100'
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      currentPage === item.id
                        ? currentPage === 'home' && !isScrolled
                          ? 'bg-white text-primary-900 shadow-soft'
                          : 'bg-primary-900 text-white shadow-soft'
                        : currentPage === 'home' && !isScrolled
                        ? 'text-white/90 hover:bg-white/20 hover:text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-100'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">

          {user ? (
              <div className="hidden lg:flex items-center space-x-3">
                <div className="text-right">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-800 dark:text-neutral-200'
                  }`}>
                    {profile?.full_name || 'User'}
                  </p>
                  <p className={`text-xs transition-colors duration-300 ${
                    currentPage === 'home' && !isScrolled ? 'text-white/80' : 'text-neutral-600 dark:text-neutral-400'
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
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-100'
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
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                    currentPage === 'home' && !isScrolled
                      ? 'text-white/90 hover:bg-white/20 hover:text-white'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-900 dark:hover:text-primary-100'
                  }`}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                currentPage === 'home' && !isScrolled
                  ? 'bg-white/20 hover:bg-white/30'
                  : 'bg-neutral-100 dark:bg-gray-800 hover:bg-neutral-200 dark:hover:bg-gray-700'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 transition-colors duration-300 ${
                  currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
                }`} />
              ) : (
                <Menu className={`w-6 h-6 transition-colors duration-300 ${
                  currentPage === 'home' && !isScrolled ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'
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
            : 'bg-white dark:bg-gray-900 border-neutral-200 dark:border-gray-700'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-all ${
                        item.subItems.some(subItem => currentPage === subItem.id)
                          ? 'bg-primary-900 text-white'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.id && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onNavigate(subItem.id);
                              setIsMobileMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className={`block w-full text-left px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              currentPage === subItem.id
                                ? 'bg-primary-900 text-white'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      currentPage === item.id
                        ? 'bg-primary-900 text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
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
                  className="block w-full text-left px-4 py-3 text-primary-900 dark:text-primary-100 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl"
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
