
import React, { useEffect } from 'react';
import { NotificationType } from '../../types';

interface NotificationProps {
  notification: NotificationType;
  onDismiss: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  const baseClasses = 'fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center max-w-sm animate-fade-in-down';
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]}`}>
      <div className="flex-1 mr-4">{notification.message}</div>
      <button onClick={() => onDismiss(notification.id)} className="text-lg font-bold leading-none">&times;</button>
    </div>
  );
};

export const NotificationContainer: React.FC<{ notifications: NotificationType[], onDismiss: (id: number) => void }> = ({ notifications, onDismiss }) => {
    return (
        <div className="fixed top-5 right-5 z-50 space-y-2">
            {notifications.map(note => (
                <Notification key={note.id} notification={note} onDismiss={onDismiss} />
            ))}
        </div>
    );
};
