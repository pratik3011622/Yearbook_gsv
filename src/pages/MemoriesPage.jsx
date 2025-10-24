import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp, Heart, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const MemoriesPage = () => {
  const [memories, setMemories] = useState([]);
  const [expandedYear, setExpandedYear] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*, uploaded_by:profiles(full_name)')
        .order('year', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedMemories = memories.reduce((acc, memory) => {
    if (!acc[memory.year]) {
      acc[memory.year] = [];
    }
    acc[memory.year].push(memory);
    return acc;
  }, {});

  const years = Object.keys(groupedMemories).sort((a, b) => b - a);

  const handleLike = async (memoryId) => {
    try {
      const memory = memories.find((m) => m.id === memoryId);
      const { error } = await supabase
        .from('memories')
        .update({ likes_count: (memory.likes_count || 0) + 1 })
        .eq('id', memoryId);

      if (error) throw error;
      fetchMemories();
    } catch (error) {
      console.error('Error liking memory:', error);
    }
  };

  const getRandomMemory = () => {
    if (memories.length > 0) {
      const randomIndex = Math.floor(Math.random() * memories.length);
      setSelectedMemory(memories[randomIndex]);
    }
  };

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
            Yearbook Memories
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Relive the golden days of college through shared moments and stories that shaped our journey
          </p>

          <div className="relative">
            <button
              onClick={getRandomMemory}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-110 hover:rotate-1 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Calendar className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Random Nostalgia</span>

              {/* Sparkle effects on hover */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </button>
          </div>
        </div>

        {selectedMemory && (
          <div className="mb-12 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="relative">
              <img
                src={selectedMemory.image_url}
                alt={selectedMemory.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold">
                {selectedMemory.year}
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                {selectedMemory.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {selectedMemory.description}
              </p>
              <button
                onClick={() => setSelectedMemory(null)}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : years.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No memories yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Be the first to share a memory from your college days
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {years.map((year) => (
              <div
                key={year}
                className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 relative group"
              >
                {/* Year badge with glow effect */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                    <span className="text-white font-bold text-sm">{year.slice(-2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 animate-bounce-subtle">
                      <span className="text-white font-bold text-xl drop-shadow-lg">{year}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                        Year {year}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {groupedMemories[year].length} memories
                      </p>
                    </div>
                  </div>
                  {expandedYear === year ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>

                {expandedYear === year && (
                  <div className="p-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedMemories[year].map((memory) => (
                      <div
                        key={memory.id}
                        className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-slate-700/50"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={memory.image_url}
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-4 left-4 right-4">
                              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full mb-2">
                                {memory.event_type}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                            {memory.title}
                          </h4>
                          {memory.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                              {memory.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleLike(memory.id)}
                              className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{memory.likes_count || 0}</span>
                            </button>

                            {memory.uploaded_by && (
                              <span className="text-xs text-slate-500 dark:text-slate-500">
                                by {memory.uploaded_by.full_name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
