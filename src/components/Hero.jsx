import { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative">
      {/* Top Navigation Bar - University Theme */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section with Logo, Title, and Auth Buttons */}
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d2/Gati_Shakti_Vishwavidyalaya_Logo.png"
                alt="Gati Shakti Vishwavidyalaya Logo"
                className="h-16 w-auto"
              />
              <div className="text-white">
                <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-lg">GSVConnect</h1>
                <p className="text-lg text-blue-200">Gati Shakti Vishwavidyalaya</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => window.open('https://www.facebook.com/gsv.ac.in/', '_blank')}
                  className="p-2 text-blue-200 hover:text-white transition-colors"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </button>
                <button
                  onClick={() => window.open('https://www.linkedin.com/school/gatishaktivishwavidyalaya/', '_blank')}
                  className="p-2 text-blue-200 hover:text-white transition-colors"
                  title="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </button>
                <button className="p-2 text-blue-200 hover:text-white transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
                <button className="p-2 text-blue-200 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </button>
                <button className="p-2 text-blue-200 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </button>
              </div>
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-3 text-blue-200 hover:text-white font-medium transition-colors text-lg border border-blue-400 rounded-lg hover:border-blue-300"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg"
              >
                Join Now
              </button>
            </div>
          </div>

          {/* Navigation Menu Section */}
          <div className="border-t border-blue-500/30 py-4">
            <nav className="flex justify-center space-x-8">
              <button onClick={() => onNavigate('home')} className="text-blue-200 hover:text-white font-medium transition-colors text-lg px-4 py-2 rounded-lg hover:bg-blue-800/50">Home</button>
              <button onClick={() => onNavigate('directory')} className="text-blue-200 hover:text-white font-medium transition-colors text-lg px-4 py-2 rounded-lg hover:bg-blue-800/50">Directory</button>
              <button onClick={() => onNavigate('events')} className="text-blue-200 hover:text-white font-medium transition-colors text-lg px-4 py-2 rounded-lg hover:bg-blue-800/50">Events</button>
              <button onClick={() => onNavigate('stories')} className="text-blue-200 hover:text-white font-medium transition-colors text-lg px-4 py-2 rounded-lg hover:bg-blue-800/50">Stories</button>
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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-12 bg-white'
                  : 'w-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Content Section Below Slideshow */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Gati Shakti Vishwavidyalaya
              <br />
              <span className="text-blue-600">Alumni Network</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow alumni, share experiences, and build lifelong relationships that transcend time and distance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('directory')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Explore Directory
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold text-lg"
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
