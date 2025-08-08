export type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  userEmail: string;
  createdAt: string;
  updatedAt?: string;
};