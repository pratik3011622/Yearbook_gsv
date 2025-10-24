import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Building, ExternalLink, Clock, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, posted_by:profiles(full_name, current_company)')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return job.is_featured;
    return job.job_type === filter;
  });

  const featuredJobs = jobs.filter((job) => job.is_featured).slice(0, 3);

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
            Job Board
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            Discover career opportunities shared by our alumni network
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'featured'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter('full-time')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'full-time'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Full-Time
            </button>
            <button
              onClick={() => setFilter('internship')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'internship'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              Internship
            </button>
          </div>
        </div>

        {featuredJobs.length > 0 && filter === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              Featured Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <div
                  key={job.id}
                  className="relative bg-gradient-to-br from-blue-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                    FEATURED
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                    <p className="text-white/90 font-medium">{job.company}</p>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2" />
                      <span>{job.domain}</span>
                    </div>
                  </div>

                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                          {job.title}
                        </h3>

                        <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                        {job.job_type}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium rounded-full">
                        {job.domain}
                      </span>
                      {job.skills_required?.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {job.posted_by && (
                      <div className="mt-3 text-sm text-slate-500 dark:text-slate-500">
                        Posted by {job.posted_by.full_name}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>

                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
