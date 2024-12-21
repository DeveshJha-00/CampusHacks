// src/components/events/EventCard.js
import React from 'react';
import { format } from 'date-fns';
import { useEvents } from './EventContext';

const EventCard = ({ event }) => {
    const { registerForEvent, isRegistered, addToCalendar } = useEvents();

    const categoryColors = {
        general: 'bg-blue-100 text-blue-800',
        hackathon: 'bg-purple-100 text-purple-800',
        workshop: 'bg-green-100 text-green-800',
        seminar: 'bg-yellow-100 text-yellow-800',
        conference: 'bg-red-100 text-red-800'
    };

    const handleRegister = async () => {
        try {
            await registerForEvent(event.id);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const registered = isRegistered(event);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColors[event.category]}`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </span>

                {/* Title */}
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{event.title}</h3>

                {/* Date and Time */}
                <div className="mt-2 flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{format(event.date, 'MMMM d, yyyy h:mm aa')}</span>
                </div>

                {/* Location */}
                {event.location && (
                    <div className="mt-2 flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                    </div>
                )}

                {/* Description */}
                <p className="mt-4 text-gray-600 line-clamp-3">{event.description}</p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col space-y-2">
                    {event.registrationUrl && (
                        <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 bg-primary-600 text-white text-center rounded-md hover:bg-primary-700 transition-colors"
                        >
                            Register Now
                        </a>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={registered}
                        className={`w-full px-4 py-2 text-center rounded-md transition-colors ${
                            registered
                                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                : 'bg-white text-primary-600 border border-primary-600 hover:bg-primary-50'
                        }`}
                    >
                        {registered ? 'Already Registered' : 'Mark as Interested'}
                    </button>

                    <button
                        onClick={() => addToCalendar(event)}
                        className="w-full px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;