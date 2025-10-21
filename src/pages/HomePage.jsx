import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { StatsCounter } from '../components/StatsCounter';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { ThisDayWidget } from '../components/ThisDayWidget';
import { Testimonials } from '../components/Testimonials';
import { Mail, ArrowUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const HomePage = ({ onNavigate }) => {
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
      <Hero onNavigate={onNavigate} />
      <StatsCounter stats={stats} />
      <FeatureHighlights onNavigate={onNavigate} />
      <ThisDayWidget />
      <Testimonials />

      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get notified about upcoming reunions, events, and community updates
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-secondary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                AlumniVerse
              </h3>
              <p className="text-neutral-400 text-sm">
                Where Memories Meet Futures
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>
                  <button onClick={() => onNavigate('directory')} className="hover:text-white transition-colors">
                    Alumni Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                    Events
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">
                    Job Board
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>
                  <button onClick={() => onNavigate('mentorship')} className="hover:text-white transition-colors">
                    Mentorship
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('stories')} className="hover:text-white transition-colors">
                    Alumni Stories
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('memories')} className="hover:text-white transition-colors">
                    Yearbook
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-neutral-400 text-sm mb-2">
                Join our vibrant community today
              </p>
              <button
                onClick={() => onNavigate('register')}
                className="btn-primary"
              >
                Join Now
              </button>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400 text-sm">
            <p>&copy; 2025 AlumniVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary-900 text-white rounded-xl shadow-strong hover:shadow-xl transition-all hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
