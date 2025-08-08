
export interface RegisteredUser {
  id: string;
  discordUsername: string;
  characterName: string;
  registrationDate: string;
}

export interface GameSession {
  id: string;
  host: string;
  type: string;
  description: string;
  participants: number;
  startTime: string;
}

export interface ErrorLog {
  id: string;
  code: string;
  message: string;
  timestamp: string;
}

export type AppView = 'DASHBOARD' | 'USERS' | 'SESSIONS' | 'TOOLS' | 'WEBHOOK' | 'HELP';

export interface NotificationType {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}
