import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

type WebhookTab = 'send' | 'edit' | 'get';

const WebhookManager: React.FC<{ showNotification: (type: 'success' | 'error' | 'info', message: string) => void }> = ({ showNotification }) => {
  const [activeTab, setActiveTab] = useState<WebhookTab>('send');
  const [sendContent, setSendContent] = useState('');
  const [editId, setEditId] = useState('');
  const [editContent, setEditContent] = useState('');
  const [getId, setGetId] = useState('');
  const [retrievedContent, setRetrievedContent] = useState('');
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleAction = (action: WebhookTab) => {
    setLoading(p => ({...p, [action]: true}));
    setTimeout(() => {
        switch(action) {
            case 'send':
                if(!sendContent) { showNotification('error', 'Message content cannot be empty.'); break; }
                showNotification('success', 'Message sent via webhook.');
                setSendContent('');
                break;
            case 'edit':
                if(!editId || !editContent) { showNotification('error', 'Message ID and content are required.'); break; }
                showNotification('success', `Message ${editId} edited successfully.`);
                setEditId('');
                setEditContent('');
                break;
            case 'get':
                if(!getId) { showNotification('error', 'Message ID is required.'); break; }
                setRetrievedContent(`This is the retrieved content for message ID ${getId}. It supports **Markdown**.`);
                showNotification('info', `Content for message ${getId} retrieved.`);
                break;
        }
        setLoading(p => ({...p, [action]: false}));
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'send':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Send New Message</h3>
            <textarea
              rows={5}
              placeholder="Enter your message here. Markdown is supported."
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sendContent}
              onChange={e => setSendContent(e.target.value)}
            />
            <Button onClick={() => handleAction('send')} isLoading={loading.send}>Send Message</Button>
          </div>
        );
      case 'edit':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Edit Existing Message</h3>
            <input
              type="text"
              placeholder="Message ID"
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editId}
              onChange={e => setEditId(e.target.value)}
            />
            <textarea
              rows={5}
              placeholder="Enter the new message content."
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
            />
            <Button onClick={() => handleAction('edit')} isLoading={loading.edit}>Edit Message</Button>
          </div>
        );
      case 'get':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get Message Content</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Message ID"
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={getId}
                onChange={e => setGetId(e.target.value)}
              />
              <Button onClick={() => handleAction('get')} isLoading={loading.get}>Get Message</Button>
            </div>
            {retrievedContent && (
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <h4 className="font-semibold text-gray-300 mb-2">Retrieved Content:</h4>
                <p className="text-gray-200 whitespace-pre-wrap">{retrievedContent}</p>
              </div>
            )}
          </div>
        );
    }
  };

  const TabButton: React.FC<{ tabId: WebhookTab; children: React.ReactNode }> = ({ tabId, children }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
        activeTab === tabId
          ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-white">Webhook Manager</h1>
      <div className="flex border-b border-gray-700">
        <TabButton tabId="send">Send</TabButton>
        <TabButton tabId="edit">Edit</TabButton>
        <TabButton tabId="get">Get</TabButton>
      </div>
      <Card className="rounded-t-none">
        {renderTabContent()}
      </Card>
    </div>
  );
};

export default WebhookManager;
