import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { ForgotPassword } from './components/ForgotPassword';
import { MasterView } from './components/MasterView';
import { IQView } from './components/IQView';
import { SecurityView } from './components/SecurityView';
import { UserAdminView } from './components/UserAdminView';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // UI State
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Theme Handling
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Render Content based on Active Tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      
      // IQ Master Routes
      case 'iq-required':
      case 'iq-review':
      case 'iq-details':
        return <IQView view={activeTab} />;
      
      // Security Routes
      case 'port-management':
      case 'db-credentials':
        return <SecurityView view={activeTab} />;

      // Master Data Routes
      case 'inventory':
      case 'locations':
      case 'os':
      case 'infrastructure':
      case 'db-providers':
      case 'antivirus':
      case 'environments':
      case 'dept-name':
        return <MasterView type={activeTab} />;

      // User Admin Routes
      case 'user-master':
      case 'role-master':
        return <UserAdminView view={activeTab} />;
      
      default:
        return (
           <div className="flex items-center justify-center h-full text-slate-400">
             <div className="text-center">
               <h2 className="text-2xl font-semibold mb-2">Module Under Development</h2>
               <p>The requested module ({activeTab}) is coming soon.</p>
             </div>
           </div>
        );
    }
  };

  // If not logged in
  if (!isAuthenticated) {
    if (showForgotPassword) {
      return (
        <div className={isDark ? 'dark' : ''}>
           <ForgotPassword onBack={() => setShowForgotPassword(false)} />
        </div>
      );
    }
    return (
      <div className={isDark ? 'dark' : ''}>
         <Login 
           onLogin={() => setIsAuthenticated(true)} 
           onForgotPassword={() => setShowForgotPassword(true)}
         />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setIsAuthenticated(false)} 
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <Header 
          toggleTheme={toggleTheme} 
          isDark={isDark}
          user={{ name: 'Alex Morgan', role: 'Senior Administrator' }} 
        />

        {/* Dashboard Content Area */}
        <main className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto">
           {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 px-8 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>DevOps Hub System v2.4.0</span>
          <span className="hidden md:inline">Authorized Access Only &bull; monitored system</span>
        </footer>
      </div>
    </div>
  );
};

export default App;