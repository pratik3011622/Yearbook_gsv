import { useState, useEffect } from 'react';
import { Search, Star, Calendar, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const MentorshipPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    session_date: '',
    topic: '',
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_mentor', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.current_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBookSession = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to book a session');
      return;
    }

    try {
      const { error } = await supabase.from('mentorship_sessions').insert([
        {
          mentor_id: selectedMentor.id,
          mentee_id: user.id,
          session_date: bookingData.session_date,
          topic: bookingData.topic,
          status: 'pending',
          duration_minutes: 60,
        },
      ]);

      if (error) throw error;

      alert('Session request sent successfully! The mentor will be notified.');
      setShowBookingModal(false);
      setBookingData({ session_date: '', topic: '' });
      setSelectedMentor(null);
    } catch (error) {
      console.error('Error booking session:', error);
      alert('Failed to book session. Please try again.');
    }
  };

  const openBookingModal = (mentor) => {
    setSelectedMentor(mentor);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 opacity-10">
        {/* Subtle geometric patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-200 dark:border-blue-800 rounded-lg rotate-12"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-indigo-200 dark:border-indigo-800 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-slate-300 dark:border-slate-700 rounded-lg -rotate-6"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 border border-blue-300 dark:border-blue-700 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-indigo-200 dark:border-indigo-800 rounded-lg rotate-45"></div>
        <div className="absolute top-60 left-1/3 w-20 h-20 border border-slate-400 dark:border-slate-600 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 border border-blue-300 dark:border-blue-700 rounded-lg"></div>
        <div className="absolute top-80 right-1/4 w-24 h-24 border border-indigo-300 dark:border-indigo-700 rounded-full"></div>

        {/* Professional grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center relative">
          {/* Decorative elements around title */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 relative">
            Mentorship Program
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-slate-400 to-blue-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Connect with experienced alumni for guidance and career advice
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, company, or skills..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white shadow-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <Star className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No mentors found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-800"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-amber-500 relative">
                  <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {mentor.full_name?.charAt(0) || '?'}
                    </div>
                  </div>
                </div>

                <div className="pt-16 px-6 pb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {mentor.full_name}
                  </h3>

                  {mentor.job_title && (
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {mentor.job_title}
                    </p>
                  )}

                  {mentor.current_company && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {mentor.current_company}
                    </p>
                  )}

                  {mentor.bio && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {mentor.bio}
                    </p>
                  )}

                  {mentor.skills && mentor.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => openBookingModal(mentor)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBookingModal && selectedMentor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Book Mentorship Session
              </h2>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedMentor(null);
                }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-1">
                {selectedMentor.full_name}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedMentor.job_title} at {selectedMentor.current_company}
              </p>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Preferred Date & Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="datetime-local"
                    value={bookingData.session_date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, session_date: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  What would you like to discuss?
                </label>
                <textarea
                  value={bookingData.topic}
                  onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  rows="4"
                  placeholder="Brief description of topics you'd like guidance on..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
