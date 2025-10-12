import { Users, BookOpen, Calendar, HeartHandshake, Briefcase, Newspaper } from 'lucide-react';

export const FeatureHighlights = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
      title: 'Alumni Directory',
      description: 'Connect with fellow alumni across the globe. Search by batch, company, or location.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      page: 'directory',
    },
    {
      icon: BookOpen,
      title: 'Yearbook Memories',
      description: 'Relive the golden days through photos, stories, and shared moments from college.',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
      page: 'memories',
    },
    {
      icon: Calendar,
      title: 'Events & Reunions',
      description: 'Stay updated on upcoming reunions, networking events, and college celebrations.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400',
      page: 'events',
    },
    {
      icon: HeartHandshake,
      title: 'Mentorship',
      description: 'Give back by mentoring students or seek guidance from experienced alumni.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      page: 'mentorship',
    },
    {
      icon: Briefcase,
      title: 'Job Board',
      description: 'Discover career opportunities posted by alumni or share openings at your company.',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      page: 'jobs',
    },
    {
      icon: Newspaper,
      title: 'Alumni Stories',
      description: 'Read inspiring success stories and share your own journey with the community.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      page: 'stories',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A comprehensive platform designed to keep our alumni community connected, engaged, and thriving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate(feature.page)}
                className="group relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-3 border border-slate-200 dark:border-slate-700"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                <div className={`${feature.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                  Explore
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
