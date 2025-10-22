import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DirectoryPage } from './pages/DirectoryPage';
import { MemoriesPage } from './pages/MemoriesPage';
import { EventsPage } from './pages/EventsPage';
import { JobsPage } from './pages/JobsPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { StoriesPage } from './pages/StoriesPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'directory':
        return <DirectoryPage />;
      case 'memories':
        return <MemoriesPage />;
      case 'events':
        return <EventsPage onNavigate={handleNavigate} />;
      case 'jobs':
        return <JobsPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'stories':
        return <StoriesPage />;
      case 'vision-mission':
        return (
          <div className="min-h-screen">
            <HomePage onNavigate={handleNavigate} currentPage={currentPage} />
          </div>
        );
      case 'leadership':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <button
                onClick={() => handleNavigate('home')}
                className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors mb-8"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Home</span>
              </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                  Messages from Leadership
                </h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Inspiring words from our esteemed Chancellor and Vice Chancellor guiding our community forward
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                {/* Chancellor Section */}
                <div className="flex flex-col h-full">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex-1 flex flex-col">
                    <div className="h-80 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden flex-shrink-0">
                      <img
                        src="https://indiapressrelease.com/wp-content/uploads/2022/02/IT-Minister-Shri-Ashwini-Vaishnaw-to-release-National-Strategy-on-Additive-Manufacturing-tomorrow.jpg"
                        alt="Chancellor Shri Ashwini Vaishnaw"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Chancellor's Message
                      </h3>
                      <h4 className="text-xl font-semibold text-blue-600 mb-1">
                        Shri Ashwini Vaishnaw
                      </h4>
                      <p className="text-slate-600 text-sm mb-6">
                        Hon'ble Minister for Railways, Information and Broadcasting, Electronics & Information Technology, Government of India.
                      </p>
                      <div className="prose prose-slate max-w-none flex-1">
                        <p className="text-slate-700 leading-relaxed mb-4">
                          Gati Shakti Vishwavidyalaya (GSV) has been set up to create specialized and talented human resources that will accelerate the development of India's entire transportation and logistics sector. GSV highlights government's significant effort to enlarge PM GatiShakti National Master Plan and enhance logistics efficiency across the country.
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-4">
                          The university's scope and vision, in the true sense of National Education Policy 2020, covers the entire transportation including railways, aviation, roadways, maritime sector, etc.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                          The university offers a white-board to the Industry in terms of curriculum inputs of relevance and significance. Apart from regular education programs, the university shall put significant emphasis on executive training and skilling. The university's curriculum shall focus employment-oriented programs, keeping collaboration with Industry as a foundational approach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vice Chancellor Section */}
                <div className="flex flex-col h-full">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex-1 flex flex-col">
                    <div className="h-80 bg-gradient-to-br from-purple-50 to-purple-100 relative overflow-hidden flex-shrink-0">
                      <img
                        src="https://gsv.ac.in/wp-content/uploads/2023/01/author.jpg"
                        alt="Vice Chancellor Prof. Manoj Choudhary"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Vice Chancellor's Message
                      </h3>
                      <h4 className="text-xl font-semibold text-purple-600 mb-1">
                        Prof. Manoj Choudhary
                      </h4>
                      <p className="text-slate-600 text-sm mb-6">
                        Gati Shakti Vishwavidyalaya
                      </p>
                      <div className="prose prose-slate max-w-none flex-1">
                        <p className="text-slate-700 leading-relaxed mb-4">
                          Gati Shakti Vishwavidyalaya (GSV), India's first University in Transportation and Logistics sector, was established through the Central Universities (Amendment) Act 2022, passed by the Parliament in August 2022. Working under the Ministry of Railways (Govt. of India), the University was operationalised on December 6, 2022.
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-4">
                          The University stands by its unique value proposition to offer logistics and transportation-focused applied education, training, skilling and research through experiential learning, multi-disciplinary research, and academia-industry interface. The University follows a demand-driven curriculum, while aligning with industry priorities.
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                          GSV shall lead the teaching, training and research in the entire transportation and logistics sector with a vision - "Innovation-led, Industry-driven University for creating, assimilating and imparting excellence of knowledge and actions accelerating development in the transport and logistics sectors".
                        </p>
                        <p className="text-slate-700 leading-relaxed">
                          To this objective and vision, the university has made very rapid strides and significant progress in the last two and half years, across all the dimensions of industry-driven curricula, executive training programs, research and industry partnerships, to set up a strong foundation to be India's and World's Best University in the transportation and logistics sectors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="min-h-screen">
            <HomePage onNavigate={handleNavigate} currentPage={currentPage} />
          </div>
        );
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
          {renderPage()}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
