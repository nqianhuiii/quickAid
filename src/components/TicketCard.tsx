import React from 'react';
import { Ticket } from '../types/ticket';
import StatusBadge from './StatusBadge';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
          <p className="text-sm text-gray-600">#{ticket.id}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>
      
      <p className="text-gray-700 mb-4">{ticket.description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>Category: <span className="font-medium">{ticket.category}</span></span>
        <span>Priority: <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span></span>
        <span>Email: <span className="font-medium">{ticket.userEmail}</span></span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
        Created: {new Date(ticket.createdAt).toLocaleDateString()} at {new Date(ticket.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default TicketCard;