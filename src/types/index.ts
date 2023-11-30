export interface User {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'MANAGER';
  created_at: string;
}

export interface Queue {
  id: string;
  title: string;
  description: string;
  averageWaitTimeInMinutes: number;
  maxParticipants: number;
  participantsCount: number;
  createdAt: string;
  updatedAt: string;
}
