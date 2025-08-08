import { useState } from "react";
import TicketForm from '../components/TicketForm';
import StatusBadge from '../components/StatusBadge';
import TicketCard from '../components/TicketCard';

// Native icons (you can replace these with your existing icon components)
const TicketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 19a2 2 0 002-2v-3a1 1 0 00-1-1H5a1 1 0 00-1 1v3a2 2 0 002 2h0z" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const QuickAidApp = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      title: 'Projector not working in Room 101',
      description: 'The projector in classroom 101 is not displaying anything. Students cannot see the presentation. I have tried turning it off and on, but the issue persists.',
      category: 'Equipment Malfunction',
      priority: 'high' as const,
      status: 'open' as const,
      userEmail: 'prof.smith@university.edu',
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 'TKT-002',
      title: 'Wi-Fi connection issues in Library',
      description: 'Multiple students reporting slow internet connection and frequent disconnections in the main library building, especially on the second floor.',
      category: 'IT Support',
      priority: 'medium' as const,
      status: 'in-progress' as const,
      userEmail: 'student.jones@university.edu',
      createdAt: '2025-01-14T14:20:00Z',
      updatedAt: '2025-01-15T09:15:00Z'
    },
    {
      id: 'TKT-003',
      title: 'Lost student ID card',
      description: 'I lost my student ID card somewhere on campus yesterday. Last seen in the cafeteria around lunch time.',
      category: 'Lost Property',
      priority: 'low' as const,
      status: 'resolved' as const,
      userEmail: 'mary.student@university.edu',
      createdAt: '2025-01-13T16:45:00Z',
      updatedAt: '2025-01-14T11:30:00Z'
    }
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState('submit');

  const handleSubmitTicket = async (ticketData: any) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTicket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTickets(prev => [newTicket, ...prev]);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const getStatusCounts = () => {
    return tickets.reduce((acc: Record<string, number>, ticket: any) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-4">
              <TicketIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">QuickAid</h1>
                <p className="text-xs text-gray-600">Campus Helpdesk System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Total Tickets: {tickets.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Success Alert */}
      {showAlert && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
            <CheckCircleIcon className="h-4 w-4 text-green-600 mr-3" />
            <div className="text-green-800">
              Ticket submitted successfully! You will receive an email confirmation shortly.
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-gray-100 p-1 rounded-lg grid grid-cols-2 w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'submit'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Submit Ticket
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors relative ${
                activeTab === 'tickets'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              View Tickets
              {tickets.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-xs text-gray-700">
                  {tickets.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content - Submit Ticket */}
          {activeTab === 'submit' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Need Help?</h2>
                <p className="text-gray-600">
                  Submit a ticket for campus issues and track their progress
                </p>
              </div>
              <TicketForm onSubmit={handleSubmitTicket} />
            </div>
          )}

          {/* Tab Content - View Tickets */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Support Tickets</h2>
                <div className="flex gap-2">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="text-center">
                      <StatusBadge status={status} />
                      <p className="text-xs text-gray-600 mt-1">{count as number}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {tickets.length === 0 ? (
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="text-center text-gray-600">
                      <TicketIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tickets found</p>
                    </div>
                  </div>
                ) : (
                  tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuickAidApp;