interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open': 
        return { className: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Open' };
      case 'in-progress': 
        return { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'In Progress' };
      case 'resolved': 
        return { className: 'bg-green-100 text-green-800 border-green-200', label: 'Resolved' };
      case 'closed': 
        return { className: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Closed' };
      default: 
        return { className: 'bg-blue-100 text-blue-800 border-blue-200', label: status };
    }
  };
  
  const { className, label } = getStatusConfig(status);
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;