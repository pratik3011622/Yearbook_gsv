import { useState, useEffect } from 'react';
import { BookOpen, Eye, Calendar, Tag, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (featuredStories.length > 0) {
      const interval = setInterval(() => {
        setCurrentFeatured((prev) => (prev + 1) % featuredStories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredStories]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*, author_id:profiles(full_name, current_company)')
        .order('published_at', { ascending: false });

      if (error) throw error;

      const all = data || [];
      const featured = all.filter((story) => story.is_featured);

      setStories(all);
      setFeaturedStories(featured);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
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
            Alumni Stories
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Inspiring journeys and success stories from our community
          </p>
        </div>

        {featuredStories.length > 0 && (
          <div className="mb-12 relative rounded-3xl overflow-hidden shadow-2xl">
            {featuredStories.map((story, index) => (
              <div
                key={story.id}
                className={`transition-opacity duration-700 ${
                  index === currentFeatured ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="relative h-96 lg:h-[500px]">
                  {story.cover_image_url && (
                    <img
                      src={story.cover_image_url}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <span className="inline-block px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-full mb-4">
                      FEATURED STORY
                    </span>

                    <h2 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-4 max-w-3xl">
                      {story.title}
                    </h2>

                    <p className="text-lg text-white/90 mb-6 max-w-2xl">
                      {story.excerpt}
                    </p>

                    <div className="flex items-center space-x-6 text-white/80">
                      {story.author_id && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{story.author_id.full_name}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>{story.views_count || 0} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-8 right-8 flex space-x-2">
              {featuredStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatured(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentFeatured ? 'w-8 bg-white' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No stories yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Be the first to share your journey
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-800 group cursor-pointer"
              >
                {story.cover_image_url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.cover_image_url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(story.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>

                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    {story.author_id && (
                      <div className="text-sm">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {story.author_id.full_name}
                        </p>
                        {story.author_id.current_company && (
                          <p className="text-slate-600 dark:text-slate-400">
                            {story.author_id.current_company}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                      <span className="text-sm">Read</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center text-sm text-slate-500 dark:text-slate-500">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{story.views_count || 0} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
