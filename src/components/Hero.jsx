import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    title: 'Where Memories Meet Futures',
    subtitle: 'Reconnect with your alma mater and build lasting connections',
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Celebrate Your Journey',
    subtitle: 'Relive the moments that shaped your college experience',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Connect. Mentor. Grow.',
    subtitle: 'Join a thriving community of alumni and students',
    image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
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
    <div className="relative h-screen overflow-hidden">
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
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-amber-900/60"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            top: '10%',
            left: '10%',
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            bottom: '10%',
            right: '10%',
            transition: 'transform 0.3s ease-out',
          }}
        ></div>

        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="text-white font-medium">Welcome to AlumniVerse</span>
              </div>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fadeIn"
              style={{ animationDelay: '0.2s' }}
            >
              {heroSlides[currentSlide].title}
            </h1>

            <p
              className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto animate-fadeIn"
              style={{ animationDelay: '0.4s' }}
            >
              {heroSlides[currentSlide].subtitle}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn"
              style={{ animationDelay: '0.6s' }}
            >
              <button
                onClick={() => onNavigate('register')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-full overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Join as Alumni</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => onNavigate('register')}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-lg rounded-full overflow-hidden hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Register as Student</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => onNavigate('memories')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
              >
                Explore Yearbook
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent"></div>
    </div>
  );
};
