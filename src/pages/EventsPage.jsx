import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const EventsPage = ({ onNavigate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*, created_by:profiles(full_name)')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId) => {
    if (!user) {
      onNavigate('login');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_rsvps')
        .upsert([
          {
            event_id: eventId,
            user_id: user.id,
            status: 'attending',
          },
        ]);

      if (error) throw error;

      const event = events.find((e) => e.id === eventId);
      await supabase
        .from('events')
        .update({ rsvp_count: (event.rsvp_count || 0) + 1 })
        .eq('id', eventId);

      fetchEvents();
    } catch (error) {
      console.error('Error RSVPing:', error);
    }
  };

  const getTimeRemaining = (eventDate) => {
    const now = new Date();
    const event = new Date(eventDate);
    const diff = event - now;

    if (diff < 0) return 'Event passed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} days`;
    return `${hours} hours`;
  };

  const filteredEvents = events.filter((event) => {
    const isPast = new Date(event.event_date) < new Date();
    return filter === 'upcoming' ? !isPast : isPast;
  });

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-amber-100 via-orange-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated Memory Lane Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating memory bubbles */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-float-delayed opacity-60"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-gradient-to-br from-orange-400 to-red-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full animate-bounce-subtle opacity-60"></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full animate-float-delayed opacity-60"></div>
        <div className="absolute bottom-40 right-10 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-bounce-subtle opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-80 right-1/4 w-4 h-4 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full animate-float-slow opacity-60"></div>

        {/* Memory lane path effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,200 Q300,150 500,200 T900,250 Q1100,300 1200,350" stroke="url(#memoryGradient)" strokeWidth="3" fill="none" className="animate-pulse"/>
            <defs>
              <linearGradient id="memoryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B"/>
                <stop offset="25%" stopColor="#EF4444"/>
                <stop offset="50%" stopColor="#EC4899"/>
                <stop offset="75%" stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Sparkle effects */}
        <div className="absolute top-32 left-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-80"></div>
        <div className="absolute top-52 right-32 w-1 h-1 bg-pink-300 rounded-full animate-ping opacity-80" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-28 left-32 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-80" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-16 right-40 w-1 h-1 bg-orange-300 rounded-full animate-ping opacity-80" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center relative">
          {/* Decorative elements around title */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 relative">
            Events & Reunions
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Stay connected through college events and alumni gatherings
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                filter === 'past'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No {filter} events
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check back later for new events and reunions
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
              >
                {event.image_url && (
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeRemaining(event.event_date)}</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full mb-2">
                        {event.event_type}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      <span>{event.rsvp_count || 0} attending</span>
                      {event.max_attendees && <span className="ml-1">/ {event.max_attendees} max</span>}
                    </div>
                  </div>

                  {filter === 'upcoming' && (
                    <button
                      onClick={() => handleRSVP(event.id)}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>RSVP Now</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
