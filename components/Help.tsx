
import React, { useState } from 'react';
import Card from './common/Card';

const helpData = [
  {
    category: 'User Management',
    commands: [
      { name: 'profile', description: 'View your or another user\'s registration status and details.' },
      { name: 'search', description: 'Find users based on various criteria.' },
      { name: 'unregister', description: 'Manually remove a user\'s registration.' },
      { name: 'exportregistrations', description: 'Export all registered users to a CSV file.' },
    ],
  },
  {
    category: 'Session Management',
    commands: [
      { name: 'startsession', description: 'Initiate a new game session.' },
      { name: 'editsession', description: 'Modify the details of a running session.' },
      { name: 'endsession', description: 'Properly conclude an active session.' },
      { name: 'cancelsession', description: 'Cancel a session before it has ended.' },
    ],
  },
  {
    category: 'Administrative Tools',
    commands: [
      { name: 'purge', description: 'Delete a specified number of messages from a channel.' },
      { name: 'geterror', description: 'Retrieve details for a specific error code.' },
      { name: 'crash', description: 'Gracefully restart the bot\'s process.' },
    ],
  },
  {
    category: 'Webhook (Discohook)',
    commands: [
      { name: 'discohooksend', description: 'Send a message via a configured webhook.' },
      { name: 'discohookedit', description: 'Edit a message previously sent by the webhook.' },
      { name: 'discohookget', description: 'Retrieve the content of a message sent by the webhook.' },
    ],
  },
];

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-gray-900 hover:bg-gray-50"
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

const Help: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-semibold mb-6">Help & Documentation</h1>
      <p className="text-gray-600 mb-6">
        This section provides a quick reference for all available commands and dashboard features.
      </p>
      <Card className="p-0">
        {helpData.map((category) => (
          <AccordionItem key={category.category} title={category.category}>
            <ul className="space-y-3">
              {category.commands.map((command) => (
                <li key={command.name}>
                  <p className="font-mono text-blue-600 bg-gray-100 px-2 py-1 rounded inline-block">/{command.name}</p>
                  <p className="text-gray-700 mt-1 ml-2">{command.description}</p>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Card>
    </div>
  );
};

export default Help;
