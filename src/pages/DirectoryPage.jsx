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
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Alumni Directory
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
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
