
import { useEffect, useRef } from 'react';

const EventDetails = () => {
  const detailsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-element').forEach((el, index) => {
              el.style.animationDelay = `${index * 0.1}s`;
              el.classList.add('animate-fade-in');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }
    
    return () => {
      if (detailsRef.current) {
        observer.unobserve(detailsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-sport-gray" id="event-details">
      <div className="section-container" ref={detailsRef}>
        <div className="fade-in-element opacity-0">
          <h2 className="section-title text-center">Event Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            { label: 'Distance', value: '7.5 KM' },
            { label: 'Cut Off Time', value: '1 Hour 30 Minutes / 90 Minutes' },
            { label: 'Place', value: 'Virtual Run (Strava)' },
            { label: 'Registration (without Jersey)', value: '650 Taka' },
            { label: 'Registration (with Jersey)', value: '800 Taka' },
            { label: 'Registration Timeline', value: '23 December, 2024 - 24 March, 2025' }
          ].map((detail, index) => (
            <div key={index} className="fade-in-element opacity-0 glass-card p-6 transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="flex flex-col">
                <span className="text-sm text-sport-blue font-semibold uppercase tracking-wider">{detail.label}</span>
                <span className="text-lg font-bold text-sport-darkgray mt-2">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 fade-in-element opacity-0">
          <h2 className="section-title text-center">Participant Rewards for Independence Day 7.5k Virtual Run 2025</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            { reward: 'E-BIB Number', icon: '🏷️' },
            { reward: 'Completion E-Certificate', icon: '📜' },
            { reward: 'Finisher China Medal & jersey', icon: '🏅' },
            { reward: 'Exciting Gifts', icon: '🎁' }
          ].map((item, index) => (
            <div key={index} className="fade-in-element opacity-0 glass-card p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-medium text-sport-darkgray">{item.reward}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100 fade-in-element opacity-0">
          <h2 className="text-xl font-bold text-sport-darkgray mb-4">Important Notice</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-sport-blue mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              SportsSphere Community has the right to change event details at any time and can disqualify any participant if needed.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-sport-blue mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Non-Transferable: Registrations cannot be transferred to another individual under any circumstances.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-sport-blue mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Non-Refundable: Registration fees are non-refundable, regardless of any changes or unforeseen circumstances.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
