import { memo } from 'react';

const TicketGrid = ({ 
  totalTickets, 
  soldTickets, 
  reservedTickets, 
  selectedTickets, 
  onTicketClick, 
  isDashboard, 
  randomTickets, 
  users, 
  onUnreserveTicket, 
  highlightedTicket 
}) => {
  // ... código del componente ...

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
      {Array.from({ length: totalTickets }, (_, i) => i + 1).map((number) => (
        <div
          key={number}
          id={`ticket-${number}`}
          // ... resto de las props ...
        >
          {/* ... contenido del ticket ... */}
        </div>
      ))}
    </div>
  );
};

// Exportar el componente memorizado
export default memo(TicketGrid); 