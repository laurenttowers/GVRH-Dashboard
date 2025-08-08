import React, { useState, useEffect } from 'react';
import { ErrorLog } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const mockErrors: ErrorLog[] = [
  { id: 'e1', code: 'ERR-500-1A', message: 'Database connection failed.', timestamp: '2024-07-21 21:05:12' },
  { id: 'e2', code: 'ERR-404-3B', message: 'User profile not found for ID: 9999', timestamp: '2024-07-21 19:22:01' },
];

const AdminTools: React.FC<{ showNotification: (type: 'success' | 'error' | 'info', message: string) => void }> = ({ showNotification }) => {
  const [purgeCount, setPurgeCount] = useState<number>(10);
  const [errorSearch, setErrorSearch] = useState('');
  const [foundError, setFoundError] = useState<ErrorLog | null>(null);
  const [crashConfirm, setCrashConfirm] = useState('');
  const [isCrashModalOpen, setIsCrashModalOpen] = useState(false);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handlePurge = () => {
    if (!purgeCount || purgeCount < 1 || purgeCount > 100) {
      showNotification('error', 'Please enter a number between 1 and 100.');
      return;
    }
    if(window.confirm(`Are you sure you want to delete the last ${purgeCount} messages?`)){
        setLoading(p => ({...p, purge: true}));
        setTimeout(() => {
            showNotification('success', `${purgeCount} messages have been purged.`);
            setLoading(p => ({...p, purge: false}));
        }, 2000);
    }
  };

  const handleGetError = () => {
    setLoading(p => ({...p, getError: true}));
    setTimeout(() => {
        const error = mockErrors.find(e => e.code.toLowerCase() === errorSearch.toLowerCase()) || null;
        setFoundError(error);
        if(!error) showNotification('error', 'Error code not found.');
        setLoading(p => ({...p, getError: false}));
    }, 1000);
  };

  const handleCrash = () => {
      setLoading(p => ({...p, crash: true}));
      setTimeout(() => {
          showNotification('success', 'Bot is restarting gracefully...');
          setIsCrashModalOpen(false);
          setCrashConfirm('');
          setLoading(p => ({...p, crash: false}));
      }, 3000);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Administrative Tools</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Purge Messages */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-white">Purge Messages</h2>
          <p className="text-gray-400 mb-4">Delete a specified number of messages from a channel. Use with caution.</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="1"
              max="100"
              value={purgeCount}
              onChange={e => setPurgeCount(parseInt(e.target.value, 10))}
              className="w-24 p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="danger" onClick={handlePurge} isLoading={loading.purge}>Purge</Button>
          </div>
        </Card>

        {/* Error Log Viewer */}
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-white">Error Log Viewer</h2>
          <p className="text-gray-400 mb-4">Retrieve details for a specific error code.</p>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="ERR-XXX-XX"
              value={errorSearch}
              onChange={e => setErrorSearch(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleGetError} isLoading={loading.getError}>Get Error</Button>
          </div>
          {foundError && (
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
              <p><strong className="text-red-400">Code:</strong> {foundError.code}</p>
              <p><strong className="text-gray-300">Message:</strong> {foundError.message}</p>
              <p><strong className="text-gray-400">Timestamp:</strong> {foundError.timestamp}</p>
            </div>
          )}
        </Card>
      </div>

      {/* DANGER ZONE */}
      <div className="mt-8">
          <Card className="border-red-500 border-2">
            <h2 className="text-xl font-semibold text-red-400">DANGER ZONE</h2>
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="font-bold text-white">Gracefully Restart Bot</h3>
                    <p className="text-gray-400">This will immediately restart the bot's process. Use this only if the bot is unresponsive.</p>
                </div>
                <Button variant="danger" onClick={() => setIsCrashModalOpen(true)}>Restart System</Button>
            </div>
          </Card>
      </div>

       <Modal isOpen={isCrashModalOpen} onClose={() => setIsCrashModalOpen(false)} title="Confirm System Restart">
        <p className="mb-4 text-gray-300">This is a critical action. To proceed, please type <strong className="text-red-400">RESTART</strong> into the box below.</p>
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          value={crashConfirm}
          onChange={(e) => setCrashConfirm(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setIsCrashModalOpen(false)}>Cancel</Button>
          <Button 
            variant="danger" 
            onClick={handleCrash} 
            isLoading={loading.crash}
            disabled={crashConfirm !== 'RESTART'}
          >
            Confirm Restart
          </Button>
        </div>
      </Modal>

    </div>
  );
};

export default AdminTools;
