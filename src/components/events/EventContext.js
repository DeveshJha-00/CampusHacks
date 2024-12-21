// src/components/events/EventContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../../utils/firebase';
import {
    collection,
    query,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    orderBy,
    Timestamp,
    where,
    arrayUnion
} from 'firebase/firestore';
import toast from 'react-hot-toast';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('user');

    // Fetch user role on mount
    useEffect(() => {
        const checkUserRole = async () => {
            if (auth.currentUser) {
                const userDoc = await getDocs(query(
                    collection(db, 'users'),
                    where('uid', '==', auth.currentUser.uid)
                ));
                if (!userDoc.empty) {
                    setUserRole(userDoc.docs[0].data().role || 'user');
                }
            }
        };
        checkUserRole();
    }, []);

    // Fetch events on mount
    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch all events from Firestore
    const fetchEvents = async () => {
        try {
            const eventsQuery = query(
                collection(db, 'events'),
                orderBy('date', 'asc')
            );
            const querySnapshot = await getDocs(eventsQuery);
            const eventsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().date.toDate()
            }));
            setEvents(eventsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
            setLoading(false);
        }
    };

    // Add new event (admin only)
    const addEvent = async (eventData) => {
        try {
            if (userRole !== 'admin') {
                throw new Error('Only admins can add events');
            }
            const eventRef = await addDoc(collection(db, 'events'), {
                ...eventData,
                date: Timestamp.fromDate(new Date(eventData.date)),
                createdAt: Timestamp.now(),
                createdBy: auth.currentUser.uid
            });
            toast.success('Event added successfully');
            fetchEvents(); // Refresh events list
            return eventRef.id;
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error(error.message);
            throw error;
        }
    };

    // Register user for an event
    const registerForEvent = async (eventId) => {
        try {
            const eventRef = doc(db, 'events', eventId);
            const registrationData = {
                userId: auth.currentUser.uid,
                registeredAt: Timestamp.now()
            };
            await updateDoc(eventRef, {
                registrations: arrayUnion(registrationData)
            });
            toast.success('Successfully registered for event');
            fetchEvents(); // Refresh events list
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error('Failed to register for event');
            throw error;
        }
    };

    // Check if user is registered for an event
    const isRegistered = (event) => {
        return event.registrations?.some(
            reg => reg.userId === auth.currentUser?.uid
        ) || false;
    };

    // Add event to calendar
    const addToCalendar = (event) => {
        try {
            // Format event for Google Calendar URL
            const startDate = event.date.toISOString().replace(/-|:|\.\d\d\d/g, '');
            const endDate = new Date(event.date.getTime() + 2 * 60 * 60 * 1000)
                .toISOString().replace(/-|:|\.\d\d\d/g, '');

            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
                encodeURIComponent(event.title)
            }&details=${
                encodeURIComponent(event.description)
            }&location=${
                encodeURIComponent(event.location || '')
            }&dates=${startDate}/${endDate}`;

            window.open(url, '_blank');
            toast.success('Opening calendar...');
        } catch (error) {
            console.error('Error adding to calendar:', error);
            toast.error('Failed to add to calendar');
        }
    };

    return (
        <EventContext.Provider value={{
            events,
            loading,
            userRole,
            addEvent,
            registerForEvent,
            isRegistered,
            addToCalendar,
            refreshEvents: fetchEvents
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvents = () => useContext(EventContext);