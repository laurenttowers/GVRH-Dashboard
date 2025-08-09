
import React from 'react';
import Card from './common/Card';
import { UsersIcon, SessionsIcon, ToolsIcon } from './icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const chartData = [
    { name: '7 days ago', users: 2, messages: 10 },
    { name: '6 days ago', users: 5, messages: 15 },
    { name: '5 days ago', users: 4, messages: 12 },
    { name: '4 days ago', users: 8, messages: 25 },
    { name: '3 days ago', users: 10, messages: 30 },
    { name: '2 days ago', users: 7, messages: 22 },
    { name: 'Yesterday', users: 12, messages: 35 },
    { name: 'Today', users: 15, messages: 40 },
];

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: UsersIcon, color: 'text-info' },
    { name: 'Active Sessions', value: '8', icon: SessionsIcon, color: 'text-success' },
    { name: 'Errors Last 24h', value: '2', icon: ToolsIcon, color: 'text-error' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-text-primary">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-surface-border ${stat.color}`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-text-secondary text-sm">{stat.name}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
            <h2 className="text-xl font-semibold mb-4 text-text-primary">Recent Activity</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(229, 229, 234, 0.2)" />
                        <XAxis dataKey="name" stroke="#8E8E93" />
                        <YAxis stroke="#8E8E93" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #2c2c2e', color: '#F5F5F7' }} />
                        <Legend wrapperStyle={{ color: '#F5F5F7' }} />
                        <Line type="monotone" dataKey="users" stroke="#0A84FF" strokeWidth={2} name="New Users" />
                        <Line type="monotone" dataKey="messages" stroke="#34C759" strokeWidth={2} name="Messages Sent" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
