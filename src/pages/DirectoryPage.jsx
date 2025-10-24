import { useState, useEffect } from 'react';
import { Search, Filter, Grid3x3, MapPin, Linkedin, Briefcase, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const DirectoryPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch_year: '',
    department: '',
    country: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, profiles]);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'alumni')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
      setFilteredProfiles(data || []);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.current_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.batch_year) {
      filtered = filtered.filter(
        (profile) => profile.batch_year === parseInt(filters.batch_year)
      );
    }

    if (filters.department) {
      filtered = filtered.filter((profile) =>
        profile.department?.toLowerCase().includes(filters.department.toLowerCase())
      );
    }

    if (filters.country) {
      filtered = filtered.filter((profile) =>
        profile.country?.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    setFilteredProfiles(filtered);
  };

  const uniqueBatchYears = [...new Set(profiles.map((p) => p.batch_year))].filter(Boolean).sort((a, b) => b - a);
  const uniqueDepartments = [...new Set(profiles.map((p) => p.department))].filter(Boolean).sort();

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
            Alumni Directory
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce-subtle opacity-80"></div>
            <div className="absolute -bottom-2 -left-8 w-4 h-4 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce-subtle opacity-80" style={{ animationDelay: '1s' }}></div>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Connect with {profiles.length} alumni from around the world
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, company, or department..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Batch Year
                </label>
                <select
                  value={filters.batch_year}
                  onChange={(e) => setFilters({ ...filters, batch_year: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="">All Years</option>
                  {uniqueBatchYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={filters.country}
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                  placeholder="Enter country"
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
            <Grid3x3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No alumni found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 dark:border-slate-800"
              >
                <div className="h-32 bg-gradient-to-br from-blue-500 to-amber-500"></div>

                <div className="relative px-6 pb-6">
                  <div className="absolute -top-16 left-6">
                    <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {profile.full_name?.charAt(0) || '?'}
                    </div>
                  </div>

                  <div className="pt-20">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      {profile.full_name}
                    </h3>

                    {profile.batch_year && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Class of {profile.batch_year}</span>
                      </div>
                    )}

                    {profile.current_company && (
                      <div className="flex items-center text-sm text-slate-700 dark:text-slate-300 mb-2">
                        <Briefcase className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium">{profile.current_company}</span>
                      </div>
                    )}

                    {profile.job_title && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {profile.job_title}
                      </p>
                    )}

                    {profile.location && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profile.location}</span>
                      </div>
                    )}

                    {profile.skills && profile.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {profile.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {profile.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>View Profile</span>
                      </a>
                    )}
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
