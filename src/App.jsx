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
        return <HomePage onNavigate={handleNavigate} />;
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
          <Navigation onNavigate={handleNavigate} currentPage={currentPage} />
          {renderPage()}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
