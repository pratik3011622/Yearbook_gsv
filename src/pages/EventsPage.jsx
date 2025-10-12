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
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Events & Reunions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
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
