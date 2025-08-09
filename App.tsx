
import React, { useState, useCallback } from 'react';
import { AppView, NotificationType } from './types';
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
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-semibold mb-2 text-gray-900">GVRH-Bot Admin</h1>
          <p className="text-gray-600 mb-6">Please log in to continue.</p>
          <Button onClick={handleLogin}>Login with Discord</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] text-gray-900">
      <NotificationContainer notifications={notifications} onDismiss={dismissNotification} />
      <TopNav currentView={view} setView={setView} onLogout={handleLogout} />
      <main className="flex-1 p-6 md:p-10">
        {renderView()}
      </main>
    </div>
  );
};

const NavItem: React.FC<{
  viewName: AppView;
  label: string;
  currentView: AppView;
  setView: (view: AppView) => void;
}> = ({ viewName, label, currentView, setView }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); setView(viewName); }}
    className={`text-sm ${currentView === viewName ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
  >
    {label}
  </a>
);

const TopNav: React.FC<{
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
}> = ({ currentView, setView, onLogout }) => {
  const navItems = [
    { view: 'DASHBOARD', label: 'Dashboard' },
    { view: 'USERS', label: 'Users' },
    { view: 'SESSIONS', label: 'Sessions' },
    { view: 'TOOLS', label: 'Admin Tools' },
    { view: 'WEBHOOK', label: 'Webhook' },
    { view: 'HELP', label: 'Help' },
  ];

  return (
    <nav className="apple-nav h-11 flex items-center px-6">
      <div className="font-semibold">GVRH-Bot</div>
      <div className="flex-1 flex justify-center space-x-8">
        {navItems.map(item => (
          <NavItem
            key={item.view}
            viewName={item.view as AppView}
            label={item.label}
            currentView={currentView}
            setView={setView}
          />
        ))}
      </div>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onLogout(); }}
        className="text-sm opacity-80 hover:opacity-100"
      >
        Logout
      </a>
    </nav>
  );
};

export default App;
