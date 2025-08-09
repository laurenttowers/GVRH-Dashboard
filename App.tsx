
import React, { useState, useCallback } from 'react';
import { AppView, NotificationType } from './types';
import { DashboardIcon, UsersIcon, SessionsIcon, ToolsIcon, WebhookIcon, HelpIcon, LogoutIcon } from './components/icons';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import SessionManagement from './components/SessionManagement';
import AdminTools from './components/AdminTools';
import WebhookManager from './components/WebhookManager';
import Help from './components/Help';
import { NotificationContainer } from './components/common/Notification';
import Button from './components/common/Button';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<AppView>('DASHBOARD');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const showNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    const newNotification: NotificationType = { id: Date.now(), type, message };
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const handleLogin = () => {
      // In a real app, this would involve Discord OAuth2
      setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setView('DASHBOARD');
  };

  const renderView = () => {
    switch (view) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'USERS':
        return <UserManagement showNotification={showNotification} />;
      case 'SESSIONS':
        return <SessionManagement showNotification={showNotification} />;
      case 'TOOLS':
        return <AdminTools showNotification={showNotification} />;
      case 'WEBHOOK':
        return <WebhookManager showNotification={showNotification} />;
      case 'HELP':
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8 bg-surface rounded-2xl shadow-card border border-surface-border">
          <h1 className="text-3xl font-bold text-text-primary mb-2">GVRH-Bot Admin</h1>
          <p className="text-text-secondary mb-6">Please log in to continue.</p>
          <Button onClick={handleLogin} variant="primary">Login with Discord</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <NotificationContainer notifications={notifications} onDismiss={dismissNotification} />
      <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

// Sidebar Navigation Component
const NavItem: React.FC<{
  viewName: AppView;
  label: string;
  icon: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
}> = ({ viewName, label, icon, currentView, setView }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); setView(viewName); }}
      className={`flex items-center p-3 my-1 rounded-xl transition-all duration-200 ease-in-out ${
        currentView === viewName
          ? 'bg-primary text-white shadow-lg'
          : 'text-text-secondary hover:bg-surface-border hover:text-text-primary'
      }`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<{
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
}> = ({ currentView, setView, onLogout }) => {
    const navItems = [
        { view: 'DASHBOARD', label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
        { view: 'USERS', label: 'Users', icon: <UsersIcon className="w-6 h-6" /> },
        { view: 'SESSIONS', label: 'Sessions', icon: <SessionsIcon className="w-6 h-6" /> },
        { view: 'TOOLS', label: 'Admin Tools', icon: <ToolsIcon className="w-6 h-6" /> },
        { view: 'WEBHOOK', label: 'Webhook', icon: <WebhookIcon className="w-6 h-6" /> },
        { view: 'HELP', label: 'Help', icon: <HelpIcon className="w-6 h-6" /> },
    ];
    
  return (
    <aside className="w-64 bg-surface border-r border-surface-border flex flex-col p-4">
      <div className="text-2xl font-bold text-text-primary mb-8 px-2">GVRH-Bot</div>
      <nav className="flex-1">
        <ul>
            {navItems.map(item => (
                 <NavItem 
                    key={item.view}
                    viewName={item.view as AppView}
                    label={item.label}
                    icon={item.icon}
                    currentView={currentView}
                    setView={setView}
                 />
            ))}
        </ul>
      </nav>
      <div>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onLogout(); }}
          className="flex items-center p-3 my-1 rounded-xl text-error hover:bg-error hover:text-white transition-colors duration-200"
        >
          <LogoutIcon className="w-6 h-6" />
          <span className="ml-3 font-medium">Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default App;
