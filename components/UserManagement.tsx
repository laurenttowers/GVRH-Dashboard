import React, { useState, useMemo } from 'react';
import { RegisteredUser } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const mockUsers: RegisteredUser[] = [
  { id: '1', discordUsername: 'PlayerOne#1111', characterName: 'Aragorn', registrationDate: '2024-01-15' },
  { id: '2', discordUsername: 'GamerGirl#2222', characterName: 'Legolas', registrationDate: '2024-02-20' },
  { id: '3', discordUsername: 'MasterChief#3333', characterName: 'Gimli', registrationDate: '2024-03-10' },
  { id: '4', discordUsername: 'ZeldaFan#4444', characterName: 'Frodo Baggins', registrationDate: '2024-04-05' },
  { id: '5', discordUsername: 'RPG_Guru#5555', characterName: 'Gandalf', registrationDate: '2024-05-12' },
];

const UserManagement: React.FC<{ showNotification: (type: 'success' | 'error' | 'info', message: string) => void }> = ({ showNotification }) => {
  const [users, setUsers] = useState<RegisteredUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToUnregister, setUserToUnregister] = useState<string>('');
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.discordUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.characterName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleExport = () => {
    setLoading(prev => ({ ...prev, export: true }));
    setTimeout(() => {
      showNotification('success', 'User registrations are being exported.');
      // In a real app, this would trigger a file download.
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Discord Username,Character Name,Registration Date\n"
        + users.map(u => `${u.discordUsername},${u.characterName},${u.registrationDate}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "gvrh-bot-registrations.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoading(prev => ({ ...prev, export: false }));
    }, 1500);
  };

  const handleUnregister = () => {
    if (!userToUnregister) {
      showNotification('error', 'Please enter a Discord Username or ID.');
      return;
    }
    setLoading(prev => ({ ...prev, unregister: true }));
    setTimeout(() => {
      setUsers(prev => prev.filter(u => u.discordUsername !== userToUnregister && u.id !== userToUnregister));
      showNotification('success', `User '${userToUnregister}' has been unregistered.`);
      setIsModalOpen(false);
      setUserToUnregister('');
      setLoading(prev => ({ ...prev, unregister: false }));
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-6">User Management</h1>
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by Discord or Character Name..."
            className="w-full md:w-1/2 p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)} variant="danger">Unregister User</Button>
            <Button onClick={handleExport} isLoading={loading.export}>Export CSV</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-semibold tracking-wide text-gray-600">Discord Username</th>
                <th className="text-left p-3 text-sm font-semibold tracking-wide text-gray-600">Character Name</th>
                <th className="text-left p-3 text-sm font-semibold tracking-wide text-gray-600">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-sm text-gray-900">{user.discordUsername}</td>
                  <td className="p-3 text-sm text-gray-600">{user.characterName}</td>
                  <td className="p-3 text-sm text-gray-500">{user.registrationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && <p className="text-center p-4 text-gray-500">No users found.</p>}
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Manually Unregister User">
        <p className="mb-4 text-gray-600">Enter the Discord Username or ID of the user you wish to unregister. This action is irreversible.</p>
        <input
          type="text"
          placeholder="User#1234 or ID"
          className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userToUnregister}
          onChange={(e) => setUserToUnregister(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleUnregister} isLoading={loading.unregister}>Confirm Unregister</Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
