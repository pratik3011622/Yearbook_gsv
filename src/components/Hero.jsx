import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const heroSlides = [
  {
    title: 'Connecting GSV Alumni Worldwide',
    subtitle: 'Join our thriving community of Gati Shakti Vishwavidyalaya graduates. Network, mentor, and grow together.',
    image: 'https://gsv.ac.in/wp-content/uploads/slider/cache/c51c9c0e2027b0762605e4380a2439cd/new-slider-01.jpg',
  },
  {
    title: 'Celebrate Your Journey',
    subtitle: 'Relive the moments that shaped your college experience and celebrate your achievements.',
    image: 'https://gsv.ac.in/wp-content/uploads/slider/cache/8bef1522bf9985ed15004d1a5d70af15/BOSS0373-scaled.jpg',
  },
  {
    title: 'Connect. Mentor. Grow.',
    subtitle: 'Join a thriving community of alumni and students building lasting connections.',
    image: 'https://gsv.ac.in/wp-content/uploads/slider/cache/c51c9c0e2027b0762605e4380a2439cd/new-slider-01.jpg',
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
    <div className="relative h-screen overflow-hidden hero-bg">
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
              className="w-full h-full object-cover object-center hero-image"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-amber-900/20"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            top: '10%',
            left: '10%',
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
            bottom: '10%',
            right: '10%',
            transition: 'transform 0.3s ease-out',
          }}
        ></div>

      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-soft">
                <Sparkles className="w-5 h-5 text-accent-400 animate-pulse" />
                <span className="text-white font-medium">Welcome to AlumniVerse</span>
              </div>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fadeIn"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="text-white">Connecting</span>{' '}
              <span className="text-accent-400">GSV Alumni</span>{' '}
              <span className="text-white">Worldwide</span>
            </h1>

            <p
              className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fadeIn"
              style={{ animationDelay: '0.4s' }}
            >
              Join our thriving community of Gati Shakti Vishwavidyalaya graduates. Network, mentor, and grow together.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn"
              style={{ animationDelay: '0.6s' }}
            >
              <button
                onClick={() => onNavigate('directory')}
                className="group relative px-8 py-4 bg-accent-900 text-white font-semibold text-lg rounded-xl overflow-hidden hover:shadow-strong hover:shadow-accent-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span className="relative z-10">Explore Directory</span>
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="absolute inset-0 bg-accent-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white hover:bg-white hover:text-primary-900 transition-all duration-300 hover:scale-105"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all group"
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};
