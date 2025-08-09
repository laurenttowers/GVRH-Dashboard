
import React from 'react';
import Card from './common/Card';
import { UsersIcon, SessionsIcon, ToolsIcon } from './icons';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: UsersIcon, color: 'text-blue-400' },
    { name: 'Active Sessions', value: '8', icon: SessionsIcon, color: 'text-green-400' },
    { name: 'Errors Last 24h', value: '2', icon: ToolsIcon, color: 'text-red-400' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Welcome, Admin!</h2>
          <p className="text-gray-600">
            This is your central hub for managing the GVRH-Bot. Use the navigation on the left to manage users, sessions, and access administrative tools.
          </p>
          <p className="mt-4 text-gray-500">
            Remember to use critical functions like message purging and system restarts with caution. All actions are logged.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
