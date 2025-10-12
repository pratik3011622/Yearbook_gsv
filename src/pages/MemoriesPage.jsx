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
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Yearbook Memories
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            Relive the golden days of college through shared moments and stories
          </p>

          <button
            onClick={getRandomMemory}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            <span>Random Nostalgia</span>
          </button>
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
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{year}</span>
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
                        className="group relative bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
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
