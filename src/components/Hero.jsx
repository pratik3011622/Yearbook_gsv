import { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Instagram, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://gsv.ac.in/wp-content/uploads/slider/cache/c51c9c0e2027b0762605e4380a2439cd/new-slider-01.jpg',
    alt: 'Gati Shakti Vishwavidyalaya Campus'
  },
  {
    image: 'https://gsv.ac.in/wp-content/uploads/slider/cache/8bef1522bf9985ed15004d1a5d70af15/BOSS0373-scaled.jpg',
    alt: 'GSV Campus Life'
  }
];

export const Hero = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('.about-dropdown')) {
        setIsAboutDropdownOpen(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative">
      {/* Top Navigation Bar - Ultimate Premium Theme */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 via-pink-600 to-blue-700 shadow-2xl border-b border-indigo-400 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-8 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section with Logo, Title, and Auth Buttons */}
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d2/Gati_Shakti_Vishwavidyalaya_Logo.png"
                alt="Gati Shakti Vishwavidyalaya Logo"
                className="h-12 sm:h-16 w-auto"
              />
              <div className="text-white">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight text-white drop-shadow-lg">GSVConnect</h1>
                <p className="text-sm sm:text-lg text-blue-200">Gati Shakti Vishwavidyalaya</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 relative z-20">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => window.open('https://www.facebook.com/gsv.ac.in/', '_blank')}
                  className="p-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => window.open('https://www.linkedin.com/school/gatishaktivishwavidyalaya/', '_blank')}
                  className="p-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg"
                  title="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'GSVConnect - Gati Shakti Vishwavidyalaya Alumni Network',
                        text: 'Join the official alumni network of Gati Shakti Vishwavidyalaya. Connect with fellow alumni, share experiences, and build lifelong relationships.',
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: Copy URL to clipboard
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied to clipboard! Share it with your friends.');
                      });
                    }
                  }}
                  className="p-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg"
                  title="Share GSVConnect"
                >
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button className="p-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => window.open('https://www.instagram.com/gsv.vadodara?igsh=MWpqaWxhbXIycGQzcA==', '_blank')}
                  className="p-3 text-white hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/50 rounded-lg"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              <button
                onClick={() => onNavigate('login')}
                className="px-3 sm:px-6 py-2 sm:py-3 text-blue-200 hover:text-white font-medium transition-colors text-sm sm:text-lg border border-blue-400 rounded-lg hover:border-blue-300"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm sm:text-lg shadow-lg"
              >
                Join Now
              </button>
            </div>
          </div>

          {/* Navigation Menu Section */}
          <div className="border-t border-purple-300/50 py-3 sm:py-4 relative z-10">
            <nav className="flex justify-center space-x-4 sm:space-x-8">
              <button onClick={() => onNavigate('home')} className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 text-sm sm:text-lg px-4 sm:px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 backdrop-blur-sm border border-white/10 hover:border-yellow-300/30 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105">Home</button>
              <button onClick={() => onNavigate('directory')} className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 text-sm sm:text-lg px-4 sm:px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 backdrop-blur-sm border border-white/10 hover:border-yellow-300/30 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105">Directory</button>
              <button onClick={() => onNavigate('events')} className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 text-sm sm:text-lg px-4 sm:px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 backdrop-blur-sm border border-white/10 hover:border-yellow-300/30 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105">Events</button>
              <button onClick={() => onNavigate('stories')} className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 text-sm sm:text-lg px-4 sm:px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 backdrop-blur-sm border border-white/10 hover:border-yellow-300/30 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105">Stories</button>

              {/* About Dropdown */}
              <div className="relative about-dropdown">
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                  className="text-white hover:text-yellow-300 font-semibold transition-all duration-300 text-sm sm:text-lg px-4 sm:px-5 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-pink-400/20 backdrop-blur-sm border border-white/10 hover:border-yellow-300/30 hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105 flex items-center space-x-1"
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu - Positioned to overlay slideshow */}
                {isAboutDropdownOpen && (
                  <div className="fixed top-24 left-1/2 -translate-x-1/2 w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-[70]">
                    <div className="py-3">
                      <button
                        onClick={() => {
                          onNavigate('vision-mission');
                          setIsAboutDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 flex items-center space-x-4 group"
                      >
                        <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-xl">Vision & Mission</div>
                          <div className="text-sm text-gray-500">Our goals and objectives</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('leadership');
                          setIsAboutDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-5 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-700 transition-all duration-200 flex items-center space-x-4 group"
                      >
                        <div className="w-14 h-14 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-xl">Leadership Messages</div>
                          <div className="text-sm text-gray-500">Words from our leaders</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('team');
                          setIsAboutDropdownOpen(false);
                        }}
                        className="w-full text-left px-6 py-5 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-700 transition-all duration-200 flex items-center space-x-4 group"
                      >
                        <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-xl">Our Team</div>
                          <div className="text-sm text-gray-500">Meet our dedicated team</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section with Clean Slideshow - Starts right after navbar */}
      <div className="relative h-[calc(100vh-10rem)] overflow-hidden">
        {/* Slideshow Background - No overlay */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center scale-105"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators - Responsive */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 sm:w-12 bg-white'
                  : 'w-2 sm:w-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Content Section Below Slideshow - Responsive */}
      <div className="bg-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Gati Shakti Vishwavidyalaya
              <br />
              <span className="text-blue-600">Alumni Network</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Connect with fellow alumni, share experiences, and build lifelong relationships that transcend time and distance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <button
                onClick={() => onNavigate('directory')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
              >
                Explore Directory
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold text-base sm:text-lg"
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
