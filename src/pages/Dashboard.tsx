
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/Provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/ui/Loader';
import { useNavigate } from 'react-router-dom';

interface Ticket {
  id: string;
  eventName: string;
  date: string;
  location: string;
  ticketNumber: string;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for data fetching
    const timer = setTimeout(() => {
      if (user) {
        // Mock data - in a real app, this would come from an API
        setTickets([
          {
            id: '1',
            eventName: 'Annual Marathon 2023',
            date: 'October 15, 2023',
            location: 'Central Park, New York',
            ticketNumber: 'M23-001'
          }
        ]);
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-sport-darkgray mb-8">My Tickets</h1>
          
          {tickets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="bg-sport-blue p-4 text-white">
                    <h2 className="text-xl font-bold">{ticket.eventName}</h2>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm">Event Date</p>
                      <p className="font-medium">{ticket.date}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm">Location</p>
                      <p className="font-medium">{ticket.location}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm">Ticket Holder</p>
                      <p className="font-medium">{user?.displayName}</p>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <p className="text-gray-600 text-sm">Ticket Number</p>
                      <p className="text-lg font-bold text-sport-blue">{ticket.ticketNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-xl text-gray-600">No tickets found</p>
              <button 
                className="mt-4 px-6 py-2 bg-sport-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/')}
              >
                Register for an Event
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
