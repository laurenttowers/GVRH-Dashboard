
import React, { useState } from 'react';
import { GameSession } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const mockSessions: GameSession[] = [
  { id: 's1', host: 'AdminUser#0001', type: 'Main Quest', description: 'Continuing the journey to the Dragon\'s Peak.', participants: 4, startTime: '2024-07-21 18:00 UTC' },
  { id: 's2', host: 'GameMaster#9876', type: 'Side Quest', description: 'Investigating the Whispering Woods.', participants: 3, startTime: '2024-07-21 20:00 UTC' },
];

const SessionManagement: React.FC<{ showNotification: (type: 'success' | 'error' | 'info', message: string) => void }> = ({ showNotification }) => {
  const [sessions, setSessions] = useState<GameSession[]>(mockSessions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'new' | 'edit'>('new');
  const [selectedSession, setSelectedSession] = useState<GameSession | null>(null);
  const [sessionForm, setSessionForm] = useState({ type: '', description: '' });
  const [loading, setLoading] = useState(false);

  const openModal = (mode: 'new' | 'edit', session?: GameSession) => {
    setModalMode(mode);
    if (mode === 'edit' && session) {
      setSelectedSession(session);
      setSessionForm({ type: session.type, description: session.description });
    } else {
      setSelectedSession(null);
      setSessionForm({ type: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSessionForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (modalMode === 'new') {
        const newSession: GameSession = {
          id: `s${Date.now()}`,
          host: 'AdminUser#0001',
          participants: 0,
          startTime: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
          ...sessionForm
        };
        setSessions(prev => [newSession, ...prev]);
        showNotification('success', 'New session started successfully!');
      } else if(selectedSession) {
        setSessions(prev => prev.map(s => s.id === selectedSession.id ? { ...s, ...sessionForm } : s));
        showNotification('success', `Session '${selectedSession.id}' updated successfully!`);
      }
      setLoading(false);
      setIsModalOpen(false);
    }, 1500);
  };

  const handleEndSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to end this session?')) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        showNotification('info', `Session ${sessionId} has been ended.`);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Session Management</h1>
        <Button onClick={() => openModal('new')}>Start New Session</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map(session => (
          <Card key={session.id} className="flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-blue-500">{session.type}</h2>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{session.participants} members</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Hosted by {session.host}</p>
              <p className="mt-4 text-gray-700">{session.description}</p>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
              <p className="text-xs text-gray-500">Started: {session.startTime}</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => openModal('edit', session)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleEndSession(session.id)}>End</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {sessions.length === 0 && (
          <Card className="text-center text-gray-500">No active sessions.</Card>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'new' ? 'Start a New Session' : 'Edit Session'}>
        <div className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={sessionForm.type}
              onChange={handleFormChange}
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Main Quest, Side Quest"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={sessionForm.description}
              onChange={handleFormChange}
              rows={4}
              className="w-full p-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="A brief description of the session's objectives."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} isLoading={loading}>{modalMode === 'new' ? 'Start Session' : 'Save Changes'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SessionManagement;
