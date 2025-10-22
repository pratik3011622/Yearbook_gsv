import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { StatsCounter } from '../components/StatsCounter';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { ThisDayWidget } from '../components/ThisDayWidget';
import { Testimonials } from '../components/Testimonials';
import { Mail, ArrowUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const HomePage = ({ onNavigate, currentPage }) => {
  const [stats, setStats] = useState({});
  const [email, setEmail] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchStats();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_stats')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      setStats(data || {});
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Stay tuned for updates.');
    setEmail('');
  };

  return (
    <div className="relative">
      <Hero onNavigate={onNavigate} currentPage={currentPage} />


      <div className="relative">
        <StatsCounter stats={stats} />
        <FeatureHighlights onNavigate={onNavigate} />
        <ThisDayWidget />
        <Testimonials />
      </div>

      <section className="py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8">
            <Mail className="w-5 h-5 text-accent-400" />
            <span className="font-medium">Stay Updated</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Stay Connected
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get notified about upcoming reunions, events, and community updates. Join our newsletter for exclusive content and opportunities.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
            <div className="relative flex-1 group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-accent-400 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 transition-all duration-300 text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="px-10 py-5 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:shadow-accent-500/50 transition-all hover:scale-105 hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-primary-900"
            >
              Subscribe Now
            </button>
          </form>

          <p className="text-primary-200 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      <footer className="bg-neutral-900 dark:bg-black text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-accent-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GSVConnect
              </h3>
              <p className="text-neutral-400 text-base leading-relaxed mb-6">
                Where Memories Meet Futures. Connecting Gati Shakti Vishwavidyalaya alumni worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/gsv.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all hover:scale-110 shadow-lg"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/school/gatishaktivishwavidyalaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 shadow-lg"
                  aria-label="Connect with us on LinkedIn"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all hover:scale-110 shadow-lg cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.747-1.378 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-12.014C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110 shadow-lg cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.54-.18-3.12-.69-4.24-1.8-1.12-1.08-1.67-2.64-1.75-4.17H12.525zM10.23 1.75c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06zM3.52 3.52c.58.58 1.52.58 2.1 0 .58-.58.58-1.52 0-2.1-.58-.58-1.52-.58-2.1 0-.58.58-.58 1.52 0 2.1zM1.75 10.23c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06zM.02 12.52c.02 1.31.01 2.61.02 3.91 1.53.08 3.09.63 4.17 1.75 1.11 1.12 1.62 2.7 1.79 4.24h4.03c-.18-1.54-.69-3.12-1.8-4.24-1.08-1.12-2.64-1.67-4.17-1.75V12.52zM3.52 20.48c.58.58 1.52.58 2.1 0 .58-.58.58-1.52 0-2.1-.58-.58-1.52-.58-2.1 0-.58.58-.58 1.52 0 2.1zM10.23 22.25c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06zM12.52 24c1.31.02 2.61.01 3.91.02.08-1.53.63-3.09 1.75-4.17 1.12-1.11 2.7-1.62 4.24-1.79v-4.03c-1.54.18-3.12.69-4.24 1.8-1.12 1.08-1.67 2.64-1.75 4.17H12.52zM20.48 20.48c.58.58 1.52.58 2.1 0 .58-.58.58-1.52 0-2.1-.58-.58-1.52-.58-2.1 0-.58.58-.58 1.52 0 2.1zM22.25 13.77c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06zM20.48 3.52c.58.58 1.52.58 2.1 0 .58-.58.58-1.52 0-2.1-.58-.58-1.52-.58-2.1 0-.58.58-.58 1.52 0 2.1zM13.77 1.75c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06-.29-.29-.77-.29-1.06 0-.29.29-.29.77 0 1.06z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-neutral-400">
                <li>
                  <button onClick={() => onNavigate('directory')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Alumni Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Events & Reunions
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Job Board
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Community</h4>
              <ul className="space-y-3 text-neutral-400">
                <li>
                  <button onClick={() => onNavigate('mentorship')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Mentorship Program
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('stories')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Alumni Stories
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('memories')} className="hover:text-white transition-colors text-base hover:translate-x-1 transform duration-200">
                    Yearbook Gallery
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Get Started</h4>
              <p className="text-neutral-400 text-base mb-6 leading-relaxed">
                Join our vibrant community today and start building meaningful connections.
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-2xl font-semibold text-base hover:shadow-lg hover:shadow-primary-500/25 transition-all hover:scale-105 hover:from-primary-700 hover:to-accent-600"
              >
                Join GSVConnect
              </button>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-base">
                &copy; 2025 AlumniVerse. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-neutral-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
